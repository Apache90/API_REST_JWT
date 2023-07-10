const app = require('./app');

app.listen(app.get('port'), ()=>{
  console.log('Escuchando por puerto',app.get('port'));
})