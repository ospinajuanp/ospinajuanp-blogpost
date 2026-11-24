# Plan Editorial — ospinajuanp

Sistema de publicación del blog: 8 pilares, calendario de 12 semanas y backlog de ideas.

**Objetivo declarado:** un post por semana.
**Realidad medida (a nov 2026):** 11 posts públicos en 9,2 meses = 1,2 posts/mes.
**Gap:** 4,3x. Por eso el ritmo se sostiene con banco de posts, no con inspiration semanal.

---

## Los 8 Pilares

El `pilar` va en el frontmatter de cada post (`lib/config.ts` → `PILLARS`) y define el chip
de filtro en la home. Es la única clasificación que el lector ve.

| id | Pilar | Emoji | Qué entra aquí |
|----|-------|-------|----------------|
| `construccion` | Construcción en público | 🏗️ | Proyectos, decisiones técnicas, construir en público |
| `oficios` | Ingeniería y oficios | 🛠️ | Conceptos técnicos, requisitos, stack, formación |
| `carrera` | Trabajo, dinero y carrera | 💼 | Procesos de selección, negociación, independencia del empleo |
| `salud` | Salud y cuerpo | 🫀 | Energía, sueño, tratamientos, deporte, burnout |
| `lecturas` | Lecturas y pensamiento | 📚 | Reseñas, síntesis, notas de lectura |
| `fe` | Fe y espiritualidad | 🕊️ | Creencia, duda, sentido, práctica |
| `relaciones` | Relaciones y amistad | 🤝 | Amistad, pareja, redes de apoyo, soledad |
| `rutinas` | Rutinas y hobbies | 🎧 | Cocina, café, música, limpieza, el mundo físico |

**Regla de mezcla semanal:** 1 post de `construccion`/`oficios` + 1 de los otros seis.
El técnico da credibilidad y tráfico de búsqueda. El relato da audiencia general y retención.

---

## Formato: Relato de Caso (3ª persona)

Para los pilares personales (`carrera`, `salud`, `fe`, `relaciones`, `rutinas`) se usa el
modo relato de caso. Ver sección 11 de `guia-estilo-escritura.md`.

- Protagonista sin nombre, en 3ª persona
- Arranca con una escena concreta
- Bloque `Lo que aprendí:` obligatorio (3-5 viñetas)
- Cierra con una pregunta directa al lector
- 1.200-2.400 palabras

---

## Calendario — 12 semanas

| Sem | Pilar | Título propuesto | Tipo |
|-----|-------|------------------|------|
| 1 | `construccion` | Zentral: seis meses, cero clientes. Los números reales | Post de proyecto |
| 2 | `carrera` | El que renunció y se arrepintió en once días | Relato |
| 3 | `construccion` | Por qué reescribí este blog con Next.js 16 y lo que rompí | Post de proyecto |
| 4 | `salud` | Programar doce horas no es gratis: el cuerpo cobra con intereses | Relato |
| 5 | `lecturas` | Roba como un artista: la reseña completa del libro | Reseña |
| 6 | `carrera` | Seis meses sin sueldo: cómo se vive cuando el ahorro se acaba | Relato |
| 7 | `fe` | Creer y hacer software no son mundos tan distintos | Relato |
| 8 | `construccion` | reset-css: tres años después, ¿sigue valiendo la pena? | Post de proyecto |
| 9 | `relaciones` | Mis amigos no saben exactamente qué hago | Relato |
| 10 | `rutinas` | La cocina como debugger: cocinar cuando el código no coopera | Relato |
| 11 | `oficios` | Por qué el blog también necesita tests | Post técnico |
| 12 | `construccion` | Doce semanas publicando: qué funcionó, qué no y qué sigue | Cierre de ciclo |

### Series activas

| Serie | Partes | Estado |
|-------|--------|--------|
| Zentral | 2 | Activa — Parte 1 y 2 publicadas (jul 2026) |
| Roba como un artista | 4 | Completa — reseña general pendiente (semana 5) |

---

## Backlog por pilar

`★` = necesita una historia real propia. Sin esa historia, el tema no se escribe.

