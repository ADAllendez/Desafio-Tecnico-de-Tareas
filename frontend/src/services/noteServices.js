import axios from "axios";

const API_URL = "http://localhost:8081/notas";

export const getNotas =  ()=> axios.get(API_URL);

export const getNotasById = (id)=> axios.get(`${API_URL}/${id}`);

export const crearNota = (nota)=> axios.post(API_URL,nota);

export const actualizarNota = (id, nota)=> axios.put(`${API_URL}/${id}`, nota);

export const eliminarNota = (id,nota)=> axios.delete(`${API_URL}/${id}`);

export const alternarArchivado = (id) => axios.put(`${API_URL}/${id}/archivar`);