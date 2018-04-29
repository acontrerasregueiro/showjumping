/*Fichero en el que se realizan todas las operaciones relacionadas
con las clasificaciones de las competiciones*/
'use strict'

var funcionescomunes = require('./funciones-compartidas.js')
var funcionespruebas = require('./funciones-pruebas.js')
var clasificar = require('./clasificarbaremos.js')
var socket = io()
function clasificarbaremo (baremoelegido, arrayaordenar) {
  switch (baremoelegido) {
    case 'ASC':
      arrayaordenar.sort(
        firstBy('puntos')
      )
      break
    case 'ACC':
      arrayaordenar.sort(
      firstBy('puntos')
      .thenBy(function (v1, v2) { return v1.tiempo - v2.tiempo })
    )
      break
    case 'C':
      arrayaordenar.sort(
      firstBy(function (v1, v2) { return v1.tiempo - v2.tiempo })
    )
      break
    case 'DIF':
      arrayaordenar.sort(
      firstBy('puntos', -1)
      .thenBy(function (v1, v2) { return v1.tiempo - v2.tiempo })
    )
      break
    case 'CRELOJ':
      arrayaordenar.sort(
      firstBy('puntos', -1)
      .thenBy(function (v1, v2) { return v1.tiempo - v2.tiempo })
    )
      break
    case 'ASC/ACC':
    //AQUI COMIENZA OK
    arrayaordenar.sort(
    firstBy('puntos2')
    .thenBy(function (v1, v2) { return v1.tiempo2 - v2.tiempo2 })
    .thenBy('puntos')
    .thenBy(function (v1, v2) { return v1.tiempo - v2.tiempo })
    )
    break
    case 'ACC/ACC':
    //AQUI COMIENZA OK
    arrayaordenar.sort(
    firstBy('puntos2')
    .thenBy(function (v1, v2) { return v1.tiempo2 - v2.tiempo2 })
    .thenBy('puntos')
    .thenBy(function (v1, v2) { return v1.tiempo - v2.tiempo })
    )
    break
    case 'ACC/C':
    //AQUI COMIENZA OK
    arrayaordenar.sort(
    firstBy('tiempo2')
    .thenBy('puntos')
    .thenBy(function (v1, v2) { return v1.tiempo - v2.tiempo })
    )
    break
    case 'TDIF':
    //AQUI COMIENZA OK
    arrayaordenar.sort(
    firstBy('totalpuntos')
    .thenBy('tiempo2')
    .thenBy(function (v1, v2) { return v1.tiempo - v2.tiempo })
    )
    break
    case 'AM5':
      arrayaordenar.sort(
        firstBy('puntos2')
        // .thenby('orden')
        .thenBy(function (v1, v2) { return v1.tiempo2 - v2.tiempo2 })
        .thenBy('puntos')
        .thenBy(function (v1, v2) { return v1.tiempo - v2.tiempo })
      )
    break
  }
  return arrayaordenar
}
//anade los participantes ordenados a la lista clasificacionempezarprueba
function pintarclasificacionprimerafase(array,arraynoclasificados) {
  var clasificacionempezarprueba = document.getElementById('clasificacionempezarprueba')
  for (var i = 0; i< array.length ; i++) {
    var li = document.createElement('li')
    li.innerHTML = array[i].clasificacion + ' ' + array[i].caballo + ' ' + array[i].puntos + ' ' + array[i].tiempo
    clasificacionempezarprueba.appendChild(li)
  }
  for (var i = 0; i< arraynoclasificados.length ; i++) {
    var li = document.createElement('li')
    if (arraynoclasificados[i].puntos == 555) {
      li.innerHTML = '  ' + arraynoclasificados[i].caballo + ' ELIM'
    } else if (arraynoclasificados[i].puntos == 666) {
      li.innerHTML = '  ' + arraynoclasificados[i].caballo + ' RET'
    } else if (arraynoclasificados[i].puntos == 999) {
      li.innerHTML = '  ' + arraynoclasificados[i].caballo + ' NP'
    }
    clasificacionempezarprueba.appendChild(li)
  }
}
function pintareliminadossegundafase(array) {
  // console.log(array)
  var clasificacionempezarprueba = document.getElementById('clasificacionempezarprueba')
  for (var i = 0; i < array.length ; i++) {
    var cadena = ''
    if (array[i].puntos2 == 777) {
      // alert('ENCONTRADO 777 ELIM ', array[i].jinete)
      cadena = 'ELIM'
    } else  {
      cadena = 'RET'
    }
    var li = document.createElement('li')
    li.innerHTML = array[i].clasificacion + ' ' + array[i].caballo + ' ' + array[i].puntos +
    ' ' + array[i].tiempo + ' ' + cadena
    clasificacionempezarprueba.appendChild(li)
  }
}
function pintarclasificacionpruebatdif (array,arraynoclasificados) {
  var clasificacionempezarprueba = document.getElementById('clasificacionempezarprueba')
  clasificacionempezarprueba.innerHTML = ''
  //PRIMERO PINTAMOS LOS CLASIFICADOS
  for (var i = 0; i< array.length ; i++) {
    var li = document.createElement('li')
    li.innerHTML = array[i].clasificacion + ' ' + array[i].caballo + ' ' + array[i].totalpuntos + ' ' + array[i].tiempo2
    clasificacionempezarprueba.appendChild(li)
  }
  //POR ULTIMO PINTAMOS LOS NO CLASIFICADOS
  console.log(arraynoclasificados)
  for (var i = 0; i< arraynoclasificados.length ; i++) {
    var li = document.createElement('li')
    if (arraynoclasificados[i].puntos == 555) {
      li.innerHTML = '  ' + arraynoclasificados[i].caballo + ' ELIM'
    } else if (arraynoclasificados[i].puntos == 666) {
      li.innerHTML = '  ' + arraynoclasificados[i].caballo + ' RET'
    } else if (arraynoclasificados[i].puntos == 999) {
      li.innerHTML = '  ' + arraynoclasificados[i].caballo + ' NP'
    }
    clasificacionempezarprueba.appendChild(li)
  }
}
function pintarclasificacionprueba (array,arraynoclasificados) {
  var clasificacionempezarprueba = document.getElementById('clasificacionempezarprueba')
  clasificacionempezarprueba.innerHTML = ''
  //PRIMERO PINTAMOS LOS CLASIFICADOS
  for (var i = 0; i< array.length ; i++) {
    var li = document.createElement('li')
    li.innerHTML = array[i].clasificacion + ' ' + array[i].caballo + ' ' + array[i].puntos + ' ' + array[i].tiempo
    clasificacionempezarprueba.appendChild(li)
  }
  //POR ULTIMO PINTAMOS LOS NO CLASIFICADOS
  console.log(arraynoclasificados)
  for (var i = 0; i< arraynoclasificados.length ; i++) {
    var li = document.createElement('li')
    if (arraynoclasificados[i].puntos == 555) {
      li.innerHTML = '  ' + arraynoclasificados[i].caballo + ' ELIM'
    } else if (arraynoclasificados[i].puntos == 666) {
      li.innerHTML = '  ' + arraynoclasificados[i].caballo + ' RET'
    } else if (arraynoclasificados[i].puntos == 999) {
      li.innerHTML = '  ' + arraynoclasificados[i].caballo + ' NP'
    }
    clasificacionempezarprueba.appendChild(li)
  }
}

