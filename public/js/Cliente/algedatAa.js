// analizamos los datos recibidos por el puerto serie del alge.
var socket = io()
// socket.on('listadopuertos', function () {
//
// })
// function actualizarpantallaordensalida2 (filaid) {
//   alert('desempate NO CHECKED')
//   console.log('RECIBIDO actualizarpantallaordendesalida')
//   var filaseleccionada = document.getElementById(filaid)
//   console.log('seleccionado : ', filaseleccionada)
//   var arrayordendesalida = []
//   var jinetesamostrar = 10
//   var elementopadre = document.getElementById(filaid)
//   var desempate = document.getElementById('checkboxdesempate').checked
//     if (!desempate) {
//       alert('desempate NO CHECKED')
//       for (var indice = 0; indice < jinetesamostrar; indice++) {
//         var hermanosiguiente = document.getElementById(filaseleccionada.id).nextSibling
//         if (hermanosiguiente != null) { // siempre y cuando el hermano siguiente exista
//           //  console.log('nextsibling : ',hermanosiguiente);
//           var indicedefila = hermanosiguiente.id
//           var indicedefila = indicedefila.replace('filapruebaactiva', '')
//           //  console.log('INBDICE FILA : ',indicedefila)
//           var participante = {}
//           var caballo = document.getElementById('participante' + indicedefila + 'Caballo')
//           var jinete = document.getElementById('participante' + indicedefila + 'Jinete')
//           var orden = document.getElementById('participante' + indicedefila + 'Orden')
//           participante.caballo = caballo.innerHTML
//           participante.jinete = jinete.innerHTML
//           participante.orden = orden.innerHTML
//           arrayordendesalida[indice] = participante
//           //  console.log('participante : ',participante)
//           console.log('ACTUALIZAR PANTALLA ORDEN DE SALIDA , ARRAY  : indice ,', arrayordendesalida[indice])
//           filaseleccionada = hermanosiguiente
//         } // fin if
//       }// fin for
//     }
//     if (desempate) {
//       alert('DESEMPATE CHECKED')
//     }

  
//   console.log(arrayordendesalida)
//   socket.emit('actualizarpantallaordensalida', arrayordendesalida)
// }
// function actualizarresultadoempezarprueba (jineteagrabarresultado) {
//   var cuantostr = document.getElementById('tbodyempezarprueba').getElementsByTagName('tr').length
//   console.log('ELEMENTOS TR : ', cuantostr)
//   var prueba = inputNombrepruebaconfig.value
//   var coleccion = nombremenuizquierdaCompeticion.value
//   var idC = document.getElementById('idC').value
//   // var idcompeticon = idC.value
//   console.log('PRUEBA ', prueba)
//   console.log('Coleccion', coleccion)
//   console.log('IDC ', idC)
//   socket.emit('grabarresultado', jineteagrabarresultado, coleccion, prueba, idC)
//   console.log(jineteagrabarresultado)
//   for (var indice = 0; indice < cuantostr; indice++) {
//     // var binomio = {}  //ALMACENAMOS EL BINOMIO ANTIGUO7
//     // var binomioordenado = {}
//     // var jinete = document.getElementById('fila' + indice + 'JineteOS')
//     // var caballo = document.getElementById('fila' + indice + 'CaballoOS')
//     // var spanorden = document.getElementById('fila' + indice + 'NumeroOS')
//     // binomio.orden = spanorden.innerHTML
//     // binomio.jinete = jinete.innerHTML
//     // binomio.caballo = caballo.innerHTML
//     // var orden = indice + 1  // + 1 YA QUE EL PRIMER ELEMENTO ES CERO
//     // spanorden.innerHTML = orden
//     // binomioordenado.orden = spanorden.innerHTML
//     // binomioordenado.jinete = jinete.innerHTML
//     // binomioordenado.caballo = caballo.innerHTML
//     // socket.emit('actualizarresultado',binomio,binomioordenado,coleccion,prueba)
//     console.log(indice)
//   }
// }

