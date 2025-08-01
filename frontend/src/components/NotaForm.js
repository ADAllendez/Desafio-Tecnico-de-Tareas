import React, { useState, useEffect } from "react";
import { actualizarNota, crearNota } from "../services/noteServices";
import "./NotaForm.css";

const NotaForm = ({ onNotaCreada, notaEditando, cancelarEdicion }) => {
    const [titulo, setTitulo] = useState("");
    const [contenido, setContenido] = useState("");
    const [etiquetasTexto, setEtiquetasTexto] = useState("");
    const [errores, setErrores] = useState({});

    useEffect(() => {
        if (notaEditando) {
            setTitulo(notaEditando.titulo);
            setContenido(notaEditando.contenido);
            setEtiquetasTexto(notaEditando.etiquetas?.join(", ") || "");
        } else {
            setTitulo("");
            setContenido("");
            setEtiquetasTexto("");
        }
        setErrores({});
    }, [notaEditando]);

    const validar = () => {
        const errores = {};
        if (titulo.trim().length < 3) {
            errores.titulo = "El título debe tener al menos 3 caracteres";
        }
        if (!contenido.trim()) {
            errores.contenido = "El contenido no puede estar vacío";
        }
        setErrores(errores);
        return Object.keys(errores).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validar()) return;

        const etiquetas = etiquetasTexto
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag !== "");

        const nota = {
            titulo,
            contenido,
            etiquetas,
            archivada: notaEditando?.archivada || false,
        };

        if (notaEditando) {
            await actualizarNota(notaEditando.id, nota);
        } else {
            await crearNota(nota);
        }

        onNotaCreada();
        setTitulo("");
        setContenido("");
        setEtiquetasTexto("");
        setErrores({});
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{notaEditando ? "Editar Nota" : "Crear Nueva Nota"}</h2>

            <input
                type="text"
                placeholder="Título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className={errores.titulo ? "error" : ""}
            />
            {errores.titulo && <p className="error">{errores.titulo}</p>}

            <textarea
                placeholder="Contenido"
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
                className={errores.contenido ? "error" : ""}
            />
            {errores.contenido && <p className="error">{errores.contenido}</p>}
            <br />
            <input
                type="text"
                placeholder="Etiquetas separadas por coma"
                value={etiquetasTexto}
                onChange={(e) => setEtiquetasTexto(e.target.value)}
            />

            <button type="submit">
                {notaEditando ? "Actualizar Nota" : "Agregar Nota"}
            </button>

            {notaEditando && (
                <button type="button" onClick={cancelarEdicion}>
                    Cancelar
                </button>
            )}
        </form>
    );
};

export default NotaForm;