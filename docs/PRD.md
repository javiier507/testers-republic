# PRD — Cola de testers para Google Play

@Carlos

## Resumen y problema

Una plataforma comunitaria donde las apps que deben pasar la prueba cerrada de Google Play avanzan en una cola: solo 5 apps se pueden probar a la vez, y cada una cede su lugar al conseguir el mínimo de postulantes de su plan: 12 en el gratuito, 15 en el de pago.

### Problema

Google exige a las cuentas personales de desarrollador nuevas un test cerrado con al menos 12 testers inscritos durante los últimos 14 días continuos antes de solicitar acceso a producción ([Ayuda de Play Console](https://support.google.com/googleplay/android-developer/answer/14151465)).

Las comunidades actuales de intercambio de testers funcionan como un feed. Con la llegada masiva de apps hechas con IA, una app publicada queda perdida en pocas horas: hay muchas apps, la mayoría con pocos testers, y completar la prueba cerrada se vuelve difícil.

### Propuesta de valor

- **Atención concentrada:** el top limita cuántas apps compiten por testers al mismo tiempo.
- **Turno visible:** cada dev ve su posición y recibe avisos a medida que se acerca.
- **Compromisos verificables:** capturas de instalación y de permanencia, rechazos públicos y una calificación visible para todos.
- **Gratis para empezar:** la primera app entra sin requisitos.

La plataforma consigue testers reales y comprometidos. No garantiza el acceso a producción: esa decisión es de Google.

## Regla base: la cadena de responsabilidad

Toda función, gratuita o de pago, actual o futura, debe respetar la cadena de responsabilidad: para subir otra app hay que aportar a la cola, con instalaciones aprobadas en apps de otros. La permanencia es un compromiso de confianza: no bloquea, pero queda visible para todos en la calificación. Las tareas del dev (validar y cerrar) tienen plazo y, si no las cumple, la plataforma las resuelve sola.

La primera app no exige nada. Desde la segunda, para subir la siguiente app el usuario necesita:

1. Que su app anterior ya no esté activa: Finalizada, Abandonada o Ignorada.
2. Las instalaciones aprobadas requeridas en apps de otros (3 en el lanzamiento) desde que subió su app anterior.

Una instalación pendiente todavía no cuenta para el desbloqueo: cuenta recién cuando se aprueba, por el dev o sola. Las permanencias, sean pendientes, rechazadas o no entregadas, no bloquean. Lo que hace el usuario como dev tampoco bloquea ni afecta su calificación.

Es la regla sobre la que se sostiene la plataforma. Si una función permite saltarse una condición de la regla base, o evitar la captura de permanencia sin que baje la calificación, se rediseña o no se incluye.

> Para quien construya la plataforma, sean personas o agentes de IA: antes de agregar o cambiar una función, verificar que respete esta regla. Si no la respeta, no se implementa.

### Cómo evaluar una función nueva

1. ¿Permite subir una app sin cumplir las condiciones de la regla base? Entonces no se incluye.
2. ¿Permite evitar la captura de permanencia sin que afecte la calificación? Entonces no se incluye.
3. ¿Cambia cuánto o cómo se cumple, sin quitar ninguna obligación? Entonces se puede incluir.

### Funciones de pago evaluadas

| Función | ¿Respeta la cadena? | Por qué |
| --- | --- | --- |
| Apps adicionales, desde la tercera, con más postulantes (mínimo 15, hasta 20) | Sí | Cada app sigue requiriendo las dos condiciones de la regla base; el margen exige más testers y más validaciones al dev |
| Reencolar una app Abandonada o Finalizada | Sí | Crea un registro nuevo en la cola y exige las dos condiciones de la regla base; pagar no las reemplaza |

## Objetivos y alcance del MVP

El MVP busca que cada app consiga los testers comprometidos de su plan sin que la cola se detenga.

### Objetivos

- Que cada app que llega al top consiga el mínimo de postulantes de su plan.
- Que la cola avance: ninguna app ocupa el top indefinidamente.
- Que los postulantes cumplan sus compromisos: las instalaciones, por la cadena de desbloqueo; las permanencias, por su calificación visible.
- Reunir datos sobre cómo terminó cada prueba cerrada.

### Señales para ajustar la cola

| Señal | Qué indica | Ajuste |
| --- | --- | --- |
| La cola crece semana a semana | Entran más apps de las que salen | Subir las instalaciones requeridas para subir la siguiente app. El efecto se ve en el siguiente ciclo de cada usuario, unas 3 semanas después, así que conviene ajustarlo con tiempo |
| Las apps del top se llenan en minutos y los testers no encuentran dónde postularse | Hay más testers que apps disponibles | Ampliar el top |
| Los testers prefieren unirse a apps En progreso y las del top tardan más en llenarse | La ventana para postulantes adicionales le quita testers al top | Reducir la ventana para postulantes adicionales |
| Suben las permanencias no entregadas o rechazadas | La calificación no alcanza para que los postulantes permanezcan | Subir el máximo de postulantes del plan gratuito, subir las instalaciones requeridas o volver a evaluar si la permanencia debe bloquear la siguiente app. El resultado en Google Play, cuando el dev lo informa, es un dato complementario |

### Incluido en el MVP

- Cola con top, estados, tiempos límite y reportes de apps que no abren.
- Postulaciones con capturas de instalación y de permanencia, validadas por el dev con aprobación automática.
- Cadena de desbloqueo por instalaciones aprobadas y calificación visible de permanencias.
- Rechazos y reportes públicos, sin sus capturas.
- Plan gratuito y pago por uso.
- Notificaciones por email y web push en cada etapa.
- Parámetros configurables.
- Panel de administración (por definir; ver Pendientes).

### Fuera del alcance

- Garantizar el acceso a producción en Google Play.
- Validar automáticamente capturas, disponibilidad por país o apelaciones.
- Arquitectura técnica: se define en otra sesión.
- Baja de usuarios.
- Funciones posteriores al MVP, listadas en Pendientes.

## Terminología y principios

La plataforma no usa la palabra "aplicación": el software es una **app** y la acción del tester es una **postulación**.

### Terminología

| Término | Significado |
| --- | --- |
| App | El software que se sube para conseguir testers. Su nombre y su package name no cambian después de crearse. Tiene un registro en la cola, o varios si se reencola |
| Registro en la cola | Cada paso de una app por la cola. Tiene su estado, sus postulantes, sus capturas, sus regresos y sus reportes. Los postulantes se postulan a un registro, no a la app |
| Usuario | Una sola cuenta que actúa en dos roles: dev y postulante |
| Dev | El usuario cuando sube su app |
| Postulante | El usuario cuando se postula a la app de otro |
| Postulación | La acción de postularse; siempre incluye la captura de instalación |
| Captura de instalación | Prueba de que el postulante instaló la app (día 1) |
| Captura de permanencia | Prueba de que el postulante siguió en el test (día 14) |
| Validación | El dev aprueba o rechaza una captura; sin respuesta en plazo, se aprueba sola |
| Estado de una captura | Pendiente (por defecto), aprobada o rechazada; aplica a las capturas de instalación y de permanencia |
| Compromiso | Una obligación del postulante con plazo: instalar o permanecer |
| Cierre | El dev valida las permanencias de su app; si no lo hace, la plataforma la cierra al expirar su plazo |
| Calificación | Cuántas permanencias cumplió el usuario como postulante, sobre todas las que se resolvieron |
| Top | Las apps activas que pueden recibir postulaciones |
| Regreso | Un registro que vuelve a Waiting como Insuficiente, Arreglada o Expirada. Es el mismo registro que cambia de estado |
| Reencolar | Función de pago: crea un registro nuevo en la cola para una app Abandonada o Finalizada |
| Package name | El identificador de la app en Google Play, extraído de su link |

Postularse es enviar la captura de instalación. No es un compromiso propio: queda incluido en las instalaciones requeridas.

### Principios: confianza y contención

La plataforma equilibra dos sistemas para que la cola avance. **Confianza** es lo que queda a criterio de los usuarios. **Contención** es lo que la plataforma exige o restringe.

| Confianza | Contención |
| --- | --- |
| La primera app entra sin requisitos | Instalaciones aprobadas requeridas para subir la siguiente app |
| El dev valida las capturas | Aprobación automática al expirar el plazo |
| El postulante elige a qué apps postularse | El top limita cuántas apps compiten por testers al mismo tiempo |
| El dev declara que su app está disponible en todos los países | Tiempo límite en el top |
| El dev confirma que está en el grupo de Google y que su test cerrado lo usa | Rechazos y reportes públicos |
| El dev indica que arregló una app pausada | Pausa automática por reportes |
| El dev informa su resultado en Google Play | Cierre automático al expirar el plazo del dev para validar las permanencias |
| Cada usuario decide si confía en otro según su calificación | Pago para reencolar una app Abandonada o Finalizada |
| Las instalaciones aprobadas desbloquean la siguiente app sin esperar las permanencias | |
| Cada postulante decide si permanece; su calificación lo muestra | |

## Flujo y estados de una app

Una app avanza en línea recta de la cola al cierre, salvo cuando expira su tiempo en el top, queda Insuficiente o recibe suficientes reportes. En esos casos vuelve a la cola como regreso, con un límite de veces, o termina Ignorada o Abandonada (ver Regresos).

| Estado | Qué pasa |
| --- | --- |
| En espera | Aguarda su turno; aparece en la cola si está entre las 20 próximas |
| En el top | Recibe postulaciones durante su tiempo límite y puede ser reportada |
| En progreso | Recibió el mínimo de capturas de su plan (12 o 15). Dura como máximo 24 h: el dev valida las capturas y, durante las primeras 12 h, acepta postulantes adicionales hasta el máximo (15 o 20) |
| Insuficiente | Terminó la ventana de postulantes adicionales, no quedan capturas pendientes y las aprobadas no llegan al mínimo; vuelve a la cola conservando sus aprobadas |
| Expirada | Se le acabó el tiempo en el top antes de recibir el mínimo de postulaciones; vuelve a la cola con sus postulantes |
| Arreglada | El dev indicó que arregló su app pausada; vuelve a la cola con sus postulantes |
| En prueba | Las capturas aprobadas llegaron al mínimo; nadie más puede unirse y corren los 14 días |
| Por cerrar | Desde que se cumplen los 14 días: los postulantes tienen 48 h para enviar su captura de permanencia y luego el dev tiene 24 h para validarlas |
| Finalizada | No queda ninguna permanencia por entregar ni por validar, porque el dev las validó o porque expiraron los plazos; el dev queda libre para su siguiente app |
| Pausada | Recibió suficientes reportes mientras estaba en el top; espera que el dev la arregle, como máximo 7 días |
| Abandonada | No se arregló a tiempo, o se pausó otra vez después de agotar sus regresos como Arreglada; el dev queda libre para su siguiente app y la app sigue ocupando su espacio dentro de su total de apps. Se puede reencolar una vez, pagando |
| Ignorada | Se le acabó el tiempo en el top por segunda vez, o quedó Insuficiente otra vez después de agotar sus regresos; el dev queda libre para su siguiente app y la app sigue ocupando su espacio dentro de su total de apps. No se puede reencolar |

### Diagrama de estados

```mermaid
stateDiagram-v2
    state "En espera" as EnEspera
    state "En el top" as EnElTop
    state "En progreso" as EnProgreso
    state "En prueba" as EnPrueba
    state "Por cerrar" as PorCerrar

    [*] --> EnEspera: El dev sube la app
    EnEspera --> EnElTop: Le toca el turno
    EnElTop --> EnProgreso: Recibe el mínimo de postulaciones
    EnElTop --> Expirada: Se acaba el tiempo por primera vez
    EnElTop --> Ignorada: Se acaba el tiempo por segunda vez
    EnElTop --> Pausada: Reportes
    EnElTop --> Abandonada: Reportes tras agotar sus regresos como Arreglada
    EnProgreso --> EnPrueba: Las aprobadas llegan al mínimo
    EnProgreso --> Insuficiente: Ventana cerrada, sin pendientes y bajo el mínimo
    EnProgreso --> Ignorada: Insuficiente tras agotar sus regresos
    Insuficiente --> EnElTop: Le toca el turno
    Expirada --> EnElTop: Le toca el turno
    Pausada --> Arreglada: El dev la arregla
    Pausada --> Abandonada: 7 días sin arreglar
    Arreglada --> EnElTop: Le toca el turno
    EnPrueba --> PorCerrar: Día 14
    PorCerrar --> Finalizada: No quedan permanencias por entregar ni por validar
    Finalizada --> [*]
    Abandonada --> [*]
    Ignorada --> [*]
```

Reencolar no es una transición: crea un registro nuevo en la cola, que empieza en En espera. El registro anterior conserva su estado final.

### Cola visible y estados internos

La cola se muestra en tres partes, y cada una agrupa uno o más estados internos.

| Parte en la UI | Estados que incluye |
| --- | --- |
| Top | En el top |
| In progress | En progreso, solo durante su ventana de 12 h para postulantes adicionales |
| Waiting | En espera, Insuficiente, Arreglada y Expirada |

- Waiting muestra sus estados juntos, sin diferencia visual entre apps nuevas y regresos. Solo cambia el orden: primero las Insuficiente, luego las Arreglada y al final las nuevas y las Expirada, mezcladas.
- Dentro de cada grupo, las apps se ordenan por fecha de entrada a la cola: la de subida para una app nueva, la de reencolado para un registro reencolado y la de vuelta a la cola para un regreso.
- Una app En progreso deja de mostrarse al cerrarse su ventana de 12 h, aunque el dev siga validando.
- Las apps En prueba, Por cerrar, Pausada, Finalizada, Abandonada e Ignorada no se muestran en la cola; el dev y sus postulantes las siguen viendo en sus apps y en sus pruebas.

### Historial de estados

Cada registro en la cola guarda el historial de sus transiciones: estado de origen, estado de destino, fecha y hora, y causa (acción del dev, expiración de un plazo, reportes o aprobación automática). También registra cómo se resolvió cada captura: por el dev o sola.

- Lo ven el dev de la app y el panel de administración; no es público.
- De él salen los conteos de regresos y expiraciones, los datos sobre cómo terminó cada prueba y la evidencia para decidir reembolsos.

## Reglas de operación

Cada dev tiene una sola app activa a la vez, que avanza según su turno en la cola y sale del top al conseguir el mínimo de postulantes de su plan: 12 en el gratuito, 15 en el de pago.

### Subida de una app

- El dev pega el link de Google Play de su test cerrado; la plataforma extrae el package name.
- Cada package name pertenece a una sola cuenta: la primera que lo registra.
- El dev marca una casilla confirmando que la app está disponible en todos los países.
- El test cerrado usa el grupo de Google de la plataforma. Los grupos propios del dev quedan como función activable.
- Cada usuario se une al grupo de Google por su cuenta. Al subir su primera app, el dev confirma con una casilla que ya está en el grupo. En cada app que sube, confirma con otra casilla que su test cerrado usa el grupo de la plataforma. Ninguna de las dos se verifica.
- Una vez subida, el dev no puede retirar la app ni cambiar su link de Google Play. Un link incorrecto es responsabilidad del dev.
- La primera app entra sin requisitos. Las siguientes dependen de la cadena de desbloqueo (ver Compromisos).
- Una app activa a la vez por dev, en plan gratuito y de pago. Una app deja de estar activa al llegar a Finalizada, Abandonada o Ignorada. Al reencolarse, vuelve a estar activa hasta que su registro nuevo llegue a uno de esos estados.
- La pantalla de subida muestra el aviso de que la plataforma no garantiza el acceso a producción.
- Una app Abandonada se puede reencolar una sola vez, pagando. El límite es por app: si vuelve a quedar Abandonada, ya no se puede reencolar, aunque entre medio haya quedado Finalizada.
- Una app Finalizada se puede reencolar pagando, sin límite; por ejemplo, si Google pidió otra prueba cerrada antes de dar acceso a producción.
- Una app Ignorada no se puede reencolar, ni pagando.
- Una app que nunca se subió sigue las reglas normales: es gratuita si al usuario le quedan apps gratuitas.
- Reencolar crea un registro nuevo en la cola: empieza sin postulantes y con el conteo de reportes en cero, y los reportes de sus registros anteriores siguen siendo públicos. En Waiting aparece como una app nueva.
- Reencolar exige las dos condiciones de la regla base. Las instalaciones requeridas siguen la misma regla que al subir una app nueva: reencolar no tiene parámetros propios.
- Reencolar no ocupa otro espacio en el total de apps del dev: la app ocupa uno solo, tenga uno o varios registros. El registro nuevo sí ocupa su lugar en la cola y recibe el mínimo y el máximo del plan de pago.
- Solo la cuenta dueña del package name puede reencolar la app.

### Cola y top

- La cola se ordena por grupos y, dentro de cada grupo, por fecha de entrada (ver Cola visible y estados internos). Se muestran las 20 próximas apps y la calificación de cada dev.
- Hay 5 apps en el top. Una app entra al top cuando le toca su turno.
- Tiempo en el top: 72 h en el lanzamiento, luego 24 h. Si se acaba antes de recibir el mínimo de postulaciones, la app pasa a Expirada y vuelve a la cola; si le pasa por segunda vez, pasa a Ignorada (ver Regresos).
- Cada app tiene su propio tiempo límite: se calcula al entrar al top, con el valor vigente del parámetro que le corresponde (el normal o el de su tipo de regreso). Si un parámetro cambia, solo afecta a las apps que entren al top después; las que ya están conservan su tiempo límite.
- Al recibir el mínimo de postulaciones de su plan (12 gratis, 15 de pago), la app pasa a En progreso y libera su lugar.
- En progreso dura como máximo 24 h. Durante sus primeras 12 h acepta postulantes adicionales hasta el máximo de su plan (15 gratis, 20 de pago); las capturas de los adicionales también cuentan para completar el mínimo.
- En cuanto las capturas aprobadas llegan al mínimo, por el dev o por aprobación automática, la app pasa a En prueba y deja de mostrarse en la cola, aunque no hayan pasado las 12 h.
- Si termina la ventana de postulantes adicionales, no quedan capturas pendientes y las aprobadas no llegan al mínimo, la app pasa a Insuficiente y vuelve a la cola (ver Regresos). Mientras quede una captura pendiente o la ventana siga abierta, la app sigue En progreso.

| Caso (plan gratis: mínimo 12) | Resultado |
| --- | --- |
| El dev aprueba 12 en la hora 3 | Pasa a En prueba en la hora 3 |
| Rechaza 1 en la hora 5 y no llega ningún adicional | Espera al cierre de la ventana, en la hora 12, y pasa a Insuficiente |
| Rechaza 1 en la hora 5; llega un adicional en la hora 8 y el dev no lo revisa | Se aprueba solo en la hora 24 y pasa a En prueba |
| Rechaza a ese adicional en la hora 13 | Sin pendientes, ventana cerrada y 11 aprobadas: pasa a Insuficiente |
| El dev no revisa nada | Todo se aprueba solo en la hora 24 y pasa a En prueba |

### Regresos

Un regreso es el mismo registro que vuelve a Waiting: conserva lo que ya consiguió y, al volver al top, solo necesita lo que le falta.

| Regreso | Qué conserva | Tiempo en el top al volver | Límite |
| --- | --- | --- | --- |
| Insuficiente | Sus capturas aprobadas; las rechazadas no cuentan | 6 h | 2 regresos; si queda Insuficiente una tercera vez, pasa a Ignorada |
| Arreglada | Todos sus postulantes | El normal | 2 regresos; si se pausa una tercera vez, pasa a Abandonada sin esperar los 7 días |
| Expirada | Todos sus postulantes, incluidas las capturas pendientes, que se siguen aprobando solas | 12 h | 1 regreso; la segunda expiración la deja Ignorada |

- Las expiraciones se cuentan por registro en la cola, sin importar de dónde venga la app: la primera vez que se le acaba el tiempo en el top, sea nueva o un regreso, pasa a Expirada; la segunda, a Ignorada.
- Cada tipo de regreso tiene su propio contador.
- Al volver a llegar a su mínimo, el regreso pasa otra vez por En progreso con las mismas reglas: 24 h en total y 12 h para postulantes adicionales.
- Una app Arreglada vuelve con el conteo de reportes para pausar en cero. Los reportes anteriores siguen siendo públicos y quedan en su historial.
- Los tiempos y los límites de Insuficiente y Arreglada son parámetros (ver Parámetros configurables). El regreso único de Expirada es fijo.

### Postulaciones y capturas

- Postularse es enviar la captura de instalación. No hay límite de postulaciones simultáneas.
- La postulación es a un registro en la cola, no a la app. Si una app se reencola, quienes se postularon a un registro anterior pueden postularse al nuevo, y esa es una instalación nueva.
- Toda captura, de instalación o de permanencia, empieza como pendiente y pasa a aprobada o rechazada.
- Una captura rechazada no se puede reenviar: el rechazo es definitivo y no se puede apelar.

Una captura de instalación cuenta distinto para la app del dev y para el postulante, según su estado:

| Captura de instalación | Para la app del dev | Para el postulante |
| --- | --- | --- |
| Enviada (pendiente) | Cuenta para el mínimo de postulaciones que la saca del top | Todavía no cuenta |
| Aprobada | Cuenta para el mínimo de aprobadas que la lleva a En prueba | Cuenta para desbloquear su siguiente app |
| Rechazada | Deja de contar para En prueba | No desbloquea. El rechazo es público, pero no afecta su calificación |

- El dev valida todas las postulaciones que recibe, hasta el máximo de su plan. Tiene 24 h por captura y recibe un recordatorio 6 h antes de que se aprueben solas. En En progreso el límite es único: todas las capturas pendientes se aprueban solas como tarde a las 24 h de que la app entró en ese estado, incluidas las de los postulantes adicionales. La demora del dev nunca castiga al postulante.
- Un rechazo requiere una justificación escrita de 30 a 280 caracteres y se basa en la captura, nunca en la calificación del postulante.
- Los 14 días empiezan cuando las capturas aprobadas llegan al mínimo de su plan (12 o 15) y la app pasa a En prueba. La plataforma muestra al dev dos fechas: desde cuándo puede solicitar producción a Google y la fecha en que su app se cierra a más tardar, 72 h después de cumplirse los 14 días.
- Los postulantes adicionales se unen antes de que empiecen los 14 días, así que el día 14 y la ventana de permanencia son los mismos para todos los postulantes de la app.
- La captura de permanencia se envía cuando se cumplen los 14 días, dentro de una ventana de 48 h. Si el postulante no la envía, cuenta como no cumplida en su calificación.
- El dev valida las capturas de permanencia, con una justificación escrita para cada rechazo; sin respuesta dentro de su plazo, se aprueban solas (ver Cierre). El rechazo no se puede apelar y cuenta como no cumplida en la calificación del postulante; no bloquea su siguiente app.

### Cierre

El cierre tiene dos partes:

| Momento | Qué pasa |
| --- | --- |
| Se cumplen los 14 días en prueba | Se abre la ventana de permanencia: cada postulante tiene 48 h para enviar su captura. Recibe un aviso al abrirse y otro 12 h antes de que se cierre la ventana |
| Se cierra la ventana | Quien no envió su captura incumplió. Empieza el plazo del dev: 24 h para validar todas las capturas de permanencia |
| Expira el plazo del dev | Las capturas que no revisó se aprueban solas y la plataforma cierra la app |

- El dev puede validar cada captura apenas llega, sin esperar a que se cierre la ventana. El plazo de 24 h es único para todas las capturas y se cuenta desde que se cierra la ventana.
- El dev no puede cerrar con permanencias pendientes. Aprobar o rechazar todas las capturas, una vez que todos entregaron o se cerró la ventana, es lo que cierra la app de forma manual.
- La app se finaliza en cuanto no queda ninguna permanencia por entregar ni por validar. Si todos los postulantes entregaron y el dev ya las validó todas, se finaliza sin esperar los plazos. Validar antes libera antes al dev para su siguiente app.
- Cerrar es una obligación del dev, pero no cumplirla no tiene consecuencias para él: la plataforma la cierra.
- La captura de Play Console, que muestra si se cumplió el requisito del test cerrado, y el resultado en Google Play (aprobada o rechazada, y si el rechazo tuvo que ver con los testers) son opcionales e informativos. El dev los puede informar cuando quiera, incluso después de que la app se finalizó.

### Reportes de "no abre" o "no disponible"

- Cualquier usuario puede reportar una app, pero solo mientras está en el top. Cada reporte lleva captura, un motivo (no abre, no disponible en mi país, pide login o se cierra) y una justificación escrita de 30 a 280 caracteres.
- La app se pausa cuando recibe **al menos 3 reportes de cuentas distintas** y esos reportes son **más del 50%** de los usuarios que interactuaron con ella (postulaciones más reportes).

| Reportes | Postulaciones | % de reportes | ¿Se pausa? |
| --- | --- | --- | --- |
| 2 | 0 | 100% | No: no llega al mínimo de 3 |
| 3 | 2 | 60% | Sí |
| 3 | 12 | 20% | No: funciona para casi todos |
| 6 | 5 | 55% | Sí |

- Cuando el dev indica que la arregló, la app pasa a Arreglada y vuelve a la cola con sus postulantes, sin verificación automática (ver Regresos).
- Si no la arregla en 7 días, o si se pausa otra vez después de agotar sus regresos como Arreglada, pasa a Abandonada: sigue ocupando su espacio dentro del total de apps del dev, y reencolarla se paga y solo se puede una vez.
- Los reportes no se pueden apelar en el MVP.

### Transparencia de rechazos y reportes

Los rechazos y los reportes son públicos, para que cada usuario pueda juzgar a los demás por lo que hacen. Se muestra todo lo que no comprometa a nadie: nunca las capturas.

- Todos los que participan en la prueba de una app ven los rechazos del dev: a qué postulante, el tipo de captura, el motivo y la justificación.
- Los reportes de una app son públicos: quién reportó, el motivo y la justificación.
- El perfil de cada usuario muestra los rechazos que hizo como dev y los que recibió como postulante.

## Compromisos, desbloqueo y calificación

Cumplir las instalaciones desbloquea la siguiente app. Cumplir las permanencias define la calificación visible de cada usuario.

### Compromisos

| Compromiso del postulante | Plazo | Si no cumple |
| --- | --- | --- |
| Instalar: las capturas de instalación aprobadas requeridas en apps de otros (3 en el lanzamiento) | Desde que subió su app anterior, antes de subir la siguiente | No puede subir su siguiente app |
| Permanencia | 48 h desde que se cumplen los 14 días | Cuenta como no cumplida en su calificación |

Las tareas del dev no son compromisos: no cumplirlas no bloquea ni afecta su calificación.

| Tarea del dev | Plazo | Si no la hace |
| --- | --- | --- |
| Validar las capturas de instalación | 24 h por captura; en En progreso, como tarde 24 h desde que la app entró en ese estado | Se aprueban solas |
| Validar las capturas de permanencia (cerrar) | 24 h desde que se cierra la ventana de permanencia | Se aprueban solas y la plataforma cierra la app |
| Informar el resultado en Google Play | Cuando quiera | Es opcional |

### Cadena de desbloqueo

- La primera app no requiere compromisos previos. Así se alimenta la plataforma.
- Desde la segunda, el usuario sube su siguiente app al cumplir las dos condiciones de la regla base.
- Instalar es obligatorio: el compromiso se cumple al reunir las instalaciones aprobadas requeridas en apps de otros desde que el usuario subió su app anterior. Las capturas pendientes no cuentan hasta que se aprueban.
- Las instalaciones requeridas se exigen desde la segunda app, en cada ciclo: 3 para la segunda, otras 3 para la tercera, y así. Son un parámetro por plan: para la segunda app rige el valor de las apps gratuitas y, desde la tercera, el de las apps de pago. Ambos empiezan en 3 y nunca bajan de 1, que es el mínimo de la regla base.
- El número de instalaciones requeridas queda fijado al subir la app anterior. Si el parámetro cambia, no afecta a los usuarios que ya están en curso: el nuevo valor les aplica desde la siguiente app que suban.
- Las instalaciones aprobadas desbloquean la siguiente app sin esperar los 14 días. Las permanencias de esas postulaciones no bloquean, se cumplan o no.
- La cadena aplica igual en el plan de pago: pagar quita el límite de cantidad, no las condiciones de la regla base.
- Si una app termina Abandonada, sigue ocupando su espacio dentro del total de apps del dev, incluidas las 2 gratuitas. Reencolarla se paga y solo se puede una vez.
- Si una app termina Ignorada, el dev queda libre para su siguiente app y la app sigue ocupando su espacio dentro de su total. No se puede reencolar.
- Si la app a la que se postuló termina Ignorada o Abandonada, el postulante no tiene permanencia pendiente, porque los 14 días nunca empezaron. Su instalación aprobada cuenta igual para su siguiente app.

### Calificación

La calificación mide solo cómo cumple cada usuario sus permanencias como postulante. Nadie califica a nadie y lo que hace como dev no cuenta.

- **Formato:** "11 de 12 permanencias cumplidas".
- **Cumplida:** la captura se entregó dentro de la ventana y se aprobó, por el dev o sola.
- **No cumplida:** la captura no se entregó a tiempo o el dev la rechazó.
- **Pendiente:** no cuenta hasta que se resuelve.
- **Período:** todo el historial del usuario.
- **Cuentas nuevas:** muestran la insignia "Nuevo" hasta su primera permanencia resuelta, sea aprobada, rechazada o no entregada.
- **Visible:** aparece en la cola, junto a cada dev, y en las postulaciones. El perfil muestra cuántas permanencias no se entregaron y cuántas se rechazaron.
- **En la cola:** como mide cuánto permanece cada uno en las apps de otros, los postulantes pueden usarla para elegir a qué devs ayudar.
- **No bloquea:** es informativa. El dev ve la calificación de quienes se postulan, pero no puede rechazar a nadie por ella: el rechazo se basa en la captura. Una calificación mínima para subir otra app queda fuera del MVP (ver Pendientes).

## Planes, pagos y reembolsos

El modelo es de pago por uso, sin suscripción: se paga por cada app después de las 2 gratuitas y por cada reencolado.

| Plan | Apps en total | Apps activas a la vez | Mínimo para avanzar | Máximo de postulantes | Costo |
| --- | --- | --- | --- | --- | --- |
| Gratis | 2 | 1 | 12 | 15 | Sin costo |
| Pago por uso | Ilimitadas | 1 | 15 | 20 | Un pago por cada app adicional y por cada reencolado (precio por definir) |

Las 2 primeras apps de cada usuario son siempre gratuitas, para facilitar la entrada; no se puede pagar al subirlas para obtener el margen del plan de pago. Desde la tercera, cada app se paga e incluye el mínimo y el máximo del plan de pago: no son compras separadas. Su margen extra de postulantes reduce el riesgo de quedar por debajo de los 12 testers que exige Google si alguno abandona.

Una app Abandonada o Ignorada sigue ocupando su espacio dentro de ese total. Si era gratuita, consumió una de las 2 gratuitas.

Reencolar una app Abandonada o Finalizada se paga siempre, aunque al usuario le queden apps gratuitas. No ocupa otro espacio en su total. El registro nuevo recibe el mínimo y el máximo del plan de pago.

### Reembolsos

Solo se reembolsa lo pagado cuando falla la plataforma; por ejemplo, se cobró una app que no entró a la cola, o la app desapareció de la cola por un error del sistema. Nada que dependa de la app o del dev se reembolsa.

### Usuarios que agotan sus apps gratuitas

Pueden seguir postulándose como testers y manteniendo su calificación. La plataforma los invita a seguir activos y a pasar al pago por uso: son los testers con historial que la cola necesita.

## Notificaciones

La plataforma avisa en cada etapa del proceso, por email y con notificaciones web push del navegador. Los avisos de posición se basan en cuántas posiciones faltan, no en tiempos estimados.

| Evento | Para | Ejemplo |
| --- | --- | --- |
| A 10 posiciones de las 20 visibles | Dev | "Tu app está cerca de aparecer en la cola" |
| Entra a las 20 visibles | Dev | "Tu app ya aparece en la cola" |
| A 3 posiciones del top | Dev | "Estás a 3 posiciones del top" |
| Entra al top | Dev | "Tu app está en el top y ya recibe postulaciones" |
| Recibe postulaciones | Dev | "Tienes 4 capturas por validar" |
| 6 h antes de que las capturas de instalación se aprueben solas | Dev | "Tus capturas se aprueban solas en 6 h" |
| Expira el tiempo en el top | Dev | "Tu app volvió a la cola con sus postulantes" |
| Pasa a En progreso | Dev | "Alcanzaste tu mínimo de postulantes: valida sus capturas" |
| Pasa a En prueba | Dev y postulantes | "Se aprobó el mínimo de capturas: empiezan los 14 días" |
| Pasa a Insuficiente | Dev | "Tu app no llegó al mínimo de capturas aprobadas" |
| Vuelve a la cola como Insuficiente o Arreglada | Dev | "Tu app volvió a la cola en la posición 3" |
| Captura aprobada o rechazada | Postulante | "Rechazaron tu captura: no se ve la app instalada" |
| Se abre la ventana de permanencia | Postulante | "Hoy toca tu captura de permanencia: tienes 48 h para enviarla" |
| 12 h antes de que se cierre la ventana de permanencia | Postulante | "Te quedan 12 h para enviar tu captura de permanencia" |
| Se cerró la ventana sin su captura | Postulante | "No enviaste tu captura de permanencia: cuenta como no cumplida en tu calificación" |
| Se cierra la ventana de permanencia | Dev | "Tienes 24 h para validar las permanencias de tu app" |
| 6 h antes de que las permanencias se aprueben solas | Dev | "Tus permanencias se aprueban solas en 6 h" |
| Pasa a Finalizada | Dev | "Tu app se cerró. Ya puedes informar cómo te fue en Google Play" |
| App pausada por reportes | Dev | "Tu app se pausó: varios usuarios no pueden abrirla" |
| Pasa a Abandonada | Dev | "Tu app quedó abandonada. Puedes reencolarla una vez, pagando" o, si ya se reencoló desde Abandonada, "Tu app quedó abandonada y ya no se puede reencolar" |
| Pasa a Ignorada | Dev | "Tu app no consiguió su mínimo de postulantes y quedó ignorada" |
| Pasa a Ignorada o Abandonada | Postulantes | "Tu instalación cuenta para tu siguiente app; no tienes permanencia pendiente" |
| Siguiente app desbloqueada | Usuario | "Ya puedes subir tu siguiente app" |

## Parámetros configurables

Casi todas las reglas dependen de un parámetro. El valor inicial es el número con el que arranca el lanzamiento, y se ajusta con las señales de la cola.

### Cola

| Parámetro | Tipo | Valores aceptados | Inicial |
| --- | --- | --- | --- |
| Tamaño del top | Número | 1–20 | 5 |
| Apps visibles en la cola | Número | 10–100 | 20 |
| Mínimo de postulantes, plan gratuito | Número | 12–20 | 12 |
| Máximo de postulantes, plan gratuito | Número | Desde su mínimo hasta 30 | 15 |
| Mínimo de postulantes, plan de pago | Número | 12–20 | 15 |
| Máximo de postulantes, plan de pago | Número | Desde su mínimo hasta 30 | 20 |
| Tiempo en el top | Horas | 12–168 | 72 (luego 24) |
| Tiempo en el top al volver como Insuficiente | Horas | 1–24 | 6 |
| Tiempo en el top al volver como Arreglada | Horas | 12–168 | Igual al tiempo en el top |
| Tiempo en el top al volver como Expirada | Horas | 1–24 | 12 |
| Regresos a la cola como Insuficiente | Número | 0–5 | 2 |
| Regresos a la cola como Arreglada | Número | 0–5 | 2 |
| Ventana para postulantes adicionales | Horas desde que la app entra En progreso | Menor que el plazo del dev para validar | 12 |
| Al expirar el tiempo en el top | Opción | Volver a la cola conservando postulantes · Volver a la cola sin postulantes | Conservando postulantes |

### Capturas y validación

| Parámetro | Tipo | Valores aceptados | Inicial |
| --- | --- | --- | --- |
| Plazo del dev para validar | Horas | 12–72 | 24. Para las permanencias se cuenta desde que se cierra la ventana |
| Recordatorio antes de la aprobación automática | Horas antes | 1–12 | 6 |
| Ventana para la captura de permanencia | Horas desde que se cumplen los 14 días | 24–96 | 48 |
| Aviso antes de que se cierre la ventana de permanencia | Horas antes | 1–24 | 12 |
| Justificación de rechazos y reportes: mínimo | Caracteres | 10–100 | 30 |
| Justificación de rechazos y reportes: máximo | Caracteres | 100–500 | 280 |
| Retención de capturas | Días desde que se envía cada captura | 30–365 | 90 |

### Reportes

| Parámetro | Tipo | Valores aceptados | Inicial |
| --- | --- | --- | --- |
| Mínimo de reportes de cuentas distintas | Número | 2–10 | 3 |
| Porcentaje de reportes para pausar | % | 30–90 | Más del 50 |
| Días para arreglar una app pausada | Días | 1–30 | 7 |

### Avisos de posición

| Parámetro | Tipo | Valores aceptados | Inicial |
| --- | --- | --- | --- |
| Aviso de cercanía a la lista visible | Posiciones antes | 5–50 | 10 |
| Aviso de cercanía al top | Posiciones antes | 1–10 | 3 |

### Planes y funciones

| Parámetro | Tipo | Valores aceptados | Inicial |
| --- | --- | --- | --- |
| Apps gratuitas en total | Número | 1–10 | 2 |
| Instalaciones aprobadas requeridas para subir una app gratuita, desde la app anterior | Número | 1–15 | 3 |
| Instalaciones aprobadas requeridas para subir una app de pago, desde la app anterior | Número | 1–15 | 3 |
| Apps activas a la vez por dev | Número | Fijo en 1 durante el MVP | 1 |
| Grupos de Google | Opción | Solo el de la plataforma · Plataforma y propios | Solo el de la plataforma |

El límite de una sola vez para reencolar una app Abandonada es fijo.

## Riesgos asumidos, privacidad y avisos

El MVP acepta varios riesgos a cambio de simplicidad y de no castigar a usuarios honestos; cada uno tiene una mitigación parcial.

### Riesgos asumidos

| Riesgo | Por qué se asume | Mitigación |
| --- | --- | --- |
| La primera app libre atrae apps de usuarios que nunca prueban otras | Sin ella la plataforma no arranca | Instalaciones requeridas para subir la segunda app (parámetro); package name único |
| Postulantes que no entregan la permanencia | La permanencia no bloquea; queda a criterio de cada postulante | Calificación visible sobre todo el historial; aviso al abrirse la ventana y otro antes de que se cierre; margen de postulantes del plan de pago |
| Las instalaciones aprobadas desbloquean la siguiente app antes de las permanencias | Esperar 14 días por cada app aleja a los devs con varias apps por subir | La calificación muestra las permanencias no cumplidas |
| Postulantes de paso: consiguen sus instalaciones aprobadas, suben su siguiente app y salen de los tests antes del día 14 | Bloquear por la permanencia agrega condiciones a la regla base y la vuelve difícil de seguir | Calificación visible; los postulantes pueden elegir a qué devs ayudar según su calificación; margen del plan de pago; señal para volver a evaluar |
| Devs que no validan ni cierran | Lo que hace como dev no afecta su calificación ni bloquea | Aprobación automática y cierre automático; validar antes lo libera antes para su siguiente app; el historial de estados registra cada aprobación automática |
| Postulantes que envían capturas malas en muchas apps | Pocas instalaciones aprobadas (3 en el lanzamiento) desbloquean la siguiente app | Rechazos públicos y validación del dev |
| Capturas falsas aprobadas automáticamente | Es mejor que castigar al postulante por la demora del dev | Recordatorio al dev. Sin detección de duplicados, el dev es el único filtro |
| Capturas reutilizadas sin detección de duplicados | La detección queda fuera del MVP | Validación del dev y rechazos públicos |
| Calificación inflada por permanencias aprobadas solas | El dev no está obligado a validar | Validar antes libera antes al dev; el historial de estados permite medir la proporción de aprobaciones automáticas |
| Rechazos injustos del dev | No hay moderación ni apelación en el MVP | Un rechazo de permanencia no bloquea: solo cuenta en la calificación. Justificación escrita obligatoria y rechazos públicos |
| El dev no puede actuar según la calificación del postulante | El rechazo se basa en la captura, nunca en la calificación | La calificación sirve del lado del postulante, que elige a qué devs ayudar |
| Una permanencia no cumplida queda para siempre en la calificación | La calificación cubre todo el historial | Ventana de 48 h y aviso antes de que se cierre |
| Al lanzamiento, todos los usuarios muestran "Nuevo" durante las primeras semanas | La primera permanencia se resuelve recién después de los 14 días | Se deja de ser "Nuevo" con la primera permanencia resuelta |
| Reportes falsos o malintencionados | Cualquiera puede reportar y no hay apelación en el MVP | Mínimo de 3 cuentas distintas y más del 50%; los reportes son públicos |
| Disponibilidad por país declarada sin verificar | No se puede validar de forma automática | Reportes y pausa automática |
| Grupo de Google confirmado sin verificar | No hay conexión con Google Play | Reportes y pausa automática |
| Link de Google Play incorrecto | No se puede corregir después de subir la app; es responsabilidad del dev | Reportes y pausa automática |
| Postulantes que salen del test antes del día 14 | No hay conexión con Google Play ni forma de detectarlo | Captura de permanencia y su rechazo por el dev |
| Una app pausada vuelve sin estar arreglada | La apelación no se puede verificar | Si sigue fallando, los nuevos reportes la pausan otra vez; después de 2 regresos, la siguiente pausa la deja Abandonada |
| Una persona con varias cuentas | Verificar identidad queda fuera del MVP | Package name único y calificación |
| Un dev que abandona la plataforma | No hay forma de obligarlo a volver | Aprobación automática y cierre automático |
| Participación mínima: abrir la app solo para la captura | Las capturas prueban que se abrió, no que se usó | Aviso de que no se garantiza la aprobación de Google |
| Apps gratuitas que avanzan con solo 12 postulantes, sin margen | Es el mínimo de Google, y la permanencia no bloquea | Aceptan hasta 15 postulantes; se avisa al dev que un abandono puede dejarlo por debajo de 12 |
| Pocos datos sobre el resultado en Google Play | Informarlo es opcional | La señal para volver a evaluar se basa en las permanencias no entregadas y rechazadas |

### Privacidad de las capturas

- Una captura puede mostrar el email, la foto o las notificaciones del postulante. La plataforma le pide recortar o tapar datos personales antes de enviarla.
- Solo el dev de esa app ve las capturas. Los rechazos y reportes son públicos, pero sin sus capturas.
- Todas las capturas (de instalación, de permanencia, de reportes y de Play Console) se borran 90 días después de enviarse, sin importar cómo termine la app.

### Baja de usuarios

La baja de usuarios queda fuera del MVP: en el lanzamiento no se pueden eliminar cuentas.

### Aviso en los términos y en la pantalla de subida

> La plataforma te ayuda a conseguir testers reales y comprometidos, pero no garantiza el acceso a producción. Esa decisión es de Google.

La captura de Play Console y el resultado en Google Play son informativos y alimentan las estadísticas de la plataforma.

## Pendientes y fuera del MVP

El concepto está cerrado; quedan decisiones que se toman con datos, cerca del lanzamiento o que siguen en análisis.

### Por decidir dentro del MVP

- [ ] **Desde cuándo se cuentan las instalaciones al reencolar:** las instalaciones requeridas se cuentan "desde que subió su app anterior". Con reencolados, ¿el conteo empieza en la subida de la app o en el último registro? Con esta regla, quien reencola podría usar instalaciones de un ciclo que ya cerró. Recomendación: contar desde el último registro, sea una app nueva o un reencolado.
- [ ] **Qué número de instalaciones se exige al reencolar:** el parámetro cambia según el número de app: la segunda usa el del plan gratuito y desde la tercera el del plan de pago. Un reencolado no es la "segunda" ni la "tercera" app. Por ejemplo, si alguien tiene una sola app Finalizada y la reencola, ¿cuál se aplica? Como el reencolado siempre se paga, lo coherente parece el del plan de pago.
- [ ] **En qué ciclo cuenta una instalación:** si alguien se postula antes de subir su app y la instalación se aprueba después, ¿para qué ciclo cuenta? Hay que decidir si manda la fecha en que se postuló o la fecha en que se aprobó.
- [ ] **Panel de administración:** alcance y funciones (editar los parámetros sin deploy, incidencias, reembolsos, historial de estados de los registros).

### Por decidir cerca del lanzamiento

- [ ] Precio por app adicional y por reencolar una app.
- [ ] Valores iniciales definitivos de los parámetros.
- [ ] Plan de arranque: de dónde vienen los primeros 20 a 50 usuarios activos.

### Para la sesión de arquitectura

- Evaluar máquinas de estados para los registros en la cola, las capturas (pendiente, aprobada o rechazada) y los compromisos (pendiente, cumplido o expirado). Las transiciones y sus condiciones, incluida la cadena de responsabilidad, quedan explícitas, y cada transición alimenta el historial de estados. Lo más delicado son las transiciones por plazo: expiración del tiempo en el top, aprobación automática, cierre de la ventana de permanencia y cierre automático de la app.

### Fuera del MVP

- Calificación mínima para subir otra app: se define con datos reales del lanzamiento. En el MVP la calificación es informativa y no bloquea.
- Apps simultáneas por dev, respetando la cadena de responsabilidad. Punto de partida: permitir una app nueva si el usuario reunió X instalaciones aprobadas nuevas desde la última app.
- Grupos de Google propios del dev, como función activable.
- Extensión pagada del tiempo en el top: hoy va en contra de agilizar la cola. Si se retoma, se define entonces.
- Traspaso de package names entre cuentas.
- Avisos por tiempo estimado de espera.
- Moderación de rechazos y apelaciones de capturas y de reportes.
- Baja de usuarios, solo sin compromisos pendientes. Falta definir cómo y cuándo se elimina la cuenta (por ejemplo, con una tarea programada) y qué pasa con su historial público: rechazos, reportes y calificación visibles en las apps de otros.
- Detección de capturas duplicadas. Criterio si se retoma: bloquear solo el mismo archivo exacto; una captura nueva parecida a una anterior del mismo postulante para la misma app se acepta, porque puede volver a postularse cuando la app se reencola.

### Fuentes

- [Requisitos de prueba para cuentas personales nuevas — Ayuda de Play Console](https://support.google.com/googleplay/android-developer/answer/14151465)
