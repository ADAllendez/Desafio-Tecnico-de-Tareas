package backend.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import backend.backend.model.Note;
import backend.backend.repository.NoteRepository;

import java.util.List;

@RestController // le dice a Sping que maneja peticiones HTTP y devuelve un JSON
@RequestMapping("/notas")
public class NoteController {

    @Autowired
    private NoteRepository noteRepository;

    // GET /notas -> devuelve todas las notas
    @GetMapping
    public List<Note> obtenerTodasLasNotas(@RequestParam(required = false) Boolean archivada) {
        if (archivada != null) {
            return noteRepository.findByArchivada(archivada);
        } else {
            return noteRepository.findAll();
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<Note> obtenerNotaPorId(@PathVariable Long id) {
        return noteRepository.findById(id)
                .map(nota -> ResponseEntity.ok(nota))
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /notas -> crea una nueva nota
    @PostMapping // mapea todas las peticiones POST a /notas
    public Note crearNota(@RequestBody Note nota) {// aqui el spring convierte el Json que recibe una instancia de note

        return noteRepository.save(nota);
    }

    @PutMapping("/{id}")
public ResponseEntity<Note> actualizarNota(@PathVariable Long id, @RequestBody Note notaActualizada) {
    return noteRepository.findById(id)
            .map(nota -> {
                nota.setTitulo(notaActualizada.getTitulo());
                nota.setContenido(notaActualizada.getContenido());
                nota.setArchivada(notaActualizada.isArchivada());
                nota.setEtiquetas(notaActualizada.getEtiquetas()); 
                return ResponseEntity.ok(noteRepository.save(nota));
            })
            .orElse(ResponseEntity.notFound().build());
}

    // PUT /notas/{id}/archivar -> alterna el estado archivada de una nota
    @PutMapping("/{id}/archivar")
    public ResponseEntity<Note> alternarArchivado(@PathVariable Long id) {
        return noteRepository.findById(id)
                .map(nota -> {
                    nota.setArchivada(!nota.isArchivada()); // cambia el estado
                    return ResponseEntity.ok(noteRepository.save(nota));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarNota(@PathVariable Long id) {
        if (noteRepository.existsById(id)) {
            noteRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
