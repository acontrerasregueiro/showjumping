'use strict'
module.exports = function(socket,MongoClient,url,dbName) {

//   /* COMIENZO LEER COMPETICIONES */
var url = 'mongodb://127.0.0.1:27017/hipica'
var ObjectID = require('mongodb').ObjectID
var arrayjinetes = []
socket.on('leer_competiciones', function () {
  MongoClient.connect(url, function(err, client) {
    const db = client.db(dbName);
    const col = db.listCollections()
        col.each(function (err,items){
          if(err) {console.log(err)
          } else {
            if(items != null) {
              console.log(items.name)//leemos el nombre de las base de datos
              if ((items.name !== 'Table_Jinetes') && (items.name !== 'Table_Caballos')) {//BUSCAMOS LAS COLECCIONES QUE NO SEAN NI JUINETES NI CABALLOS
              const coleccion = db.collection(items.name).find()
              coleccion.toArray(function(err,result) {//Buscamos cada una de esas colecciones
                if (err) {
                  console.log(err)
                } else if (result.length) {
                socket.emit('dato_competicion', result)//enviamos la competicion por socket
                  console.log(result)
                } else {
                  console.log('No document(s) found with defined "find" criteria!')
                }
                client.close()
              }) 
              console.log(items)
            }
          }
        }
       

      })
    console.log('recibido leer_competiciones')
  })
//   MongoClient.connect('mongodb://127.0.0.1:27017/hipica', function (err, db) {
//     if (err) throw err
//     var numerodecompeticiones = 0
//     db.collections(function (err, items) {
//       console.log('Nº DE ITEMS :  ', items.length)
//       for (var indice = 0; indice < items.length; indice++) {
//         if ((items[indice].s.name !== 'Table_Jinetes') && (items[indice].s.name !== 'Table_Caballos')) {
//           console.log('encontrados tablas DISTINTAS A  jinetes y caballos   :', items[indice].s.name)
//           var collection = db.collection(items[indice].s.name)
//           collection.find().toArray(function (err, result) {
//             // console.log('RESULTADO[1]', result[0])
//             socket.emit('dato_competicion', result[0], indice)
//           })
//           numerodecompeticiones = numerodecompeticiones + 1
//         }
//       }
//       db.close()
//     })
//   })
})
//   /* RECIBE POR PARAMETRO LOS DATOS DE LA NUEVA COMPETICION
// PRIMERO LA CREA Y LUEGO ASIGNA VALORES */
//   socket.on('nueva_competicion', function (data) {
//     console.log('recibido nueva competicion : ', data)
//     MongoClient.connect('mongodb://127.0.0.1:27017/hipica', function (err, db) {
//       if (err) throw err
//       // PRIMERO CREAMOS LA COLECCION
//       db.createCollection(data.nombre, function (err,collection) {
//         if (err) throw err
//       //  ASIGNAMOS VALORES
//         collection.insert({
//           'nombre': data.nombre,
//           'lugar': data.lugar,
//           'fecha': data.fecha,
//           'categoria': data.categoria,
//           'pruebas': []
//         },
//         function (err, result) {
//           if (err) throw err
//           if (result) console.log('Added!')
//           db.close()
//         })
//       })
//     })
//   })
// // FIN CREAR NUEVA COMPETICION
//   socket.on('solicita_competicion', function (nombrecoleccion) {
//    console.log('SOLICITADA COMPETICON ')
//    MongoClient.connect('mongodb://127.0.0.1:27017/hipica', function (err, db) {
//      if (err) throw err
//      db.collection(nombrecoleccion).findOne(function (err, coleccion) {
//        socket.emit('configurar_competicion', coleccion)
//       //  console.log('COMPETICION : ', coleccion)
//      })
//      db.close()
//    })
//  })

//  socket.on('editar_competicion', function (competicion) {
//    console.log('recibido "EDITAR COMPETICION"')
//    console.log('nuevos valores : ', competicion)
//    MongoClient.connect(url, function (err, db) {
//      var collection = db.collection(competicion.nombre)
//      collection.update(
//      {_id: ObjectID(competicion._id)},
//        {
//          'nombre': competicion.nombre,
//          'lugar': competicion.lugar,
//          'fecha': competicion.fecha,
//          'categoria': competicion.categoria
//        })
//      db.close()
//    })
//  })
}
