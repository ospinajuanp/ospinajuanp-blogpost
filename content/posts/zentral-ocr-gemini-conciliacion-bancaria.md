---
title: "Zentral: leer un comprobante de transferencia con dos cerebros y un catch vacío"
date: "2026-07-28"
description: "Cuando subes una foto de un comprobante en Zentral, no la mira un solo servicio: la pasan dos cerebros diferentes. Aquí cuento por qué, qué pasa cuando uno falla, y el bug silencioso que casi me deja ciego al problema."
image: "/post/central-ocr.jpg"
protected: false
hidden: false
---

# 🧾 Leer un comprobante con dos cerebros

Hay dos clases de comprobantes de transferencia: los que se leen perfectos y los que parecen hechos a propósito para que nadie los lea. Una foto movida. Un screenshot con el zoom metido hasta el último dígito. Un comprobante guardado tres veces en WhatsApp hasta quedar como pintura abstracta.

Cuando empecé a construir el módulo de conciliación bancaria en Zentral, hice lo que haría cualquier developer con prisa: conecté un servicio que "lee texto de imágenes", lo probé con un caso feliz, y seguí adelante. Una semana después, un comprobante real me rompió todo el flujo.

Ese día entendí que un servicio de lectura de imágenes no es suficiente. Y que diseñar un sistema que tiene que leer cosas del mundo real exige **dos cerebros**, no uno.

---

# 👁️ El extractor junior (rápido, barato, a veces inútil)

Mi primera capa se llama **OCR.space**, y la elegí por una razón muy simple: su plan gratuito procesa la imagen en **treinta segundos** o menos y devuelve texto plano. Cuando funciona, es rápido. Cuando no funciona, también es rápido: falla en segundos.

Imagina a un practicante de archivo al que le pides "transcribe lo que ves en esta foto". Es bueno, joven, sabe de texto, no te cobra extra. Pero cuando le pasas un comprobante con la imagen rotada o con la letra chiquita hasta el infinito, te devuelve *algo*, no lo que esperabas. A veces te dice "monto: 1,730,000.00". A veces te dice "monto: 1730000 00". A veces te dice "monto: 17.30.000.00" como si fuera un formato de novela.

Eso me obligó a escribir pequeños **parsers de texto** que viven después del OCR: uno para montos, uno para referencias, uno para fechas. Cada parser busca etiquetas en español ("valor", "total", "referencia", "nro ref"). Y cada parser tiene reglas para distinguir si el punto es separador de miles o decimal, según el contexto colombiano.

> **Analogía:** es como tener un pasante que transcribe rápido, pero necesita que alguien le pase un corrector después.

### Lo que aprendí:
* "Servicio gratuito" no significa "servicio listo". A veces significa "servicio que necesitas terminar en casa".
* Cuando el OCR es bueno, el sistema es mágico. Cuando es regular, necesitas parsers encima, y esos parsers **son** parte del producto.
* El plan gratuito tiene una trampa: lo que no pagas en dinero lo pagas en regulación fina del output.

---

# 🧠 El analista senior (que mira la imagen completa)

Mi segunda capa se llama **Gemini 2.0 Flash**, y es la versión inversa: en lugar de devolverme texto y obligarme a interpretarlo, le mando la imagen completa y le pregunto, en español, qué ve. La instrucción es directa:

> *"Extrae de esta imagen de comprobante los datos de monto, referencia y fecha. Responde solo con JSON."*

Esa instrucción parece un capricho de producto, pero es una decisión técnica con consecuencias. El modelo de IA ya vio millones de comprobantes, facturas, recibos. Sabe qué buscar. Cuando OCR.space me devolvió `"monto: 17.30.000.00"`, Gemini me devolvió `{"monto": 1730000, "referencia": "...", "fecha": "..."}`. Limpio. Sin parsers. Sin reglas regionales.

> **Analogía:** es el compañero senior al que recurres cuando el practicante se atascó. Pregunta "¿qué ves?", escucha, te da una respuesta estructurada. Cuesta un poco más (en tiempo, en cómputo, en una cuota gratuita que se acaba).

### Lo que aprendí:
* Una IA que ya vio millones de imágenes a veces entiende mejor que el regex que escribiste a las 2 a.m.
* El truco de pedir "solo JSON" no es capricho: elimina ambigüedad y obliga al modelo a enfocarse en lo que importa.
* La cuota gratuita es real, pero **se acaba**. Si tu sistema depende 100% del tier gratis, te toca rezar o pagar.

