# Carta digital interactiva para Daniela

## Objetivo
Crear una experiencia de una sola página, íntima y premium, que se sienta como abrir una carta artesanal y recorrer un álbum de recuerdos hecho por Brahian para Daniela. El tono será cálido, admirativo y respetuoso, sin lenguaje romántico posesivo.

## Experiencia
- Portada inmersiva con pétalos 3D sutiles, destellos que responden al cursor o toque y entrada cinematográfica.
- Apertura de sobre y carta con capas de papel, sello, cinta y detalles editoriales.
- Recorrido narrativo continuo: recuerdos, galería táctil, momentos divertidos, playlist, cualidades, septiembre, carta personal, deseos y firma final.
- Carrusel tipo polaroid con tarjetas superpuestas, swipe, controles accesibles, indicadores y fotos estéticas temporales claramente reemplazables.
- Interacciones delicadas: inclinación 3D, pequeños corazones o flores al tocar, stickers reactivos y lluvia floral final.
- Música ambiental generada con Web Audio, sin depender de archivos externos, con botón accesible de reproducir/pausar.

## Dirección visual
- Papel blanco cálido y crema, rosa empolvado, verde salvia discreto y acentos dorados.
- Títulos en serif editorial, cuerpo sans legible y notas manuscritas.
- Textura de papel creada con CSS, bordes finos, sombras suaves y composición inspirada en correspondencia de alta costura.
- Movimiento contenido y elegante, con una versión reducida para quien tenga activada la preferencia de menos animación.

## Implementación
- Centralizar todos los textos, recuerdos, fotos, fechas, canciones, deseos y firma en `src/data/letterContent.ts`, tipado y comentado.
- Crear componentes separados para el ambiente 3D, portada, carta, línea de recuerdos, álbum, playlist, secciones emocionales y cierre.
- Usar React Three Fiber con una escena ligera, geometría procedural e instancias limitadas; cargarla solo en cliente.
- Usar el carrusel ya disponible para swipe y navegación; mantener controles DOM accesibles sobre el lienzo 3D.
- Añadir metadatos propios de la página y tipografías desde enlaces en el encabezado.
- Definir toda la paleta y acabados mediante tokens semánticos en el sistema visual global.

## Validación
- Comprobar compilación y errores del navegador.
- Revisar visualmente escritorio y móvil, incluyendo apertura, carrusel, música y lluvia floral final.
- Confirmar que no exista desbordamiento horizontal y que el contenido siga siendo usable con movimiento reducido.