function pintarclasificacionsegundafasec(array) {
  var clasificacionempezarprueba = document.getElementById('clasificacionempezarprueba')
  clasificacionempezarprueba.innerHTML = ''
  // console.log(array)
  //PRIMERO PINTAMOS LOS CLASIFICADOS
  for (var i = 0; i< array.length ; i++) {
      var li = document.createElement('li')
      li.innerHTML = array[i].clasificacion + ' '
       + array[i].caballo + ' ' + array[i].puntos + ' ' + array[i].tiempo
       +  ' ' + array[i].tiempo2
       clasificacionempezarprueba.appendChild(li)
    }
}

function pintarclasificacionpruebadosfases (array,arraynoclasificados) {
  var clasificacionempezarprueba = document.getElementById('clasificacionempezarprueba')
  clasificacionempezarprueba.innerHTML = ''
  console.log('array a pintar en segunda fase : ',array)
  //PRIMERO PINTAMOS LOS CLASIFICADOS
  for (var i = 0; i < array.length  ; i++) {
    var cadena = ''
    if (array[i].puntos2 == 777) {
      // alert('ENCONTRADO 777 ELIM ', array[i].jinete)
      cadena = 'ELIM'
      var li = document.createElement('li')
      li.innerHTML = array[i].clasificacion + ' '
       + array[i].caballo + ' ' + array[i].puntos + ' ' + array[i].tiempo
       +  ' ' + cadena
       clasificacionempezarprueba.appendChild(li)
    } 
    if  (array[i].puntos2 == 888) {
      var li = document.createElement('li')
      li.innerHTML = array[i].clasificacion + ' '
       + array[i].caballo + ' ' + array[i].puntos + ' ' + array[i].tiempo
       +  ' ' + cadena
      cadena = 'RET'
    }    if  (array[i].puntos2 == 999) {
      var li = document.createElement('li')
      li.innerHTML = array[i].clasificacion + ' '
       + array[i].caballo + ' ' + array[i].puntos + ' ' + array[i].tiempo
       +  ' ' + cadena
      cadena = 'NP'
    } else {      
      var li = document.createElement('li')
      li.innerHTML = array[i].clasificacion + ' '
       + array[i].caballo + ' ' + array[i].puntos + ' ' + array[i].tiempo
       +  ' ' + array[i].puntos2 + ' ' + array[i].tiempo2
       clasificacionempezarprueba.appendChild(li)
      }
    }
  }
