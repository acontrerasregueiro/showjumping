/*en este fichero guardaremos todas las operaciones
que se realicen sobre la base de datos de jinetes
*/
'use strict'
module.exports = function(socket,MongoClient,url,dbName) {
  /*
  Responde a la peticion 'leer_jinetes', enviando un
  listado con toda la informacion de la bbdd Table_Jinetes
  */
  //  var MongoClient = require('mongodb').MongoClient
  var url = 'mongodb://127.0.0.1:27017/hipica'
  var ObjectID = require('mongodb').ObjectID
  var arrayjinetes = []

  socket.on('leer_jinetes', function () {
    
    console.log('RECIBIDO LEER JINETES')
    MongoClient.connect(url, function(err, client) {
      const db = client.db(dbName);
      const col = db.collection('Table_Jinetes').find()
       col.toArray(function(err,result) {
        if (err) {
          console.log(err)
        } else if (result.length) {
        //  console.log('Found:', result);
          socket.emit('listadoJinetes', result)
          console.log('ENVIANDO LISTADO JINETES')
        } else {
          console.log('No document(s) found with defined "find" criteria!')
        }
        client.close()
      }) 
  })
}) // FIN DE LEER jinetes

//BORRAR_JINETE
socket.on('borrar_jinete', function (id) {
  MongoClient.connect(url, function(err, client) {
    const db = client.db(dbName);
    const col = db.collection('Table_Jinetes')
    col.remove({'_id': ObjectID(id)}, function (err, result) {
      if (err) {  
         console.log(err)       
      } else if (result) {
        console.log('found : ' + result)        
      } 
    })
    client.close()
  }) 
})
 // FIN BORRAR_JINETE

 //NUEVO JINETE A guardar
   socket.on('new_jinete', function (data) {
    MongoClient.connect(url, function(err, client) {
      const db = client.db(dbName);
      const col = db.collection('Table_Jinetes')
        col.insert({
          'nombre': data.nombre,
          'apellido1': data.apellido1,
          'apellido2': data.apellido2,
          'licencia': data.licencia
        }, function (err, result) {
          if (err) throw err
          if (result) console.log('Added!')
         
        })
        client.close()
     
      })        
    })

 //FIN NUEVO JINETE A GUARDAR
  socket.on('editar_jinete', function (jinete) {
    // console.log('recibido "EDITAR_jinete"')
    console.log('nuevos valores : ', jinete)
    // console.log('jinte_id ', jinete._id)
  
    MongoClient.connect(url, function (err,client) {
      const db = client.db(dbName);
      const col = db.collection('Table_Jinetes')
      // var collection = db.collection('Table_Jinetes')
      col.update(
      {_id: ObjectID(jinete._id)},
        {
          nombre: jinete.nombre,
          apellido1: jinete.apellido1,
          apellido2: jinete.apellido2,
          licencia: jinete.licencia
        })
      client.close()
    })
  })
}
