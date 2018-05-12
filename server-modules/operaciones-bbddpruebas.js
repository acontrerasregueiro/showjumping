
var funciones = require('./funciones.js')
module.exports = function(socket,MongoClient,url,dbName) {
  var url = 'mongodb://127.0.0.1:27017/hipica'
  var ObjectID = require('mongodb').ObjectID
  // const db = client.db(dbName);
  // const col = db.collection(nombrecompeticion)
   // PARA ENVIAR LOS DATOS A LA PANTALLA
   socket.on('actualizarpantallaordensalida', function (arrayordendesalida) {
    console.log('RECIBIDO ACTUALIZARPANTALLA ORDEN')
      console.log(arrayordendesalida)
    socket.broadcast.emit('actualizarordendesalida', arrayordendesalida)
})
  
  socket.on('websocketclasificar', function (arraytotal) {
    console.log('RECIBIDO ACTUALIZARPANTALLA CLASIFICAR')
    // console.log(arraytotal)
    socket.broadcast.emit('pintarclasificacion', arraytotal)//enviamos orden de actualizar clasificacion
  })

  socket.on('recargarpaginaclasificacion',function (){
    socket.broadcast.emit('recargarpagina')
    // alert('rec > recargarpaginaclasificacion')
  })
 

  socket.on('encabezadoclasificaciondeprueba',function (altura, trofeo,baremo){
   console.log('RECIBIDO ENCABEZADO PANTALLA CLASIFICACION, baremo,trofeo,altura')
    socket.broadcast.emit('generarencabezadoclasificaciondeprueba',altura, trofeo,baremo)
  })

  socket.on('importartcsv', function (filename) {
    console.log('RECIBIDO IMPORTARCSV FICHERO : ', filename)
    var data = fs.readFileSync(process.cwd() + '\\' + filename, { encoding: 'utf8'})
    var options = {
      delimiter: ';' // optional
    }
    var objetojson = csvjson.toObject(data, options)
    console.log(objetojson)
    socket.emit('importarordendesalida', objetojson)
  })


  socket.on('enviar_nueva_prueba', function (prueba, coleccion, idcompeticionainsertar) {
    MongoClient.connect('mongodb://127.0.0.1:27017/hipica', function (err, db) {
      if (err) throw err
  //     var collection = db.collection(coleccion)
      console.log('COLECCION : ', coleccion)
      console.log('ID DONDE INSERTAR  :', idcompeticionainsertar)
      console.log('RECIBIDO ENVIAR_NUEVA_PRUEBA  DATOS NUEVA PRUEBA :', prueba)
       // FUNCIONA 100%
      var nombreprueba = 'prueba' + prueba.numero
      var jsonnuevaprueba = {
        '_id': new ObjectID(),
        'nombreprueba': nombreprueba,
        'trofeo': prueba.trofeo,
        'altura': prueba.altura,
        'baremo': prueba.baremo,
        'numero': prueba.numero
      }
      db.collection(coleccion).update({'_id': ObjectID(idcompeticionainsertar)},
        { $push: {
          pruebas: jsonnuevaprueba
        }})
      db.close()
    })
   })
   socket.on('borrarprueba', function (coleccion, nombreprueba) {
     console.log('RECIBIDO BORRAR PRUEBA')
     console.log('COLECCION  SLECCIONADA PARA BORRAR  : ', coleccion)
     console.log('PRUEBA SLECCIONADA PARA BORRAR  : ', nombreprueba)
     MongoClient.connect('mongodb://127.0.0.1:27017/hipica', function (err, db) {
    if (err) throw err
    var collection = db.collection(coleccion)
    collection.update({},
      { $pull: {
        'pruebas': {'nombreprueba': nombreprueba}
      }}, function (err, records) {
        console.log(records)
      })
    db.close()
    })
  })
//  socket.on('nuevo_binomio', function (binomio, prueba, coleccion, baremo) {
//   console.log('baremo : ', baremo)
//   console.log('LEER BAREMO ', funciones.leerbaremo(baremo))
//   if (funciones.leerbaremo(baremo) == '1') {
//     var objetobinomio = {
//     //  '_id': new ObjectID(),
//       'orden': binomio.numero,
//       'jinete': binomio.jinete,
//       'caballo': binomio.caballo,
//       'puntos': '',
//       'tiempo': ''
//     }
//   } else {
//     var objetobinomio = {
//       'orden': binomio.numero,
//       'jinete': binomio.jinete,
//       'caballo': binomio.caballo,
//       'puntos': '',
//       'tiempo': '',
//       'puntos2': '',
//       'tiempo2': '',
//       'totalpuntos': '',
//       'totaltiempo': ''
//     }
//   }
//   var indiceprueba = 0
//   console.log('RECIBIDO BINOMIO PARA ORDEN DE SALIDA')
//   console.log('PRUEBA  :', prueba)
//   console.log('COLECCION : ', coleccion)
//   MongoClient.connect('mongodb://127.0.0.1:27017/hipica', function (err, db) {
//     if (err) throw err
//     db.collection(coleccion).find().toArray(function (err, caballos) {
//       caballos.forEach(function (err, indice) {
//         // console.log('LENGTH PRUEBAS :',caballos[indice].pruebas.length)
//         for (indiceprueba; indiceprueba < caballos[0].pruebas.length; indiceprueba++) {
//           if (caballos[indice].pruebas[indiceprueba].nombreprueba == prueba) {
//             console.log('AL FIN ENCONTRAMOS INDICE :             -> ', indiceprueba)
//             var path = 'pruebas.' + indiceprueba + '.os'
//             console.log('PATH DDDDDDDDDDDDDDDDD: ', path)
//             db.collection(coleccion).update({},
//               { $push: {
//                 [path]: objetobinomio
//               }}
//             )
//           }
//         }
//       })
//       db.close()
//     })
//   })
//  })

 socket.on('generarordendesalida', function (nombrecompeticion, nombreprueba) {

  MongoClient.connect(url, function(err, client) { 
    const db = client.db(dbName)
    const col = db.collection(nombrecompeticion)
        if (err) throw err
        db.collection(nombrecompeticion).findOne(function (err, competicion) {
          socket.emit('ordendesalidacompeticion', competicion, nombreprueba)
          console.log('enviando ordendesalidacompeticion')
        })
        client.close()
      })
  console.log('recibido generarordendesalida')
  console.log('COMPETICION  :', nombrecompeticion)
  console.log('PRUEBA :', nombreprueba)

 })


  socket.on('borrarbinomiodeordensalida', function (binomio, prueba, coleccion) {
    var ordenbinomio = parseInt(binomio.numero)
    var objetobinomio = {
      'orden': ordenbinomio,
      'jinete': binomio.jinete,
      'caballo': binomio.caballo
    }
    var indiceprueba = 0
    console.log('RECIBIDO BORRAR BINOMIO PARA ORDEN DE SALIDA')
    console.log('coleccipon : ', coleccion)
    console.log('PRUEBA  :', prueba)
    MongoClient.connect('mongodb://127.0.0.1:27017/hipica', function (err, db) {
      if (err) throw err
      db.collection(coleccion).find().toArray(function (err, caballos) {
        caballos.forEach(function (err, indice) {
          for (indiceprueba; indiceprueba < caballos[0].pruebas.length; indiceprueba++) {
            if (caballos[indice].pruebas[indiceprueba].nombreprueba == prueba) {
              var pathresultadoprueba = 'pruebas.' + indiceprueba + '.os'
              db.collection(coleccion).update({},
                {
                  $pull: {
                    [pathresultadoprueba]: {jinete: binomio.jinete, caballo: binomio.caballo}
                  }
                })
            }
          }
        })
      })
    })
  })
socket.on('actualizarnumerosordendesalida', function (binomio, binomioordenado, coleccion, prueba, baremodeprueba) {
  console.log('recibido actualizarnumerosordendesalida', binomioordenado)
  var ordenbinomio = parseInt(binomio.orden)
  var ordenbinomionuevo = parseInt(binomioordenado.orden)
  var objetobinomio = {}
  if (funciones.leerbaremo(baremodeprueba) == '1') {
    console.log('baremo con 1 recorrido')
    var objetobinomio = {
      'orden': ordenbinomio,
      'jinete': binomio.jinete,
      'caballo': binomio.caballo,
      'puntos': '',
      'tiempo': ''
    }
  } else {
    var objetobinomio = {
      'orden': ordenbinomio,
      'jinete': binomio.jinete,
      'caballo': binomio.caballo,
      'puntos': '',
      'tiempo': '',
      'puntos2': '',
      'tiempo2': '',
      'totalpuntos': '',
      'totaltiempo': ''
    }
  }
  MongoClient.connect('mongodb://127.0.0.1:27017/hipica', function (err, db) {
  if (err) throw err
  db.collection(coleccion).find().toArray(function (err, caballos) {
    caballos.forEach(function (err, indice) {
  //   console.log('LENGTH PRUEBAS :',caballos[indice].pruebas.length)
      for (var indiceprueba = 0; indiceprueba < caballos[0].pruebas.length; indiceprueba++) {
        if (caballos[indice].pruebas[indiceprueba].nombreprueba == prueba) {
          var path = 'pruebas.' + indiceprueba + '.os'
          var pathorden = 'pruebas.' + indiceprueba + '.os.$.orden'
          db.collection(coleccion).update({
            [path]: objetobinomio
          },
            { $set: {
              [pathorden]: ordenbinomionuevo
            }})
            db.close()
        }
      }
    })
   })
  })
 })
}