function asignarrankingtablaprimerafasenoclasificados(arraynoclasificados) {
  for (var i= 0; i < arraynoclasificados.length; i++) {
    var celdaclass = funcionespruebas.buscarentabla('tablaempezarprueba',arraynoclasificados[i].caballo,arraynoclasificados[i].jinete)
    if (arraynoclasificados[i].puntos == '555') {celdaclass.innerHTML = 'ELI'}
    if (arraynoclasificados[i].puntos == '666') {celdaclass.innerHTML = 'RET'}
    if (arraynoclasificados[i].puntos == '999') {celdaclass.innerHTML = 'NP'}    
  }
}
function asignarrankingatablasegundafase(arrayordenado){
  for (var i= 0; i < arrayordenado.length; i++) {
    var celdaclass = funcionespruebas.buscarentabla('tablaempezarprueba',arrayordenado[i].caballo,arrayordenado[i].jinete)
    celdaclass.innerHTML = arrayordenado[i].clasificacion
  }
}
function asignarrankingalistaempezarprueba(arrayordenado,arraynoclasificados,arrayprimerafaseclasificado) { 
  //PRIMERO LISTAMOS LOS CLASIFICADOS DE SEGUNDA FASE
  var cadena = ''
  for (var i= 0; i < arrayordenado.length; i++) {
    var li = document.createElement('li')
    if (arrayordenado[i].puntos2 == '777') {
      cadena = '  ELI' 
      li.innerHTML = arrayordenado[i].clasificacion + ' '
     + arrayordenado[i].caballo + ' ' + arrayordenado[i].puntos + ' ' + arrayordenado[i].tiempo + ' '+ cadena
     clasificacionempezarprueba.appendChild(li)
    } else if (arrayordenado[i].puntos2 == '888') {
    cadena = '  RET' 
    li.innerHTML = arrayordenado[i].clasificacion + ' '
    + arrayordenado[i].caballo + ' ' + arrayordenado[i].puntos + ' ' + arrayordenado[i].tiempo + ' '+ cadena
    clasificacionempezarprueba.appendChild(li)
    } else {
      li.innerHTML = arrayordenado[i].clasificacion + ' '
      + arrayordenado[i].caballo + ' ' + arrayordenado[i].puntos + ' ' + arrayordenado[i].tiempo + ' '+ 
      arrayordenado[i].puntos2 + ' ' + arrayordenado[i].tiempo2 
      clasificacionempezarprueba.appendChild(li)  
    }
  }
  //DESPUES LISTAMOS LSO DE LA PRIMERA
  for (var i= 0; i < arrayprimerafaseclasificado.length; i++) {
    var li = document.createElement('li')
    li.innerHTML = arrayprimerafaseclasificado[i].clasificacion + ' '
     + arrayprimerafaseclasificado[i].caballo + ' ' + arrayprimerafaseclasificado[i].puntos + ' ' + arrayprimerafaseclasificado[i].tiempo 
     clasificacionempezarprueba.appendChild(li)   
  }
  //DESPUES LOS NO CLASIFICADOS
  for (var i= 0; i < arraynoclasificados.length; i++) {
   
    if (arraynoclasificados[i].puntos == '555') {     
      var li = document.createElement('li')
      li.innerHTML = arraynoclasificados[i].caballo + '  ELI'
       clasificacionempezarprueba.appendChild(li)
    }
    if (arraynoclasificados[i].puntos == '666') {
      var li = document.createElement('li')
      li.innerHTML = arraynoclasificados[i].caballo +'  RET'
       clasificacionempezarprueba.appendChild(li)
      }
    if (arraynoclasificados[i].puntos == '999') {
      var li = document.createElement('li')
      li.innerHTML =arraynoclasificados[i].caballo + '  NP'
      clasificacionempezarprueba.appendChild(li)
    }    
  }
}
function asignarrankingatabla(arrayordenado,arraynoclasificados) {
  for (var i= 0; i < arrayordenado.length; i++) {
    // alert('clasificando  ' + arrayordenado[i].caballo)
    var celdaclass = funcionespruebas.buscarentabla('tablaempezarprueba',arrayordenado[i].caballo,arrayordenado[i].jinete)
    celdaclass.innerHTML = arrayordenado[i].clasificacion
  }
  for (var i= 0; i < arraynoclasificados.length; i++) {
    var celdaclass = funcionespruebas.buscarentabla('tablaempezarprueba',arraynoclasificados[i].caballo,arraynoclasificados[i].jinete)
    if (arraynoclasificados[i].puntos == '555') {celdaclass.innerHTML = 'ELI'}
    if (arraynoclasificados[i].puntos == '666') {celdaclass.innerHTML = 'RET'}
    if (arraynoclasificados[i].puntos == '999') {celdaclass.innerHTML = 'NP'}    
  }
}

