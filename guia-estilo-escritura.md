# Guía de Estilo de Escritura - ospinajuanp

Este documento es la referencia para replicar fielmente el estilo de escritura de los posts de este blog. Cada sección captura una característica del tono, estructura y voz del autor.

---

## 1. Voz y Perspectiva

### Primera Persona
El autor escribe en primera persona de forma natural y constante. Usa "yo", "mi", "me" sin vacilación.

**Ejemplo:**
> Durante mucho tiempo pensé que lo único que importaba era el proyecto.

**Evitar:** Ters third person generalizations like "one should" or "you must"

### Tono Reflexivo y Personal
No escribe como instructor o experto. Escribe como alguien que está pensando en voz alta, compartiendo su proceso.

**Ejemplo:**
> Hoy entiendo algo distinto: la marca personal también construye valor.

**Característica:** Mezcla de confianza (confidence) con honestidad sobre lo que está aprendiendo.

---

## 2. Estructura del Frontmatter

```yaml
---
title: "Título del Post con Descripción Clara"
date: "2026-MM-DD"
description: "Una frase que captura el tema central y el valor del post."
image: "/carpeta/nombre-imagen.png"
protected: false
hidden: false
pilar: construccion
tags: [zentral, ocr, ia]
series: Zentral
---
```

### Reglas del Frontmatter:
- **title:** No lleva emoji. Describe el tema en max 10 palabras
- **date:** Formato ISO (YYYY-MM-DD)
- **description:** Termina con punto. Explica qué encontrará el lector
- **image:** Ruta relativa en `/public/` o URL externa
- **protected/hidden:** `false` para posts públicos
- **pilar:** Uno de los 8 valores de `lib/config.ts` → `PILLARS`:
  `construccion`, `oficios`, `carrera`, `salud`, `lecturas`, `fe`, `relaciones`, `rutinas`.
  Es lo que agrupa los posts en los chips de filtro de la home.
- **tags:** Palabras clave libres (max 3). Se pueden escribir como array o como texto separado por comas.
- **series:** Solo si el post es parte de una serie. El badge muestra "Parte N de M" automáticamente.

> Los posts con `protected: true` **nunca** se listan en la home, el RSS ni el sitemap.
> Solo son accesibles por URL directa con la contraseña. Su contenido se pide al servidor
> en vivo después de validar la clave, nunca viaja en el HTML inicial.

---

## 3. Estructura del Contenido

### Patrón de Apertura
Cada post empieza con un título H1 con emoji, seguido de 1-3 párrafos que:
1. Plantean un problema o situación común
2. O hacen una pregunta retórica
3. O presentan una reflexión personal

**Estructura típica:**
```markdown
# 🚀 Título con Emoji

Párrafo introductorio que contextualiza.
Presenta el problema o la idea central.

---

# 💡 Primera Sección

Contenido con explicaciones y ejemplos.
```

### Separadores de Sección
Siempre usar `---` (tres guiones) para separar secciones principales.

### Encabezados de Sección
- H1 (`#`) con emoji: Solo el título principal del post
- H2 (`##`) con emoji: Secciones principales
- H3 (`###`) con o sin emoji: Subsecciones
- H4 (`####`) solo si es necesario: Divisiones dentro de H3

### Patrón de Cierre
Los posts terminan con una de estas opciones:
1. **Conclusión con reflexión:** Resumen + mensaje personal
2. **Glosario de términos:** Para posts técnicos
3. **Resumen tipo "En pocas palabras":** Frase corta final

**Ejemplo de cierre con reflexión:**
> En resumen: No hagas lo que crees que los demás esperan de ti. Haz lo que tú quieres ver terminado, lo que tú quieres usar y lo que a ti te hace falta.

**Ejemplo de cierre con glosario:**
> # 📖 Glosario de Términos
> * **Término:** Definición clara y simple

---

## 4. Formato de Listas

### Listas con Viñetas
Usar asterisco `*` (no guiones ni números) para listas de elementos sueltos.

**Formato:**
```markdown
* **Primer elemento en negrita:** Explicación del elemento
* **Segundo elemento:** Otra explicación
```

### Listas de Ejemplos
Cuando hay ejemplos, usar este formato después de un encabezado `### Ejemplos prácticos:` o `### Ejemplos:`:

```markdown
### Ejemplos prácticos:
* **🎵 En Música:** Descripción del ejemplo musical
* **💻 En Software:** Descripción del ejemplo técnico
```

---

## 5. Uso de Negritas y Énfasis

### Negritas para Términos Clave
Poner en negritas conceptos importantes, definiciones, o ideas que quieres que el lector recuerde.

```markdown
La identidad no es algo que se piensa, es algo que se descubre **haciendo el trabajo**.
```

### Negritas para Títulos de Elementos en Listas
Cuando un elemento de lista tiene un título o concepto, ese título va en negritas.

```markdown
* 🥇 **Te diferencia** en un mercado donde hay miles de personas técnicamente capaces.
```

---

## 6. Citas y Blockquotes

### Citas con Mensaje Principal
Las citas en blockquote se usan para cerrar secciones con una idea poderosa o reflexión final.

