/*en este fichero guardaremos todas las operaciones
que se realicen sobre la base de datos de caballos */
'use strict'
module.exports = function(socket,MongoClient) {
  /** COMIENZO OPERACIONES CRUD Table_Caballos **/
  // var MongoClient = require('mongodb').MongoClient
  var url = 'mongodb://127.0.0.1:27017/hipica'
  var ObjectID = require('mongodb').ObjectID
  socket.on('leer_caballos', function () {
    console.log('recibido "LEER_x=CABALLOS"')
    MongoClient.connect(url, function (err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err)
      } else {
        console.log('LOGGED INTO DB')
    // Get the documents collection
        var collection = db.collection('Table_Caballos')
        // Insert some users
        collection.find({}).toArray(function (err, result) {
          if (err) {
            console.log(err)
          } else if (result.length) {
          // console.log('Found:', result);
            socket.emit('listadoCaballos', result)
          } else {
            console.log('No document(s) found with defined "find" criteria!')
          }
          // Close connection
          db.close()
        })
      }
    })
  }) // FIN DE LEER jinetes

  socket.on('editar_caballo', function (caballo) {
    console.log('recibido "EDITAR_caballo"')
    console.log('nuevos valores : ', caballo)
    MongoClient.connect(url, function (err, db) {
      var collection = db.collection('Table_Caballos')
      collection.update(
      {_id: ObjectID(caballo._id)},
        {
          nombre: caballo.nombre,
          licencia: caballo.licencia
        })
      db.close()
    })
  })
  socket.on('borrar_caballo', function (id) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err
      var collection = db.collection('Table_Caballos')
      collection.remove({'_id': ObjectID(id)}, function (err, result) {
        //  console.log(result);
        db.close()
      })
    })
  })

  socket.on('new_caballo', function (data) {
    console.log('DATOS NUEVOS JINETES ', data)
    MongoClient.connect(url, function (err, db) {
      var collection = db.collection('Table_Caballos')
      collection.insert({
        'nombre': data.nombre,
        'licencia': data.licencia
      }, function (err, result) {
        if (err) throw err
        if (result) console.log('Added!')
      })
      db.close()
    })
  })
  /** FIN DE OPERACIONES TABLA_CABALLOS **/
}
