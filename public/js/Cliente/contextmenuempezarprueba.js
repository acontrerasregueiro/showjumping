/*Fichero en el que se realizan todas las operaciones relacionadas
con las bases de datos de competiciones*/
'use strict'

var funcionescomunes = require('./funciones-compartidas.js')
var funcionesformulariocompeticionseleccionada = require('.//operaciones-formulario-competicionseleccionada.js')


function iniciarcontextmenupruebaencurso(socket) {
  var contextmenu = document.getElementById('context-menu')
  document.onclick = function(e){
    contextmenu.style.display = 'none';
  }

  var menueliminado = document.getElementById('menueliminado') //eliminado en 1º fase
  var menueliminado2 = document.getElementById('menueliminado2') //eliminado en 2ºfase
  var menuretirado = document.getElementById('menuretirado')
  var menuretirado2 = document.getElementById('menuretirado2')
  var menunopresentado = document.getElementById('menunopresentado')
  var menueliminadonovalido = document.getElementById('menueliminadonovalido')
  var menunopresentado2 = document.getElementById('menunopresentado2')
  /*
  555 eliminado 1ª -  dif o creloj  ptos 0 ,tiempo 001 eliminado
  666 retirado - dif o creloj ptos 0 tiempo 1
  777 eliminado 2ª
  888 retirado 2ª
  999 no presentado  - dif o creloj ptos 0 tiempo 999
  444 eliminado no valido  - dif o cereloj  ptos 0 tiempo 888
  9999 NO PASAN A LA SEGUNDA FASE
  */
  menueliminado.addEventListener('click', function(){
    // alert('click')
    var elementostractivo = document.getElementById('tbodyempezarprueba').getElementsByClassName('text-primary')
    var elementoseleccionado = elementostractivo[0]
    elementoseleccionado.childNodes[5].innerHTML = 555
    elementoseleccionado.childNodes[6].innerHTML = 555
    //alert('ELIMINADO')
    //  if ((document.getElementById('labelbaremoempezarprueba').innerHTML == 'DIF')
    //  ||  (document.getElementById('labelbaremoempezarprueba').innerHTML == 'CRELOJ')){
    //    if (document.getElementById('labelbaremoempezarprueba').innerHTML == 'CRELOJ') {
    //     // EN EL CONTRA RELOJ , MANTIENE LOS PUNTOS QUE LLEVABA HASTA EL MOMENTO DE LA
    //     // ELIMINACION CON TIEMPO MAXIMO
    //       elementoseleccionado.childNodes[5].innerHTML = 9999 // tiempo
    //     }  else {
    //      elementoseleccionado.childNodes[4].innerHTML = 0 //puntos
    //      elementoseleccionado.childNodes[5].innerHTML = 555 // tiempo
    //     }
    //  } else {
    //     elementoseleccionado.childNodes[4].innerHTML = 555
    //     elementoseleccionado.childNodes[5].innerHTML = 555
    //  }
  })
  menueliminado2.addEventListener('click', function(){
    var elementostractivo = document.getElementById('tbodyempezarprueba').getElementsByClassName('text-primary')
    var elementoseleccionado = elementostractivo[0]
    elementoseleccionado.childNodes[7].innerHTML = 777
    elementoseleccionado.childNodes[8].innerHTML = 777
  })

  menuretirado.addEventListener('click', function(){
    var elementostractivo = document.getElementById('tbodyempezarprueba').getElementsByClassName('text-primary')
    var elementoseleccionado = elementostractivo[0]
    elementoseleccionado.childNodes[5].innerHTML = 666
    elementoseleccionado.childNodes[6].innerHTML = 666
    // if ((document.getElementById('labelbaremoempezarprueba').innerHTML == 'DIF')
    // ||  (document.getElementById('labelbaremoempezarprueba').innerHTML == 'CRELOJ')){
    //   if (document.getElementById('labelbaremoempezarprueba').innerHTML == 'CRELOJ') {
    //    // EN EL CONTRA RELOJ , MANTIENE LOS PUNTOS QUE LLEVABA HASTA EL MOMENTO DE LA
    //    // ELIMINACION CON TIEMPO MAXIMO
    //      elementoseleccionado.childNodes[5].innerHTML = 9999 // tiempo
    //    }  else {
    //     elementoseleccionado.childNodes[4].innerHTML = '000' //puntos
    //     elementoseleccionado.childNodes[5].innerHTML = 555 // tiempo
    //    }
    //   elementoseleccionado.childNodes[4].innerHTML = '000'
    //   elementoseleccionado.childNodes[5].innerHTML = 666
    // } else {
    //    elementoseleccionado.childNodes[4].innerHTML = 555
    //    elementoseleccionado.childNodes[5].innerHTML = 666
    // }
  })
  menuretirado2.addEventListener('click', function(){
    var elementostractivo = document.getElementById('tbodyempezarprueba').getElementsByClassName('text-primary')
    var elementoseleccionado = elementostractivo[0]
    elementoseleccionado.childNodes[7].innerHTML = 888
    elementoseleccionado.childNodes[8].innerHTML = 888
  })
  menunopresentado2.addEventListener('click', function(){
    var elementostractivo = document.getElementById('tbodyempezarprueba').getElementsByClassName('text-primary')
    var elementoseleccionado = elementostractivo[0]
    elementoseleccionado.childNodes[7].innerHTML = 999
    elementoseleccionado.childNodes[8].innerHTML = 999
  })
  menunopresentado.addEventListener('click', function(){
    var elementostractivo = document.getElementById('tbodyempezarprueba').getElementsByClassName('text-primary')
    var elementoseleccionado = elementostractivo[0]
   elementoseleccionado.childNodes[5].innerHTML = 999
   elementoseleccionado.childNodes[6].innerHTML = 999
    // if ((document.getElementById('labelbaremoempezarprueba').innerHTML == 'DIF')
    // ||  (document.getElementById('labelbaremoempezarprueba').innerHTML == 'CRELOJ')){
    //   elementoseleccionado.childNodes[4].innerHTML = '000'
    //   elementoseleccionado.childNodes[5].innerHTML = 888
    // } else {
    //    elementoseleccionado.childNodes[4].innerHTML = 999
    //    elementoseleccionado.childNodes[5].innerHTML = 888
    // }
  })
  menueliminadonovalido.addEventListener('click', function(){
    var elementostractivo = document.getElementById('tbodyempezarprueba').getElementsByClassName('text-primary')
    var elementoseleccionado = elementostractivo[0]
    elementoseleccionado.childNodes[5].innerHTML = 444
    elementoseleccionado.childNodes[6].innerHTML = 444
    // if ((document.getElementById('labelbaremoempezarprueba').innerHTML == 'DIF')
    // ||  (document.getElementById('labelbaremoempezarprueba').innerHTML == 'CRELOJ')){
    //   elementoseleccionado.childNodes[4].innerHTML = '000'
    //   elementoseleccionado.childNodes[5].innerHTML = 999
    // } else {
    //    elementoseleccionado.childNodes[4].innerHTML = 999
    //    elementoseleccionado.childNodes[5].innerHTML = 888
    // }
  })
}

module.exports.iniciarcontextmenu = function(socket) {
  iniciarcontextmenupruebaencurso(socket)
}