### `construccion` — Construcción en público

- ★ Zentral: seis meses, cero clientes. Los números de un producto que no vendes
- Por qué reescribí este blog con Next.js 16 y lo que rompí
- reset-css: tres años después, ¿sigue valiendo la pena?
- Por qué el blog también necesita tests
- El bug del catch vacío que casi me deja ciego al problema *(ya publicado)*
- Cómo distribuyo un .exe de 45 MB sin que el usuario instale nada
- El día que dejé de medir mi proyecto en commits

### `oficios` — Ingeniería y oficios

- El stack de este blog en 2026: Next.js 16, React 19 y markdown sin MDX
- Por qué borré mi propio sanitizador y dejé DOMPurify
- Tests en un blog estático: los 3 que sí valen la pena
- Requisitos funcionales y no funcionales *(ya publicado)*
- Por qué no uso un CMS para un blog personal
- Lo que aprendí en el SENA que no está en ninguna tutorial

### `carrera` — Trabajo, dinero y carrera

- ★ El que renunció y se arrepintió en once días
- ★ Seis meses sin sueldo: cómo se vive cuando el ahorro se acaba
- ★ Doce entrevistas, tres ofertas, cero contratos: lo que aprendí
- La oferta que parecía ascenso y era dependencia
- El error de no preguntar por el proceso de pago hasta el mes cuatro
- De empleado a independiente: el salto que todavía no doy
- ★ Años de trabajo y un no aparece *(ya publicado)*

### `salud` — Salud y cuerpo

- ★ Programar doce horas no es gratis: el cuerpo cobra con intereses
- ★ Caminar 40 minutos todos los días: el hábito más barato que encontré
- Dejé de hacer los domingos y el cansancio no se fue
- La dieta del programador: cuatro comidas y un plan que nunca seguí
- ★ Dormir cinco horas: la espirometría de un developer

### `lecturas` — Lecturas y pensamiento

- Roba como un artista: la reseña completa del libro
- Cómo tomo notas de un libro técnico
- Mi swipe file: 20 frases que sigo usando
- Por qué dejé de ver tutoriales y empecé a leer documentación
- Los próximos libros de mi lista

### `fe` — Fe y espiritualidad

- Creer y hacer software no son mundos tan distintos
- ★ El programador que rezaba antes del deploy
- La duda que no me quitó, pero cambió cómo escribo
- El timing: por qué el tiempo de Dios y el tiempo del código no se parecen
- ★ Lo que dejé de pedirle a Dios

### `relaciones` — Relaciones y amistad

- ★ Mis amigos no saben exactamente qué hago todo el día
- ★ A los treinta se deja de querer igual: eso también se aprende
- La amistad que sobrevive cuando dejas de ser el que resuelve
- La llamada de teléfono que hice y no hice
- ★ Mi madre me pregunta cuándo voy a conseguir un trabajo de verdad

### `rutinas` — Rutinas y hobbies

- ★ La cocina como debugger: cocinar cuando el código no coopera
- ★ El café de las seis, todos los días, cuatro años
- El hobby que no produce nada y por eso me salva
- ★ Volví a tocar el instrumento a los treinta

---

## Sistema de producción

### Banco de posts
Escribir 4-6 posts de una vez en una sesión de fin de semana. Publicar 1/semana sin escribir
nada nuevo. Con 5 en banco se cubren 5 semanas.

### Regla dura
**No se publica un post sin gancho.** Si esa semana no hay historia, esa semana no hay post.
Saltarse una semana cuesta 10x menos que publicar un post flojo.

### Checklist por post
Ver sección 13 de `guia-estilo-escritura.md`.

---

## Distribución

- **Blog en español** como fuente única.
- **LinkedIn** solo para los posts que ya funcionan: relatos con gancho y posts de proyecto
  con un número o un dato. Un post = un post, no lo reescribas: recorta el gancho y enlaza.
- **RSS** en `/feed.xml` — link en el footer y en el `<head>`. Es la suscripción que no
  depende de ningún algoritmo.

---

*Última actualización: Noviembre 2026*
