//FICHERO INICIAL
global.jQuery = require('jquery') // declaramos jquery como GLOBAL, es necesario
var popper = require('popper.js')// necesario para Bootstrap4
var bootstrap = require('bootstrap') //Importamos Boostrap

var socket = io() //Importamos Socket.io
var ordenartabla = require('./sorttable.js')// Al hacer click en el encabezado de tabla ordena la tabla por ese campo
var funcionescomunes = require('./funciones-compartidas.js')
var funcionesformulariojinete = require('./operaciones-formulario-jinetes.js')
// socket.on('listadoJinetes', function (data) {
//   alert('RECIBIDO LISTADOJINETES ,numero de jinetes :' ,data.length)
//   funcionesformulariojinete.generartablaJinetes(data,socket)
//  //  funcionesformulariojinete.generarListaJinetesordendesalida(data)
// })
function iniciarjinetes() {

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
  var btnnuevojinete = document.getElementById('btnnuevojinete') // boton anadir nuevo jinete
  var btnguardarjinete = document.getElementById('btnguardarjinete') // boton guardar jinete

    socket.emit('leer_jinetes') // solicitamos listado de jinetes
    var btnnuevojinete = document.getElementById('btnnuevojinete') // boton anadir nuevo jinete
    var btnguardarjinete = document.getElementById('btnguardarjinete') // boton guardar jinete'
    var btnactualizarjinetes = document.getElementById('btnactualizarjinetes')
   
    btnguardarjinete.addEventListener('click', function (){
      var jinete = funcionesformulariojinete.leerformulariojinete() //asigna a jinete los valores del formulario nombre,,apellidos,etc
      var inputidJinete = document.getElementById('inputidJinete')
       //limpiamos los input text
      if (document.getElementById('inputidJinete').value =='') { //Si no hay datos en el ID es que es NUEVO PARTICIPANTE
        socket.emit('new_jinete', jinete)
        socket.emit('leer_jinetes') //actualizamos pantalla
      } else {  //si hay datos es un participante existente,ACTUALIZAMOS LOS DATOS
         var inputidJinete = document.getElementById('inputidJinete')
         jinete._id = inputidJinete.value
         socket.emit('editar_jinete',jinete)
         socket.emit('leer_jinetes')
         document.getElementById('inputidJinete').setAttribute("disabled","disabled")
      }
      funcionescomunes.limpiarinputs(formulariodatosjinete)
    })
   
       btnnuevojinete.addEventListener('click', function (){
      //alert(formulariodatosjinete.id)
      funcionescomunes.limpiarinputs(formulariodatosjinete)
      //hacemos focus en el input nombrejinete
      inputnombreJinete.focus()
      //removemos el atributo disabled del boton guardarjinete para que se pueda guardar
      document.getElementById('btnguardarjinete').removeAttribute('disabled')
    })
    btnactualizarjinetes.addEventListener('click',function (){
      socket.emit('leer_jinetes')
    })
    socket.on('listadoJinetes', function (data) {
      // alert('RECIBIDO LISTADOJINETES ,numero de jinetes :' ,data.length)
      funcionesformulariojinete.generartablaJinetes(data,socket)
     //  funcionesformulariojinete.generarListaJinetesordendesalida(data)
    })

}

//CONTROLA LA NAVEGACION ENTRE LAS TAB PANE PRINCIPALES MENU HORIZONTAL,. JINETES CABALLOS, COMPETICIONES Y OTROS
function iniciarnavegacion() {
  // socket.on('listadoJinetes', function (data) {
  //   alert('RECIBIDO LISTADOJINETES ,numero de jinetes :' ,data.length)
  //   funcionesformulariojinete.generartablaJinetes(data,socket)
  //  //  funcionesformulariojinete.generarListaJinetesordendesalida(data)
  // })
    var navjinetes = document.getElementById('navjinetes')
    navjinetes.addEventListener('click', function() {
      funcionescomunes.showdiv('tab-contenedor','tab-content')
      funcionescomunes.borrarclase2('nav-link','active')
     document.getElementById('navjinetes').classList.add('active')
    })
    var navcaballos = document.getElementById('navcaballos')
    navcaballos.addEventListener('click', function() {
      funcionescomunes.showdiv('tab-caballos','tab-content')
      funcionescomunes.borrarclase2('nav-link','active')
      navcaballos.classList.add('active')
    }) 
    var navcompeticiones = document.getElementById('navcompeticiones')
    navcompeticiones.addEventListener('click', function() {
      funcionescomunes.showdiv('tab-competiciones','tab-content')
      funcionescomunes.borrarclase2('nav-link','active')
      navcompeticiones.classList.add('active')
    })  

    var navotros = document.getElementById('navotros')
    navotros.addEventListener('click', function() {
      funcionescomunes.showdiv('tab-otros','tab-content')
      funcionescomunes.borrarclase2('nav-link','active')
      navotros.classList.add('active')
    })
 } // FIN MENU HORIZONTAL

function iniciar() {

iniciarnavegacion()//Nos movemos entre los TAB principales.
iniciarjinetes()

}

iniciar()