function enviarencabezadoclasificacion() {
  var labeltrofeoempezarprueba = document.getElementById('labeltrofeoempezarprueba').innerHTML
  var labelalturaempezarprueba = document.getElementById('labelalturaempezarprueba').innerHTML
  var labelbaremoempezarprueba = document.getElementById('labelbaremoempezarprueba').innerHTML
  socket.emit('encabezadoclasificaciondeprueba',labelalturaempezarprueba,labeltrofeoempezarprueba,labelbaremoempezarprueba)
}

//anade al array la el numero de clasificacion
//1º,2º,3º , etc...
function asignarnumeroclasificacion(array,baremo,arraynoclasificados) {
  if (baremo == 'ASC') {
    clasificar.asc(array)
    pintarclasificacionprueba(array,arraynoclasificados)
    asignarrankingatabla(array,arraynoclasificados)
    var arraytotal =[]
    arraytotal = array.concat(arraynoclasificados)
    enviarencabezadoclasificacion()

    socket.emit('websocketclasificar',arraytotal)
  }
  if (baremo == 'ACC') {
    clasificar.acc(array)
    pintarclasificacionprueba(array,arraynoclasificados)
    asignarrankingatabla(array,arraynoclasificados)
    var arraytotal =[]
    arraytotal = array.concat(arraynoclasificados)
    enviarencabezadoclasificacion()

    socket.emit('websocketclasificar',arraytotal)
  }
  if (baremo == 'C') {
    clasificar.c(array)
    asignarrankingatabla(array,arraynoclasificados)
    pintarclasificacionprueba(array,arraynoclasificados)
    var arraytotal =[]
    arraytotal = array.concat(arraynoclasificados)
    enviarencabezadoclasificacion()

    socket.emit('websocketclasificar',arraytotal)

  }
  if (baremo == 'DIF') {
    clasificar.c(array)
    asignarrankingatabla(array,arraynoclasificados)
    pintarclasificacionprueba(array,arraynoclasificados)
    var arraytotal =[]
    arraytotal = array.concat(arraynoclasificados)
    enviarencabezadoclasificacion()

    socket.emit('websocketclasificar',arraytotal)
  }
  if (baremo == 'TDIF') {
    clasificar.tdif(array)
    asignarrankingatabla(array,arraynoclasificados)
    pintarclasificacionpruebatdif(array,arraynoclasificados)
    var arraytotal =[]
    arraytotal = array.concat(arraynoclasificados)
    enviarencabezadoclasificacion()

    socket.emit('websocketclasificar',arraytotal)
  }
  if (baremo == 'CRELOJ') {
    clasificar.creloj(array)
    asignarrankingatabla(array,arraynoclasificados)
    pintarclasificacionprueba(array,arraynoclasificados)
    var arraytotal =[]
    arraytotal = array.concat(arraynoclasificados)
    enviarencabezadoclasificacion()

    socket.emit('websocketclasificar',arraytotal)
  }
  if (baremo == 'ASC/ACC') {
    var arraytotal = []
    var arraysegundafase = clasificar.segundafaseacc(array)
    var arrayintercambio = []
    var arrayprimerafase = []
    for (var i = 0; i < array.length; i ++) {
       if (array[i].puntos2 == 1111) {
         arrayintercambio.push(array[i])
       }
    }
    // pintarclasificacionpruebadosfases(arraysegundafase,arraynoclasificados)
    // pintarclasificacionpruebadosfases(arraysegundafase,arrayelimsegundafase)
    var clasificacionempezarprueba = document.getElementById('clasificacionempezarprueba')
    clasificacionempezarprueba.innerHTML = ''
    var arrayprimerafaseclasificado = clasificar.primerafaseasc(arrayintercambio,arraysegundafase.length)
    asignarrankingatabla(arraysegundafase,arraynoclasificados)
    asignarrankingatabla(arrayprimerafaseclasificado,arraynoclasificados)
    asignarrankingalistaempezarprueba(arraysegundafase,arraynoclasificados,arrayprimerafaseclasificado)
    arraytotal = arraysegundafase.concat(arrayprimerafaseclasificado,arraynoclasificados)
    enviarencabezadoclasificacion()
    socket.emit('websocketclasificar',arraytotal)
    //  alert('emit websocketclasificar')
  }
  if (baremo == 'ACC/ACC') {
    var arraytotal =[]
    var arraysegundafase = []
     //  clasificar.accacc(array)
    var arrayelimsegundafase = []
    var arrayintercambio = []
    var arrayprimerafase = []
     for (var i = 0; i < array.length; i ++) {
         if (array[i].puntos2 == 1111) {
           arrayprimerafase.push(array[i])
         } else if ((array[i].puntos2 == 777) || (array[i].puntos2 == 888)) {
           arrayelimsegundafase.push(array[i])
         } else {
           arraysegundafase.push(array[i])
         }
     }
     arraysegundafase = clasificar.accacc(arraysegundafase)
     arrayelimsegundafase = clasificar.elimsegundafaseacc(arrayelimsegundafase,arraysegundafase.length)
     //  console.log(arrayelimsegundafase)
     pintarclasificacionpruebadosfases(arraysegundafase,arrayelimsegundafase)
     asignarrankingatablasegundafase(arraysegundafase) 
     asignarrankingatablasegundafase(arrayelimsegundafase) 
     
     pintareliminadossegundafase(arrayelimsegundafase)
     var clasificados = arraysegundafase.length + arrayelimsegundafase.length
     var arrayprimerafaseclasificado = clasificar.primerafaseacc(arrayprimerafase, clasificados)
     pintarclasificacionprimerafase(arrayprimerafaseclasificado,arraynoclasificados)
     asignarrankingatablasegundafase(arrayprimerafaseclasificado)
     asignarrankingtablaprimerafasenoclasificados(arraynoclasificados)
     enviarencabezadoclasificacion()
     arraytotal = arraysegundafase.concat(
       arrayelimsegundafase,
       arrayprimerafaseclasificado,
       arraynoclasificados      
      )
     socket.emit('websocketclasificar',arraytotal)
     console.log('enviando array total : ' + arraytotal)
     //  asignarrankingatabla(arrayprimerafaseclasificado,arraynoclasificados)   
   }

  if (baremo == 'ACC/C') {
    var arraysegundafase = []
   //  clasificar.accacc(array)
    var arrayelimsegundafase = []
    var arrayintercambio = []
    var arrayprimerafase = []
    for (var i = 0; i < array.length; i ++) {
       if (array[i].puntos2 == 1111) {
         arrayprimerafase.push(array[i])
       } else if ((array[i].puntos2 == 777) || (array[i].puntos2 == 888)) {
         arrayelimsegundafase.push(array[i])
       } else {
         arraysegundafase.push(array[i])
       }
    }
    arraysegundafase = clasificar.accc(arraysegundafase)
    arrayelimsegundafase = clasificar.elimsegundafaseacc(arrayelimsegundafase,arraysegundafase.length)
    pintarclasificacionpruebadosfases(arraysegundafase,arraynoclasificados)
    asignarrankingatablasegundafase(arraysegundafase) 
    asignarrankingatablasegundafase(arrayelimsegundafase) 
    pintareliminadossegundafase(arrayelimsegundafase)
    var clasificados = arraysegundafase.length + arrayelimsegundafase.length
    var arrayprimerafaseclasificado = clasificar.primerafaseacc(arrayprimerafase, clasificados)
    pintarclasificacionprimerafase(arrayprimerafaseclasificado,arraynoclasificados)
    asignarrankingatablasegundafase(arrayprimerafaseclasificado)
    asignarrankingtablaprimerafasenoclasificados(arraynoclasificados)
  }
  if (baremo == 'AM5') {   
    //REVISAR AQUI ARRAY NO CLASIFICADOS! NO SE ASIGNAN VALORES creemos que falta estas 2 lineas comentadas en donde corresponde, en desempate y sin el
   // arraytotal = array.concat(arraynoclasificados)
   // socket.emit('websocketclasificar',arraytotal)
    var desempate = document.getElementById('checkboxdesempate').checked
    if (!desempate) {
      console.log(array)
      clasificar.recorridoprevio(array)
            array.sort( 
        firstBy('clasificacion')
        .thenBy('orden')  
      )
      alert('clasfiicaciondo first by class thenbyu order')
      pintarclasificacionprueba(array,arraynoclasificados)
      asignarrankingatabla(array,arraynoclasificados)
      enviarencabezadoclasificacion()
      arraytotal = array.concat(arraynoclasificados)
      socket.emit('websocketclasificar',arraytotal)
      
      // array.sort( 
      //   firstBy('clasificacion')
      //   .thenBy('orden')  
      // )
      // alert('clasfiicaciondo first by class thenbyu order')
    }
    if (desempate) {
      clasificar.recorridoprevio(array)
      clasificar.recorridoprevio2(array)
      pintarclasificacionprueba(array,arraynoclasificados)
      asignarrankingatabla(array,arraynoclasificados)
      enviarencabezadoclasificacion()
      arraytotal = array.concat(arraynoclasificados)
      socket.emit('websocketclasificar',arraytotal)
    }
  }
}


