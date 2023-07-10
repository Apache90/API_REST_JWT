const app = require('./app');

// Inicia el servidor y lo pone en escucha en el puerto especificado en la configuración de la aplicación
app.listen(app.get('port'), ()=>{
  console.log('Escuchando por puerto',app.get('port'));
})