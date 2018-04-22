 'use strict'
// Bootstrap wants jQuery global =(
  // window.jQuery = $ = require('jquery')
  // Bootstrap doesn't have a "main" field / export anything =(
  // var bootstrap = require('bootstrap/dist/js/bootstrap')

var rutas = require('./server-modules/rutas.js') // contiene la resolucion de rutas
 //contiene las operaciones sobre la bbdd Table_Jinetes
// var bbddjinetes = require('./server-modules/operaciones-bbddjinete.js')
// var bbddcaballos = require('./server-modules/operaciones-bbddcaballo.js')
// var bbddcompeticiones = require('./server-modules/operaciones-bbddcompeticiones.js')
// var bbddpruebas = require('./server-modules/operaciones-bbddpruebas.js')
// var bbddpruebaencurso = require('./server-modules/operaciones-bbddpruebaactiva.js')
// var serialport = require('./server-modules/operaciones-serialport.js')

// var funciones = require('./server-modules/funciones.js')
// var csvtojson = require('./server-modules/operaciones-csvjson')
var express = require('express')
var path = require('path')
// var Stream = require('stream')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io').listen(http)
// var firstBy = require('thenby')
var SerialPort = require('serialport')


// LANZAR MONGODB PRIMERO
// mongod --dbpath c:\data\db
// var MongoClient = require('mongodb').MongoClient
// var test = require('assert')
// Connection url
// var url = 'mongodb://127.0.0.1:27017/hipica'
// var ObjectID = require('mongodb').ObjectID
//Connect using MongoClient
// MongoClient.connect(url, function (err, db) {
//   // Use the admin database for the operation
//   if (err) console.log(err)
//   var adminDb = db.admin()
//   // List all the available databases
//   adminDb.listDatabases(function (err, dbs) {
//     test.equal(null, err)
//     test.ok(dbs.databases.length > 0)

//     db.close()
//   })
// })
http.listen(9000) // Iniciamos el servidor
rutas(app,path,express)

 console.log('Server listening on Port: 9000')
//  var $ = require('jquery');

// io.on('connection', function (socket) {
// bbddjinetes(socket,MongoClient)
// bbddcaballos(socket,MongoClient)
// bbddcompeticiones(socket,MongoClient)
// bbddpruebas(socket,MongoClient)
// csvtojson(socket,MongoClient)
// bbddpruebaencurso(socket,MongoClient)
// serialport(socket)
// })
