---
title: "Zentral: cómo evitar mentirte a ti mismo sobre la seguridad"
date: "2026-07-26"
description: "Construí una plataforma multi-tenant para empresas y descubrí que la frase más peligrosa de un proyecto no es la del hacker, es la que escribes tú mismo en tu propio README."
image: "https://picsum.photos/seed/zentral-edge/1200/600"
protected: false
hidden: false
pilar: construccion
tags: [zentral, edge, multi-tenancy]
series: Zentral
---

# 🏦 Zentral y la mentira más peligrosa de un proyecto

Hay una frase que se repitió en mi cabeza durante meses mientras construía Zentral, mi plataforma para empresas: *"aislamiento criptográfico en el Edge"*. La decía en LinkedIn. La decía a amigos. La escribía en mi propio portafolio. Y era mentira.

No porque el sistema fuera inseguro. Mentira porque describía una **intención** con palabras que sugerían algo más fuerte de lo que el código hacía realmente. El día que entendí la diferencia, dejé de escribir READMEs para vender y empecé a escribirlos para explicar.

Esto no es un tutorial de seguridad. Es la historia de las decisiones reales que tomé para que los datos de una empresa jamás se mezclen con los de otra. Y por qué describirlo honestamente me costó más que aprender la tecnología.

---

# 🪪 El portero del edificio no es la cámara de seguridad

Imagina un edificio de oficinas con muchos negocios adentro. El portero de la entrada no es una cámara de seguridad: no graba, no encripta nada. Su trabajo es revisar la identificación de quien entra y darle una tarjeta que dice "este es tu piso, estos son tus permisos".

Eso es lo que hace la primera capa de Zentral (la pieza que se llama "el Edge" en jerga técnica). Es un portero digital:

* Mira quién llega leyendo una ficha cifrada (lo que técnicamente es un JWT firmado).
* Decide si esa ficha es válida.
* Le pasa al sistema los datos importantes: "este visitante es Juan, su rol es admin, pertenece al piso 14".

Y nada más. No graba nada en video. No pone cámaras dentro del edificio. No revisa los correos del piso 14 para confirmar que Juan trabaja ahí. **El portero abre la puerta; la seguridad real pasa adentro.**

Si yo le quito al portero y dejo que cualquier visitante entre diciendo "soy Juan del piso 14", todavía tiene que convencer al sistema interno de que es cierto. Esa es la diferencia entre un portero y una cámara.

### Lo que aprendí:
* Una capa de seguridad siempre es insuficiente sola. La que sigue es la que importa.
* Describir un portero como "cámara de seguridad" infla el sistema en tu propia cabeza. Y en la cabeza de quien lo lee.
* Si yo mismo no puedo explicar en una frase qué hace cada capa, todavía no lo entiendo.

---

# 🔒 El verdadero aislamiento: cada cajón sabe de quién es

Si el portero no es la cámara, ¿dónde está la verdadera seguridad? Está en cada cajón del archivo.

Cada vez que mi plataforma busca datos en la base de datos, el sistema se pregunta: "¿esto es del piso 14?". Y siempre contesta "sí" antes de mostrar cualquier cosa. Es como si cada cajón del archivo tuviera una etiqueta con el nombre del piso, y nadie pudiera abrirlo si la etiqueta no coincide.

En código eso es una línea repetida cientos de veces:

```ts
const filter = { workspace: 'piso-14', user: 'juan' };
```

Es tedioso. Es aburrido. Es **exactamente** lo que mantiene separados los datos de una empresa y otra. Si un día se me olvida esa etiqueta en una sola consulta, esa consulta devolvería datos del piso equivocado. Esa es la pesadilla de cualquier sistema multi-tenant: una sola línea olvidada.

Para evitarlo, los índices de la base de datos están organizados para que **toda consulta empiece por el piso**. Igual que cuando un bibliotecario no te devuelve un libro por título solamente, primero verifica el piso, después el estante, después el libro.

### Lo que aprendí:
* La seguridad real es aburrida. No la película; la repetición disciplinada.
* Cada sistema multi-tenant vive o muere por una sola frase que alguien olvidó poner.
* La estructura del archivo (los índices, en este caso) es lo que hace que la etiqueta funcione rápido. Sin estructura, la etiqueta es solo una etiqueta rota.

---

# ⚙️ El cajero automático que no se confunde

Esta es la parte que más me gusta porque reemplazó un bug que **sí** estaba pasando.

Antes, las cuotas funcionaban así: cuando una empresa subía un comprobante, el sistema revisaba "¿cuántas verificaciones te quedan este mes?". Miraba el número, hacía la verificación, y al final sumaba uno. Cuatro pasos.

