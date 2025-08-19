package com.jatin.personal_library.library.domain;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.UuidGenerator;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(
    name = "books",
    uniqueConstraints = {
        @UniqueConstraint(name = "uk_books_google_volume_id", columnNames = "google_volume_id"),
        @UniqueConstraint(name = "uk_books_isbn13", columnNames = "isbn13")
    }
)
public class Book {
    // Book Information
    @GeneratedValue              // ⬅️ add
    @UuidGenerator  
    @Id
    @JdbcTypeCode(SqlTypes.UUID)
    @Column(name = "id", nullable = false, updatable = false, columnDefinition = "uuid default gen_random_uuid()")
    private UUID id;

    @Column(name = "google_volume_id", length = 64, unique = true)
    private String googleVolumeId;

    @Column(name = "isbn13", length = 13, unique = true)
    private String isbn13;

    @Column(name = "title", length = 400, nullable = false)
    private String title;

    @Column(name = "authors", columnDefinition = "text")
    private String authors;

    @Column(name = "published_year")
    private Integer publishedYear;

    @Column(name = "page_count")
    private Integer pageCount;

    @Column(name = "cover_url", columnDefinition = "text")
    private String coverUrl;

    @Column(name = "description", columnDefinition = "text")
    private String description;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false, columnDefinition = "timestamptz default now()")
    private OffsetDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false, columnDefinition = "timestamptz default now()")
    private OffsetDateTime updatedAt;

    // Constructors
    public Book() {} // JPA

    public Book(String title) {
        this.title = title;
    }

    // Getters/Setters

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getGoogleVolumeId() { return googleVolumeId; }
    public void setGoogleVolumeId(String googleVolumeId) { this.googleVolumeId = googleVolumeId; }

    public String getIsbn13() { return isbn13; }
    public void setIsbn13(String isbn13) { this.isbn13 = isbn13; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getAuthors() { return authors; }
    public void setAuthors(String authors) { this.authors = authors; }

    public Integer getPublishedYear() { return publishedYear; }
    public void setPublishedYear(Integer publishedYear) { this.publishedYear = publishedYear; }

    public Integer getPageCount() { return pageCount; }
    public void setPageCount(Integer pageCount) { this.pageCount = pageCount; }

    public String getCoverUrl() { return coverUrl; }
    public void setCoverUrl(String coverUrl) { this.coverUrl = coverUrl; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public OffsetDateTime getCreatedAt() { return createdAt; }
    public OffsetDateTime getUpdatedAt() { return updatedAt; }

}