function clasificarpruebaactiva (objetoprueba) {
  // borrarelementosli()
//  console.log('clasificar ', (objetoprueba))
console.log('PRUEBA A CLASIFICAR : ',objetoprueba)
  var encabezadoAltura = document.getElementById('encabezadoAltura')
  var encabezadoBaremo = document.getElementById('encabezadoBaremo')
  var encabezadoTrofeo = document.getElementById('encabezadoTrofeo')
  var clasificacionempezarprueba = document.getElementById('clasificacionempezarprueba')
  var baremo = objetoprueba.baremo
  var trofeo = objetoprueba.trofeo
  var altura = objetoprueba.altura
  encabezadoAltura.innerHTML = altura
  encabezadoTrofeo.innerHTML = trofeo
  encabezadoBaremo.innerHTML = baremo
  clasificacionempezarprueba.innerHTML = ''
  if (objetoprueba.os.length > 0) {
      //   COMENZamos coN PRUEBAS PARA PASAR VCALORES Y ORDENAR ARRAY//
    var arraynoclasificados = []
    var arrayprueba = []
    for (var indice = 0; indice < objetoprueba.os.length; indice++) {
        //* ************** SI EL ORDEN ES IGUAL AL INDICE -1 (PARA QUE SE INTRODUZCAN DATOS EN ORDEN)
      var objetoparticipante = {}
      objetoparticipante.jinete = objetoprueba.os[indice].jinete
      objetoparticipante.caballo = objetoprueba.os[indice].caballo
      objetoparticipante.puntos = parseInt(objetoprueba.os[indice].puntos)
      objetoparticipante.tiempo = parseFloat(objetoprueba.os[indice].tiempo).toFixed(2)
      objetoparticipante.orden = objetoprueba.os[indice].orden
        // tenemos que pasar a formato correcto los datos , para que la libreria
        // thenBy ordene de modo correcto.
      if ((baremo == 'ASC/ACC') || (baremo == 'ACC/ACC') || (baremo == 'ACC/C')|| (baremo == 'AM5')) {
        objetoparticipante.puntos2 = parseInt(objetoprueba.os[indice].puntos2)
        objetoparticipante.tiempo2 = parseFloat(objetoprueba.os[indice].tiempo2).toFixed(2)
      }
      if (baremo == 'TDIF') {
        objetoparticipante.puntos2 = parseInt(objetoprueba.os[indice].puntos2)
        objetoparticipante.totalpuntos = parseInt(objetoprueba.os[indice].totalpuntos)
        objetoparticipante.tiempo2 = parseFloat(objetoprueba.os[indice].tiempo2).toFixed(2)
      }
      /*
      555 eliminado 1ª -  dif o creloj  ptos 0 ,tiempo 001 eliminado
      666 retirado - dif o creloj ptos 0 tiempo 1
      777 eliminado 2ª
      888 retirado 2ª
      999 no presentado  - dif o creloj ptos 0 tiempo 999
      444 eliminado no valido  - dif o cereloj  ptos 0 tiempo 888
      9999 NO PASAN A LA SEGUNDA FASE
      */

      /*
      VALIDO PARA LOS BAREMOS DE 1 RECORRIDO SENCILLO
      VALIDO PARA EL TIEMPO DIFERIDO ART274.5.6
       Y ELIMINADOS EN LA PRIMERA FASE
      */
      if ((objetoparticipante.puntos != 555) &&  //si no esta eliminado
        (objetoparticipante.puntos != 666) &&// ni retirado
        (objetoparticipante.puntos != 999)) { //ni no presentado
          // xxxxxxxxxxxxx AQUI HAY QUE METER LOS PARTICPANTES QUE YA HAYAN DISPUTADO
          // ES DECIR QUE NO ESTÉ EN BLANCO SUS RESULTADOS
          if (isNaN(objetoparticipante.tiempo) == false) { // || (objetoparticipante.puntos != null)) {
      // console.log('ENCONTRADO PARTICIPANTE CON PUNTOS COMO NAN NULL O         :', objetoparticipante)
            arrayprueba.push(objetoparticipante)
          }
          // arrayprueba.push(objetoparticipante)
        } else {
          arraynoclasificados.push(objetoparticipante)
          arraynoclasificados.sort(firstBy('puntos'))
        }
   } // fin for

    var arrayordenado = []
    console.log('arrray prueba : '  , arrayprueba)
    arrayordenado = clasificarbaremo(baremo,arrayprueba)
    //CLASIFICAR BAREMO ME DEVUELVE EL ARRAY ORDENADO POR PTOS TIEMPO,DEPENDIENDO DEL baremo
    //CON LA LIBRERIA THENBY
    console.log('array ordenado : ', arrayordenado)
    asignarnumeroclasificacion(arrayordenado,baremo,arraynoclasificados)
 }
}// fin function


function iniciarclasificacion(socket) {
  socket.on('clasificarpruebaactiva', function (competicion, nombreprueba) {
    console.log('RECIBIDO CLASIFICAR ', competicion)
    for (var indice = 0; indice < competicion.pruebas.length; indice++) {
      if (competicion.pruebas[indice].nombreprueba == nombreprueba) {
        var objetoprueba = competicion.pruebas[indice]
        var baremodeprueba = competicion.pruebas[indice].baremo
        clasificarpruebaactiva(objetoprueba)
      }
    }
  })
}

module.exports.iniciarclasificar = function(socket) {
  iniciarclasificacion(socket)
}
