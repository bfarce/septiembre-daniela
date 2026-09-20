# Daniela's Digital Keepsake

Crear una experiencia web interactiva, premium y emocional de alta gama concebida como una carta digital y álbum interactivo para Daniela Abella de parte de Brahian.

### Requisitos clave y concepto:
1. **Destinataria y Remitente**:
   - Destinataria: Daniela Abella
   - Remitente: Brahian ("Con cariño, Brahian")
   - Tono emocional: Muy cercano, tierno, lleno de admiración, complicidad y aprecio sincero ("Hay personas que simplemente hacen que los días sean un poquito más bonitos"), con un toque sutil y especial, pero sin ser una declaración amorosa directa ni posesiva (ella tiene novio, debe sentirse respetuoso, cálido, entrañable y memorable).

2. **Diseño y Estética (Creative Studio $20k feel)**:
   - Paleta: Blanco cálido, crema suave, rosa pastel, detalles rosados delicados y toques dorados sutiles.
   - Tipografía: Serif elegante para títulos (estilo editorial / Playfair / Cormorant), Sans-serif limpia y legible para cuerpo de texto, y detalles manuscritos / caligráficos delicados (estilo Caveat o Dancing Script).
   - Sensación: Carta manuscrita, papel con textura táctil, stickers cute, sellos postales, cintas washi tape, pétalos flotantes, microinteracciones y acabado de alta costura digital.

3. **Tecnología y 3D**:
   - Integración con Three.js / Canvas para efectos 3D sutiles y poéticos: pétalos de flores cayendo suavemente, partículas de brillo interactivas con el cursor/toque, tarjetas con profundidad 3D y parallax al hacer scroll o mover el dispositivo.
   - Animaciones fluidas (Framer Motion / Lucide icons / CSS 3D transforms).
   - Optimización estricta Mobile-First: fluidez total a 60fps en smartphones, soporte táctil (swipe en fotos, tap con feedback de pequeños corazoncitos y destellos), sin desbordamiento horizontal.

4. **Estructura Narrativa Completa por Secciones**:
   1. **Cover / Pantalla de Entrada**:
      - Experiencia inmersiva con pétalos y partículas flotantes en 3D.
      - "Hay algo que quería decirte..." y "Pero esta vez quería hacerlo de una manera un poquito diferente."
      - Botón "Entrar 💌" con microinteracción y transición cinematográfica hacia la carta.
   2. **Apertura de la Carta**:
      - Estética de sobre/papel artesanal que se despliega delicadamente.
      - "Para Daniela Abella — Una persona que hace que los días sean un poquito más bonitos."
   3. **Línea de Recuerdos**:
      - "Y luego están todos esos pequeños momentos que terminan significando más de lo que uno esperaba..."
      - Momentos y anécdotas contadas en tarjetas visuales interactivas.
   4. **Carrusel de Fotografías Premium**:
      - Experiencia tipo galería/álbum de recuerdos con efecto de tarjetas superpuestas, rotación suave, marcos estilo polaroid con sombras suaves, stickers decorativos y leyendas editables (con placeholders de fotos de alta calidad estéticas listas para ser reemplazadas).
      - Soporte swipe táctil, botones de navegación elegantes e indicadores.
   5. **Momentos Divertidos**:
      - Sección alegre y ligera con stickers interactivos: risas compartidas, ocurrencias, conversaciones largas.
   6. **Cosas que Valoro de Ti**:
      - Tarjetas interactivas con detalles especiales (su forma de reír, su autenticidad, su energía, etc.).
   7. **Septiembre**:
      - "Quizás septiembre solo sea un mes más... pero me pareció una buena excusa para recordarte algo especial."
   8. **Mensaje Más Profundo & Carta Personal**:
      - Atmósfera íntima, texto pausado y reflexivo sobre lo valioso de coincidir en la vida.
   9. **Deseos para Ella**:
      - Buenos deseos flotantes e interactivos.
   10. **Cierre & Firma**:
       - Cierre delicado, suave y emotivo con la firma: "Con cariño, Brahian".
       - Pequeño botón interactivo final para lanzar una lluvia suave de flores o dejar un mensaje de agradecimiento.

5. **Música y Detalles Interactivos**:
   - Botón flotante sutil de música ambiental (con opción de reproducir / pausar una melodía suave de piano/lo-fi acústico libre de derechos, o sintetizador ambiental web audio, con controles accesibles).
   - Efecto de corazones / flores flotantes al tocar cualquier parte de la pantalla o ciertas áreas interactivas.

6. **Centralización de Contenido para Fácil Edición**:
   - Crear un archivo `/src/data/letterContent.ts` con todos los textos, títulos, anécdotas, fotos, fechas, canciones y firma en un solo objeto bien tipado y comentado, para que Brahian pueda modificar todo el contenido en un solo lugar sin tocar el código visual.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e548441f-688e-46c0-a85d-41251702ac01).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
