---
title: "De Celular Viejo a Stream Deck: Construyendo Macroboard"
date: "2026-07-05"
description: "Cómo transformé un celular viejo en un panel de control para OBS, y las decisiones de arquitectura que tomé para distribuir un .exe de 45 MB sin que el usuario instale nada."
image: "/post/macroboard.jpg"
protected: false
hidden: false
pilar: construccion
tags: [proyectos, hardware]
---

# 🎮 De Celular Viejo a Stream Deck

Tengo un celular viejo en un cajón. Tengo una tableta que ya nadie usa. Y tengo un Stream Deck de Elgato que cuesta €150+ y que probablemente nunca voy a comprar.

Como buen developer, decidí que era más fácil construir uno que comprarlo. Así nació **Macroboard**: un controlador virtual para OBS Studio que corre en cualquier dispositivo con navegador y se conecta a tu PC por WiFi.

No es la idea más original del mundo. Pero la ejecución me obligó a aprender cosas que no estaban en ningún tutorial.

---

# 🏗️ La decisión del monorepo

Cuando empecé, tenía una sola aplicación: el servidor que hablaba con OBS. En dos días, ya tenía tres cosas más: un panel admin, un cliente móvil y una landing page. Todas compartían los mismos tipos de mensajes WebSocket.

El primer instinto fue hacer "un repo por paquete". Tres repos, tres CI pipelines, tres READMEs. Pero cada vez que cambiaba un tipo, tenía que publicar en npm interno, bumpear versión en los otros dos, y esperar a que se propagara.

**El monorepo me salvó la vida.**

Con `pnpm` workspaces, tengo todo en un solo lugar. Los tipos viven en `packages/shared` y se importan directamente en `server`, `admin` y `client` sin necesidad de publicar nada. Un cambio en el protocolo se refleja en todos los paquetes en el mismo commit.

### Lo que aprendí:
* **El monorepo no es una moda, es una herramienta para compartir tipos:** Si tus servicios hablan el mismo idioma, mantenlos en el mismo lugar.
* **pnpm workspaces es suficiente:** No necesitas Turborepo ni Nx hasta que tengas 20+ paquetes.
* **El `shared/` package es la columna vertebral:** Sin él, cada cambio se convierte en un juego de teléfono descompuesto.

---

# ⚙️ El protocolo WebSocket

La parte interesante no es que use WebSockets. Es que el flujo es **bidireccional**: el celular no solo envía acciones, también recibe el estado real de OBS.

Cuando tocas un botón, el cliente envía un mensaje JSON como:

```typescript
{ type: "TRIGGER", buttonId: "scene-1", action: "OBS_SCENE", payload: "Pantalla Principal" }
```

El servidor lo traduce a una llamada de `obs-websocket-js` y actualiza OBS. Pero OBS también notifica al servidor cuando algo cambia. Si alguien cambia la escena desde el escritorio, el celular se entera en menos de 100ms.

Implementé auto-reconexión con backoff exponencial: si OBS se reinicia (cosa que los streamers hacen cinco veces por sesión), el servidor intenta reconectar hasta cinco veces antes de rendirse.

### Lo que aprendí:
* **WebSocket es HTTP con esteroides:** La misma conexión sirve para enviar y recibir. No necesitas polling ni long-polling.
* **El estado real de OBS es tu única fuente de verdad:** Si el panel del celular muestra "Escena 2" pero OBS está en "Escena 3", perdiste.
* **Auto-reconexión no es opcional:** Los streamers reinician OBS constantemente. Tu servidor tiene que sobrevivirlo.

---

# 🪟 El reto de Windows: SendKeys desde Node

El 80% de los streamers usa Windows. OBS permite mapear atajos de teclado a acciones. Pero Node.js **no puede simular pulsaciones de teclas nativamente** en Windows.

La solución más limpia sería un módulo nativo con N-API. Pero eso significa distribuir binarios `.node` por arquitectura y versión de Node. Una pesadilla de mantenimiento.