Imagina a cinco personas entrando al mismo cajero automático al mismo tiempo. Cada una mira el cartel de saldo: "te quedan 3 retiros". Cada una saca uno. El cajero no tiene tiempo de actualizar el cartel entre las cinco. Las cinco lo ven igual, las cinco retiran. Resultado: tres retiros extra que nadie autorizó.

Así funcionaba mi sistema. Tres empresas podían subir un comprobante a la vez y el sistema contaba tres cuotas extra que no existían. Cada llamada extra era dinero real (a Google Gemini, en este caso).

La solución fue elegante: en vez de revisar y luego actualizar, **le pedí a la base de datos que hiciera las dos cosas en un solo paso atómico**. Como si el cajero pudiera decir "dame un retiro solo si, en este mismo instante, queda cupo". De los cinco, solo uno pasa. Los otros cuatro reciben "no hay cupo" sin haber gastado un centavo.

No hizo falta agregar candados, ni candados especiales, ni coordinadores distribuidos. Bastó una cláusula de base de datos que mucha gente no conoce.

> **Analogía final:** cinco personas en el cajero. Con el cartel desactualizado, las cinco retiran. Con el cartel *atómico*, solo una pasa. La diferencia no es quién es más listo: es si el cartel se actualiza "antes" o "en el mismo instante".

---

# 🪤 La línea más honesta del proyecto

El bug más raro que tengo documentado en Zentral no fue un crash ni una condición exótica. Fue una línea que dice, en voz alta, exactamente lo que está mal:

```ts
const ENCRYPTION_KEY = process.env.JWT_SECRET || 'default-key-change-me';
```

Esa línea significa tres cosas a la vez:

* **Una.** La misma clave que firma las fichas del portero también cifra los datos sensibles guardados. Eso ya es delicado, pero asumido.
* **Dos.** Si la variable de entorno no está bien configurada, el sistema no explota: usa un texto fijo que dice "default-key-change-me" (literalmente "cámbiame").
* **Tres.** A partir de ese momento, todo lo nuevo se guarda cifrado con una "llave" que cualquier persona que abra el código fuente puede ver.

Lo descubrí tarde. Lo documenté como severidad ALTA. Lo dejé en rojo brillante en mi lista de cosas-pendientes. Y **no lo desplegué a producción**.

Cuando alguien me pregunta "¿cómo manejas los secretos en producción?", la respuesta honesta es: "los manejo separados, pero antes de que eso fuera verdad, este proyecto se quedó en staging por decisión propia". Esa frase no es debilidad. Es la disciplina que diferencia a un developer que entrega software de uno que entrega demos.

### Lo que aprendí:
* Si una línea dice "change-me", ese día llegó. Ese día es hoy.
* Documentar un bug antes de producción no es descuido, es una decisión de ingeniería.
* Compartir tu propia vulnerabilidad técnica te hace mejor desarrollador que aparentar que nunca te equivocas.

---

# ✅ Lo que me llevo de construir multi-tenancy por primera vez

Construir Zentral me quitó la fantasía de que la seguridad se compra diciendo palabras bonitas en el README. Hoy, en mi propio portafolio, mi línea sobre Zentral dice "verifica el JWT en el Edge" y "filtra por workspace en cada consulta". Ese cambio de tono me costó más que aprender el lenguaje de la base de datos.

La lección más útil que me llevo es esta: **la honestidad técnica sobre tu propia arquitectura vale más que el marketing que puedas hacer con ella.** Si tú mismo puedes explicar dónde está la línea de defensa y dónde no, esa claridad se transmite al equipo, a los usuarios, y sobre todo a la versión de ti que va a leer el código en seis meses y no va a entender nada.

Zentral sigue activo. El bug de la clave está documentado y marcado. Y el próximo post va a contar el otro lado: el sistema que lee comprobantes con OCR y luego le pregunta a Gemini qué opina. Por qué la IA necesita un humano en el loop aunque su plan sea "gratis". Y por qué "disponibilidad del 99.9%" no se compra, se diseña.

---

# 📖 Glosario mínimo (para los curiosos)

* **Multi-tenant:** un solo sistema que sirve a muchas empresas ("pisos") independientes. El reto es que los datos de una jamás contaminen a otra.
* **Edge:** la primera capa que ve una petición cuando llega al servidor. Es rápida pero limitada.
* **JWT:** una "ficha" digital firmada criptográficamente. El portero la verifica para decidir si te deja entrar.
* **Cuota atómica:** una regla que se ejecuta en un solo paso indivisible. O se completa, o no se ejecuta.
