# Diseño general de la aplicación.
Como bien se indicó, se utilizó React en conjunto con: redux, redux-observable, react-router.

El punto de entrada de la aplicación se encuentra en el archivo `/src/app/index.js`.

En el directorio `/src/app/store/products` se encuentra toda la lógica del funcionamiento.

# Configuracion
En el directorio `/config` se encuentra el archivo de configuración.
* Importante: En ese mismo archivo se configuran los datos de la api (puerto, servidor, protocolo, etc.).

# Testing
`npm run test` | `npm run test:watch`

Se realizaron los test de manera conveniente separando la lógica del reducer, y del middleware
que se encarga de los 'side-effects' (api calls).

# Inicio de la aplicacion
`npm run dev` | `npm run prod`
