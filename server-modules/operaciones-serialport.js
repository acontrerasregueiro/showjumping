/*ESTE FICHERO REALIZA LAS OPERACIONES SOBRE
EL PUERTO SERIE*/
'use strict'

// function detectarpuertoserie(port) {
//   port.write('CALRT\n')
// }

module.exports = function(socket) {
  var SerialPort = require('serialport')
  socket.on('conectarpuertoserie', function () {
    SerialPort.list(function (err, ports) {
      ports.forEach(function (port) {
        console.log('LISTADO PUERTOS  :   ', port.comName)
        // detectarpuertoserie(port)
      })
      socket.on('desconectarpuertoserie', function (conexion) {
        //conexion contendrá "display" o "cronometro"
        //en funcion del contenido cerramos el puerto correspondiente
        port232.close()
        // portDB.close()
      })
      var port232 = new SerialPort('COM9', {
        parser: SerialPort.parsers.readline('\r')
      })

      port232.on('error', function (err) {
        console.log('Error port RS232: ', err.message)
      })
      port232.on('close', function () {
      // this is called when you close the port internally
      // or the device is unplug externally after connected.
        console.log('port Close')
      })
      port232.on('data', function (data) {
        console.log('Data: ', data)
        socket.emit('rs232', data)
      })
      port232.on('write', function (data) {
        console.log('enviado write', data)
      })

      // var portDB = new SerialPort('COM8', {
      //   baudRate: 2400,
      //   parser: SerialPort.parsers.readline('\r')
      // })
      // portDB.on('data', function (data) {
      //   socket.emit('displayboarddata', data)
      //   console.log('Data DISPLAY BOARD : ' + data)
      // })
      // portDB.on('error', function (err) {
      //   console.log('Error: port DB : ', err.message)
      // })
      // portDB.on('close', function () {
      // // this is called when you close the port internally
      // // or the device is unplug externally after connected.
      //   console.log('portDB Close')
      // })
    })
  })
  /** FIN DE OPERACIONES LEER CSV_CABALLOS **/
}
