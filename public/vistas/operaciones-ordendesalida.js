

'use strict'
//SE UTILIZA EN LA PANTALLA DE ACTUALIZAR ORDEN DE SALIDA 
//RECIBE UN ARRAY DE PARTICIPANTES Y LO AÑADE A LA LISTA
var socket = io()

socket.on('actualizarordendesalida', function (arrayparticipantes) {
  console.log('RECIBIDO ARRAYPARTICPANTES : ', arrayparticipantes)
  var lista = document.getElementById('lista2')
  lista.innerHTML = ''
  arrayparticipantes.forEach(function (arrayparticipantes, indice) {
    var li = document.createElement('li')
    var spandorsal = document.createElement('span')
    spandorsal.classList.add('dorsalordendesalida')
      // var spanjinete = document.createElement('span')
      // spanjinete.classList.add('jineteordendesalida')
    var spancaballo = document.createElement('span')
    spancaballo.classList.add('caballoordendesalida')
    spandorsal.innerHTML = arrayparticipantes.orden
    //OJO COMPROBAR PARA QUE MUESTRE CABALLO O JINETE
    spancaballo.innerHTML =  arrayparticipantes.caballo
    li.appendChild(spandorsal)
    li.appendChild(spancaballo)
    lista.appendChild(li)
  })
})
