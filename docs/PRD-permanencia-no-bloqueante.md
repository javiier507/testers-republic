# Propuesta — Permanencia no bloqueante

Nov 4, 2026 · @Carlos

Documento alterno al [PRD](./PRD.md). Describe solo lo que cambia respecto a él, en el mismo orden de secciones. Todo lo que no se menciona aquí queda igual que en el PRD.

## Resumen del cambio

Con cada versión del PRD aparecían más combinaciones de condiciones para subir la siguiente app. Esta propuesta las reduce a dos, y las dos se comprueban en el momento de subir:

1. Que la app anterior ya no esté activa.
2. Las instalaciones aprobadas requeridas en apps de otros, desde que se subió la app anterior.

La permanencia deja de bloquear y pasa al sistema de confianza: la plataforma muestra qué tan confiable es cada usuario cumpliendo sus permanencias, y cada uno decide si confía o no.

| Tema | PRD actual | Esta propuesta |
| --- | --- | --- |
| Condiciones para subir la siguiente app | Tres: app anterior inactiva, instalaciones aprobadas y última permanencia sin fallar | Dos: app anterior inactiva e instalaciones aprobadas |
| Compromisos | Del postulante (instalar, permanecer) y del dev (validar, cerrar) | Solo del postulante: instalar y permanecer |
| Permanencia fallida | Baja la calificación y bloquea la siguiente app hasta cumplir otra | Solo cuenta en la calificación |
| Calificación | Cuatro métricas ponderadas, de postulante y de dev, con promedio suavizado | Solo permanencias: "11 de 12 permanencias cumplidas" |
| Validar y cerrar como dev | Si no cumple, baja su calificación | Si no cumple, la plataforma lo resuelve sola, sin consecuencias para él |
| Cierre | El dev cierra antes del día 20 | 48 h para que los postulantes envíen su permanencia y luego 24 h para que el dev las valide |
| Abandonada | Pierde el desbloqueo usado y baja la calificación | Ocupa su espacio; reencolarla se paga y solo se puede una vez |
| Reencolar una app | No está definido | Abandonada, una vez y pagando; Finalizada, pagando y sin límite; Ignorada, nunca |
| Insuficiente, Arreglada y Vencida | Se llaman "reencoladas" | Se llaman "regresos": el mismo registro cambia de estado y vuelve a Waiting |
| Detección de duplicados | En el MVP | Fuera del MVP |

## Regla base: la cadena de responsabilidad

### Nuevo texto de la regla

Reemplaza los dos primeros párrafos de la sección y la lista de condiciones:

> Toda función, gratuita o de pago, actual o futura, debe respetar la cadena de responsabilidad: para subir otra app hay que aportar a la cola, con instalaciones aprobadas en apps de otros. La permanencia es un compromiso de confianza: no bloquea, pero queda visible para todos en la calificación. Las tareas del dev (validar y cerrar) tienen plazo y, si no las cumple, la plataforma las resuelve sola.

La primera app no exige nada. Desde la segunda, para subir la siguiente app el usuario necesita:

1. Que su app anterior ya no esté activa: Finalizada, Abandonada o Ignorada.
2. Las instalaciones aprobadas requeridas en apps de otros (3 en el lanzamiento) desde que subió su app anterior.

Una instalación pendiente todavía no cuenta para el desbloqueo: cuenta recién cuando se aprueba, por el dev o sola. Las permanencias, sean pendientes, rechazadas o no entregadas, no bloquean. Lo que hace el usuario como dev tampoco bloquea ni afecta su calificación.

### Cómo evaluar una función nueva

La pregunta 2 cambia, porque los únicos compromisos que quedan son los del postulante:

1. ¿Permite subir una app sin cumplir las condiciones de la regla base? Entonces no se incluye.
2. ¿Permite evitar la captura de permanencia sin que afecte la calificación? Entonces no se incluye.
3. ¿Cambia cuánto o cómo se cumple, sin quitar ninguna obligación? Entonces se puede incluir.

### Funciones de pago evaluadas

Se agrega una fila:

| Función | ¿Respeta la cadena? | Por qué |
| --- | --- | --- |
| Reencolar una app Abandonada o Finalizada | Sí | Crea un registro nuevo en la cola y exige las dos condiciones de la regla base; pagar no las reemplaza |

## Objetivos y alcance del MVP

