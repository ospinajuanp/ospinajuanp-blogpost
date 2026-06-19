---
title: "Mi Primera Librería Open Source - Qué aprendí publicando en npm"
date: "2026-06-19"
description: "Un recorrido por los 3 años de evolución de mi librería reset-css, las lecciones que no trov en ningún tutorial y cómo el open source te obliga a pensar diferente."
image: "/post/mi-primera-libreria-open-source.png"
protected: false
hidden: false
---

# 📦 Mi Primera Librería Open Source

Hace tres años, cuando empecé a programar, nunca me hubiera imaginado que iba a publicar algo en npm. Pensaba que eso era para desarrolladores experimentados, para gente que sabía lo que hacía.

Hoy, mi librería **ospinajuanp-reset-css** tiene más de 10 versiones publicadas, soporte para React, TypeScript, PostCSS, y una arquitectura SCSS que me enorgullece. Y lo más importante: aprendí más de este proyecto que de cualquier curso que haya tomado.

---

# 🚀 Por qué empecé (y por qué tú deberías)

Todo comenzó con una frustración. Cada vez que iniciaba un proyecto nuevo, tenía que copiar y pegar el mismo reset de CSS una y otra vez. Buscaba en Google, encontraba fragmentos aquí y allá, y nunca estaba satisfecho con el resultado.

Un día decidí: voy a hacer mi propio reset, uno que me guste, y lo voy a dejar listo para usar en cualquier proyecto.

La mayoría de las personas se hubieran quedado en ese pensamiento. Yo decidí publicarlo.

No porque fuera el mejor reset del mundo. Sino porque **publicar algo te obliga a tomar decisiones que el código privado nunca te obliga a tomar.**

---

# 💡 Lección 1: El código privado te miente, el código público te enseña

Cuando escribes algo solo para ti, puedes saltarte la documentación. Puedes dejar nombres de variables malos porque "ya sabes lo que significan". Puedes no pensar en cómo otros van a usar tu código.

Cuando publicas en npm, todo eso se cae a pedazos.

### Lo que aprendí:
* **Los nombres importan:** Tuve que renombrar variables para que fueran claras para alguien que nunca había visto mi código.
* **La documentación no es opcional:** Me tomó más tiempo escribir el README que escribir el código real.
* **Los errores se vuelven públicos:** Cada bug que alguien reporte es un espejo que te muestra lo que no estás viendo.

---

# 🏗️ Lección 2: La arquitectura se descubre en la segunda versión

La primera versión de mi reset era un solo archivo CSS. Funcionaba, pero era un desastre mantenerlo. Cada vez que quería añadir un tema nuevo, tenía que copiar y pegar todo el archivo y cambiar colores. Así nacieron los primeros temas: dark, pastel, retro.

Cuando lancé la versión 2.0.0, decidí pasar todo a SCSS. Esto me enseñó algo que ningún curso me había mostrado: **la mejor arquitectura no se planea, se descubre.**

No supe que necesitaba variables SCSS hasta que intenté mantener 6 archivos casi idénticos. No supe que necesitaba un build script hasta que cambié un color en un archivo y olvidé cambiarlo en los demás.

### Lo que aprendí:
* **Los problemas de mantenimiento revelan la arquitectura correcta:** Si estás copiando y pegando, eso es una senal de que necesitas abstracción.
* **Los scripts existen para resolver tus errores humanos:** Un build script que compila SCSS a CSS te ahorra errores que no sabes que vas a cometer.

---

# ⚙️ Lección 3: Cada usuario es una conversación que no sabías que necesitabas

Nunca esperé que alguien usara mi librería. Cuando vi las primeras descargas, no entendía si era un error de npm o si alguien realmente la estaba instalando.

Pero cuando empecé a recibir issues y pull requests, entendí algo profundo: **el software open source no es código que publicas, es una comunidad que se forma alrededor de tu solución.**

Recibí un issue sobre una vulnerabilidad en una dependencia. Eso me llevó a la versión 2.0.2 donde actualicé sass y arreglé el problema. Sin ese reporte, nunca hubiera sabido que tenía deuda técnica.

### Lo que aprendí:
* **Los issues son retroalimentación gratis:** Cada reporte de bug es alguien intentando ayudarte a mejorar.
* **Las contribuciones de otros exponen tu código a perspectivas que no tienes:** Alguien propuso un cambio en el CLI que me pareció obvio una vez que lo vi, pero que jamás hubiera pensado solo.

---

# 🧬 Lección 4: Las versiones no son números, son comunicación

Al principio, incrementaba la versión como quería. 1.0.0, 1.0.1, 1.0.2. Sin ningún criterio.