// DATOS DISPLAY BOARD
function analizardatadisplay (datos) {
  var puntos = document.getElementById('labelpuntos')
  var tiempo = document.getElementById('labeltiempo')
  if (datos.substring(0, 1) == 'A') {
    // puntos.innerHTML = ''
    // SI LA CADENA COMIENZA POR A NO HACER NADA

  } else if (datos.charAt(6) == '.') {
    // significa que participante a finalizado O  ESTÁ DURANTE el recorrido
    puntos.innerHTML = 'P :' + datos.substring(0, 3)
    var cadenatiempo = datos.substring(7, 19)
    // ELIMINAMOS TODOS LOS ESPACIOS
    cadenatiempo = cadenatiempo.replace(/\s/g, '')
    tiempo.innerHTML = 'T :' + cadenatiempo
  } else {
    cadenatiempo = datos.replace(/\s/g, '')
    tiempo.innerHTML = 'T :' + cadenatiempo
    puntos.innerHTML = ''
  }
}

// DATOS RS232
function analizardata (datos) {
  //CHECKBOX PARA INDICAR SI ESTA EN EL DESEMPATE

  // 1er caso si la cadena comienza por "n" significa nuevo jinete
  if ((datos.substring(0, 1) == 'n') && (datos != 'n0000')) {
    console.log('NUEVO PARTICIPANTE nº : ', datos)
    datos = datos.replace('n', '')
    var orden = parseInt(datos)
    // mi fila comienza en 0 , pero el orden es +1
    orden = orden - 1
    console.log('ORDEN = PARSEINT : ', orden)
    var jineteencurso = document.getElementById('filapruebaactiva' + orden)
    // INICIALIZAMOS EL JINETE A PUNTOS '0' EN LA PRIMERA FASE O RECORRIDO
    var jineteterminado = document.getElementById('participante' + orden + 'Penalidades')
    jineteterminado.innerHTML = '0'
    borrarfilaempezarprueba(tbodyempezarprueba)
    jineteencurso.classList.add('activo')
    actualizarjineteenpista(jineteencurso.id)
    actualizarpantallaordendesalida(jineteencurso.id)
  } // FIN PRESENTACION PARTICIPANTE
  // SI LA CADENA ES > 5 , ES DECIR NO ES UN NUEVO PARTICIPANTE, ANALIZAMOS
  if (datos.length > 5) {
    // ANALIZAMOS DATOS , SI LA 5ª POSICION NO ES UN ESPACIO " ",
    // ES UN BAREMO DOS FASES

    var fase = datos.charAt(5)
    // analizamos el tiempo total
    // console.log('fase = 0')
    if (fase == ' ') {
      console.log('NO ES DOS FASES')
    } else if (fase == '1') {
      console.log('PRIMERA FASE ')
      // textarealogalge.value = 'ESTAMOS EN PRIMERA FASE ' +'\n' + textarealogalge.value
    } else if (fase == '2') {
      console.log('SEGUNDA FASE')
    //  textarealogalge.value = 'ESTAMOS EN SEGUNDA FASE ' +'\n' + textarealogalge.value
    }
    console.log('DATOS : ', datos)
    var dorsal = datos.substring(1, 5)
    console.log('Dorsal :', dorsal)
    var comando = datos.substring(6, 9)
    console.log('COMANDO :', comando)

    if (comando == 'RT ') {
      var tiempoRT = datos.substring(10, 21)
      var tiempoRTformateado = parseFloat(tiempoRT.replace(/\s/g, ''), 10)
      tiempoRTformateado = parseFloat(tiempoRTformateado).toFixed(2)
      var dorsal = dorsal.replace('n', '')
      var orden = parseInt(dorsal)
      orden = orden - 1
      if (fase == '1') { // si estamos en la primera fase
        var jineteterminado = document.getElementById('participante' + orden + 'Tiempo')
        jineteterminado.innerHTML = tiempoRTformateado
      } 
    }
    if ((comando == 'RTT')) {
      console.log('FASE  : ', fase)
      var tiempoRTT = datos.substring(10, 21)
      var tiempototalformateado = parseFloat(tiempoRTT.replace(/\s/g, ''), 10)
      // .TO FIXED PARA AÑADIR DOS DECIMALES EN CASO DE QUE SEA UN ENTERO JUSTO EJEMPLO 7SEGS = 7.00
      tiempototalformateado = parseFloat(tiempototalformateado).toFixed(2)
      // eliminamos espacios en blanco
      console.log('TIEMPO RTT :', tiempoRTT.replace(/\s/g, ''))
      console.log('TIEMPO formateado  :', tiempototalformateado)
      var dorsal = dorsal.replace('n', '')
      var orden = parseInt(dorsal)
      orden = orden - 1
      // SI ES UN DOS FASES GUARDAMOS LOS DATOS DEL TIEMPO EN LA CELDA DE LA SEGUYNDA FASE
      if (fase == '2') {
      //  alert('fase : ELSE', fase)
        var jineteterminado = document.getElementById('participante' + orden + 'Tiempo2')
        jineteterminado.innerHTML = tiempototalformateado
      } else { // SI NO LOS GUARDAMOS EN LA CELDA PRINCIPAL
        //SI ESTAMOS EN UN DESEMPATE 
        var jineteterminado = document.getElementById('participante' + orden + 'Tiempo')
        jineteterminado.innerHTML = tiempototalformateado
      }      
    }
    if ((comando == 'RTM')) {
      console.log('FASE  : ', fase)
      var tiempoRTM = datos.substring(10, 21)
      var tiempototalformateado = parseFloat(tiempoRTM.replace(/\s/g, ''), 10)
      // .TO FIXED PARA AÑADIR DOS DECIMALES EN CASO DE QUE SEA UN ENTERO JUSTO EJEMPLO 7SEGS = 7.00
      tiempototalformateado = parseFloat(tiempototalformateado).toFixed(2)
      // eliminamos espacios en blanco
      console.log('TIEMPO RTM :', tiempoRTM.replace(/\s/g, ''))
      console.log('TIEMPO RTM formateado  :', tiempototalformateado)
      var dorsal = dorsal.replace('n', '')
      var orden = parseInt(dorsal)
      orden = orden - 1
      // SI ES UN DOS FASES GUARDAMOS LOS DATOS DEL TIEMPO EN LA CELDA DE LA SEGUYNDA FASE
      if (fase == '2') {
        // alert('fase : ELSE', fase)
        var jineteterminado = document.getElementById('participante' + orden + 'Tiempo2')
        jineteterminado.innerHTML = tiempototalformateado
      } else if (fase == '1') { // SI NO LOS GUARDAMOS EN LA CELDA PRINCIPAL
        var jineteterminado = document.getElementById('participante' + orden + 'Tiempo')
        jineteterminado.innerHTML = tiempototalformateado
      }
    }
    // analizamos penalidad exceso de tiempo en segunda fase,
    // para la primera no hace falta, ya que si es dos fase no pasa a la segunda,
    // si fuera un 274.5.6 (pasan todos suma ptos y tiempo 2ª) calculamos la penalidad
    // detiempo de la primera = ptos2ª - ptos totales.
    if (comando == 'PTM') {
      var penalidadTiempo = datos.substring(10, 21)
      var penalidadtiempoformateado = parseInt(penalidadTiempo.replace(/\s/g, ''), 10)
        // eliminamos espacios en blanco
      console.log('TP :', penalidadTiempo.replace(/\s/g, ''))
      console.log('PEnalidad formateado  :', penalidadtiempoformateado)
      var dorsal = dorsal.replace('n', '')
      var orden = parseInt(dorsal)
      orden = orden - 1
      if (fase == '2') {
        var jineteterminado = document.getElementById('participante' + orden + 'Penalidades2')
        jineteterminado.innerHTML = penalidadtiempoformateado + parseInt(jineteterminado.innerHTML)
      }
    }
    if ((comando == 'C1M') || (comando == 'C1 ')) {
      // INICIALIZAMOS LA ETIQUETA DE PUNTOS SEGUNDA FASE CUANDO TERMINA LA PRIMERA
      if (fase == '1') {
        var dorsal = dorsal.replace('n', '')
        var orden = parseInt(dorsal)
        orden = orden - 1
        var jineteterminado = document.getElementById('participante' + orden + 'Penalidades2')
        jineteterminado.innerHTML = '0'
      }
    }

    // analizamos penalidades totales
    if (comando == 'TP ') {
      var penalidadTP = datos.substring(10, 21)
      var penalidadtotalformateado = parseInt(penalidadTP.replace(/\s/g, ''), 10)
      // eliminamos espacios en blanco
      console.log('TP :', penalidadTP.replace(/\s/g, ''))
      console.log('PEnalidad formateado  :', penalidadtotalformateado)
      var dorsal = dorsal.replace('n', '')
      var orden = parseInt(dorsal)
      orden = orden - 1

      if (fase == '2') {
        var jineteterminado = document.getElementById('participante' + orden + 'PenalidadesTotal')
        jineteterminado.innerHTML = penalidadtotalformateado
        var labelpenalidades1 = document.getElementById('participante' + orden + 'Penalidades')
        var labelpenalidades2 = document.getElementById('participante' + orden + 'Penalidades2')
        penalidades2 = parseInt(labelpenalidades2.innerHTML)
        if (labelpenalidades2.innerHTML != 'ELIM') {
          labelpenalidades1.innerHTML = penalidadtotalformateado - penalidades2
        }
      } else {
        var jineteterminado = document.getElementById('participante' + orden + 'Penalidades')
        jineteterminado.innerHTML = penalidadtotalformateado
      }
    }
    if (comando == 'P  ') {
      var penalidadP = datos.substring(10, 21)
      var penalidadtotalformateado = parseInt(penalidadP.replace(/\s/g, ''), 10)
      // eliminamos espacios en blanco
      console.log('PENALIDADP :', penalidadP.replace(/\s/g, ''))
      console.log('PEnalidad formateado  :', penalidadtotalformateado)
      var dorsal = dorsal.replace('n', '')
      var orden = parseInt(dorsal)
      orden = orden - 1
      if (fase == ' ') {
        // PRIMERO REVISAMOS SI FUE UN INPUT
        if (datos.charAt(0) == 'i') {
          console.log('RECIBIDO IINPUT ,penalidadtotalformateado  ::::::', penalidadtotalformateado)
          var jineteterminado = document.getElementById('participante' + orden + 'Penalidades')
          jineteterminado.innerHTML = penalidadtotalformateado
        } else {
          alert('derribo sin fase y NO INPUT')
          var jineteterminado = document.getElementById('participante' + orden + 'Penalidades')
          jineteterminado.innerHTML = penalidadtotalformateado + parseInt(jineteterminado.innerHTML)
        }
      }
      if (fase == '2') {
          // PRIMERO REVISAMOS SI FUE UN INPUT
        if (datos.charAt(0) == 'i') {
          console.log('RECIBIDO IINPUT ,penalidadtotalformateado  ::::::', penalidadtotalformateado)
          var jineteterminado = document.getElementById('participante' + orden + 'Penalidades')
          jineteterminado.innerHTML = penalidadtotalformateado
        } else {
          var jineteterminado = document.getElementById('participante' + orden + 'Penalidades2')
          jineteterminado.innerHTML = penalidadtotalformateado + parseInt(jineteterminado.innerHTML)
        }
      }
      if (fase == '1') {
          // PRIMERO REVISAMOS SI FUE UN INPUT
        if (datos.charAt(0) == 'i') {
          console.log('RECIBIDO IINPUT ,penalidadtotalformateado  ::::::', penalidadtotalformateado)
          var jineteterminado = document.getElementById('participante' + orden + 'Penalidades')
          jineteterminado.innerHTML = penalidadtotalformateado
        } else {
          var jineteterminado = document.getElementById('participante' + orden + 'Penalidades')
          jineteterminado.innerHTML = penalidadtotalformateado + parseInt(jineteterminado.innerHTML)
        }
      }
    }
    // PRIMERO REVISAMOS SI ES UN ELIMINADO
    if (datos.charAt(0) == 'd') {
      var dorsal = dorsal.replace('n', '')
      var orden = parseInt(dorsal)
      orden = orden - 1
      // SI LLEGA UNA D, SIGNIFICA ELIMINADO
      if (fase == '2') { // eliminado en la 2ª
        var jineteterminado = document.getElementById('participante' + orden + 'Penalidades2')
        jineteterminado.innerHTML = 'ELIM'
      }
      if (fase == '1') { // eliminado en la 1ª
        var jineteterminado = document.getElementById('participante' + orden + 'Penalidades')
        jineteterminado.innerHTML = 'ELIM'
      }
      if (fase == ' ') { // eliminado en recorrido normal
        var jineteterminado = document.getElementById('participante' + orden + 'Penalidades')
        jineteterminado.innerHTML = 'ELIM'
      }
    }
    // FIN DE ELIMINADOS
  }
}
socket.on('displayboarddata', function (datos) {
  textarealogalge.value = datos + '\n' + textarealogalge.value
  analizardatadisplay(datos)
})
socket.on('rs232', function (data) {
  textarealogalge.value = data + '\n' + textarealogalge.value
  console.log(data)

  analizardata(data)
})
