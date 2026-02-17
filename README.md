#  Web Magazine — Música Latina

> Proyecto enfocado en el desarrollo de una revista digital con una estructura modular y adaptable. Esta propuesta traslada los principios del diseño editorial tradicional al entorno web, utilizando sistemas de maquetación modernos con HTML, CSS (Grid y Flexbox) y JavaScript.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

##  Sobre el proyecto

**Web Magazine** es una revista digital que explora la identidad y el impacto cultural de tres de mis artistas favoritos en música urbana latina: Bad Bunny, Feid y Young Miko. El proyecto va más allá de una simple galería de contenido; busca crear una experiencia editorial cohesiva donde el diseño, la tipografía y las interacciones trabajen en conjunto para contar historias.

Desarrollado como proyecto integrador académico, este webzine demuestra el dominio de fundamentos web modernos y la capacidad de ejecutar un concepto de diseño completo desde cero.

###  Concepto editorial

La revista adopta un lenguaje visual inspirado en publicaciones impresas tradicionales pero ejecutado con las capacidades nativas de la web:

- **Tipografía como elemento protagonista** — Uso de Fraunces (serif editorial) para títulos y jerarquía visual fuerte
- **Composición modular** — Layouts asimétricos con Grid CSS que rompen la monotonía de las plantillas convencionales  
- **Ritmo visual** — Alternancia entre densidad de información y espacios respirables
- **Interacciones sutiles** — Animaciones que refuerzan la narrativa sin distraer del contenido

El resultado es una pieza que se siente **curada** en lugar de generada, diseñada en lugar de templada.

[DISEÑO CONCEPTO DE FIGMA](https://www.figma.com/design/tmVRHIK7hHx5EPUWSHMb6n/Sin-t%C3%ADtulo?node-id=0-1&t=4aCKz0eXz3b7Lxmk-1) 

---

### Arquitectura de archivos

```
webzine-musica-latina/
├── index.html              # Estructura semántica completa
├── style.css               # Estilos modulares organizados por sección
├── main.js                 # Lógica de interacciones
└── img/     
```

---

##  Características implementadas

### 1. **Carrusel horizontal infinito**
- Auto-scroll configurable con pausa en hover
- Navegación por flechas con feedback visual
- Loop infinito 
- Responsive y accesible por teclado

### 2. **Sistema de animaciones al scroll**
```css
/* Fade-up progresivo mediante Intersection Observer */
article {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

article.visible {
  opacity: 1;
  transform: translateY(0);
}
```

### 3. **Layouts editoriales complejos**
- Grid de 3 columnas para el artículo de Bad Bunny
- Grid de 2 columnas para Feid y Young Miko
- Aside flotante con datos del artista

### 4. **Formulario funcional con validación**
- Validación HTML5 nativa
- Feedback visual de estados (loading → success → reset)
- Manejo de errores accesible

### 5. **Navegación contextual**
- Smooth scroll con offset inteligente
- Botón flotante "volver arriba" que aparece progresivamente
- Índice interactivo con scroll automático

---

### Estructura de navegación
1. **Portada** → Scroll para descubrir
2. **Índice** → Navegación rápida a secciones
3. **Artículos** → Bad Bunny, Feid, Young Miko
4. **Carrusel de álbumes** → Interactivo con enlaces a Apple Music
5. **Galería** → Noticias recientes con imágenes
6. **Newsletter** → Formulario funcional (simulado)
---
## Inspiración de diseño
- *rollingstone* — Revista web comercial
---

##  Paleta de colores

```css
:root {
  --negro: #000000;
  --blanco: #ffffff;
  --rojo-acento: #e30613;   
  --gris-texto: #333333;
  --gris-borde: #dddddd;
}
```

El uso de contrastes definidos y una gama reducida de colores permite que la composición respire, generando una experiencia visual limpia en la que la tipografía y la estructura adquieren protagonismo.

---

##  Autor

**Jorman Torres Pertuz**  
