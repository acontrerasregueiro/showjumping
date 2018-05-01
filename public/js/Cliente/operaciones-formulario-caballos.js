'use strict'
var funcionesbbddcaballos = require('./operaciones-bbdd-caballos.js')
var funcionescomunes = require('./funciones-compartidas.js')
var funcionesformulariocaballo = require('./operaciones-formulario-caballos.js')
// var funcionesformulariocompeticionseleccionada = require('./operaciones-formulario-competicionseleccionada.js')


module.exports.leerformulariocaballo = function () {
  //asignamos valores
  //elementos input con datos de los jientes
  var inputnombreCaballo = document.getElementById('inputnombreCaballo')
  var inputlicenciaCaballo = document.getElementById('inputlicenciaCaballo')
  var inputidCaballo = document.getElementById('inputidCaballo')
  var caballo = {}
  caballo.nombre = inputnombreCaballo.value
  caballo.licencia = inputlicenciaCaballo.value
  caballo.id = inputidCaballo.value
  return caballo
}
function mostrardatosCaballos(id){
  var formulariodatoscaballo = document.getElementById('formulariodatoscaballo')
  var tablacaballos = document.getElementById('tablacaballos')
  //elementos input con datos de los jientes
  var inputnombreCaballo = document.getElementById('inputnombreCaballo')
  var celdanombreCaballo = document.getElementById(id + 'NombreC')
  inputnombreCaballo.value = celdanombreCaballo.innerHTML
  var inputlicenciaCaballo = document.getElementById('inputlicenciaCaballo')
  var celdalicenciaCaballo = document.getElementById(id + 'LicenciaC')
  //para que no anada los span con los iconos
  inputlicenciaCaballo.value = celdalicenciaCaballo.textContent
  var inputidCaballo = document.getElementById('inputidCaballo')
  var celdaidCaballo = document.getElementById(id + 'IDC')
  inputidCaballo.value = celdaidCaballo.innerHTML


}

function iniciarformulariocaballos(socket) {
  // alert('envioando leer caballosS')
  socket.emit('leer_caballos') //Solicitamos listado de Caballos
  funcionesbbddcaballos.socketcaballos(socket)//Iniciamos operaciones con sockets Caballos
}

module.exports.iniciarmodulocaballos = function (socket) {
 iniciarformulariocaballos(socket)
}
function generarlistacaballosordendesalida (data) {
  var elemListado
  // LIMPIAMOS LOS DATOS DE LA LISTA
  listadoCaballosconfiguracionordendesalida.innerHTML = ''
  // CREAMOS UN ELEMENTO LI DENTRO DE LA LISTA POR CADA CABALLO
  data.forEach(function (caballo, indice) {
    elemListado = document.createElement('li')
    elemListado.id = 'fila' + indice + 'caballo'
    // CREAMOS UN SPAN POR CADA PROPIEDAD DE CADA CABALLO,NOMBRE,LICENCIA,ID
    elemListado.appendChild(funcionescomunes.creaSpan(caballo.nombre, elemListado.id + 'NombreCaballoOS', 'liNombreOS'))
    listadoCaballosconfiguracionordendesalida.appendChild(elemListado)
    elemListado.addEventListener('click', function () {
      // funcionesformulariocompeticionseleccionada.mostrarCaballoordendesalida('fila' + indice + 'caballo')
    })
    // detectarClick(elemListado)
  })
}
module.exports.generartablaCaballos = function (data,socket) {
  var tbodycaballos = document.getElementById('tbodycaballos')
  tbodycaballos.innerHTML = '' // limpiamos contenido del la tablacaballos
  data.forEach(function (caballo,i) {
    var elementotr = document.createElement('tr')
    elementotr.id = 'filacaballo' + i
    var tdnombre = document.createElement('td')
    tdnombre.style.width = '55%'
    var tdlicencia = document.createElement('td')
    var tdid = document.createElement('td')
    tdnombre.appendChild(funcionescomunes.creaSpan(caballo.nombre, elementotr.id +'NombreC','liNombreC'))
    tdlicencia.appendChild(funcionescomunes.creaSpan(caballo.licencia, elementotr.id +'LicenciaC','liLicenciaC'))
    tdid.appendChild(funcionescomunes.creaSpan(caballo._id, elementotr.id +'IDC','liIDC'))
    elementotr.appendChild(tdnombre)
    elementotr.appendChild(tdlicencia)
    elementotr.appendChild(tdid)
    tbodycaballos.appendChild(elementotr)
    elementotr.addEventListener('click', function () {
      funcionescomunes.borrarclase('text-primary', this.parentNode)//eliminamos la clase bgsuccess del nodopadre(color)
      this.classList.add('text-primary')//anadimos nueva clase a este elemento (color)
      mostrardatosCaballos(this.id)//mostramos los datos de esta fila
      funcionescomunes.removeclasselements('tablacaballos','glyphicon') //eliminamos los glyphicon de tablajientes
      var span = document.createElement('span')
      span.classList.add('glyphicon')
      span.id = this.id + 'glyphicon'
      span.appendChild(funcionescomunes.addiconelement('fas fa-trash',''))//anadimos icono en la celda LicenciaJ
      document.getElementById(this.id + 'LicenciaC').appendChild(span)
      span.addEventListener('click',function () {
        var inputnombreCaballo = document.getElementById('inputnombreCaballo')
        var caballo = funcionesformulariocaballo.leerformulariocaballo()
        socket.emit('borrar_caballo',caballo.id)
        socket.emit('leer_caballos')
        })
      document.getElementById('btnguardarcaballo').setAttribute("disabled","disabled");
    })
  })
  // generarlistacaballosordendesalida(data)
}
