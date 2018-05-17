/*en este fichero guardaremos todas las operaciones
que se realicen sobre la base de datos la prueba en curso o activa */
'use strict'
var funciones = require('./funciones.js')
module.exports = function(socket,MongoClient,url,dbName) {
  function actualizarpantallaresultadopruebaactiva (coleccion, prueba,socket) {
    MongoClient.connect('mongodb://127.0.0.1:27017/hipica', function (err, db) {
      if (err) throw err
      db.collection(coleccion).findOne(function (err, competicion) {
        // console.log('competicion a enviar : ', competicion)
        socket.emit('clasificarpruebaactiva', competicion, prueba)
        // alert('enviando SOCKET CLASIFICAR PRUEBA ACTIVA')
      })
      db.close()
    })
    socket.broadcast.emit('clasificarpruebaactiva',coleccion,prueba)
  }
  /** COMIENZO OPERACIONES CRUD Table_Caballos **/
  // var MongoClient = require('mongodb').MongoClient
  var url = 'mongodb://127.0.0.1:27017/hipica'
  var ObjectID = require('mongodb').ObjectID

  socket.on('empezarprueba', function (nombrecompeticion, nombreprueba) {
    
    MongoClient.connect(url, function(err, client) { 
      const db = client.db(dbName)
      const col = db.collection(nombrecompeticion)
      if (err) throw err
        // Insert some users
        col.findOne(function (err, competicion){
          if (err) {
            console.log(err)
          } else {
            console.log('ENVIANDO PRUEBA ', nombreprueba)
            socket.emit('pruebaaempezar', competicion, nombreprueba)
          }
          // Close connection
         
        })
        client.close()
      })
    // })
  })

  socket.on('anadirbinomioempezarprueba', function (binomio) {
    socket.broadcast.emit('enviandobinomioaempezarprueba', binomio)
    console.log('ENVIANDO enviandobinomioaempezarprueba')
  })


  socket.on('grabaresultadoparticipante', function (coleccion, prueba, baremo, participante) {
    console.log('recibido resultadoparticipanteeeeeeeeeeeeeeeeeeeeeeeee', participante)
    var numeroderecorridos = 0
    if (funciones.leerbaremo(baremo) == '1') {
      var objetobinomio = {
        'jinete': participante.nombrejinete,
        'caballo': participante.nombrecaballo,
        'puntos': participante.puntos,
        'tiempo': participante.tiempo
      }
      numeroderecorridos = 1
    } else {
      var objetobinomio = {
    //  'orden': ordenbinomio,
        'jinete': participante.nombrejinete,
        'caballo': participante.nombrecaballo,
        'puntos': participante.puntos,
        'tiempo': participante.tiempo,
        'puntos2': participante.puntos2,
        'tiempo2': participante.tiempo2,
        'totalpuntos': participante.totalpuntos
      // 'totaltiempo': ''
      }
      numeroderecorridos = 2
    }
    MongoClient.connect('mongodb://127.0.0.1:27017/hipica', function (err, db) {
      if (err) throw err
      db.collection(coleccion).find().toArray(function (err, caballos) {
        caballos.forEach(function (err, indice) {
          for (var indiceprueba = 0; indiceprueba < caballos[0].pruebas.length; indiceprueba++) {
            if (caballos[indice].pruebas[indiceprueba].nombreprueba == prueba) {
              var pathresultadoprueba = 'pruebas.' + indiceprueba + '.os'
              var pathactualizarpruebapuntos = 'pruebas.' + indiceprueba + '.os.$.puntos'
              var pathactualizarpruebatiempo = 'pruebas.' + indiceprueba + '.os.$.tiempo'
              var pathactualizarpruebapuntos2 = 'pruebas.' + indiceprueba + '.os.$.puntos2'
              var pathactualizarpruebatiempo2 = 'pruebas.' + indiceprueba + '.os.$.tiempo2'
              var pathactualizarpruebatotalpuntos = 'pruebas.' + indiceprueba + '.os.$.totalpuntos'
              db.collection(coleccion).find({
                [pathresultadoprueba]: {
                  $elemMatch: {jinete: participante.nombrejinete, caballo: participante.nombrecaballo}
                }})
              .toArray(function (err, col) {
                if (err) throw err
            //    console.log('found XXXXXXXXXXXXXXXXXXXXXXXXXXXXX:', col)
                if (col.length == 0) {
                  // console.log('NO ENCONTRADO , INGRESAR DATOS')
                  db.collection(coleccion).update({},
                    {
                      $push: {
                        [pathresultadoprueba]: objetobinomio
                      }
                    })
                     db.close()
                } else {
                  // console.log('ENCONTRADO, SOLO ACTUALIZAMOS')
                  //* *FUNCIONAAAA**
                  if (numeroderecorridos == 1) {
                    db.collection(coleccion).update({[pathresultadoprueba]: {$elemMatch: {jinete: participante.nombrejinete, caballo: participante.nombrecaballo}}},
                      { $set: {
                        [pathactualizarpruebapuntos]: objetobinomio.puntos,
                        [pathactualizarpruebatiempo]: objetobinomio.tiempo}
                      })
                       db.close()
                      // fin RECORRIDOS = 1
                  } else {
                    db.collection(coleccion).update({[pathresultadoprueba]: {$elemMatch: {jinete: participante.nombrejinete, caballo: participante.nombrecaballo}}},
                      { $set: {
                        [pathactualizarpruebapuntos]: objetobinomio.puntos,
                        [pathactualizarpruebatiempo]: objetobinomio.tiempo,
                        [pathactualizarpruebapuntos2]: objetobinomio.puntos2,
                        [pathactualizarpruebatiempo2]: objetobinomio.tiempo2,
                        [pathactualizarpruebatotalpuntos]: objetobinomio.totalpuntos
                      }
                      })
                      db.close()
                  }
                }
              })
               actualizarpantallaresultadopruebaactiva(coleccion, prueba,socket)
              //  db.close()
            }
          }
        })
      })
    })  
  })
}
  // function enviaprueba (nombrecompeticion, nombreprueba) {
  //   db.collection(nombrecompeticion).findOne(function (err, competicion) {
  //     console.log('encontrado competicion : ', competicion)
  //     console.log('ENVIANBDO competicion : ', competicion)
  //     socket.emit('ordendesalidacompeticion', competicion, nombreprueba)
  //   })
  // }
