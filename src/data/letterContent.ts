import coffeePhoto from "@/assets/memory-coffee.jpg";
import flowersPhoto from "@/assets/memory-flowers.jpg";
import sunsetPhoto from "@/assets/memory-sunset.jpg";
import laughterPhoto from "@/assets/memory-laughter.jpg";

export type Memory = { date: string; title: string; text: string; symbol: string };
export type Photo = { src: string; alt: string; caption: string; note: string };
export type Value = { title: string; text: string; symbol: string };

/**
 * Todo el contenido editable de la carta vive aquí.
 * Puedes cambiar textos, recuerdos, fechas, fotos y firma sin tocar la experiencia visual.
 */
export const letterContent = {
  recipient: "Daniela Abella",
  sender: "Brahian",
  signature: "Con cariño, Brahian",
  cover: {
    eyebrow: "Una pequeña carta para ti",
    title: "Hay algo que quería decirte…",
    subtitle: "Pero esta vez quería hacerlo de una manera un poquito diferente.",
    cta: "Entrar",
  },
  opening: {
    label: "Para Daniela Abella",
    title: "Una persona que hace que los días sean un poquito más bonitos.",
    body: "No hace falta una fecha extraordinaria para recordarle a alguien lo especial que es. A veces basta con detenerse un momento, mirar todo lo bonito que deja a su paso y decirlo con calma.",
  },
  memoriesIntro:
    "Y luego están todos esos pequeños momentos que terminan significando más de lo que uno esperaba…",
  memories: [
    { date: "Esas tardes", title: "Conversaciones sin prisa", text: "Las que empiezan con cualquier tema y, sin darnos cuenta, terminan haciéndonos olvidar la hora.", symbol: "✦" },
    { date: "Entre risas", title: "Lo espontáneo", text: "Esos comentarios inesperados que convierten un momento normal en uno que vale la pena guardar.", symbol: "♡" },
    { date: "Siempre", title: "Tu forma de estar", text: "Esa manera tan tuya de hacer que todo se sienta más ligero, auténtico y cercano.", symbol: "❀" },
  ] satisfies Memory[],
  album: {
    kicker: "Pequeño archivo de días bonitos",
    title: "Momentos para guardar",
    description: "Estas imágenes son temporales: puedes reemplazarlas por sus fotografías favoritas desde este mismo archivo.",
    photos: [
      { src: coffeePhoto, alt: "Dos tazas junto a flores y un cuaderno", caption: "Conversaciones que se quedan", note: "Foto 01 · Aquí va uno de sus recuerdos" },
      { src: flowersPhoto, alt: "Flores sobre lino junto a un sobre", caption: "Los detalles sencillos", note: "Foto 02 · Un día que quieras recordar" },
      { src: sunsetPhoto, alt: "Atardecer visto desde una mesa", caption: "Coincidir en el momento justo", note: "Foto 03 · Ese atardecer inolvidable" },
      { src: laughterPhoto, alt: "Cámara instantánea y accesorios divertidos", caption: "La risa también es memoria", note: "Foto 04 · Su momento más divertido" },
    ] satisfies Photo[],
  },
  funMoments: {
    title: "La parte que siempre termina en risa",
    items: ["Las ocurrencias que nadie más entendería", "Los audios que merecen un premio", "Las conversaciones que duran mucho más de lo planeado", "Esa facilidad para hacer especial hasta lo cotidiano"],
  },
  values: {
    kicker: "Cosas que valoro de ti",
    title: "Tu manera de ser deja huella",
    items: [
      { title: "Tu risa", text: "Porque tiene esa capacidad de cambiar por completo el ánimo de un momento.", symbol: "01" },
      { title: "Tu autenticidad", text: "La forma honesta y bonita con la que eres tú, sin necesidad de aparentar nada.", symbol: "02" },
      { title: "Tu energía", text: "Esa mezcla de calma y alegría que hace tan fácil sentirse a gusto cerca de ti.", symbol: "03" },
      { title: "Tu corazón", text: "La sensibilidad que se nota en tus gestos, incluso en los más pequeños.", symbol: "04" },
    ] satisfies Value[],
  },
  september: {
    month: "09",
    title: "Septiembre",
    text: "Quizás septiembre solo sea un mes más… pero me pareció una buena excusa para recordarte algo especial.",
  },
  letter: {
    salutation: "Daniela,",
    paragraphs: [
      "Hay personas que llegan sin hacer ruido y, poco a poco, se vuelven parte de esos detalles que hacen la vida más amable. Tú tienes esa forma tan natural de aportar luz, de hacer reír y de convertir una conversación cualquiera en algo que uno termina recordando.",
      "Me alegra mucho haber coincidido contigo. Admiro tu manera de ser, tu autenticidad y esa energía tan bonita que compartes con quienes te rodean. No escribo esto para ponerle un nombre distinto a lo que existe, sino para cuidar algo que considero valioso: tu presencia y la confianza de poder compartir momentos contigo.",
      "Ojalá nunca olvides todo lo bueno que llevas contigo. Mereces días tranquilos, personas que te cuiden bien, proyectos que te emocionen y muchísimas razones para seguir sonriendo de esa forma tan tuya.",
    ],
  },
  wishes: ["Que encuentres calma incluso en los días difíciles", "Que nunca te falten motivos para reír", "Que cada sueño encuentre su momento", "Que recibas el mismo cariño que das", "Que la vida te sorprenda bonito"],
  closing: {
    preface: "Gracias por ser tú, por cada conversación y por todos esos pequeños momentos que, sin avisar, se volvieron importantes.",
    title: "Que la vida siempre te encuentre sonriendo.",
    button: "Una última sorpresa",
    response: "Gracias por abrir esta carta ♡",
  },
  music: { title: "Septiembre, despacio", description: "Piano ambiental · generado en tu dispositivo" },
} as const;

export type LetterContent = typeof letterContent;
