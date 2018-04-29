 'use strict'
// Bootstrap wants jQuery global =(
  // window.jQuery = $ = require('jquery')
  // Bootstrap doesn't have a "main" field / export anything =(
  // var bootstrap = require('bootstrap/dist/js/bootstrap')
//   MongoClient = require('mongodb').MongoClient;
//   const assert = require('assert');
var rutas = require('./server-modules/rutas.js') // contiene la resolucion de rutas
 //contiene las operaciones sobre la bbdd Table_Jinetes
var bbddjinetes = require('./server-modules/operaciones-bbddjinete.js')
var bbddcaballos = require('./server-modules/operaciones-bbddcaballo.js')
// var bbddcompeticiones = require('./server-modules/operaciones-bbddcompeticiones.js')
// var bbddpruebas = require('./server-modules/operaciones-bbddpruebas.js')
// var bbddpruebaencurso = require('./server-modules/operaciones-bbddpruebaactiva.js')
// var serialport = require('./server-modules/operaciones-serialport.js')

var funciones = require('./server-modules/funciones.js')
var csvtojson = require('./server-modules/operaciones-csvjson')
var express = require('express')
var path = require('path')
// var Stream = require('stream')
var app = express()
var assert = require('assert')
var http = require('http').Server(app)
var io = require('socket.io')(http)
const MongoClient = require('mongodb').MongoClient

// Connection URL
const url = 'mongodb://localhost:27017'

// Database Name
const dbName = 'hipica'



http.listen(9000) // Iniciamos el servidor
rutas(app,path,express)

 console.log('Server listening on Port: 9000')
//  var $ = require('jquery');

io.on('connection', function (socket) {
bbddjinetes(socket,MongoClient,url,dbName)
bbddcaballos(socket,MongoClient,url,dbName)
// bbddcompeticiones(socket,MongoClient)
// bbddpruebas(socket,MongoClient)
// csvtojson(socket,MongoClient)
// bbddpruebaencurso(socket,MongoClient)
// serialport(socket)
})
