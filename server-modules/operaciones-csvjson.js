/*ESTE FICHERO INTERPRETA LOS FICHEROS CSV */
'use strict'
module.exports = function(socket,MongoClient) {
  var fs = require('fs')
  var csvjson = require('csvjson')
   var url = 'mongodb://127.0.0.1:27017/hipica'
  var ObjectID = require('mongodb').ObjectID
  socket.on('importarcsv', function (filename) {
    console.log('RECIBIDO IMPORTARCSV FICHERO : ', filename)
    var data = fs.readFileSync(process.cwd() + '\\' + filename, { encoding: 'utf8'})
    var options = {
      delimiter: ';' // optional
    }
    var objetojson = csvjson.toObject(data, options)
    console.log(objetojson)

    socket.emit('importarordendesalida', objetojson)
  })
  /** FIN DE OPERACIONES LEER CSV_CABALLOS **/
}
