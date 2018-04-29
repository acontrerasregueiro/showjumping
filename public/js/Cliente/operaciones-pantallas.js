/*Fichero en el que se realizan todas las operaciones relacionadas
con las bases de datos de competiciones*/
'use strict'

var funcionescomunes = require('./funciones-compartidas.js')
var funcionesformulariocompeticionseleccionada = require('./operaciones-formulario-competicionseleccionada.js')


function iniciarpruebas(socket) {

  // funcionesmodalnuevaprueba.iniciarmodalnuevaprueba(socket)
  //boton para anadir una prueba a competicion
  var btnnuevaprueba = document.getElementById('btnnuevaprueba')
  btnnuevaprueba.addEventListener('click', function () {
    var formulariodatosprueba = document.getElementById('formulariodatosprueba')
    funcionescomunes.limpiarinputs(formulariodatosprueba)
    // funcionesmodalnuevaprueba.iniciarmodalnuevaprueba(socket)
    // socket.emit('hola')
    funcionesmodalnuevaprueba.mostrarmodalnuevaprueba()
    // document.getElementById('inputnombrenuevaprueba').focus()
  })

}

module.exports.iniciarpruebas = function(socket) {
  iniciarpruebas(socket)
}
