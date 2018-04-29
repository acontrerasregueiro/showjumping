/*en este fichero guardaremos todas las operaciones
que se realicen sobre la base de datos de caballos */
'use strict'
module.exports = function(socket,MongoClient,url,dbName) {
  /** COMIENZO OPERACIONES CRUD Table_Caballos **/
  // var MongoClient = require('mongodb').MongoClient
  var url = 'mongodb://127.0.0.1:27017/hipica'
  var ObjectID = require('mongodb').ObjectID
  var arrayjinetes = []

  socket.on('leer_caballos', function () {
    
    console.log('RECIBIDO LEER CABALLOS')
    MongoClient.connect(url, function(err, client) {
      const db = client.db(dbName);
      const col = db.collection('Table_Caballos').find()
       col.toArray(function(err,result) {
        if (err) {
          console.log(err)
        } else if (result.length) {
        //  console.log('Found:', result);
          socket.emit('listadoCaballos', result)
          console.log('ENVIANDO LISTADO caballos')
        } else {
          console.log('No document(s) found with defined "find" criteria!')
        }
        client.close()
      }) 
  })
}) // FIN DE LEER CABALLOS

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
