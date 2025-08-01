package backend.backend.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;

    @Column(length = 1000)
    private String contenido;

    private boolean archivada;

    private LocalDateTime creadaEn;

    private LocalDateTime actualizadaEn;

    public Note() {}

    public Note(String titulo, String contenido) {
        this.titulo = titulo;
        this.contenido = contenido;
        this.archivada = false;
        this.creadaEn = LocalDateTime.now();
        this.actualizadaEn = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
        this.actualizadaEn = LocalDateTime.now();
    }

    public String getContenido() {
        return contenido;
    }

    public void setContenido(String contenido) {
        this.contenido = contenido;
        this.actualizadaEn = LocalDateTime.now();
    }

    public boolean isArchivada() {
        return archivada;
    }

    public void setArchivada(boolean archivada) {
        this.archivada = archivada;
        this.actualizadaEn = LocalDateTime.now();
    }

    public LocalDateTime getCreadaEn() {
        return creadaEn;
    }

    public LocalDateTime getActualizadaEn() {
        return actualizadaEn;
    }
    @ElementCollection
    private List<String> etiquetas = new ArrayList<>();
    
    public void setEtiquetas(List<String> etiquetas) {
    this.etiquetas = etiquetas;
    this.actualizadaEn = LocalDateTime.now();
}

    public List<String> getEtiquetas() {
      return etiquetas;
    }
}