```markdown
> **En resumen:** Mensaje conciso que encapsula todo.
```

### Citas como Analogías
A veces se usan citas de otras personas para reforzar un punto:

```markdown
> "La simplicidad es la máxima sofisticación." - Leonardo da Vinci
```

---

## 7. Analogías y Ejemplos

### Analogías como Puente
El autor usa analogías de la vida cotidiana para explicar conceptos técnicos o abstractos.

**Ejemplo (de Adn-sistema-Requerimientos.md):**
> Imagina que quieres construir una casa. Si le dices al arquitecto "quiero una casa bonita", lo más probable es que termines con algo que no tepite.

### Ejemplos en Contexto
Cada concepto principal incluye al menos un ejemplo práctico. Los ejemplos siguen este patrón:

```markdown
* **Ejemplo:** Descripción del ejemplo concreto
```

### Aplicaciones Prácticas
Después de explicar un concepto, siempre incluir una sección de aplicación:

```markdown
# 💻 Aplicación en el desarrollo de software

* **En Software:** Qué significa en la práctica
* **En el Estudio:** Cómo aplicar al aprendizaje
```

---

## 8. emojis como Marcadores Visuales

### En Títulos de Sección
Los emojis en H2 (`##`) funcionan como marcadores visuales rápidos.

**emojis comunes usados:**
- 🚀 - Inicio, momentum, acción
- 💡 - Ideas, iluminación, conceptos
- 🧬 - Genealogía, conexión, estructura
- 📁 - Archivos, recursos, herramientas
- 📚 - Estudio, aprendizaje, libros
- ✍️ - Creación, escritura
- 🛠️ - Herramientas, construcción
- 🏗️ - Estructura, arquitectura
- ⚙️ - Funcionalidad, mecánica
- 🛡️ - Seguridad, protección
- 🏎️ - Velocidad, rendimiento
- 📱 - Interfaces, usabilidad
- 📈 - Crecimiento, escalabilidad
- ♟️ - Estrategia
- 🧵 - Conexión, hilo conductor
- 📌 - Punto importante, referencia
- ✅ - Conclusión, verificación
- 🎵 - Música
- 💻 - Tecnología, software
- 📖 - Referencia, glosario

---

## 9. Extensión y Ritmo

### Longitud por tipo de post
- **Post expositivo** (reseñas, conceptos, tutoriales): 400-800 palabras
- **Post de proyecto** (construcción en público, decisiones técnicas): 900-1.600 palabras
- **Relato de caso** (historias en 3ª persona): 1.200-2.400 palabras
- Secciones: 2-5 párrafos por sección
- Párrafos: Cortos a medios (3-6 oraciones)

La extensión sigue a la historia, no al revés. Si la historia pide 2.400 palabras, se escribe
2.400. Si pide 500, se escribe 500. Lo que no se negocia es el ritmo.

### Velocidad de Lectura
El autor escribe para lectura cómoda, no para density máxima. Cada párrafo debería poder leerse en 15-30 segundos.

### Regla de una idea por post
Un post = una idea. Si aparecen dos ideas que no se soportan entre sí, el post es la peor
de las dos y la otra merece su propio post.

---

## 10. Lo Que NO Hacer

### Evitar:
- Oraciones pasivas excesivas
- Jerga técnica sin explicación
- Listas numeradas para todo (usar viñetas)
- Escribir sin párrafos de transición
- Tono de instructor o superior
- Conclusiones sin reflexión personal
- Frontmatter con emojis en el título
- Títulos de sección sin emoji (en H2)
- Fechas inventadas o ajustadas para que un post "resulte" más reciente

---

## 11. Modo Relato de Caso (3ª persona)

Para temas personales (salud, fe, dinero, relaciones, rutinas) el autor cuenta en **tercera
persona**. Esto no es un capricho: le permite hablar de lo suyo sin ponerlo en primera persona,
y le permite escribir sobre lo que le pasa a la gente en general.

### Reglas del modo relato

1. **Protagonista sin nombre.** "El que programaba catorce horas", "una.dev que...", "alguien".
   Puede ser un tú mismo ficcionado. Nunca tu nombre real.
2. **Cuerpo en 3ª persona.** Ni "yo" ni "mi" en todo el post. La voz del autor solo aparece
   en el cierre, si aparece.
3. **Escena concreta antes que tesis.** Lugar, hora, acción. Nada de "la vida moderna exige...".
4. **3-5 escenas cortas**, separadas con `---`. Cada escena avanza la historia.
5. **`Lo que aprendí:` es obligatorio** (ver sección 3). Es el bloque que la gente cita,
   guarda y comparte. Sin él, el post es solo una anécdota.
6. **Cierre con pregunta directa al lector.** Esto genera comentarios, y los comentarios
   son la única señal real de enganche que existe.
7. **Una idea por post** (ver sección 9).

### Anatomía de un relato de caso

