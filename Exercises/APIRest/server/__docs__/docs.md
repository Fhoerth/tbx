# Diseño general de la API.
Como database engine se eligió MongoDB.

El core de la api se encuentra en el archivo `/createApp.js`.

La api cuenta con un solo módulo: `product`.

Cada endpoint de la api realiza la ejecución de una función llamada `resolver`.
Los resolvers son los encargados de validar los inputs del request y de enviar
una respuesta.

A su vez, en el módulo se encuentra el archivo `product.model.js`, una serie de funciones
que realizan las tareas correspondientes a la base de datos (escritura/lectura).

Las funciones del modelo son importadas desde los resolvers, las cuales son ejecutadas
para enviar la respuesta mencionada.

# Configuracion
En el directorio `settings` se encuentran los archivos de configuración (puertos de db, puerto http, protocolo, etc).
+ Environments: La api cuenta con 3 environments: production, development, test. Hay una configuración de base de datos distinta para cada uno de los entornos.

# Seeds
`npm run seed:dev` | `npm run seed:prod`

# Testing
`npm run test` | `npm run test:watch`

Los tests se encuentran en el directorio `/__tests__`.
+ `routes.test.js`: En este test se verifica que se realicen las llamadas correspondientes a los resolvers.
+ `product.resolvers.test.js`: Se verifican los inputs y el output. También se verifica que las funciones externas sean
  llamadas de manera correcta.
+ `product.model.test.js` y `updateDocumentStockResolver.test.js` : Se testea que efectivamente, las consultas y/o
  modificaciones a la database funcionen correctamente.

# Inicio de aplicacion
`npm run start:dev` | `npm run start`
