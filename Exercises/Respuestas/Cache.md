## ¿Implementaría un cache del lado del cliente? ¿Por qué?

Implementaria un cache del lado del cliente bajo las siguientes circunstancias:
1. Significativamente ahorraria un intercambio de datos a los distintos clientes.
2. La informacion que se encuentra en el cache no es dinamica.
   (Por ejemplo: Las distintas programaciones de los canales)

Exceptuando los casos en los que no se cumplen simultaneamente los mencionados en 1. y 2.,
intentaria reducir la carga del servidor por medio de un cache del lado del servidor.
