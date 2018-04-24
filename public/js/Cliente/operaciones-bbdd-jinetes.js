/*Fichero en el que se realizan todas las operaciones relacionadas
con la base de datos de jinete*/
var socket = io()
// var ordenartabla = require('../sorttable.js')
var funcionescomunes = require('./funciones-compartidas.js')
// var funcionesmodaldesempate = require('../operaciones-jinetes/modaldesempate.js')
var funcionesformulariojinete = require('./operaciones-formulario-jinetes.js')
// var funcionesformulariocaballo = require('../operaciones-jinetes/operaciones-formulario-caballos.js')
// var funcionesformulariocompeticion = require('../operaciones-jinetes/operaciones-formulario-competicion.js')
// var funcionesformulariocompeticionseleccionada = require('../operaciones-jinetes/operaciones-formulario-competicionseleccionada.js')
// var funcionesmodalnuevaprueba = require('../operaciones-jinetes/modalnuevaprueba.js')
// var funcionesmodalnuevojinete = require('../operaciones-jinetes/modalnuevojinete.js')
// var funcionesmodalnuevocaballo = require('../operaciones-jinetes/modalnuevocaballo.js')
// var funcionesmodaldesempate = require('../operaciones-jinetes/modaldesempate.js')

// var funcionespruebaencurso = require('../operaciones-jinetes/pruebaencurso.js')
// var funcionescontextmenupruebaactiva = require('../operaciones-jinetes/contextmenuempezarprueba.js')
// var disablef5 = require('../operaciones-jinetes/disablef5.js')
// var disablemousebuttons = require('../operaciones-jinetes/disablemousebuttons.js')
// var funcionesclasificar = require('../operaciones-jinetes/operaciones-clasificacion.js')
// var funcionespuertoserie = require('../operaciones-jinetes/operaciones-puertoserie.js')


//CONEXIONES DE SOCKETS PARA TABLA JINETES
function iniciarjinetes() {

  // var encabezadoClass = document.getElementById('encabezadoClass')
  // encabezadoClass.addEventListener('click',function(){
  //   // alert('ord3enando')
  //   ordenartabla.sortTable(4)
  // })  
  // var encabezadoOrden = document.getElementById('encabezadoOrden')
  // encabezadoOrden.addEventListener('click',function(){
  //   // alert('ord3enando')
  //   ordenartabla.sortTable(1)
  // })  
  // iniciarmenuizquierda()
  // funcionesbbddcaballos.iniciarcaballos(socket)
  var formulariodatosjinete = document.getElementById('formulariodatosjinete')
  var tablajinetes = document.getElementById('tablajinetes')
  //elementos input con datos de los jientes
  var inputnombreJinete = document.getElementById('inputnombreJinete')
  var inputapellido1Jinete = document.getElementById('inputapellido1Jinete')
  var inputapellido2Jinete = document.getElementById('inputapellido2Jinete')
  var inputlicenciaJinete = document.getElementById('inputlicenciaJinete')
  var inputidJinete = document.getElementById('inputidJinete')

  //si hacen click en los elementos input, activamos el boton guardarjinete
  inputnombreJinete.addEventListener('keydown',function (){
    document.getElementById('btnguardarjinete').removeAttribute('disabled')
  })
  inputapellido1Jinete.addEventListener('keydown',function (){
    document.getElementById('btnguardarjinete').removeAttribute('disabled')
  })
  inputapellido2Jinete.addEventListener('keydown',function (){
    document.getElementById('btnguardarjinete').removeAttribute('disabled')
  })
  inputlicenciaJinete.addEventListener('keydown',function (){
    document.getElementById('btnguardarjinete').removeAttribute('disabled')
  })
  //fin click elementos input
  // funcionesformulariocompeticionseleccionada.iniciarcompeticionseleccionada(socket)
//  funcionesformulariocaballo.iniciarmodulocaballos(socket)
//  funcionesformulariocompeticion.iniciarmodulocompeticiones(socket)
//  funcionesmodalnuevaprueba.iniciarmodalnuevaprueba(socket)
//  funcionesmodalnuevojinete.iniciarmodalnuevojinete(socket)
//  funcionesmodaldesempate.iniciarmodaldesempate()
//  funcionesmodalnuevocaballo.iniciarmodalnuevocaballo(socket)
//  funcionespruebaencurso.iniciarpruebaencurso(socket)
//  funcionescontextmenupruebaactiva.iniciarcontextmenu(socket)
//  funcionesclasificar.iniciarclasificar(socket)
//  disablef5.iniciardisableF5()
//  disablemousebuttons.iniciardisablemousebuttons()
//  funcionespuertoserie.iniciarpuertoserie(socket)

 socket.emit('leer_jinetes') // solicitamos listado de jinetes
//  alert('enviando LEER JINETES')
 var btnnuevojinete = document.getElementById('btnnuevojinete') // boton anadir nuevo jinete
 var btnguardarjinete = document.getElementById('btnguardarjinete') // boton guardar jinete

 btnguardarjinete.addEventListener('click', function (){
   var jinete = funcionesformulariojinete.leerformulariojinete() //asigna a jinete los valores del formulario nombre,,apellidos,etc
   var inputidJinete = document.getElementById('inputidJinete')
    //limpiamos los input text
   if (document.getElementById('inputidJinete').value =='') { //Si no hay datos en el ID es que es NUEVO PARTICIPANTE
    //  socket.emit('new_jinete', jinete)
    alert(jinete)
    //  socket.emit('leer_jinetes') //actualizamos pantalla
   } else {  //si hay datos es un participante existente,ACTUALIZAMOS LOS DATOS
      var inputidJinete = document.getElementById('inputidJinete')
      alert('modific')
      // jinete._id = inputidJinete.value
      // socket.emit('editar_jinete',jinete)
      // socket.emit('leer_jinetes')
      // document.getElementById('inputidJinete').setAttribute("disabled","disabled")
   }
   funcionescomunes.limpiarinputs(formulariodatosjinete)
 })

 btnnuevojinete.addEventListener('click', function (){
   //alert(formulariodatosjinete.id)
   funcionescomunes.limpiarinputs(formulariojinetes)
   //hacemos focus en el input nombrejinete
   inputnombreJinete.focus()
   //removemos el atributo disabled del boton guardarjinete para que se pueda guardar
   document.getElementById('btnguardarjinete').removeAttribute('disabled')
 })

 socket.on('listadoJinetes', function (data) {
   console.log('RECIBIDO LISTADOJINETES ,numero de jinetes :' ,data.length)
   funcionesformulariojinete.generartablaJinetes(data,socket)
  //  funcionesformulariojinete.generarListaJinetesordendesalida(data)
 })

}
/*FIN GENERARLISTAJINETES() */
// funcionesformulariocaballo.iniciarmenuizquierda()
iniciarjinetes()
