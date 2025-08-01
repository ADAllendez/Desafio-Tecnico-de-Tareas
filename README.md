# Aplicación Web de Notas - Challenge Ensolvers

Esta aplicación permite crear, editar, eliminar, archivar y filtrar notas mediante etiquetas. Desarrollada como parte del challenge técnico de Ensolvers.

## 🧩 Tecnologías utilizadas

### Backend:
- Java 11
- Spring Boot
- Spring Data JPA
- H2 Database (persistencia en disco)
- Maven

### Frontend:
- React
- Axios
- CSS básico

---

## 🚀 Funcionalidades

- ✅ Crear notas con título, contenido y etiquetas  
- ✅ Editar notas  
- ✅ Eliminar notas  
- ✅ Archivar / desarchivar notas  
- ✅ Filtrar por etiquetas (ingresando texto o haciendo clic en las etiquetas)  
- ✅ Mostrar lista de etiquetas disponibles  
- ✅ Botón para limpiar el filtro actual  

---

## ⚙️ Estructura del Proyecto

/ (raíz del repo)  
├── backend/ # Proyecto Java Spring Boot  
├── frontend/ # Proyecto React  
├── run.sh # Script para correr la aplicación completa  
└── README.md # Este archivo  

---

## ▶️ Cómo ejecutar la aplicación

### Requisitos:
[]
- Java 11+
- Node.js y npm
- Maven

### Paso 1: Dar permisos de ejecución al script

```bash
chmod +x run.sh

Paso 2: Ejecutar la app completa

./run.sh
Este script hace lo siguiente:

Instala dependencias y compila el backend

Inicia el backend en el puerto 8081

Instala dependencias del frontend

Inicia el frontend en http://localhost:3000

```

📌 Notas adicionales
La base de datos es un archivo persistente (notes.db) generado por H2, ubicado dentro de la carpeta backend/.

Si se desea limpiar los datos, se puede borrar manualmente el archivo notes.db.

🙌 Autor
Desarrollado por Alejo Diaz Allendez como parte del challenge técnico para Ensolvers.