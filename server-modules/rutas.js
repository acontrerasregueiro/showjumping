     'use strict'
//RESUELVE LAS DIRECCIONES DE EXPRESS
module.exports = function(app,path,express) {
  var pathpublic = path.join(__dirname, '../public')
  app.use(express.static(pathpublic))

  app.get('/', function (req, res) {
    var pathindexhtml = path.join(__dirname, './../index2.html')
    res.sendFile(pathindexhtml)
  })
  app.get('/modalnuevaprueba', function (req, res) {
    var pathaddjinete = path.join(__dirname, './../public/modalnuevaprueba.html')
    res.sendFile(pathaddjinete)
  })

  app.get('/addinfo', function (req, res) {
    var pathaddjinete = path.join(__dirname, '/public/vistas/jinetes/addinfo.htm')
    res.sendFile(pathaddjinete)
  })
  //Pagina orden de salida 
  app.get('/orden', function (req, res) {
    var pathordensalida = path.join(__dirname, './../public/vistas/jinetes/ordendesalida.html')
    res.sendFile(pathordensalida)
  })
  //Pagina clasificacion prueba activa
  app.get('/classactiva', function (req, res) {
    var pathclassactiva = path.join(__dirname, './../public/vistas/jinetes/clasificacionpruebaactiva00.htm')
    res.sendFile(pathclassactiva)
  })
  //Anadir jinete prueba en curso
  app.get('/add', function (req, res) {
    var pathclassactiva = path.join(__dirname, './../public/vistas/jinetes/addJinete.htm')
    res.sendFile(pathclassactiva)
  })
}