### Objetivos

Cambia el tercer objetivo:

- Que los postulantes cumplan sus compromisos: las instalaciones, por la cadena de desbloqueo; las permanencias, por su calificación visible.

### Señales para ajustar la cola

Se agrega una señal:

| Señal | Qué indica | Ajuste |
| --- | --- | --- |
| Suben las permanencias no entregadas o rechazadas | La calificación no alcanza para que los postulantes permanezcan | Subir el máximo de postulantes del plan gratuito, subir las instalaciones requeridas o volver a evaluar si la permanencia debe bloquear la siguiente app. El resultado en Google Play, cuando el dev lo informa, es un dato complementario |

### Incluido en el MVP

- "Cadena de desbloqueo por compromisos y calificación visible" pasa a ser: cadena de desbloqueo por instalaciones aprobadas y calificación visible de permanencias.

## Terminología y principios

### Terminología

| Término | Significado |
| --- | --- |
| App | El software que se sube para conseguir testers. Su nombre y su package name no cambian después de crearse. Tiene un registro en la cola, o varios si se reencola |
| Registro en la cola | Cada paso de una app por la cola. Tiene su estado, sus postulantes, sus capturas, sus regresos y sus reportes. Los postulantes se postulan a un registro, no a la app |
| Regreso | Un registro que vuelve a Waiting como Insuficiente, Arreglada o Vencida. Es el mismo registro que cambia de estado. Reemplaza al término "Reencolada" del PRD |
| Reencolar | Función de pago: crea un registro nuevo en la cola para una app Abandonada o Finalizada |
| Compromiso | Una obligación del postulante con plazo: instalar o permanecer |
| Cierre | El dev valida las permanencias de su app; si no lo hace, la plataforma la cierra al vencer su plazo |
| Calificación | Cuántas permanencias cumplió el usuario como postulante, sobre todas las que se resolvieron |

Postularse sigue siendo enviar la captura de instalación, pero no es un compromiso propio: queda incluido en las instalaciones requeridas.

Todas las menciones de "reencolada" y "reencolamiento" del PRD pasan a "regreso": la sección Reencolamiento pasa a llamarse Regresos, y "apps nuevas y reencoladas" en Waiting pasa a "apps nuevas y regresos".

### Principios: confianza y contención

| Cambio | Confianza | Contención |
| --- | --- | --- |
| Se agrega | Cada postulante decide si permanece; su calificación lo muestra | — |
| Se agrega | — | Pago para reencolar una app Abandonada o Finalizada |
| Se quita | — | Bloqueo por permanencia fallida |
| Se quita | — | Detección de capturas duplicadas |
| Cambia | — | "Cierre automático al día límite" pasa a ser: cierre automático al vencer el plazo del dev para validar las permanencias |

## Flujo y estados de una app

### Estados que cambian

| Estado | Qué pasa |
| --- | --- |
| Por cerrar | Desde que se cumplen los 14 días: los postulantes tienen 48 h para enviar su captura de permanencia y luego el dev tiene 24 h para validarlas |
| Finalizada | No queda ninguna permanencia por entregar ni por validar, porque el dev las validó o porque vencieron los plazos; el dev queda libre para su siguiente app |
| Abandonada | No se arregló a tiempo, o se pausó otra vez después de agotar sus regresos como Arreglada; el dev queda libre para su siguiente app y la app sigue ocupando su espacio dentro de su total de apps. Se puede reencolar una vez, pagando |
| Ignorada | Se le acabó el tiempo en el top por segunda vez, o quedó Insuficiente otra vez después de agotar sus regresos; el dev queda libre para su siguiente app y la app sigue ocupando su espacio dentro de su total de apps. No se puede reencolar |

### Diagrama de estados

Cambia una sola transición:

| PRD actual | Esta propuesta |
| --- | --- |
| `PorCerrar --> Finalizada: Cierra el dev o llega el día límite` | `PorCerrar --> Finalizada: No quedan permanencias por entregar ni por validar` |

Reencolar no es una transición: crea un registro nuevo en la cola, que empieza en En espera. El registro anterior conserva su estado final.

## Reglas de operación

### Subida de una app

Se agregan estas reglas:

- Una app Abandonada se puede reencolar una sola vez, pagando. El límite es por app: si vuelve a quedar Abandonada, ya no se puede reencolar, aunque entre medio haya quedado Finalizada.
- Una app Finalizada se puede reencolar pagando, sin límite; por ejemplo, si Google pidió otra prueba cerrada antes de dar acceso a producción.
- Una app Ignorada no se puede reencolar, ni pagando.
- Una app que nunca se subió sigue las reglas normales: es gratuita si al usuario le quedan apps gratuitas.
- Reencolar crea un registro nuevo en la cola: empieza sin postulantes y con el conteo de reportes en cero, y los reportes de sus registros anteriores siguen siendo públicos. En Waiting aparece como una app nueva.
- Reencolar exige las dos condiciones de la regla base. Las instalaciones requeridas siguen la misma regla que al subir una app nueva: reencolar no tiene parámetros propios.
- Reencolar no ocupa otro espacio en el total de apps del dev: la app ocupa uno solo, tenga uno o varios registros. El registro nuevo sí ocupa su lugar en la cola y recibe el mínimo y el máximo del plan de pago.
- Solo la cuenta dueña del package name puede reencolar la app.

### Postulaciones y capturas

- La postulación es a un registro en la cola, no a la app. Si una app se reencola, quienes se postularon a un registro anterior pueden postularse al nuevo, y esa es una instalación nueva.
- Se quita "La plataforma bloquea capturas duplicadas o casi idénticas antes de que lleguen al dev". Pasa a Fuera del MVP.
- La captura de permanencia se envía cuando se cumplen los 14 días, dentro de una ventana de 48 h. Si el postulante no la envía, cuenta como no cumplida en su calificación.
- El rechazo de una captura de permanencia sigue sin poder apelarse y cuenta como no cumplida en la calificación del postulante. Ya no bloquea su siguiente app.
- La plataforma muestra al dev dos fechas: desde cuándo puede solicitar producción a Google y la fecha en que su app se cierra a más tardar, 72 h después de cumplirse los 14 días.

La tabla de la captura de instalación cambia en la columna del postulante:

| Captura de instalación | Para el postulante |
| --- | --- |
| Enviada (pendiente) | Todavía no cuenta |
| Aprobada | Cuenta para desbloquear su siguiente app |
| Rechazada | No desbloquea. El rechazo sigue siendo público, pero no afecta su calificación |

### Cierre

Reemplaza la sección completa. El cierre tiene dos partes:

| Momento | Qué pasa |
| --- | --- |
| Se cumplen los 14 días en prueba | Se abre la ventana de permanencia: cada postulante tiene 48 h para enviar su captura. Recibe un aviso al abrirse y otro 12 h antes del cierre |
| Se cierra la ventana | Quien no envió su captura incumplió. Empieza el plazo del dev: 24 h para validar todas las capturas de permanencia |
| Vence el plazo del dev | Las capturas que no revisó se aprueban solas y la plataforma cierra la app |

- El dev puede validar cada captura apenas llega, sin esperar a que se cierre la ventana. El plazo de 24 h es único para todas las capturas y se cuenta desde que se cierra la ventana.
- El dev no puede cerrar con permanencias pendientes. Aprobar o rechazar todas las capturas es lo que cierra la app de forma manual.
- La app se finaliza en cuanto no queda ninguna permanencia por entregar ni por validar. Si todos los postulantes entregaron y el dev ya las validó todas, se finaliza sin esperar los plazos. Validar antes libera antes al dev para su siguiente app.
- Cerrar sigue siendo una obligación del dev, pero no cumplirla no tiene consecuencias para él: la plataforma la cierra.
- La captura de Play Console y el resultado en Google Play son opcionales e informativos. El dev los puede informar cuando quiera, incluso después de que la app se finalizó.
- Desaparece el día límite de cierre (día 20).

## Compromisos, desbloqueo y calificación

Cumplir las instalaciones desbloquea la siguiente app. Cumplir las permanencias define la calificación visible de cada usuario.

### Compromisos

Reemplaza la tabla de compromisos:

| Compromiso del postulante | Plazo | Si no cumple |
| --- | --- | --- |
| Instalar: las capturas de instalación aprobadas requeridas en apps de otros (3 en el lanzamiento) | Desde que subió su app anterior, antes de subir la siguiente | No puede subir su siguiente app |
| Permanencia | 48 h desde que se cumplen los 14 días | Cuenta como no cumplida en su calificación |

