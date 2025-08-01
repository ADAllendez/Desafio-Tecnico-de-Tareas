package backend.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import backend.backend.model.Note;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByArchivada(boolean archivada);
}
