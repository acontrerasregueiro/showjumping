/*en este fichero guardaremos todas las operaciones
que se realicen sobre la base de datos de jinetes
*/
'use strict'
module.exports = function(socket,MongoClient) {
  /*
  Responde a la peticion 'leer_jinetes', enviando un
  listado con toda la informacion de la bbdd Table_Jinetes
  */
  // var MongoClient = require('mongodb').MongoClient
  var url = 'mongodb://127.0.0.1:27017/hipica'
  var ObjectID = require('mongodb').ObjectID
  
  socket.on('leer_jinetes', function () {
    console.log('recibido "LEER_JINETES"')
    MongoClient.connect(url, function (err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err)
      } else {
        console.log('LOGGED INTO DB')
    // Get the documents collection
        var collection = db.collection('Table_Jinetes')
        // Insert some users
        collection.find({}).toArray(function (err, result) {
          if (err) {
            console.log(err)
          } else if (result.length) {
        //    console.log('Found:', result);
            socket.emit('listadoJinetes', result)
          } else {
            console.log('No document(s) found with defined "find" criteria!')
          }
          // Close connection
          db.close()
        })
      }
    })
  }) // FIN DE LEER jinetes

//BORRAR_JINETE
  socket.on('borrar_jinete', function (id) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err
      var collection = db.collection('Table_Jinetes')
      collection.remove({'_id': ObjectID(id)}, function (err, result) {
        // console.log(result)
      })
      db.close()
    })
  })
 // FIN BORRAR_JINETE

 //NUEVO JINETE A guardar
   socket.on('new_jinete', function (data) {
     console.log('DATOS NUEVOS JINETES ', data)
     MongoClient.connect(url, function (err, db) {
       var collection = db.collection('Table_Jinetes')
       collection.insert({
         'nombre': data.nombre,
         'apellido1': data.apellido1,
         'apellido2': data.apellido2,
         'licencia': data.licencia
       }, function (err, result) {
         if (err) throw err
         if (result) console.log('Added!')
       })
       db.close()
     })
   })
 //FIN NUEVO JINETE A GUARDAR
  socket.on('editar_jinete', function (jinete) {
    console.log('recibido "EDITAR_jinete"')
    console.log('nuevos valores : ', jinete)
    console.log('jinte_id ', jinete._id)
    MongoClient.connect(url, function (err, db) {
      var collection = db.collection('Table_Jinetes')
      collection.update(
      {_id: ObjectID(jinete._id)},
        {
          nombre: jinete.nombre,
          apellido1: jinete.apellido1,
          apellido2: jinete.apellido2,
          licencia: jinete.licencia
        })
      db.close()
    })
  })
}
