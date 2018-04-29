/*Fichero en el que se realizan todas las operaciones relacionadas
con la base de datos de caballos*/
'use strict'

var funcionescomunes = require('./funciones-compartidas.js')
var funcionesformulariocaballo = require('./operaciones-formulario-caballos.js')

function iniciarsocketcaballos (socket) {
  //si hacen click en los elementos input, activamos el boton guardarjinete
  var inputnombreCaballo = document.getElementById('inputnombreCaballo')
  var inputlicenciaCaballo = document.getElementById('inputlicenciaCaballo')
  var inputidCaballo = document.getElementById('inputidCaballo')

  inputnombreCaballo.addEventListener('keydown',function (){
    document.getElementById('btnguardarcaballo').removeAttribute('disabled')
  })
  inputlicenciaCaballo.addEventListener('keydown',function (){
    document.getElementById('btnguardarcaballo').removeAttribute('disabled')
  })
  //fin click elementos input
  var btnnuevocaballo = document.getElementById('btnnuevocaballo')
  btnnuevocaballo.addEventListener('click', function (){
    inputnombreCaballo.value = ''
    inputlicenciaCaballo.value = ''
    inputidCaballo.value = ''
    inputnombreCaballo.focus()
  })

  var btnguardarcaballo = document.getElementById('btnguardarcaballo')
  btnguardarcaballo.addEventListener('click', function (){
  var caballo = funcionesformulariocaballo.leerformulariocaballo() //asigna a jinete los valores del formulario nombre,,apellidos,etc
  var inputidCaballo = document.getElementById('inputidCaballo')
   //limpiamos los input text
  if (document.getElementById('inputidCaballo').value =='') { //Si no hay datos en el ID es que es NUEVO PARTICIPANTE
    socket.emit('new_caballo', caballo)
    socket.emit('leer_caballos') //actualizamos pantalla
  } else {  //si hay datos es un participante existente,ACTUALIZAMOS LOS DATOS
     caballo._id = inputidCaballo.value
     socket.emit('editar_caballo',caballo)
     socket.emit('leer_caballos')
     document.getElementById('inputidJinete').setAttribute("disabled","disabled")
  }
  
  funcionescomunes.limpiarinputs(formulariodatoscaballo)
 })

  socket.on('listadoCaballos',function (data){
    funcionesformulariocaballo.generartablaCaballos(data,socket)
  })
}
//Leemos toda la informacion recibida por sockets
module.exports.socketcaballos = function (socket) {
  iniciarsocketcaballos(socket)
}
