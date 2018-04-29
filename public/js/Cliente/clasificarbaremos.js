/*Fichero en el que se realizan todas las operaciones relacionadas
con las bases de datos de competiciones*/
'use strict'

// var funcionescomunes = require('./funciones-compartidas.js')
// var funcionesformulariocompeticionseleccionada = require('.//operaciones-formulario-competicionseleccionada.js')
module.exports.c = function(array) {
  var clasificacion = 1
  array[0].clasificacion = clasificacion
  for (var i = 0; i < (array.length - 1) ; i++ ) {
    if(array[i].tiempo == array[i + 1].tiempo) {
      array[i +1].clasificacion = array[i].clasificacion
    } else {
      array[i + 1].clasificacion = i + 2
      // clasificacion = i + 1
    }
  }
}
module.exports.tdif = function(array) {
  var clasificacion = 1
  if (array[0]) {
    array[0].clasificacion = clasificacion
  }
  for (var i = 0; i < (array.length - 1) ; i++ ) {
    if ((array[i].totalpuntos == array[i + 1].totalpuntos) && (array[i].tiempo2 == array[i + 1].tiempo2)) {
      array[i +1].clasificacion = array[i].clasificacion
    } else {
      array[i + 1].clasificacion = i + 2
      // clasificacion = i + 1
    }
  }

}
module.exports.asc = function(array) {
  var clasificacion = 1
  array[0].clasificacion = clasificacion
  for (var i = 0; i < (array.length - 1) ; i++ ) {
    if(array[i].puntos == array[i + 1].puntos) {
      array[i +1].clasificacion = array[i].clasificacion
    } else {
      array[i + 1].clasificacion = i + 2
      // clasificacion = i + 1
    }
  }
}
module.exports.acc = function(array) {
  var clasificacion = 1
  array[0].clasificacion = clasificacion
  for (var i = 0; i < (array.length - 1) ; i++ ) {
    if ((array[i].puntos == array[i + 1].puntos) && (array[i].tiempo == array[i + 1].tiempo)) {
      array[i +1].clasificacion = array[i].clasificacion
    } else {
      array[i + 1].clasificacion = i + 2
      // clasificacion = i + 1
    }
  }
}
//recorrido previo clasifica los participantes del recorrido previo
// empatados a puntos al primer puesto son ex aequos
module.exports.recorridoprevio = function(array) { 
  //REVISAR EMPATADOS A PUNTOS AL RESTO DE PUESTOS
  var arrayempatadosprimerpuesto = []
  var clasificacion = 1
  array[0].clasificacion = clasificacion //asignamos el primer puesto al primer elemento
  arrayempatadosprimerpuesto.push(array[0])
  // AHORA TENEMOS QUE VER TODOS LOS EMPATADOS PARA EL PRIMER PUESTO\
  for (var i = 0 ; i < (array.length - 1); i++) { //EMPATADOS A PUNTOS AL PRIMER PUESTO
    if(array[i].clasificacion == 1) {
      if (array[i].puntos == array[i+1].puntos) {
        array[i+1].clasificacion = array[i].clasificacion
        arrayempatadosprimerpuesto.push(array[i+1])
        clasificacion = clasificacion + 1   
      } else {
        array[i + 1].clasificacion = i + 2
      }
    } else {
      if ((array[i].puntos == array[i + 1].puntos) && (array[i].tiempo == array[i + 1].tiempo)) {
        array[i +1].clasificacion = array[i].clasificacion
      } else {
        array[i + 1].clasificacion = i + 2
      }
    }
   
  }
}
module.exports.recorridoprevio2 = function(array) {
  
  for (var i = 0 ; i < (array.length - 1); i++) { 
    if( i == 0) {array[0].clasificacion = '1' } 
    // else {
      if(array[i].clasificacion == '1'){
         
        if (array[i].puntos2 == '1111') {
          array[i].clasificacion = '?'
         // alert(array[i].caballo)
        }
        else {array[i].clasificacion = i + 1 }
     }
  //  }
  }
}
//clasifica los participantes para el desempate del baremo am5
module.exports.recorridodesempate = function(array) {
  var clasificacion = 1
  var arrayempatadosprimerpuesto = []
  array[0].clasificacion = clasificacion
  arrayempatadosprimerpuesto.push(array[0])
  for (var i = 0 ; i < (array.length - 1); i++) { //EMPATADOS A PUNTOS AL PRIMER PUESTO
    if (array[i].puntos == array[i+1].puntos) {
      array[i+1].clasificacion = array[i].clasificacion
      arrayempatadosprimerpuesto.push(array[i+1])
      clasificacion = clasificacion + 1
      break
    } 
  }
  for (var i = (arrayempatadosprimerpuesto.length-1); i < (array.length - 1) ; i++ ) {
    if ((array[i].puntos == array[i + 1].puntos) && (array[i].tiempo == array[i + 1].tiempo)) {
      array[i +1].clasificacion = array[i].clasificacion
    } else {
      array[i + 1].clasificacion = i + 2
    }
  }
}
module.exports.creloj = function(array) {
  var clasificacion = 1
  array[0].clasificacion = clasificacion
  for (var i = 0; i < (array.length - 1) ; i++ ) {
    if ((array[i].puntos == array[i + 1].puntos) && (array[i].tiempo == array[i + 1].tiempo)) {
      array[i +1].clasificacion = array[i].clasificacion
    } else {
      array[i + 1].clasificacion = i + 2
      // clasificacion = i + 1
    }
  }
}
module.exports.dif = function(array) {
  var clasificacion = 1
  array[0].clasificacion = clasificacion
  for (var i = 0; i < (array.length - 1) ; i++ ) {
    if ((array[i].puntos == array[i + 1].puntos) && (array[i].tiempo == array[i + 1].tiempo)) {
      array[i +1].clasificacion = array[i].clasificacion
    } else {
      array[i + 1].clasificacion = i + 2
      // clasificacion = i + 1p
    }
  }
}
//CLASIFICA LOS PARTICIPANTES DE LA PRIMERA FASE
//RECIBE POR PARAMETRO UN ARRAY CION LOS PARTICIPANTES DE LA PRIMERA FASE
//Y UN ENTERO A PARTIR DEL CUAL CLASIFICAN
module.exports.primerafaseasc = function(array,indice) {
  var clasificacion = indice + 1
  if (array[0]) {
    array[0].clasificacion = clasificacion
  }
    for (var i = 0; i < (array.length  -1) ; i++ ) {
      if ((array[i].puntos == array[i + 1].puntos)) {
        array[i +1].clasificacion = array[i].clasificacion
      } else {
        array[i + 1].clasificacion = clasificacion +1
      }
      clasificacion = clasificacion + 1
    }
    console.log('array PRIMERA CLASIFICADIO ,', array)
    return array
}
module.exports.primerafaseacc2 = function(array) {
  var clasificacion = 1
  array[0].clasificacion = clasificacion
  for (var i = 0; i < (array.length - 1) ; i++ ) {
    if ((array[i].tiempo == array[i + 1].tiempo)) {
      array[i +1].clasificacion = array[i].clasificacion
      // alert('encontrado empate : ' + array[i].tiempo + ' y ' + array[i + 1].tiempo)
    } else {
      array[i + 1].clasificacion = i + 2
      clasificacion = i + 1
    }
  }
  return array
}

