# PRD — Cola de testers para Google Play

Nov 1, 2026 · @Carlos

## Resumen y problema

Una plataforma comunitaria donde las apps que deben pasar la prueba cerrada de Google Play avanzan en una cola: solo 5 apps se pueden probar a la vez, y cada una cede su lugar al conseguir el mínimo de postulantes de su plan: 12 en el gratuito, 15 en el de pago.

### Problema

Google exige a las cuentas personales de desarrollador nuevas un test cerrado con al menos 12 testers inscritos durante los últimos 14 días continuos antes de solicitar acceso a producción ([Ayuda de Play Console](https://support.google.com/googleplay/android-developer/answer/14151465)).

Las comunidades actuales de intercambio de testers funcionan como un feed. Con la llegada masiva de apps hechas con IA, una app publicada queda perdida en pocas horas: hay muchas apps, la mayoría con pocos testers, y completar la prueba cerrada se vuelve difícil.

### Propuesta de valor

- **Atención concentrada:** el top limita cuántas apps compiten por testers al mismo tiempo.
- **Turno visible:** cada dev ve su posición y recibe avisos a medida que se acerca.
- **Compromisos verificables:** capturas de instalación y de permanencia, y una calificación visible para todos.
- **Gratis para empezar:** la primera app entra sin requisitos.

La plataforma consigue testers reales y comprometidos. No garantiza el acceso a producción: esa decisión es de Google.

## Regla base: la cadena de responsabilidad

Toda función, gratuita o de pago, actual o futura, debe respetar la cadena de responsabilidad: nadie sube su siguiente app sin haber cumplido los compromisos de la anterior, como dev y como postulante.

Es la regla sobre la que se sostiene la plataforma. Si una función permite saltarse un compromiso, se rediseña o no se incluye.

> Para quien construya la plataforma, sean personas o agentes de IA: antes de agregar o cambiar una función, verificar que respete esta regla. Si no la respeta, no se implementa.

### Cómo evaluar una función nueva

1. ¿Permite subir una app sin haber cumplido los compromisos del ciclo anterior? Entonces no se incluye.
2. ¿Permite evitar un compromiso (entregar una captura, validar, cerrar) sin que afecte la calificación? Entonces no se incluye.
3. ¿Cambia cuánto o cómo se cumple, sin quitar ninguna obligación? Entonces se puede incluir.

### Funciones de pago evaluadas

| Función | ¿Respeta la cadena? | Por qué |
| --- | --- | --- |
| Apps adicionales | Sí | Cada app sigue requiriendo los compromisos de la anterior |
| Extensión del tiempo en el top | Sí | Da más tiempo para conseguir postulantes; no quita ningún compromiso |
| Más postulantes (mínimo 15, hasta 20) | Sí | Exige más testers y más validaciones al dev; no quita ningún compromiso |

## Objetivos y alcance del MVP

El MVP busca que cada app consiga los testers comprometidos de su plan sin que la cola se detenga.

### Objetivos

- Que cada app que llega al top consiga el mínimo de postulantes de su plan.
- Que la cola avance: ninguna app ocupa el top indefinidamente.
- Que devs y postulantes cumplan sus compromisos, incentivados por la calificación y la cadena de desbloqueo.
- Reunir datos sobre cómo terminó cada prueba cerrada.

### Señales para ajustar la cola

| Señal | Qué indica | Ajuste |
| --- | --- | --- |
| La cola crece semana a semana | Entran más apps de las que salen | Subir las instalaciones requeridas para llegar al top |
| Las apps del top se llenan en minutos y los testers no encuentran dónde postularse | Hay más testers que apps disponibles | Ampliar el top |

### Incluido en el MVP

- Cola con top, estados, tiempos límite y reportes de apps que no abren.
- Postulaciones con capturas de instalación y de permanencia, validadas por el dev con aprobación automática.
- Cadena de desbloqueo por compromisos y calificación visible.
- Plan gratuito y pago por uso.
- Notificaciones en cada etapa.
- Parámetros configurables.

### Fuera del alcance

- Garantizar el acceso a producción en Google Play.
- Validar automáticamente capturas, disponibilidad por país o apelaciones.
- Arquitectura técnica: se define en otra sesión.
- Funciones posteriores al MVP, listadas en Pendientes.

## Terminología y principios

La plataforma no usa la palabra "aplicación": el software es una **app** y la acción del tester es una **postulación**.

### Terminología

| Término | Significado |
| --- | --- |
| App | El software que se sube para conseguir testers |
| Usuario | Una sola cuenta que actúa en dos roles: dev y postulante |
| Dev | El usuario cuando sube su app |
| Postulante | El usuario cuando se postula a la app de otro |
| Postulación | La acción de postularse; siempre incluye la captura de instalación |
| Captura de instalación | Prueba de que el postulante instaló la app (día 1) |
| Captura de permanencia | Prueba de que el postulante siguió en el test (día 14) |
| Validación | El dev aprueba o rechaza una captura; sin respuesta en plazo, se aprueba sola |
| Compromiso | Una obligación con plazo: instalar, permanecer, validar o cerrar |
| Cierre | El dev valida las permanencias e informa cómo le fue en Google Play |
| Top | Las apps activas que pueden recibir postulaciones |
| Package name | El identificador de la app en Google Play, extraído de su link |

### Principios: confianza y contención

La plataforma equilibra dos sistemas para que la cola avance. **Confianza** es lo que queda a criterio de los usuarios. **Contención** es lo que la plataforma exige o restringe.

| Confianza | Contención |
| --- | --- |
| La primera app entra sin requisitos | Compromisos para desbloquear la siguiente app |
| El dev valida las capturas | Aprobación automática al vencer el plazo |
| El postulante elige a qué apps postularse | Instalaciones requeridas para llegar al top |
| El dev declara que su app está disponible en todos los países | Tiempo límite en el top |
| El dev indica que arregló una app pausada | Pausa automática por reportes |
| El dev informa su resultado en Google Play | Cierre automático al día límite |
| Cada usuario ve la calificación de los demás | Detección de capturas duplicadas |

## Flujo y estados de una app

Una app avanza en línea recta de la cola al cierre, salvo cuando vence su tiempo en el top o recibe suficientes reportes.

&#91;embedded content: estados de una app · 7 estados\]

Si vence el tiempo en el top, la app vuelve a la cola con sus postulantes; si la pausan y el dev la arregla, regresa cerca del top.

| Estado | Qué pasa |
| --- | --- |
| En cola | Espera su turno por antigüedad; aparece en la lista si está entre las 20 próximas |
| En el top | Recibe postulaciones durante su tiempo límite y puede ser reportada |
| En progreso | Alcanzó el mínimo de su plan (12 o 15): corren los 14 días y acepta hasta el máximo (15 o 20) |
| Por cerrar | Desde el día 14: el dev valida las permanencias y cierra |
| Finalizada | La cerró el dev o la plataforma al día límite; el dev queda libre para su siguiente app |
| Pausada | Recibió suficientes reportes; espera que el dev la arregle |
| Abandonada | No se arregló a tiempo; el dev pierde el desbloqueo usado |

## Reglas de operación

Cada dev tiene una sola app activa a la vez, que avanza por orden de llegada y sale del top al conseguir el mínimo de postulantes de su plan: 12 en el gratuito, 15 en el de pago.

### Subida de una app

- El dev pega el link de Google Play de su test cerrado; la plataforma extrae el package name.
- Cada package name pertenece a una sola cuenta: la primera que lo registra.
- El dev marca una casilla confirmando que la app está disponible en todos los países.
- El test cerrado usa el grupo de Google de la plataforma. Los grupos propios del dev quedan como función activable.
- La primera app entra sin requisitos. Las siguientes dependen de la cadena de desbloqueo (ver Compromisos).
- Una app activa a la vez por dev, en plan gratuito y de pago. Una app deja de estar activa al llegar a Finalizada o Abandonada.
- La pantalla de subida muestra el aviso de que la plataforma no garantiza el acceso a producción.

### Cola y top

- La cola se ordena por antigüedad. Se muestran las 20 próximas apps y la calificación de cada dev.
- Hay 5 apps en el top. Para entrar, la app necesita su turno y que el dev tenga las instalaciones requeridas (0 en el lanzamiento).
- Tiempo en el top: 72 h en el lanzamiento, luego 24 h. Al vencer, la app vuelve a la cola conservando sus postulantes y, cuando regresa, solo necesita los que le faltan.
- El dev puede pagar una extensión del tiempo en el top. Como máximo 2 apps con extensión pagada a la vez.
- Al recibir el mínimo de postulaciones de su plan (12 gratis, 15 de pago), la app pasa a En progreso y libera su lugar. Sigue aceptando postulaciones hasta el máximo de su plan (15 gratis, 20 de pago).

### Postulaciones y capturas

- Postularse es enviar la captura de instalación. No hay límite de postulaciones simultáneas.
- La instalación cuenta para el postulante al enviarla; si el dev la rechaza, se descuenta.
- El dev valida todas las postulaciones que recibe, hasta el máximo de su plan. Tiene 24 h y recibe un recordatorio 6 h antes de que se aprueben solas. La demora del dev nunca castiga al postulante.
- Un rechazo requiere una justificación escrita de 30 a 280 caracteres y se basa en la captura, nunca en la calificación del postulante.
- La plataforma bloquea capturas duplicadas o casi idénticas antes de que lleguen al dev.
- Los 14 días empiezan cuando se validan las capturas del mínimo de su plan (12 o 15). La plataforma muestra al dev dos fechas: desde cuándo puede solicitar producción a Google y su fecha límite de cierre.
- La captura de permanencia se envía el día 14, con 2 días de margen.

### Cierre

- Antes del día límite (día 20), el dev valida las permanencias y sube una captura de Play Console que muestra si se cumplió el requisito del test cerrado. Esa captura es informativa: no comprueba ni bloquea nada.
- Si el dev no cierra a tiempo, la plataforma cierra la app y su calificación baja.
- El resultado final de producción (aprobada o rechazada, y si el rechazo tuvo que ver con los testers) es opcional e informativo.

### Reportes de "no abre" o "no disponible"

- Solo se puede reportar una app mientras está en el top. Cada reporte lleva captura, un motivo (no abre, no disponible en mi país, pide login o se cierra) y una justificación escrita de 30 a 280 caracteres.
- La app se pausa cuando recibe **al menos 3 reportes de cuentas distintas** y esos reportes son **más del 50%** de los usuarios que interactuaron con ella (postulaciones más reportes).

| Reportes | Postulaciones | % de reportes | ¿Se pausa? |
| --- | --- | --- | --- |
| 2 | 0 | 100% | No: no llega al mínimo de 3 |
| 3 | 2 | 60% | Sí |
| 3 | 12 | 20% | No: funciona para casi todos |
| 6 | 5 | 55% | Sí |

- Cuando el dev indica que la arregló, la app vuelve cerca del top con sus postulantes, sin verificación automática.
- Si no la arregla en 7 días, pasa a Abandonada: el dev pierde el desbloqueo usado y su calificación baja.

## Compromisos, desbloqueo y calificación

Cumplir los compromisos, como dev y como postulante, desbloquea la siguiente app y define la calificación visible de cada usuario.

### Compromisos

| Rol | Compromiso | Plazo | Si no cumple |
| --- | --- | --- | --- |
| Postulante | Captura de instalación | Al postularse | No hay postulación |
| Postulante | Captura de permanencia | Día 14, con 2 días de margen | Baja su calificación y bloquea su siguiente app |
| Dev | Validar las capturas recibidas | 24 h por captura | Se aprueban solas y baja su calificación |
| Dev | Cerrar la app | Día 20 | La plataforma la cierra y baja su calificación |

### Cadena de desbloqueo

- La primera app no requiere compromisos previos. Así se alimenta la plataforma.
- Los compromisos del ciclo de una app desbloquean la siguiente: los de la app 1 desbloquean la 2, los de la 2 la 3, y así sucesivamente.
- Cuentan ambos roles: los compromisos como dev de esa app y los compromisos como postulante adquiridos durante ese ciclo.
- La cadena aplica igual en el plan de pago: pagar quita el límite de cantidad, no los compromisos.
- Si una app termina Abandonada, el desbloqueo usado para subirla se pierde.

### Calificación

La calificación se calcula con métricas objetivas, no con estrellas: nadie califica a nadie, el sistema mide el cumplimiento.

| Rol | Métrica | Peso |
| --- | --- | --- |
| Postulante | Permanencias entregadas a tiempo | 40% |
| Postulante | Instalaciones aprobadas (no rechazadas) | 20% |
| Dev | Capturas validadas a tiempo | 20% |
| Dev | App cerrada a tiempo | 20% |

- La permanencia pesa más porque decide si el dev cumple el requisito de Google.
- **Promedio suavizado:** cada usuario arranca como si tuviera 3 compromisos al 80%, para que un primer fallo no lo hunda.
- **Lo reciente pesa más:** un compromiso de hace 90 días pesa la mitad que uno de hoy.
- **Visible:** la calificación general aparece en la cola y en las postulaciones; el perfil muestra el detalle por tipo de compromiso.
- **Cuentas nuevas:** muestran la insignia "Nuevo" en lugar de un número hasta completar 3 compromisos.
- El dev ve la calificación de quienes se postulan, pero la app avanza igual al llegar a su mínimo de postulantes.

## Planes, pagos y reembolsos

El modelo es de pago por uso, sin suscripción: se paga por cada app después de las 2 gratuitas y por cada extensión del tiempo en el top.

| Plan | Apps en total | Apps activas a la vez | Mínimo para avanzar | Máximo de postulantes | Costo |
| --- | --- | --- | --- | --- | --- |
| Gratis | 2 | 1 | 12 | 15 | Sin costo |
| Pago por uso | Ilimitadas | 1 | 15 | 20 | Un pago por cada app adicional (precio por definir) |

Las apps pagadas, es decir, las que se suben después de las 2 gratuitas, usan el mínimo y el máximo del plan de pago. Su margen extra de postulantes reduce el riesgo de quedar por debajo de los 12 testers que exige Google si alguno abandona.

### Extensión del tiempo en el top

- Pago individual por cada extensión, en cualquier plan.
- Como máximo 2 apps con extensión pagada a la vez en el top, para no frenar la cola.
- El tiempo pagado corre pase lo que pase con la app; si se pausa, es responsabilidad del dev.

### Reembolsos

Solo se reembolsa lo pagado cuando falla la plataforma; por ejemplo, la extensión pagada no se aplicó, o la app desapareció de la cola por un error del sistema. Nada que dependa de la app o del dev se reembolsa.

### Usuarios que agotan sus apps gratuitas

Pueden seguir postulándose como testers y manteniendo su calificación. La plataforma los invita a seguir activos y a pasar al pago por uso: son los testers con historial que la cola necesita.

## Notificaciones

La plataforma avisa en cada etapa del proceso. Los avisos de posición se basan en cuántas posiciones faltan, no en tiempos estimados.

| Evento | Para | Ejemplo |
| --- | --- | --- |
| A 10 posiciones de las 20 visibles | Dev | "Tu app está cerca de aparecer en la cola" |
| Entra a las 20 visibles | Dev | "Tu app ya aparece en la cola" |
| A 3 posiciones del top | Dev | "Estás a 3 posiciones del top" |
| Entra al top | Dev | "Tu app está en el top y ya recibe postulaciones" |
| Recibe postulaciones | Dev | "Tienes 4 capturas por validar" |
| 6 h antes de la aprobación automática | Dev | "Tus capturas se aprueban solas en 6 h" |
| Vence el tiempo en el top | Dev | "Tu app volvió a la cola con sus postulantes" |
| Pasa a En progreso | Dev | "Alcanzaste tu mínimo de postulantes: empiezan los 14 días" |
| Captura aprobada o rechazada | Postulante | "Rechazaron tu captura: no se ve la app instalada" |
| Toca la captura de permanencia | Postulante | "Hoy toca tu captura de permanencia" |
| Toca validar permanencias y cerrar | Dev | "Valida las permanencias y cierra antes del día 20" |
| App pausada por reportes | Dev | "Tu app se pausó: varios usuarios no pueden abrirla" |
| Siguiente app desbloqueada | Usuario | "Cumpliste tus compromisos: ya puedes subir tu siguiente app" |

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
| Instalaciones requeridas para llegar al top | Número | 0–15 | 0 |
| Al vencer el tiempo en el top | Opción | Volver a la cola conservando postulantes · Volver al final sin postulantes | Conservando postulantes |

### Capturas y validación

| Parámetro | Tipo | Valores aceptados | Inicial |
| --- | --- | --- | --- |
| Plazo del dev para validar | Horas | 12–72 | 24 |
| Recordatorio antes de la aprobación automática | Horas antes | 1–12 | 6 |
| Margen para la captura de permanencia | Días después del día 14 | 0–5 | 2 |
| Justificación de rechazos y reportes: mínimo | Caracteres | 10–100 | 30 |
| Justificación de rechazos y reportes: máximo | Caracteres | 100–500 | 280 |
| Detección de capturas duplicadas | Opción | Apagada · Advertir al dev · Bloquear | Bloquear |
| Retención de capturas | Días después de finalizar | 7–90 | 30 |

### Cierre y reportes

| Parámetro | Tipo | Valores aceptados | Inicial |
| --- | --- | --- | --- |
| Día límite de cierre | Día del test | 15–21 | 20 |
| Mínimo de reportes de cuentas distintas | Número | 2–10 | 3 |
| Porcentaje de reportes para pausar | % | 30–90 | Más del 50 |
| Días para arreglar una app pausada | Días | 1–30 | 7 |

### Calificación

| Parámetro | Tipo | Valores aceptados | Inicial |
| --- | --- | --- | --- |
| Peso: permanencias a tiempo | % | 0–100 | 40 |
| Peso: instalaciones aprobadas | % | 0–100 | 20 |
| Peso: capturas validadas a tiempo | % | 0–100 | 20 |
| Peso: app cerrada a tiempo | % | 0–100 | 20 |
| Compromisos para dejar de ser "Nuevo" | Número | 1–10 | 3 |
| Valor neutral del promedio suavizado | % | 50–100 | 80 |
| Peso del valor neutral | Compromisos equivalentes | 1–10 | 3 |
| Vida media de lo reciente | Días | 30–365 | 90 |

Los cuatro pesos deben sumar 100.

### Avisos de posición

| Parámetro | Tipo | Valores aceptados | Inicial |
| --- | --- | --- | --- |
| Aviso de cercanía a la lista visible | Posiciones antes | 5–50 | 10 |
| Aviso de cercanía al top | Posiciones antes | 1–10 | 3 |

### Planes y funciones

| Parámetro | Tipo | Valores aceptados | Inicial |
| --- | --- | --- | --- |
| Apps gratuitas en total | Número | 1–10 | 2 |
| Apps activas a la vez por dev | Número | Fijo en 1 durante el MVP | 1 |
| Grupos de Google | Opción | Solo el de la plataforma · Plataforma y propios | Solo el de la plataforma |
| Extensión pagada del tiempo en el top | Encendida o apagada, más horas por extensión | 12–72 h | Apagada (24 h al activarla) |
| Máximo de apps con extensión pagada en el top | Número | 1 hasta el tamaño del top | 2 |

## Riesgos asumidos, privacidad y avisos

El MVP acepta varios riesgos a cambio de simplicidad y de no castigar a usuarios honestos; cada uno tiene una mitigación parcial.

### Riesgos asumidos

| Riesgo | Por qué se asume | Mitigación |
| --- | --- | --- |
| La primera app libre atrae apps de usuarios que nunca prueban otras | Sin ella la plataforma no arranca | Instalaciones requeridas para el top (parámetro); package name único |
| Postulantes que no entregan la permanencia | El castigo solo alcanza a quien quiere subir otra app | Calificación visible y cadena de desbloqueo |
| Capturas falsas aprobadas automáticamente | Es mejor que castigar al postulante por la demora del dev; además el dev es el primer perjudicado | Detección de duplicados y recordatorio al dev |
| Rechazos injustos del dev | No hay moderación en el MVP | Justificación escrita obligatoria; el rechazo se basa en la captura, no en la calificación |
| Disponibilidad por país declarada sin verificar | No se puede validar de forma automática | Reportes y pausa automática |
| Una app pausada vuelve sin estar arreglada | La apelación no se puede verificar | Si sigue fallando, los nuevos reportes la pausan otra vez |
| Una persona con varias cuentas | Verificar identidad queda fuera del MVP | Package name único y calificación |
| Un dev que abandona la plataforma | No hay forma de obligarlo a volver | Cierre automático y calificación |
| Participación mínima: abrir la app solo para la captura | Las capturas prueban que se abrió, no que se usó | Aviso de que no se garantiza la aprobación de Google |
| Apps gratuitas que avanzan con solo 12 postulantes, sin margen | Es el mínimo de Google, y el margen extra es un incentivo para el plan de pago | Aceptan hasta 15 postulantes; se avisa al dev que un abandono puede dejarlo por debajo de 12 |

### Privacidad de las capturas

- Una captura puede mostrar el email, la foto o las notificaciones del postulante. La plataforma le pide recortar o tapar datos personales antes de enviarla.
- Solo el dev de esa app ve las capturas.
- Las capturas se borran 30 días después de que la app llega a Finalizada.

### Aviso en los términos y en la pantalla de subida

> La plataforma te ayuda a conseguir testers reales y comprometidos, pero no garantiza el acceso a producción. Esa decisión es de Google.

La captura de cierre y el resultado de producción son informativos y alimentan las estadísticas de la plataforma.

## Pendientes y fuera del MVP

El concepto está cerrado; quedan decisiones que se toman con datos o cerca del lanzamiento.

### Por decidir

- [ ] Precio por app adicional y por extensión del tiempo en el top.
- [ ] Valores iniciales definitivos de los parámetros.
- [ ] Plan de arranque: de dónde vienen los primeros 20 a 50 usuarios activos.

### Fuera del MVP

- Apps simultáneas por dev, respetando la cadena de compromisos. Punto de partida: permitir una app nueva si el usuario no tiene compromisos vencidos y hizo X instalaciones nuevas desde la última app.
- Grupos de Google propios del dev, como función activable.
- Traspaso de package names entre cuentas.
- Avisos por tiempo estimado de espera.
- Moderación de rechazos y apelaciones de capturas.

### Fuentes

- [Requisitos de prueba para cuentas personales nuevas — Ayuda de Play Console](https://support.google.com/googleplay/android-developer/answer/14151465)