Terminé haciendo lo impensable: ejecutar **PowerShell desde Node** para enviar las teclas al sistema operativo.

```typescript
import { exec } from "child_process";

export function sendKey(combo: string) {
  const ps = `Add-Type -AssemblyName System.Windows.Forms; ` +
            `[System.Windows.Forms.SendKeys]::SendWait("${combo}")`;
  exec(`powershell -Command "${ps}"`);
}
```

Funciona. No es elegante. Pero es compatible con cualquier versión de Windows desde 7 sin compilar nada.

### Lo que aprendí:
* **A veces la solución correcta es la que menos te enorgullece:** Funciona, es cross-architecture, y no requiere compilar nada.
* **Los límites del runtime te empujan a sistemas externos:** Node no puede, pero el sistema operativo sí.
* **El `.exe` de 45 MB lo justifica:** El usuario descarga un solo archivo y todo funciona sin instalar Node.

---

# 📦 Distribuir un .exe sin dolor

El último reto: ¿cómo le entregas esto a un usuario no técnico? "Instala Node 18, clona el repo, ejecuta `pnpm build`, luego..." No.

Usé `pkg` para empaquetar Node.js + el servidor + las apps estáticas en un único archivo `.exe` de 45 MB. El usuario hace doble clic y listo, sin dependencias externas.

Después usé **Inno Setup** para crear un instalador Windows con acceso directo en el menú inicio, desinstalador limpio y wizard multiidioma (ES/EN).

### Lo que aprendí:
* **La distribución es parte del producto:** El mejor software del mundo no sirve si nadie puede instalarlo.
* **`pkg` empaqueta Node + tu código + tus assets en un solo binario:** Aunque ya no se mantiene activamente, sigue siendo la forma más simple de distribuir apps Node.
* **El instalador profesional es un detalle que pocos valoran hasta que lo necesitan.**

---

# ✅ Lo que me llevo de Macroboard

Construir un proyecto de estos en serio te enseña cosas que no salen en los tutoriales:

* Que el **monorepo no es complejidad, es velocidad** cuando compartes tipos entre paquetes.
* Que **WebSocket bidireccional** cambia cómo piensas las interfaces: ya no hay "el cliente pide y el servidor responde", hay un canal vivo.
* Que a veces la mejor solución es **delegar al sistema operativo** lo que tu runtime no puede hacer.
* Que **distribuir bien** es tan importante como construir bien. Un `.exe` que el usuario puede ejecutar vale más que 10 features que nunca va a descubrir.

Si tienes un celular viejo en un cajón, te invito a probarlo. Y si no, al menos audita el repo. El código sigue corriendo.

---

# 📖 Glosario de Términos

* **OBS Studio:** Software gratuito de grabación y transmisión en vivo. Es el estándar para streamers en Twitch y YouTube.
* **WebSocket:** Protocolo de comunicación bidireccional sobre TCP. Mantiene la conexión abierta para enviar y recibir mensajes en tiempo real, a diferencia de HTTP.
* **Monorepo:** Estructura de repositorio donde múltiples proyectos conviven en el mismo código fuente. Popularizado por Google, Facebook y Microsoft.
* **pnpm workspaces:** Función de pnpm para gestionar múltiples paquetes dentro de un monorepo. Más rápido y eficiente en disco que npm o yarn.
* **pkg:** Herramienta que empaqueta una aplicación Node.js en un único ejecutable standalone. Ya no se mantiene activamente, pero sigue siendo útil.
* **Inno Setup:** Compilador de instaladores para Windows, gratuito y de código abierto. Soporta scripts, multiidioma y uninstaller.
* **PowerShell SendKeys:** Método de la librería System.Windows.Forms que simula la pulsación de teclas físicas en el sistema operativo Windows.
* **obs-websocket-js:** Librería JavaScript que implementa el protocolo WebSocket v5 de OBS Studio, permitiendo controlarlo remotamente desde Node o el navegador.
