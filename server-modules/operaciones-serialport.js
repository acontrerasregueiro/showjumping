/*ESTE FICHERO REALIZA LAS OPERACIONES SOBRE
EL PUERTO SERIE*/
'use strict'

// function detectarpuertoserie(port) {
//   port.write('CALRT\n')
// }

module.exports = function(socket) {
  var SerialPort = require('serialport')
  const Readline = SerialPort.parsers.Readline
  const port = new SerialPort('COM5', {
    baudRate :9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    autoOpen:false,
    rtscts: true
  })
  socket.on('conectarpuertoserie', function () {
    const parser = port.pipe(new Readline({delimiter: '\r'}))
    port.open(function (err){
    if (err) {
      console.log(err)
    }
  })
  port.on('open', () => console.log('Port open'))
  parser.on('data',function (data) {
    console.log(data.toString())
    socket.emit('rs232', data)
  })
  console.log('CONECTANDO PUERTO SERIE')
  SerialPort.list(function (err, ports) {
    ports.forEach(function (port) {
      console.log('LISTADO PUERTOS  :   ', port.comName)
      // detectarpuertoserie(port)
    })
  })
  socket.on('desconectarpuertoserie', function (conexion) {
    //conexion contendrá "display" o "cronometro"
    //en funcion del contenido cerramos el puerto correspondiente
    console.log('DESCONECTADO')
    port.close()
    // port232.close()
    // portDB.close()
  })

    //   // var portDB = new SerialPort('COM8', {
    //   //   baudRate: 2400,
    //   //   parser: SerialPort.parsers.readline('\r')
    //   // })
    //   // portDB.on('data', function (data) {
    //   //   socket.emit('displayboarddata', data)
    //   //   console.log('Data DISPLAY BOARD : ' + data)
    //   // })
    //   // portDB.on('error', function (err) {
    //   //   console.log('Error: port DB : ', err.message)
    //   // })
    //   // portDB.on('close', function () {
    //   // // this is called when you close the port internally
    //   // // or the device is unplug externally after connected.
    //   //   console.log('portDB Close')
    //   // })
    // })
  })
}