Las tareas del dev no son compromisos: tienen plazo, pero no cumplirlas no bloquea ni afecta su calificación.

| Tarea del dev | Plazo | Si no la hace |
| --- | --- | --- |
| Validar las capturas de instalación | 24 h por captura; en En progreso, como tarde 24 h desde que la app entró en ese estado | Se aprueban solas |
| Validar las capturas de permanencia (cerrar) | 24 h desde que se cierra la ventana de permanencia | Se aprueban solas y la plataforma cierra la app |
| Informar el resultado en Google Play | Cuando quiera | Es opcional |

### Cadena de desbloqueo

Se quitan:

- "Si una permanencia se rechaza o no se entrega a tiempo, el usuario no puede subir otra app hasta postularse a otra app y que le aprueben esa permanencia."
- La referencia a la permanencia fallida en "Las instalaciones aprobadas desbloquean la siguiente app sin esperar los 14 días".

Cambian:

- **App Abandonada:** sigue ocupando su espacio dentro del total de apps del dev, incluidas las 2 gratuitas. Reencolarla se paga y solo se puede una vez. Su calificación no cambia.
- **App Ignorada:** el dev queda libre para su siguiente app y la app sigue ocupando su espacio dentro de su total. No se puede reencolar.

### Calificación

Reemplaza la sección completa.

La calificación mide solo cómo cumple cada usuario sus permanencias como postulante. Nadie califica a nadie y lo que hace como dev no cuenta.

- **Formato:** "11 de 12 permanencias cumplidas".
- **Cumplida:** la captura se entregó dentro de la ventana y se aprobó, por el dev o sola.
- **No cumplida:** la captura no se entregó a tiempo o el dev la rechazó.
- **Pendiente:** no cuenta hasta que se resuelve.
- **Período:** todo el historial del usuario.
- **Cuentas nuevas:** muestran la insignia "Nuevo" hasta su primera permanencia resuelta, sea aprobada, rechazada o no entregada.
- **Visible:** aparece en la cola, junto a cada dev, y en las postulaciones. El perfil muestra cuántas permanencias no se entregaron y cuántas se rechazaron.
- **En la cola:** como mide cuánto permanece cada uno en las apps de otros, los postulantes pueden usarla para elegir a qué devs ayudar.
- **No bloquea:** es informativa. El dev ve la calificación de quienes se postulan, pero no puede rechazar a nadie por ella: el rechazo se basa en la captura. Una calificación mínima para subir otra app sigue fuera del MVP.
- **Desaparecen:** las cuatro métricas ponderadas, el promedio suavizado y el peso mayor de lo reciente.

## Planes, pagos y reembolsos

Se agrega:

- Reencolar una app Abandonada o Finalizada se paga siempre, aunque al usuario le queden apps gratuitas. No ocupa otro espacio en su total. El registro nuevo recibe el mínimo y el máximo del plan de pago.
- Una app Abandonada sigue ocupando su espacio en el total. Si era gratuita, consumió una de las 2 gratuitas.

## Notificaciones

| Cambio | Evento | Para | Ejemplo |
| --- | --- | --- | --- |
| Cambia | Se abre la ventana de permanencia | Postulante | "Hoy toca tu captura de permanencia: tienes 48 h para enviarla" |
| Se agrega | 12 h antes de que se cierre la ventana de permanencia | Postulante | "Te quedan 12 h para enviar tu captura de permanencia" |
| Se agrega | Se cerró la ventana sin su captura | Postulante | "No enviaste tu captura de permanencia: cuenta como no cumplida en tu calificación" |
| Cambia | Se cierra la ventana de permanencia | Dev | "Tienes 24 h para validar las permanencias de tu app" |
| Se agrega | 6 h antes de que las permanencias se aprueben solas | Dev | "Tus permanencias se aprueban solas en 6 h" |
| Cambia | Pasa a Abandonada | Dev | "Tu app quedó abandonada: no se arregló a tiempo. Para reencolarla tendrás que pagar" |
| Se agrega | Pasa a Finalizada | Dev | "Tu app se cerró. Ya puedes informar cómo te fue en Google Play" |

## Parámetros configurables

