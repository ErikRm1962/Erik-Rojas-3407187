📚 Sistema de Gestión de Biblioteca Digital
👨‍💻 Autor

Erik Nicolas Rojas Mancilla

📌 Descripción del Proyecto

Este proyecto es un Sistema de Gestión de Biblioteca Digital desarrollado en JavaScript moderno (ES2023).

El sistema permite administrar libros de diferentes categorías utilizando Programación Orientada a Objetos (POO).

Se pueden:

Agregar libros

Eliminar libros

Activar o desactivar libros

Filtrar por tipo

Filtrar por estado

Buscar por título

🏗 Estructura del Sistema

El sistema está organizado con una jerarquía de clases:

📖 Clase Base

LibraryItem

Contiene las propiedades comunes de todos los libros.

Usa encapsulamiento con campos privados (#).

Define métodos como activate(), deactivate() y getType().

📚 Clases Derivadas

Novel

ScienceBook

HistoryBook

Cada clase hereda de LibraryItem y sobrescribe el método getInfo().

🖥 Clase Principal

MainSystem

Administra los libros.

Permite agregar, eliminar, buscar y obtener estadísticas.

Controla toda la lógica del sistema.

🧠 Conceptos de Programación Utilizados

Este proyecto aplica los siguientes conceptos:

🔒 Encapsulamiento

Se utilizan campos privados con # para proteger la información interna.

🧬 Herencia

Las clases de libros heredan de la clase base LibraryItem.

🔁 Polimorfismo

Cada clase hija implementa su propia versión del método getInfo().

🧩 Abstracción

La clase base define métodos que deben ser implementados por las clases derivadas.

⚙ Características Técnicas

El código utiliza características modernas de ES2023:

Campos privados (#)

Static blocks

Arrow functions

Template literals

crypto.randomUUID() para generar IDs únicos

🎯 Conclusión

Este sistema demuestra la aplicación correcta de la Programación Orientada a Objetos utilizando sintaxis moderna de JavaScript, manteniendo una estructura clara, organizada y funcional.