Cuando llegué a la versión 2.0.0, aprendí sobre **Semantic Versioning**: cambios mayores (2.0.0) son rupturas incompatibles, cambios menores (2.1.0) son funciones nuevas compatibles, y patches (2.1.1) son arreglos.

Pero lo más importante que aprendí sobre versiones es que **el CHANGELOG es más importante que el código.** Si alguien no puede entender qué cambió entre versiones, está navegando a ciegas.

Por eso mantengo un CHANGELOG detallado desde la versión 1.0.4. Porque la próxima versión que alguien instale debe saber exactamente lo que va a encontrar.

### Lo que aprendí:
* **El versionado semántico es un contrato con tus usuarios:** Romper ese contrato destruye la confianza.
* **El CHANGELOG es tu documentación del cambio:** Cada versión debe contar una historia de por qué existió.

---

# 📚 Lección 5: La tecnología evoluciona y tú tienes que evolucionar con ella

La versión 3.0.0 fue la más difícil de lograr. Añadí soporte para React hooks, TypeScript, tree-shaking, y PostCSS. ¿Por qué? Porque simplemente seguir manteniendo CSS no era suficiente.

Vi que la gente quería usar mi reset en proyectos React con Next.js. Necesitaban poder importar solo el tema que usaban, no todos los temas. Necesitaban tipos para TypeScript. Necesitaban integración con sus build pipelines.

Tuve que aprender cosas que no estaban en ningún tutorial: cómo configurar exports en package.json, cómo hacer tree-shaking real con CSS, cómo escribir archivos de tipos para TypeScript.

### Lo que aprendí:
* **El código que no evoluciona muere:** Lo que hoy es útil, mañana puede ser irrelevante.
* **Las necesidades de los usuarios te empujan a aprender cosas que no sabías que necesitabas:** Yo no sabía nada de PostCSS hasta que alguien me preguntó si había soporte para ello.

---

# 🛠️ Lección 6: npm te da reach que no mereces (todavía)

Publicar en npm me dio algo inesperado: **visibilidad.**

Gente que no conocía comenzó a descargar mi librería. Comenzaron a mencionarla en sus proyectos. Apareció en búsquedas de npm. Y lo más loco: alguien me escribió para decirme que la estaba usando en su trabajo.

Eso es extraño cuando tu reset CSS no es nada del otro mundo. Es un archivo con reglas de CSS. Pero el hecho de que alguien lo encontrara útil me mostró algo: **no necesitas ser el mejor para ayudar a alguien.**

Hay personas que están exactamente donde tú estabas hace un año. Y lo que tú sabes hoy les hubiera ahorrado horas de frustración.

### Lo que aprendí:
* **Publicar te hace visible:** No por tu código, sino por el hecho de que existes y estás dispuesto a compartir.
* **El código más simple puede ayudar a alguien:** No subestimes el valor de hacer bien algo básico.

---

# ✅ En resumen

Publicar mi primera librería open source fue una de las mejores decisiones que tomé en mi camino como desarrollador. No por las descargas, ni por los stars, ni por el ego.

Sino porque me enseñó cosas que ningún curso puede enseñar:

* Que el código público te obliga a ser mejor
* Que la arquitectura se descubre manteniendo código
* Que los usuarios te muestran ángulos que no ves
* Que las versiones son comunicación, no números
* Que la tecnología avanza y hay que avanzar con ella
* Que no necesitas ser experto para ayudar a alguien

Si tienes un pedazo de código que usas en más de un proyecto, considera publicarlo. No importa si no es perfecto. El proceso de publicar te va a enseñar más que cualquier tutorial.

Y quién sabe, tal vez alguien más lo encuentre tan útil como tú.

---

# 📖 Glosario de Términos

* **npm (Node Package Manager):** El gestionnaire de paquetes oficial de Node.js. Permite publicar y instalar librerías de código JavaScript.
* **Tree-shaking:** Técnica que usan bundlers como Webpack o Vite para eliminar código que no se usa, reduciendo el tamano final del archivo.
* **SCSS (Sass CSS):** Un préprocesador de CSS que permite usar variables, anidamiento y otras funcionalidades que no existen en CSS puro.
* **Semantic Versioning (SemVer):** Sistema de versionado con formato MAJOR.MINOR.PATCH. Reglas: MAJOR para cambios incompatibles, MINOR para funciones nuevas compatibles, PATCH para arreglos de bugs.
* **Build script:** Script que automatiza la compilación de código fuente. En mi caso, compila SCSS a CSS.
* **TypeScript:** Superset de JavaScript que añade tipos estáticos. Mejora la experiencia de desarrollo y reduce errores.
* **PostCSS:** Herramienta que transforma CSS con plugins de JavaScript. Permite hacer cosas como autoprefijos automáticos.
