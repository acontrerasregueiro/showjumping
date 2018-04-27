//FICHERO INICIAL
global.jQuery = require('jquery') // declaramos jquery como GLOBAL, es necesario
var popper = require('popper.js')// necesario para Bootstrap4
var bootstrap = require('bootstrap') //Importamos Boostrap

var socket = io() //Importamos Socket.io
var ordenartabla = require('./sorttable.js')// Al hacer click en el encabezado de tabla ordena la tabla por ese campo
var funcionescomunes = require('./funciones-compartidas.js')
var funcionesformulariojinete = require('./operaciones-formulario-jinetes.js')

function iniciarjinetes() {
    // alert('enviando LEER_JINETES')
    socket.emit('leer_jinetes') // solicitamos listado de jinetes
    var btnnuevojinete = document.getElementById('btnnuevojinete') // boton anadir nuevo jinete
    var btnguardarjinete = document.getElementById('btnguardarjinete') // boton guardar jinete
   
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
}

//CONTROLA LA NAVEGACION ENTRE LAS TAB PANE PRINCIPALES MENU HORIZONTAL,. JINETES CABALLOS, COMPETICIONES Y OTROS
function iniciarnavegacion() {
  
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