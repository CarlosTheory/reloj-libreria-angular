# LibreriaReloj

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.6.

El repositorio tiene la estructura de angular y dentro una libreria y una app.

## Instalación y prueba

1. Ejecutar `npm install` 
2. Ejecutar `npm run lib:build` o `ng build reloj-lib` para compilar la libreria, esto generara los directorios dist/ y dentro reloj-lib/.
3. `ng serve reloj-ejemplo` para ejecutar la app de prueba.

## Reloj-lib tiene las siguientes entradas:

`[initClock]` // 'true' o 'false' Inicia el Reloj
`[initStopwatch]` // 'true' o 'false' Inicia el cronómetro, se debe iniciar el panel para activarlo
`[initStopwatchPanel]` // 'true' o 'false' Inicia el panel del cronómetro
`[initCountdown]` // 'true' o 'false' Inicia el cuenta átras, se debe iniciar el panel para activarlo
`[initCountdownPanel]` // 'true' o 'false' Inicia el panel del cuenta átras

## Para el cuenta átras, recibe 

`[countdown_hours]` // 'horas' en numeros.
`[countdown_minutes]` // 'minutos' en numeros.
`[countdown_seconds]` // 'segundos' en numeros.

## Emite eventos para Reloj, cronómetro y cuenta átras, con las siguientes salidas:

### Reloj:
`(clockEvs)` // `{timeClock}` = La hora

### Cronómetro
`(stopEvs)`  //  `{timeStopwatch}` = Tiempo actual de cronómetro.

### Cuenta átras
`(countEvs)` // 
    `{countdownStarted}` = "true" para indicar que la marcha átras ha comenzado, "false" para indicar que paró;
    `{timeCountdown}` = Tiempo actual del tiempo cuenta átras