module.exports.primerafaseacc = function(array,indice) {
  // alert(indice)
  var clasificacion = indice + 1
  if (array[0]) {
    array[0].clasificacion = clasificacion
  }
  for (var i = 0; i < (array.length  -1) ; i++ ) {
    if ((array[i].puntos == array[i + 1].puntos) && (array[i].tiempo == array[i + 1].tiempo)) {
      array[i +1].clasificacion = array[i].clasificacion
      // alert('encontrado empate : ' + array[i].tiempo + ' y ' + array[i + 1].tiempo)
    } else {
      array[i + 1].clasificacion = clasificacion + 1
    }
    clasificacion = clasificacion + 1
  }
  return array
}

//CLASIFICA A LOS PARTIPANTES EN LA SEGUNDA FASE.
//OJO PARA EL BAREMO ASC/ACC
module.exports.segundafaseacc = function(array) {
  console.log('arraydentro de segundafaseacc sin modificar:'  ,array)
  // if (array[0]) {
    var clasificacion = 1
    if (array[0]) {
      array[0].clasificacion = clasificacion
    }
    // array[0].clasificacion = clasificacion
    var arrayclasificadosegundafase = []
      for (var i = 0; i <= (array.length -1) ; i++ ) {
        if (array.length > 1) {
         if (array[i].puntos2 != 1111) {
          //  alert('PUNTOS DOS DISTINTO DE 1111')
          //COMPROBAMOS SI ES EL ULTIMO ELEMENTO
          if (i == (array.length -1)) {
            alert('ultimo elemento')
          } else {
            if ((array[i].puntos2 == array[i + 1].puntos2) &&
            (array[i].tiempo2 == array[i + 1].tiempo2)) {
              array[i + 1].clasificacion = array[i].clasificacion //misma clasificacion
            } else if ((array[i].puntos2 == 777) || (array[i].puntos2 == 888) && //O SI SON ELIMINADOS
            (array[i + 1].puntos2 == 777) || (array[i + 1].puntos2 == 888)) {
              array[i + 1].clasificacion = array[i].clasificacion
            } else {
              array[i + 1].clasificacion = i + 2
            }
          }
          arrayclasificadosegundafase.push(array[i]) //añado los elementos ya clasificados
        }
      } else {
        if (array[i].puntos2 != 1111) {
          alert('es el primer participante')
          array[0].clasificacion = clasificacion
          arrayclasificadosegundafase.push(array[0])
        }
      }
    }
    return arrayclasificadosegundafase
  // }
}
module.exports.segundafaseaccacc = function(array) {
  console.log('arraydentro de segundafaseacc sin modificar:'  ,array)
  // if (array[0]) {
    var clasificacion = 1
    if (array[0]) {
      array[0].clasificacion = clasificacion
    }
    // array[0].clasificacion = clasificacion
    var arrayclasificadosegundafase = []
      for (var i = 0; i <= (array.length -1) ; i++ ) {
        if (array.length > 1) {
         if ((array[i].puntos2 != 1111)|| (array[i].puntos2 != 777) || (array[i].puntos2 != 888)) {
          //  alert('PUNTOS DOS DISTINTO DE 1111')
          //COMPROBAMOS SI ES EL ULTIMO ELEMENTO
          if (i == (array.length -1)) {
            alert('ultimo elemento')
          } else {
            if ((array[i].puntos2 == array[i + 1].puntos2) &&
            (array[i].tiempo2 == array[i + 1].tiempo2)) {
              array[i + 1].clasificacion = array[i].clasificacion //misma clasificacion
            } else {
              array[i + 1].clasificacion = i + 2
            }
          }
          arrayclasificadosegundafase.push(array[i]) //añado los elementos ya clasificados
        }
      } else {
        if ((array[i].puntos2 != 1111) || (array[i].puntos2 != 777) || (array[i].puntos2 != 888)) {
          alert('es el primer participante')
          array[0].clasificacion = clasificacion
          arrayclasificadosegundafase.push(array[0])
        }
      }
    }
    return arrayclasificadosegundafase
  // }
}
module.exports.accacc = function(array) {
  var clasificacion = 1
  if (array[0]) {
    array[0].clasificacion = clasificacion
  }
  // array[0].clasificacion = clasificacion
  for (var i = 0; i <= (array.length - 1) ; i++ ) {
    if (array.length > 1) {
      if (i == (array.length -1)) {
        alert('ultimo elemento')
      } else {
        if ((array[i].puntos2 == array[i + 1].puntos2) &&
         (array[i].tiempo2 == array[i + 1].tiempo2)) {
            if (array[i].tiempo == array[i + 1].tiempo) {
              array[i +1].clasificacion = array[i].clasificacion
            } else {
              array[i + 1].clasificacion = i + 2
            }
      } else {
        array[i + 1].clasificacion = i + 2
      }
     }
    } else {
      alert('es el primer participante')
      if (array[i].puntos2 != 1111) {
        array[0].clasificacion = 1
      }
   }
 }
  return array
}
module.exports.nopresentados = function (array,indice){
  if (array[0]) {//el primer elemento del array ordenado
    array[0].clasificacion = clasificacion + 1
  }
}
//ELIMINADOS SEGHUNDA FASE PARA ACC/ACC
module.exports.elimsegundafaseacc = function(array,indice) {
 array.sort(
  firstBy(function (v1, v2) { return v1.tiempo - v2.tiempo })
 )
  var clasificacion = indice
  console.log('array ordenado elim2fase ',array)
  if (array[0]) {//el primer elemento del array ordenado
    array[0].clasificacion = clasificacion + 1
  }

  for (var i = 0; i < (array.length) ; i++ ) {
    if (array.length > 1) {
    // alert(array.length)
      if(array[i + 1]) {
        if (array[i].tiempo == array[i + 1].tiempo) {
          array[i + 1].clasificacion = array[i].clasificacion
        } else {
          array[i + 1].clasificacion = array[i].clasificacion + 1
          // clasificacion = i + 1
        } 
      }
    }
  }
  return array
}
module.exports.segundafasec = function(array) {
  var clasificacion = 1
  array[0].clasificacion = clasificacion
  var arrayclasificadosegundafase = []
  for (var i = 0; i < (array.length - 1) ; i++ ) {
    if (array[i].puntos2 != 1111) {
      if (((array[i].puntos2 == array[i + 1].puntos2) &&
      (array[i].tiempo2 == array[i + 1].tiempo2)) //SI ESTAN EMPATADOS EN PUNTOS Y TIEMPO
      || ((array[i].puntos2 == 777) || (array[i].puntos2 == 888) && //O SI SON ELIMINADOS
      (array[i + 1].puntos2 == 777) || (array[i + 1].puntos2 == 888))) // O RETIRADOS
      {
        array[i + 1].clasificacion = array[i].clasificacion
      } else {
        array[i + 1].clasificacion = i + 2
      }
      arrayclasificadosegundafase.push(array[i]) //añado los elementos ya clasificados
    }
  }
  return arrayclasificadosegundafase
}
module.exports.accc = function(array) {
    // var clasificacion = indice + 1
  if (array[0]) {
    var clasificacion = 1
    array[0].clasificacion = clasificacion
  }
  for (var i = 0; i < (array.length - 1) ; i++ ) {
    if ((array[i].tiempo2 == array[i + 1].tiempo2)) {
      if (array[i].tiempo == array[i + 1].tiempo) {
        array[i +1].clasificacion = array[i].clasificacion
      } else {
        array[i + 1].clasificacion = i + 2
      }
    } else {
      array[i + 1].clasificacion = i + 2
    }
  }
  return array
}
