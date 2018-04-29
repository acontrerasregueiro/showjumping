
var funcionescomunes = require('./funciones-compartidas.js')
var funcionespruebas = require('./funciones-pruebas.js')

// DATOS RS232
function analizardata (datos) {
  var desempate = document.getElementById('checkboxdesempate').checked
  // alert(datos)
 // 1er caso si la cadena comienza por "n" significa nuevo jinete
  if ((datos.substring(0, 1) == 'n') && (datos != 'n0000')) {
    // alert('nuevo participante')
    console.log('NUEVO PARTICIPANTE nº : ', datos)
    datos = datos.replace('n', '')
    var orden = parseInt(datos)
    // mi fila comienza en 0 , pero el orden es +1
    orden = orden - 1
    console.log('ORDEN = PARSEINT : ', orden)
    var jineteencurso = document.getElementById('filapruebaactiva' + orden)
    //INICIALIZAMOS EL JINETE A PUNTOS '0' EN LA PRIMERA FASE O RECORRIDO
    if (desempate) {
      var jineteterminado = document.getElementById('participante' + orden + 'Penalidades2')
      jineteterminado.innerHTML = '0'
    } 
    if (!desempate)  {
      var jineteterminado = document.getElementById('participante' + orden + 'Penalidades')
      jineteterminado.innerHTML = '0'
    }
    funcionespruebas.borrarfilaempezarprueba(tbodyempezarprueba)
    jineteencurso.classList.add('activo')
    // actualizarjineteenpista(jineteencurso.id)
    // actualizarpantallaordendesalida(jineteencurso.id)
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
      if (desempate) {
        fase = '2'
      } 
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

    if (comando == 'RT ')  {
      var tiempoRT = datos.substring(10, 21)
      var tiempoRTformateado = parseFloat(tiempoRT.replace(/\s/g, ''), 10)
      tiempoRTformateado = parseFloat(tiempoRTformateado).toFixed(2)
      var dorsal = dorsal.replace('n', '')
      var orden = parseInt(dorsal)
      orden = orden - 1
      if (fase == '1') {
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
        if (desempate) {
          var jineteterminado = document.getElementById('participante' + orden + 'Tiempo2')
          jineteterminado.innerHTML = tiempototalformateado
        } else {
          var jineteterminado = document.getElementById('participante' + orden + 'Tiempo')
          jineteterminado.innerHTML = tiempototalformateado
        }
      }
      // alert('RTT')
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
      // alert('RTM')
    }
    // analizamos penalidad exceso de tiempo en segunda fase,
    // para la primera no hace falta, ya que si es dos fase no pasa a la segunda,
    // si fuera un 274.5.6 (pasan todos suma ptos y timpo 2ª) calculamos la penalidad
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
      // alert('PTM')
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
      // alert('C1')
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
          if (!desempate) {
            labelpenalidades1.innerHTML = penalidadtotalformateado - penalidades2
          }
        }
      } 
      else {
        // alert('FASE1')
        var jineteterminado = document.getElementById('participante' + orden + 'Penalidades')
        jineteterminado.innerHTML = penalidadtotalformateado
        // alert('FASE1')
      }
      // alert('TP')
    }
    if (comando == 'P  ') {
      console.log('RECIBIDO DERRIBO!!!')

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
          if (desempate) {
            // alert('INPUT EN DESEMPATE')
            var jineteterminado = document.getElementById('participante' + orden + 'Penalidades2')
            jineteterminado.innerHTML = penalidadtotalformateado
          } 
          if(!desempate) {
            // alert('INPUT EN NOOOOOOOO DESEMPATE')
            // alert('derribo en NO DESEMPATE 1')
            var jineteterminado = document.getElementById('participante' + orden + 'Penalidades')
            jineteterminado.innerHTML = penalidadtotalformateado 
          }
          console.log('RECIBIDO IINPUT ,penalidadtotalformateado  ::::::', penalidadtotalformateado)
        } else {
          var jineteterminado = document.getElementById('participante' + orden + 'Penalidades')
          jineteterminado.innerHTML = penalidadtotalformateado + parseInt(jineteterminado.innerHTML)
        }

      } // FIN DE REVISAR SI FUE INPUT
      if (fase == '2') {
          // PRIMERO REVISAMOS SI FUE UN INPUT
        if (datos.charAt(0) == 'i') {
          // alert('INPUT EN FASE 2 ')

          console.log('RECIBIDO IINPUT ,penalidadtotalformateado  ::::::', penalidadtotalformateado)
          var jineteterminado = document.getElementById('participante' + orden + 'Penalidades2')
          jineteterminado.innerHTML = penalidadtotalformateado
        } else {
          var jineteterminado = document.getElementById('participante' + orden + 'Penalidades2')
          jineteterminado.innerHTML = penalidadtotalformateado + parseInt(jineteterminado.innerHTML)
        }
      }
      if (fase == '1') {
          // PRIMERO REVISAMOS SI FUE UN INPUT
        if (datos.charAt(0) == 'i') {
          // alert('INPUT EN 1A FASE')

          console.log('RECIBIDO IINPUT ,penalidadtotalformateado  ::::::', penalidadtotalformateado)
          var jineteterminado = document.getElementById('participante' + orden + 'Penalidades')
          jineteterminado.innerHTML = penalidadtotalformateado
        } else {
          // alert('derribo en fase 1')
          // var jineteterminado = document.getElementById('participante' + orden + 'Penalidades2')
          // jineteterminado.innerHTML = penalidadtotalformateado + parseInt(jineteterminado.innerHTML)
          // // alert('derribo sin fase y NO INPUT')
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
function iniciarpuertoserie(socket) {
  //INICIALIZAMOS EL BOTON DE CONECTARPUERTOSERIE
  var btnconectarpuertoserie = document.getElementById('btnconectarpuertoserie')

  btnconectarpuertoserie.addEventListener('click',function (){
  if (btnconectarpuertoserie.innerHTML === 'OFF') {
    // alert('encender')
    socket.emit('conectarpuertoserie')
    btnconectarpuertoserie.innerHTML = 'ON'
  }
  else {
    // alert('apagar')
    btnconectarpuertoserie.innerHTML = 'OFF'
    socket.emit('desconectarpuertoserie')
  }
})
socket.on('rs232', function (data) {
  var textarealogalge = document.getElementById('textarealogalge')
  textarealogalge.value = data + '\n' + textarealogalge.value
  console.log(data)
  analizardata(data)
})
  // alert('iniciarpuertoserie')
}
module.exports.iniciarpuertoserie = function (socket) {
 iniciarpuertoserie(socket)
}
