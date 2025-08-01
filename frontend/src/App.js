import { useEffect, useState } from "react";
import "./App.css";
import NotasList from "./components/NotasList";
import NotaForm from "./components/NotaForm";
import { getNotas } from "./services/noteServices";

function App() {
  const [notaEditando, setNotaEditando] = useState(null);
  const [notas, setNotas] = useState([]);
  const [recargar, setRecargar] = useState(false);
  const [filtroEtiqueta, setFiltroEtiqueta] = useState("");

  const notasFiltradas = filtroEtiqueta
    ? notas.filter((n) => n.etiquetas?.includes(filtroEtiqueta))
    : notas;

  const cargarNotas = async () => {
    const res = await getNotas();
    console.log("Notas recibidas:", res.data);
    setNotas(res.data);
  };
  const obtenerEtiquetasUnicas = () => {
    const todas = notas.flatMap(nota => nota.etiquetas || []);
    return [...new Set(todas)];
  };

  useEffect(() => {
    cargarNotas();
  }, [recargar]);

  const handleRecargar = () => setRecargar(!recargar);

  const cancelarEdicion = () => setNotaEditando(null);

  return (
    <div className="App">
      <h1>Aplicación de Notas</h1>
      <NotaForm
        onNotaCreada={handleRecargar}
        notaEditando={notaEditando}
        cancelarEdicion={cancelarEdicion}
      />
      <input
        type="text"
        placeholder="Filtrar por etiqueta"
        value={filtroEtiqueta}
        onChange={(e) => setFiltroEtiqueta(e.target.value)}
        style={{ width: "100%", padding: "8px", margin: "12px 0" }}
      />
      <div style={{ margin: "10px 0" }}>
        <strong>Etiquetas disponibles:</strong>{" "}
        {obtenerEtiquetasUnicas().map((et, index) => (
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

      {filtroEtiqueta && (
        <button onClick={() => setFiltroEtiqueta("")} style={{ marginTop: "10px" }}>
          Limpiar Filtro
        </button>
      )}
      <NotasList
        notas={notasFiltradas}
        recargar={handleRecargar}
        setNotaEditando={setNotaEditando}
        setFiltroEtiqueta={setFiltroEtiqueta}
      />
    </div>
  );
}

export default App;