```markdown
---
title: "El que renunció y se arrepintió en once días"
date: "2026-XX-XX"
description: "Una persona trabajando, un proceso de salida mal hecho, y los once días que costaron entenderlo."
image: "/post/relato.jpg"
protected: false
hidden: false
pilar: carrera
tags: [empleo, decisiones]
---

# 🎯 La llamada que empezó con un "sí"

[Escena 1: el momento. Concrete. Alguien con nombre genérico. Qué dijo, qué pasó.]

> **Analogía:** ...

---

# 💼 Lo que pasó después

[Escena 2: la consecuencia. El detalle que hace creíble la historia.]

---

# 🪞 Lo que aprendí

* **Lo que aprendí:** ...
* **Lo que aprendí:** ...

---

# ✅ Cierre

[Reflexión breve. Y una pregunta al lector que no se pueda responder con "sí" o "no".]
```

### Título del relato
- Nombre genérico del protagonista + gancho: *"El que programaba 14 horas y no era feliz"*
- NUNCA un titular abstracto: *"Reflexiones sobre el burnout"* no funciona.
- Especificidad > generalidad: números, nombres propios, lugares concretos.

---

## 12. Template Para Nuevos Posts

```markdown
---
title: "Título del Post"
date: "2026-MM-DD"
description: "Breve descripción del contenido y qué encontrará el lector."
image: "/carpeta/imagen.png"
protected: false
hidden: false
---

# 🚀 Título con Emoji

Párrafo introductorio. Contextualiza el tema.
Presenta el problema o la reflexión inicial.

---

# 💡 Primera Sección Principal

Contenido explicativo. Define conceptos.
Párrafo con ejemplos o analogías.

### Ejemplos prácticos:
* **🇪⃣ Ejemplo 1:** Descripción
* **🇪② Ejemplo 2:** Descripción

---

# 💻 Aplicación [según el tema]

* **En Software/Práctica:** Cómo aplicar lo discutido
* **En Aprendizaje:** Cómo usar esto para aprender mejor

---

# ✍️ Segunda Sección Principal

Más contenido siguiendo el mismo patrón.

---

# ✅ Conclusión

Reflexión final. Resumen con mensaje personal.

---

# 📖 Glosario (opcional, para posts técnicos)

* **Término:** Definición clara y accesible
```

---

## 13. Checklist Antes de Publicar

### Todos los posts
- [ ] Frontmatter completo con todos los campos
- [ ] `pilar` asignado (uno de los 8 de `PILLARS`)
- [ ] `tags` con máximo 3 palabras clave
- [ ] `series` si es parte de una serie ya iniciada
- [ ] Título con emoji apropiado
- [ ] Al menos una analogía o ejemplo práctico
- [ ] Secciones separadas con `---`
- [ ] Al menos una sección de aplicación práctica
- [ ] Cierre con reflexión personal o glosario
- [ ] Revisado en voz alta (las pausas marcan el ritmo)
- [ ] Imagen asignada o verificar que existe la ruta
- [ ] `pnpm test:run` y `pnpm build` en verde

### Relatos de caso (además)
- [ ] El protagonista no tiene nombre real
- [ ] El cuerpo está escrito en 3ª persona (ni "yo" ni "mi")
- [ ] Arranca con una escena concreta, no con una tesis
- [ ] Tiene el bloque `Lo que aprendí:` con 3-5 viñetas
- [ ] Cierra con una pregunta directa al lector
- [ ] La idea central es una sola

### Antes de publicar (si es el primero de una serie)
- [ ] El `series` coincide exactamente con los posts anteriores de esa serie

---

## 14. Los 5 Ganchos de Retención

Mecánicos, no estilísticos. Si un post falla en aunque sea uno, se reescribe el post.

1. **Primera línea imbloqueable.** La primera frase tiene que detener el scroll. Si se puede
   entender de qué va el post sin leerla, es un título, no un gancho.
2. **El bloque `Lo que aprendí:`** es el botín. Es lo que se cita, lo que se guarda en un
   screenshot, lo que se comparte. Sin ese bloque, el post pierde su razón de existir.
3. **Pregunta final al lector.** Genera comentarios. Los comentarios son la única señal de
   engagement real que existe en un blog personal.
4. **Una sola idea.** Dos ideas en un post = dos posts, y los dos pierden.
5. **Título específico.** Números, nombres propios, lugares. "Seis meses sin sueldo" vende
   infinitamente más que "Reflexiones sobre el trabajo".

---

## 15. Ritmo de Publicación

El objetivo declarado es **un post por semana**. Para lograrlo sin quemarse:

- **Banco de posts.** Escribir 4-6 posts de una vez (2-3 h cada uno) en una sesión de fin de
  semana. Publicar uno por semana sin escribir nada nuevo.
- **Regla dura.** No se publica un post sin gancho. Si esa semana no hay historia, esa semana
  no hay post. Saltarse una semana cuesta 10x menos que publicar un post flojo.
- **Mezcla semanal.** 1 post de construcción/técnica + 1 relato. El técnico da credibilidad y
  tráfico de búsqueda; el relato da audiencia general y retención.
- **Repetir es válido.** Una serie de 3 posts seguidos construye hábito. La gente vuelve por
  la parte 2.

---

*Última actualización: Noviembre 2026*
