'use strict'
function clasificarbaremo (baremoelegido, arrayaordenar) {
  var primerparametro = ''
  var segudonparametro = ''
  var tercerparametro = '0'
  var parametros = {}
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
      firstBy('puntos')
      .thenBy(function (v1, v2) { return v1.tiempo - v2.tiempo })
    )
      break
    case 'ASC/ACC':
    arrayaordenar.sort(
    firstBy('puntos')
    .thenBy(function (v1, v2) { return v1.tiempo - v2.tiempo })
  //  .thenBy('puntos')
    )
    break
    // case 'ACC/ACC':
    // recorrido = '2'
    // break
    // case 'ACC/C':
    // recorrido = '2'
    // break
    // case 'TDIF':
    // recorrido = '2'
    // break
    // case 'AM5':
    // recorrido = '1'
    // break
    // case 'DOSMANGAS':
    // recorrido = '1'
    // break
    // case '"DOSMANGASDESEMPATE':
    // recorrido = '1'
  }
  return arrayaordenar
}
function leerbaremo (baremoelegido) {
  var recorrido = ''
  switch (baremoelegido) {
    case 'ASC':
      recorrido = '1'
      break
    case 'ACC':
      recorrido = '1'
      break
    case 'C':
      recorrido = '1'
      break
    case 'DIF':
      recorrido = '1'
      break
    case 'CRELOJ':
      recorrido = '1'
      break
    case 'ASC/ACC':
      recorrido = '2'
      break
    case 'ACC/ACC':
      recorrido = '2'
      break
    case 'ACC/C':
      recorrido = '2'
      break
    case 'TDIF':
      recorrido = '2'
      break
    case 'AM5':
      recorrido = '1'
      break
    case 'DOSMANGAS':
      recorrido = '1'
      break
    case '"DOSMANGASDESEMPATE':
      recorrido = '1'
  }
  return recorrido
}
