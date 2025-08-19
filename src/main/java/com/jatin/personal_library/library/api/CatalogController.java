package com.jatin.personal_library.library.api;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@SuppressWarnings("unchecked")
@RestController
@RequestMapping("/catalog")
public class CatalogController {

  private final WebClient googleBooks;
  private final String apiKey;

  public CatalogController(WebClient googleBooksClient,
                           @Value("${google.books.apiKey:}") String apiKey) {
    this.googleBooks = googleBooksClient;
    this.apiKey = apiKey; // can be empty in dev; key recommended to avoid quota issues
  }

  @GetMapping("/search")
  public Map<String, Object> search(
      @RequestParam String q,
      @RequestParam(defaultValue = "10") int limit,
      @RequestParam(defaultValue = "0") int startIndex) {

    int maxResults = Math.max(1, Math.min(limit, 40)); // Google caps at 40

    String fields = "items(id,volumeInfo/title,volumeInfo/authors,volumeInfo/publishedDate,"
        + "volumeInfo/industryIdentifiers,volumeInfo/pageCount,volumeInfo/imageLinks/thumbnail,"
        + "volumeInfo/description),totalItems";

    Map<String, Object> resp = googleBooks.get()
        .uri(uri -> uri.path("/volumes")
            .queryParam("q", q)
            .queryParam("printType", "books")
            .queryParam("maxResults", maxResults)
            .queryParam("startIndex", Math.max(0, startIndex))
            .queryParam("fields", fields)
            .queryParamIfPresent("key",
                (apiKey == null || apiKey.isBlank()) ? Optional.empty() : Optional.of(apiKey))
            .build())
        .retrieve()
        .bodyToMono(Map.class)
        .block();

    if (resp == null) return Map.of("totalItems", 0, "items", List.of());

    List<Map<String, Object>> raw = (List<Map<String, Object>>) resp.getOrDefault("items", List.of());
    List<Map<String, Object>> items = new ArrayList<>(raw.size());
    for (Map<String, Object> it : raw) items.add(normalize(it));

    return Map.of(
        "totalItems", resp.getOrDefault("totalItems", 0),
        "items", items
    );
  }

  private Map<String, Object> normalize(Map<String, Object> item) {
    String id = (String) item.get("id");
    Map<String, Object> v = (Map<String, Object>) item.getOrDefault("volumeInfo", Map.of());

    List<String> authors = (List<String>) v.getOrDefault("authors", List.of());
    List<Map<String, String>> ids =
        (List<Map<String, String>>) v.getOrDefault("industryIdentifiers", List.of());
    String isbn13 = ids.stream()
        .filter(m -> "ISBN_13".equals(m.get("type")))
        .map(m -> m.get("identifier"))
        .findFirst().orElse(null);

    // publishedDate is a STRING like "1997" or "2009-07-28" — extract the year if present
    Integer publishedYear = null;
    Object pdObj = v.get("publishedDate");
    if (pdObj instanceof String pd) {
      Matcher m = Pattern.compile("^(\\d{4})").matcher(pd);
      if (m.find()) publishedYear = Integer.parseInt(m.group(1));
    }

    Map<String, Object> img = (Map<String, Object>) v.getOrDefault("imageLinks", Map.of());

    return Map.of(
        "googleVolumeId", id,
        "title", v.get("title"),
        "authors", authors,
        "publishedYear", publishedYear,
        "isbn13", isbn13,
        "pageCount", v.get("pageCount"),
        "coverUrl", img.getOrDefault("thumbnail", null),
        "description", v.get("description")
    );
  }
}