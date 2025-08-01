import React from "react";
import { eliminarNota, alternarArchivado } from "../services/noteServices";

const NotasList = ({ notas, recargar, setNotaEditando, filtroEtiqueta, setFiltroEtiqueta }) => {
    const handleEliminar = async (id) => {
        await eliminarNota(id);
        recargar();
    };

    const handleAlternarArchivado = async (id) => {
        await alternarArchivado(id);
        recargar();
    };

    const handleEditar = (nota) => {
        setNotaEditando(nota);
    };

    const notasFiltradas = (filtroEtiqueta || "").trim()
        ? notas.filter((nota) =>
            nota.etiquetas?.some((et) =>
                et.toLowerCase().includes(filtroEtiqueta.toLowerCase())
            )
        )
        : notas;

    return (
        <div>
            <h2>Notas</h2>
            {notasFiltradas.length === 0 ? (
                <p>No hay notas para mostrar.</p>
            ) : (
                <ul>
                    {notasFiltradas.map((nota) => (
                        <li key={nota.id}>
                            <strong>{nota.titulo}</strong>: {nota.contenido}
                            <br />
                            <em>{nota.archivada ? "Archivada" : "Activa"}</em>
                            <br />
                            {nota.etiquetas && nota.etiquetas.length > 0 && (
                                <div>
                                    <strong>Etiquetas:</strong>{" "}
                                    {nota.etiquetas.map((et, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setFiltroEtiqueta(et)}
                                            style={{
                                                margin: "2px",
                                                padding: "4px 8px",
                                                backgroundColor: "#eee",
                                                border: "1px solid #ccc",
                                                borderRadius: "12px",
                                                cursor: "pointer",
                                                fontSize: "0.8em",
                                                color: "#000"
                                            }}
                                        >
                                            {et}
                                        </button>
                                    ))}
                                </div>
                            )}
                            <button onClick={() => handleEliminar(nota.id)}>Eliminar</button>
                            <button onClick={() => handleAlternarArchivado(nota.id)}>
                                {nota.archivada ? "Desarchivar" : "Archivar"}
                            </button>
                            <button onClick={() => handleEditar(nota)}>Editar</button>
                            <hr />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NotasList;