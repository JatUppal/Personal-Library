package com.jatin.personal_library.library.domain;

import com.jatin.personal_library.user.User; // adjust if your package differs
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.NoArgsConstructor;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UuidGenerator;
import org.hibernate.type.SqlTypes;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(
    name = "user_books",
    uniqueConstraints = {
        @UniqueConstraint(name = "uq_user_book", columnNames = {"user_id", "book_id"})
    }
) 
public class UserBook {

    @Id
    @GeneratedValue
    @UuidGenerator // Hibernate 6: generates UUID on the Java side
    @JdbcTypeCode(SqlTypes.UUID)
    @Column(name = "id", nullable = false, updatable = false, columnDefinition = "uuid default gen_random_uuid()")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
        name = "user_id",
        referencedColumnName = "id",
        nullable = false,
        foreignKey = @ForeignKey(name = "user_books_user_id_fkey")
    )
    private User user;  // users.id is INTEGER in your DB

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
        name = "book_id",
        referencedColumnName = "id",
        nullable = false,
        foreignKey = @ForeignKey(name = "user_books_book_id_fkey")
    )
    private Book book;  // books.id is UUID

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private ReadingStatus status;  // nullable in DDL; add nullable=false + default if you want

    @Min(1) @Max(5)
    @Column(name = "rating")
    private Integer rating; // nullable; DB CHECK enforces 1..5 when not null

    @Column(name = "notes", columnDefinition = "text")
    private String notes;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false, columnDefinition = "timestamptz default now()")
    private OffsetDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false, columnDefinition = "timestamptz default now()")
    private OffsetDateTime updatedAt;

    public UserBook() {} // JPA

    public UserBook(User user, Book book) {
        this.user = user;
        this.book = book;
    }

    // Getters / Setters
    public UUID getId() { return id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Book getBook() { return book; }
    public void setBook(Book book) { this.book = book; }

    public ReadingStatus getStatus() { return status; }
    public void setStatus(ReadingStatus status) { this.status = status; }

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public OffsetDateTime getCreatedAt() { return createdAt; }
    public OffsetDateTime getUpdatedAt() { return updatedAt; }
}