| Cambio | Parámetro | Tipo | Valores aceptados | Inicial |
| --- | --- | --- | --- | --- |
| Reemplaza al margen para la captura de permanencia | Ventana para la captura de permanencia | Horas desde que se cumplen los 14 días | 24–96 | 48 |
| Se agrega | Aviso antes de que se cierre la ventana de permanencia | Horas antes | 1–24 | 12 |
| Cambia | Plazo del dev para validar | Horas | 12–72 | 24. Para las permanencias se cuenta desde que se cierra la ventana |
| Se quita | Día límite de cierre | — | — | — |
| Se quita | Detección de capturas duplicadas | — | — | — |
| Se quitan | Los cuatro pesos de la calificación | — | — | — |
| Se quitan | Valor neutral del promedio suavizado, peso del valor neutral y vida media de lo reciente | — | — | — |
| Se quita | Compromisos para dejar de ser "Nuevo" | — | — | — |

El límite de una sola vez para reencolar una app Abandonada es fijo.

## Riesgos asumidos

### Riesgos que cambian

| Riesgo | Por qué se asume | Mitigación |
| --- | --- | --- |
| Postulantes que no entregan la permanencia | La permanencia ya no bloquea; queda a criterio de cada postulante | Calificación visible sobre todo el historial; avisos antes de que se cierre la ventana; margen de postulantes del plan de pago |
| Las instalaciones aprobadas desbloquean la siguiente app antes de las permanencias | Esperar 14 días por cada app aleja a los devs con varias apps por subir | La calificación muestra las permanencias no cumplidas |
| Devs que no validan ni cierran | Lo que hace como dev no afecta su calificación ni bloquea | Aprobación automática y cierre automático; validar antes lo libera antes para su siguiente app; el historial de estados registra cada aprobación automática |
| Postulantes que envían capturas malas en muchas apps | Pocas instalaciones aprobadas (3 en el lanzamiento) desbloquean la siguiente app | Rechazos públicos y validación del dev |
| Capturas falsas aprobadas automáticamente | Es mejor que castigar al postulante por la demora del dev | Recordatorio al dev. Sin detección de duplicados, el dev es el único filtro |
| Rechazos injustos del dev | No hay moderación ni apelación en el MVP | Un rechazo de permanencia ya no bloquea: solo cuenta en la calificación. Justificación escrita obligatoria y rechazos públicos |
| Apps gratuitas que avanzan con solo 12 postulantes, sin margen | Es el mínimo de Google | Aceptan hasta 15 postulantes; se avisa al dev que un abandono puede dejarlo por debajo de 12. Este riesgo pesa más ahora que la permanencia no bloquea |

### Riesgos nuevos

| Riesgo | Por qué se asume | Mitigación |
| --- | --- | --- |
| Postulantes de paso: consiguen sus instalaciones aprobadas, suben su siguiente app y salen de los tests antes del día 14 | Bloquear por la permanencia llenaba la regla de combinaciones | Calificación visible; los postulantes pueden elegir a qué devs ayudar según su calificación; margen del plan de pago; señal para volver a evaluar |
| El dev no puede actuar según la calificación del postulante | El rechazo se basa en la captura, nunca en la calificación | La calificación sirve del lado del postulante, que elige a qué devs ayudar |
| Calificación inflada por permanencias aprobadas solas | El dev no está obligado a validar | Validar antes libera antes al dev; el historial de estados permite medir la proporción de aprobaciones automáticas |
| Una permanencia no cumplida queda para siempre en la calificación | La calificación cubre todo el historial | Ventana de 48 h y aviso antes de que se cierre |
| Al lanzamiento, todos los usuarios muestran "Nuevo" durante las primeras semanas | La primera permanencia se resuelve recién después de los 14 días | Se deja de ser "Nuevo" con la primera permanencia resuelta |
| Pocos datos sobre el resultado en Google Play | Informarlo es opcional | La señal para volver a evaluar se basa en las permanencias no entregadas y rechazadas |
| Capturas reutilizadas sin detección de duplicados | La detección queda fuera del MVP | Validación del dev y rechazos públicos |

## Pendientes y fuera del MVP

### Por decidir dentro del MVP

- Se quita **Desbloqueo tras una permanencia fallida**: la permanencia ya no bloquea.

### Fuera del MVP

Se agrega:

- Detección de capturas duplicadas. Criterio si se retoma: bloquear solo el mismo archivo exacto; una captura nueva parecida a una anterior del mismo postulante para la misma app se acepta, porque puede volver a postularse cuando la app se reencola.
