---
title: "El ADN de un Sistema: Guía Definitiva de Requerimientos"
date: "2026-03-19"
description: "¿Alguna vez te has preguntado por qué algunas aplicaciones se sienten como un guante y otras como un zapato tres tallas más chico? La respuesta no está en el código, sino en cómo se definen sus cimientos."
image: "/post/Adn-sistema-Requerimientos.png"
protected: false
hidden: false
---

# 📌 El Arte de Pedir Software: Requerimientos Funcionales y No Funcionales

Imagina que quieres construir una casa. Si le dices al arquitecto "quiero una casa bonita", lo más probable es que termines con algo que no te guste. Necesitas decirle: "quiero tres habitaciones" (lo que la casa **hace**) y "quiero que aguante un terremoto" (cómo la casa **es**). 

En el mundo del software, esto es exactamente lo que separa un proyecto exitoso de un desastre técnico. Vamos a desglosar cómo se diseña el cerebro de un sistema de información.

---

# ⚙️ Requerimientos Funcionales: El "Qué" del Sistema

Los requerimientos funcionales son las acciones específicas que el sistema debe realizar. Es la lista de tareas que el software completa para que el usuario logre su objetivo. Sin ellos, el sistema simplemente no tiene propósito.

Para que un sistema sea útil, solemos clasificar estas funciones según su importancia. No todo se puede construir al mismo tiempo, así que usamos esta jerarquía:

### 1. Requerimientos Esenciales (Lo que NO puede faltar)
Son el corazón del sistema. Si falta uno de estos, el software no sirve para nada. 
* **Ejemplo:** En una aplicación de banco, "poder transferir dinero" es esencial. Si no transfiere, no es una app de banco, es solo un adorno.

### 2. Requerimientos Ideales (Lo que aporta gran valor)
Son funciones que mejoran significativamente la experiencia, pero si no están el primer día, el negocio puede seguir operando.
* **Ejemplo:** Siguiendo con el banco, "generar un reporte mensual automático de gastos". Es genial tenerlo, pero si no está hoy, igual puedes mover tu dinero.

### 3. Requerimientos Opcionales (La "cereza del pastel")
Son mejoras estéticas o funciones de conveniencia que se añaden si queda tiempo o presupuesto.
* **Ejemplo:** "Cambiar el color de fondo de la aplicación según el estado de ánimo del usuario". Es simpático, pero no afecta la operación.

---

# 🏗️ Requerimientos No Funcionales: El "Cómo" del Sistema

Aquí es donde muchos proyectos fallan. Los requerimientos no funcionales (o **atributos de calidad**) no describen una acción, sino una **característica** del sistema. No es lo que el sistema hace, sino cómo se comporta mientras lo hace.

Se dividen en categorías técnicas llamadas "dimensiones de calidad":

### 🛡️ Seguridad
Define qué tan protegido está el sistema contra ataques o accesos no autorizados.
* **Ejemplo:** "Todas las contraseñas deben estar encriptadas y el sistema debe cerrar sesión tras 5 minutos de inactividad".

### 🏎️ Eficiencia y Rendimiento
Se refiere a la velocidad y el uso de recursos. Un software puede hacer lo que pides, pero si tarda 2 horas, no es eficiente.
* **Ejemplo:** "El sistema debe cargar el perfil del usuario en menos de 2 segundos".

### 📱 Usabilidad
Es la facilidad con la que un humano interactúa con la máquina. Si el usuario necesita un manual de 500 páginas para entender un botón, la usabilidad es pobre.
* **Ejemplo:** "Cualquier función principal debe ser accesible en un máximo de 3 clics".

### 🛠️ Mantenibilidad
¿Qué tan fácil es arreglar el sistema si algo se rompe o si queremos añadir algo nuevo mañana?
* **Ejemplo:** "El código debe estar documentado para que un nuevo programador pueda entenderlo en menos de una semana".

### 📈 Escalabilidad
La capacidad de crecer. ¿Qué pasa si hoy tienes 10 usuarios y mañana tienes un millón?
* **Ejemplo:** "El servidor debe ser capaz de soportar un aumento del 500% en el tráfico sin colapsar".

---

# ✅ Conclusión: El equilibrio perfecto

Un sistema de información robusto es como un coche de carreras. Los **requerimientos funcionales** son el motor, los frenos y el volante (lo que le permite correr y girar). Los **requerimientos no funcionales** son la aerodinámica, la ligereza de los materiales y la seguridad de la cabina (lo que permite que corra rápido y no se despedace en la primera curva).

Para construir tecnología de calidad, primero hay que saber qué queremos que haga y, sobre todo, cómo queremos que se sienta.

---

# 📖 Glosario de Términos

* **Sistema de Información:** Imagina un archivador gigante que no solo guarda papeles, sino que también sabe leerlos, ordenarlos y entregártelos justo cuando los necesitas.
* **Encriptación:** Es como escribir una carta en un lenguaje secreto que solo tú y tu mejor amigo conocen; si alguien la ro