
var menueliminado = document.getElementById('menueliminado') //eliminado en 1º fase
var menueliminado2 = document.getElementById('menueliminado2') //eliminado en 2ºfase
var menuretirado = document.getElementById('menuretirado')
var menuretirado2 = document.getElementById('menuretirado2')
var menunopresentado = document.getElementById('menunopresentado')
var menueliminadonovalido = document.getElementById('menueliminadonovalido')
//document.getElementById('labelbaremoempezarprueba').innerHTML
menueliminado.addEventListener('click', function(){
  var elementostractivo = document.getElementById('tbodyempezarprueba').getElementsByClassName('active')
  var elementoseleccionado = elementostractivo[0]
  //alert('ELIMINADO')
/*
555 eliminado  -  dif o creloj  ptos 0 ,tiempo 001 eliminado
666 retirado - dif o creloj ptos 0 tiempo 1
999 no presentado  - dif o creloj ptos 0 tiempo 999
888 eliminado no valido  - dif o cereloj  ptos 0 tiempo 888
*/
   if ((document.getElementById('labelbaremoempezarprueba').innerHTML == 'DIF')
   ||  (document.getElementById('labelbaremoempezarprueba').innerHTML == 'CRELOJ')){
     if (document.getElementById('labelbaremoempezarprueba').innerHTML == 'CRELOJ') {
      // EN EL CONTRA RELOJ , MANTIENE LOS PUNTOS QUE LLEVABA HASTA EL MOMENTO DE LA
      // ELIMINACION CON TIEMPO MAXIMO
        elementoseleccionado.childNodes[5].innerHTML = 9999 // tiempo
      }  else {
       elementoseleccionado.childNodes[4].innerHTML = 000 //puntos
       elementoseleccionado.childNodes[5].innerHTML = 555 // tiempo
      }
   } else {
      elementoseleccionado.childNodes[4].innerHTML = 555
      elementoseleccionado.childNodes[5].innerHTML = 555
   }
})
menueliminado2.addEventListener('click', function(){
  var elementostractivo = document.getElementById('tbodyempezarprueba').getElementsByClassName('activo')
  var elementoseleccionado = elementostractivo[0]
  elementoseleccionado.childNodes[6].innerHTML = 555
  elementoseleccionado.childNodes[7].innerHTML = 'ELI'
  //elementoseleccionado.childNodes[8].innerHTML
})
menuretirado.addEventListener('click', function(){
  var elementostractivo = document.getElementById('tbodyempezarprueba').getElementsByClassName('activo')
  var elementoseleccionado = elementostractivo[0]
  if ((document.getElementById('labelbaremoempezarprueba').innerHTML == 'DIF')
  ||  (document.getElementById('labelbaremoempezarprueba').innerHTML == 'CRELOJ')){
    if (document.getElementById('labelbaremoempezarprueba').innerHTML == 'CRELOJ') {
     // EN EL CONTRA RELOJ , MANTIENE LOS PUNTOS QUE LLEVABA HASTA EL MOMENTO DE LA
     // ELIMINACION CON TIEMPO MAXIMO
       elementoseleccionado.childNodes[5].innerHTML = 9999 // tiempo
     }  else {
      elementoseleccionado.childNodes[4].innerHTML = 000 //puntos
      elementoseleccionado.childNodes[5].innerHTML = 555 // tiempo
     }
    elementoseleccionado.childNodes[4].innerHTML = 000
    elementoseleccionado.childNodes[5].innerHTML = 666
  } else {
     elementoseleccionado.childNodes[4].innerHTML = 555
     elementoseleccionado.childNodes[5].innerHTML = 666
  }
})
menuretirado2.addEventListener('click', function(){
  var elementostractivo = document.getElementById('tbodyempezarprueba').getElementsByClassName('activo')
  var elementoseleccionado = elementostractivo[0]
  elementoseleccionado.childNodes[6].innerHTML = 555
  elementoseleccionado.childNodes[7].innerHTML = 'ELI'
})
menunopresentado.addEventListener('click', function(){
  var elementostractivo = document.getElementById('tbodyempezarprueba').getElementsByClassName('activo')
  var elementoseleccionado = elementostractivo[0]
  if ((document.getElementById('labelbaremoempezarprueba').innerHTML == 'DIF')
  ||  (document.getElementById('labelbaremoempezarprueba').innerHTML == 'CRELOJ')){
    elementoseleccionado.childNodes[4].innerHTML = 000
    elementoseleccionado.childNodes[5].innerHTML = 888
  } else {
     elementoseleccionado.childNodes[4].innerHTML = 999
     elementoseleccionado.childNodes[5].innerHTML = 888
  }
})
menueliminadonovalido.addEventListener('click', function(){
  var elementostractivo = document.getElementById('tbodyempezarprueba').getElementsByClassName('activo')
  var elementoseleccionado = elementostractivo[0]
  if ((document.getElementById('labelbaremoempezarprueba').innerHTML == 'DIF')
  ||  (document.getElementById('labelbaremoempezarprueba').innerHTML == 'CRELOJ')){
    elementoseleccionado.childNodes[4].innerHTML = 000
    elementoseleccionado.childNodes[5].innerHTML = 999
  } else {
     elementoseleccionado.childNodes[4].innerHTML = 999
     elementoseleccionado.childNodes[5].innerHTML = 888
  }
})
