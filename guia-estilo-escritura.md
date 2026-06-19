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

**Característica:** Mezcla de уверенность (confidence) con honestidad sobre lo que está aprendiendo.

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
---
```

### Reglas del Frontmatter:
- **title:** No lleva emoji. Describe el tema en max 10 palabras
- **date:** Formato ISO (YYYY-MM-DD)
- **description:** Termina con punto. Explica qué encontrará el lector
- **image:** Ruta relativa en `/public/` o URL externa
- **protected/hidden:** `false` para posts públicos

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
Cada概念 principal incluye al menos un ejemplo práctico. Los ejemplos siguen este patrón:

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

### Longitud Promedio
- Posts públicos: 400-800 palabras
- Secciones: 2-5 párrafos por sección
- Párrafos: Cortos a medios (3-6 oraciones)

### Velocidad de Lectura
El autor escribe para lectura cómoda, no para density máxima. Cada párrafo debería poder leerse en 15-30 segundos.

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

---

## 11. Template Para Nuevos Posts

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

## 12. Checklist Antes de Publicar

- [ ] Frontmatter completo con todos los campos
- [ ] Título con emoji apropiado
- [ ] Al menos una analogía o ejemplo práctico
- [ ] Secciones separadas con `---`
- [ ] Al menos una sección de aplicación práctica
- [ ] Cierre con reflexión personal o glosario
- [ ] Revisado en voz alta (las pausas marcan el ritmo)
- [ ] Imagen asignada o verificar que existe la ruta

---

*Última actualización: Junio 2026*
