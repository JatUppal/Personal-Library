package com.jatin.personal_library.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

  // Boot auto-configures WebClient.Builder when webflux is on the classpath
  @Bean
  public WebClient googleBooksClient(WebClient.Builder builder) {
    return builder
        .baseUrl("https://www.googleapis.com/books/v1")
        .build();
  }
}