---

# 🪤 El catch vacío que casi me deja ciego

Mi sistema de dos cerebros vive en un archivo pequeño, unas 20 líneas. Hace lo siguiente:

> 1. Llama a OCR.space.
> 2. Si funciona, devuelve el resultado.
> 3. Si no funciona, llama a Gemini.
> 4. Si Gemini tampoco funciona, devuelve un error genérico.

Hasta aquí, **lógico**. El problema está en el detalle.

El "si no funciona" lo escribí así:

```ts
try {
  const ocrResult = await extractWithOcr(image, mime);
  if (ocrResult.success) return ocrResult;
} catch {
  // silencio
}
```

Ese `catch {}` es lo que en mi proyecto está documentado como **bug B-M4**: el catch se traga cualquier error, sea de cuota, sea de timeout, sea de conectividad, sea de API key inválida. El sistema siempre cae a Gemini, sin distinguir.

¿Por qué importa? Porque si mi OCR.space está fallando por una razón legítima y efímera (servidor del proveedor lento, mantenimiento), mi sistema sigue intentando Gemini para **cada comprobante**. **Cada fallo barato de OCR dispara una llamada de IA cara.** En términos prácticos: mi cuota gratuita de Gemini se acaba tres veces más rápido de lo que debería. Y no tengo manera de saber que está pasando, porque el catch silencia la señal.

> **Analogía:** imagina un guardia que, cuando se le rompe una cámara de seguridad, no reporta nada a su jefe: simplemente llama a la policía para todo. La policía termina agotada, los reportes no existen, y cuando de verdad pasa algo grave, nadie tiene contexto.

### Lo que aprendí:
* Un catch vacío no es elegante. Es un punto ciego. Cada `catch {}` debería al menos **registrar** qué se tragó.
* "Caer al fallback" siempre es tentador. Pero si cae **a todo**, terminas canjeando bugs baratos por caros, y sin telemetría.
* La elegancia técnica sin observabilidad es una ilusión. Tu código se ve limpio; tu sistema se está rompiendo en silencio.

---

# ✅ Diseñar para fallar, no para nunca fallar

Esto es lo que este módulo me enseñó sobre construir sistemas que tocan el mundo real: **no diseñes para la perfección, diseña para la degradación elegante.**

Un sistema perfecto es aquel en el que todo funciona siempre. Un sistema con degradación elegante es aquel en el que **cuando algo falla, sabes exactamente qué falló, hay un backup listo, y el usuario recibe un mensaje honesto** en lugar de un 500 genérico.

OCR.space como primera capa (rápida y barata) más Gemini como respaldo (inteligente y cuota-limitada) cumple esa promesa **en la teoría**. Mi implementación real le falla a esa promesa en un detalle: el catch se traga la señal que necesita el operador para saber por qué se cayó. Ese es el bug que tengo que arreglar. Y por eso está en mi lista, esperando el momento correcto de hacerlo (no en una noche de sábado a las 2 a.m., sino cuando tenga la cabeza limpia y un café real).

El próximo post va a bajar aún más al suelo: por qué los datos sensibles de los comprobantes **no** están tan bien cuidados como yo creía, y por qué "no tengo nada que esconder" es la frase más peligrosa que se puede decir sobre datos financieros.

---

# 📖 Glosario mínimo (para los curiosos)

* **OCR (Reconocimiento Óptico de Caracteres):** el nombre técnico de "leer texto dentro de una imagen". OCR.space lo hace con un motor que devuelve texto plano.
* **IA generativa multimodal:** un modelo que recibe imágenes, texto, audio o video y responde. Gemini 2.0 Flash es uno de ellos.
* **`catch {}` vacío:** un bloque de código que atrapa errores pero no los registra. Es la tentación más común cuando quieres que tu código "no se caiga", pero esconde la información que necesitas para arreglarlo después.
* **Degradación elegante (graceful degradation):** diseñar un sistema para que cuando una pieza falla, otra entre al rescate y el usuario reciba un mensaje honesto, en lugar de un error genérico.
* **Tier gratuito:** un plan "gratis hasta cierto límite" de un proveedor. Útil para prototipos; peligroso para producción si nadie mira los contadores.
