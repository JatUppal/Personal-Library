package com.jatin.personal_library.library.api;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.*;

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

    private Map<String, Object> normalize(Map<String, Object> node) {
        String id = str(node.get("id"));
        Map<String, Object> vi = (Map<String, Object>) node.getOrDefault("volumeInfo", Map.of());

        String title = str(vi.get("title"));
        List<String> authors = toStringList(vi.get("authors"));       // [] if missing
        Integer year = parseYear(str(vi.get("publishedDate")));       // 1997 from "1997-06-26", else null
        String isbn13 = extractIsbn13((List<Map<String, Object>>) vi.get("industryIdentifiers"));
        Integer pageCount = toInteger(vi.get("pageCount"));
        String coverUrl = extractCover((Map<String, Object>) vi.get("imageLinks"));
        String description = str(vi.get("description"));

        // IMPORTANT: use a mutable Map (allows nulls). LinkedHashMap keeps field order.
        Map<String, Object> out = new LinkedHashMap<>();
        out.put("googleVolumeId", id);
        out.put("title", title);
        out.put("authors", authors);
        out.put("publishedYear", year);
        out.put("isbn13", isbn13);
        out.put("pageCount", pageCount);
        out.put("coverUrl", coverUrl);
        out.put("description", description);
        return out;
    }

    private static String str(Object o) { return (o == null) ? null : String.valueOf(o); }

    private static List<String> toStringList(Object o) {
        if (o instanceof List<?> list) {
            List<String> r = new ArrayList<>(list.size());
            for (Object v : list) r.add(String.valueOf(v));
            return r;
        }
        return List.of();
    }

    private static Integer toInteger(Object o) {
        try { return (o == null) ? null : Integer.valueOf(String.valueOf(o)); }
        catch (Exception e) { return null; }
    }

    private static Integer parseYear(String publishedDate) {
        if (publishedDate == null || publishedDate.isBlank()) return null;
        try { return Integer.parseInt(publishedDate.substring(0, 4)); }
        catch (Exception e) { return null; }
    }

    private static String extractCover(Map<String, Object> img) {
        if (img == null) return null;
        String url = str(img.get("thumbnail"));
        if (url == null || url.isBlank()) url = str(img.get("smallThumbnail"));
        if (url != null && url.startsWith("http:")) url = "https:" + url.substring(5);
        return url;
    }

    private static String extractIsbn13(List<Map<String, Object>> ids) {
        if (ids == null) return null;
        for (var m : ids) {
            String type = str(m.get("type"));
            if ("ISBN_13".equalsIgnoreCase(type)) {
                String raw = str(m.get("identifier"));
                return (raw == null) ? null : raw.replaceAll("[^0-9Xx]", "");
            }
        }
        return null;
    }
}