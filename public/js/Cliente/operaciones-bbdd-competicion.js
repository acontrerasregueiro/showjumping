/*Fichero en el que se realizan todas las operaciones relacionadas
con las bases de datos de competiciones*/
'use strict'

var funcionescomunes = require('./funciones-compartidas.js')
var funcionesformulariocompeticionseleccionada = require('./operaciones-formulario-competicionseleccionada.js')
var funcionesformulariocompeticion = require('./operaciones-formulario-competicion.js')


function iniciarsocketcompeticiones(socket){
  socket.on('ordendesalidacompeticion', function (competicion, nombreprueba) {
   console.log('recibod ordendesalidacompeticion :', nombreprueba)
   for (var indice = 0; indice < competicion.pruebas.length; indice++) {
    if (competicion.pruebas[indice].nombreprueba == nombreprueba) {
      console.log('objeto prueba :', competicion.pruebas[indice])
      var listadoordendesalida = document.getElementById('listadoordendesalida')
        listadoordendesalida.innerHTML = ''
      var objetoprueba = competicion.pruebas[indice]
      funcionesformulariocompeticionseleccionada.leerygenerarordendesalida(objetoprueba,socket)
    }
   }
  })
  socket.on('importarordendesalida', function (data){
  // alert('RECIBIDO IMPORTARODENDESALIDA ', data)
  data.forEach(function (binomio,indice){
    var jinete = binomio.jinete
    var caballo = binomio.caballo
    funcionesformulariocompeticionseleccionada.anadirbinomiosaordendesalida(jinete,caballo,socket)
    })
  })

  var btnguardarcompeticion = document.getElementById('btnguardarcompeticion')
  socket.emit('leer_competiciones') //Solicitamos listado de competiciones

  socket.on('dato_competicion',function (competicion,indice) { //recibimos data competicion y creamos la tabla
  funcionesformulariocompeticion.generartablaCompeticiones(competicion,socket)
  })
  // devuelve todos los datos de 1 competicion
  // socket.on('configurar_competicion', function (competicion) {
  //   console.log('recibido : configurar_competicion', competicion)
  //   // generarlistadeordensalida(competicion)
  // })
  socket.on('configurar_competicion',function (competicion) {
    funcionesformulariocompeticionseleccionada.generartablaCompeticionSeleccionada(competicion,socket)
  })

  btnguardarcompeticion.addEventListener('click', function (){
    var competicion = funcionesformulariocompeticion.leerformulariocompeticion()
    var tbodycompeticion = document.getElementById('tbodycompeticion')
    tbodycompeticion.innerHTML = ''
    //limpiamos los input text
     if (document.getElementById('inputidCompeticion').value =='') { //Si no hay datos en el ID es que es NUEVO PARTICIPANTE
      socket.emit('nueva_competicion', competicion)
   } else {  //si hay datos es un participante existente,ACTUALIZAMOS LOS DATOS
      var inputidCompeticion = document.getElementById('inputidCompeticion')
      competicion._id = inputidCompeticion.value
      socket.emit('editar_competicion',competicion)
      var tbodycompeticion = document.getElementById('tbodycompeticion')
      document.getElementById('inputidCompeticion').setAttribute("disabled","disabled")
    }
    socket.emit('leer_competiciones') //Solicitamos listado de Caballos
  })

}

module.exports.iniciarcompeticiones = function(socket) {
  iniciarsocketcompeticiones(socket)
}
