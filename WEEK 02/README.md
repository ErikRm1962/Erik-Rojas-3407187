# Biblioteca Digital – Gestión de Recursos Educativos

## Descripción del proyecto
Este proyecto es una aplicación web que permite gestionar recursos educativos digitales como documentos, videos, cursos y libros.  
El sistema permite agregar, visualizar, buscar, filtrar y administrar los recursos almacenados en la biblioteca.

La información se guarda en el navegador utilizando **LocalStorage**, por lo que los datos se mantienen aunque se cierre la página.

---

## Dominio del problema
El sistema pertenece al dominio de **Educación y E-learning**, específicamente a la gestión de una **Biblioteca Digital**.

Su objetivo es organizar recursos educativos para facilitar su administración y consulta.

---

## Entidad principal
**Recurso Educativo Digital**

### Propiedades
- id: identificador único
- name: nombre del recurso
- description: descripción del contenido
- category: tipo de recurso (PDF, video, curso, presentación, libro)
- priority: nivel o importancia (alta, media, baja)
- active: estado del recurso (activo/inactivo)
- createdAt: fecha de creación

---

## Funcionalidades principales

### CRUD
- Crear un recurso educativo
- Ver la lista de recursos
- Cambiar el estado (activo/inactivo)
- Eliminar recursos

---

## Filtros y búsqueda
El sistema permite:
- Filtrar por estado (activo/inactivo)
- Filtrar por categoría
- Filtrar por prioridad
- Buscar recursos por nombre

---

## Estadísticas
Se muestran:
- Total de recursos
- Recursos activos
- Recursos inactivos
- Cantidad por categoría

---

## Tecnologías utilizadas
- HTML
- CSS
- JavaScript (Vanilla)
- LocalStorage

---

## Cómo ejecutar el proyecto
1. Descargar o clonar el repositorio
2. Abrir el archivo `index.html` en el navegador
3. No requiere instalación adicional

---

## Autor
Erik Nicolas Rojas Mancilla
