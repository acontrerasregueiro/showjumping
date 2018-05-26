'use strict'
//SE UTILIZA EN LA PANTALLA DE ACTUALIZAR ORDEN DE SALIDA 
//RECIBE UN ARRAY DE PARTICIPANTES Y LO AÑADE A LA LISTA
var socket = io()
var cuantosdivs = 0

function iniciar () {
  var paginas = document.getElementsByClassName('paginaresultado')
  paginas[0].style.display = 'block'
  setInterval(changediv, 6000)
}


socket.on('pintarclasificacion', function (array) {
  console.log('array recibido : ' + array)
  borrarelementosli()
  var divs = contardivsnecesarios(array)
  creardivsnecesarios(divs)
  anadirdatosalista(array)
})



function changediv () {
  var paginas = document.getElementsByClassName('paginaresultado')
  var ultimoelemento = paginas.length - 1
  for (var indice = 0; indice <= ultimoelemento; indice++) {
    //console.log('paginas[', indice + ']style.display = ', paginas[indice].style.display)
    if (paginas[indice].style.display == 'block') {
    //  console.log('encontrado pagina visible indice : ', indice)
      paginas[indice].style.display = 'none'
      if (indice < ultimoelemento) {
        paginas[indice + 1].style.display = 'block'
        break
      } else {
        paginas[0].style.display = 'block'
        break
      }
    }
  }
}
function anadirdatosalista (arrayordenado) {
 
  //  alert('recibido anadirdatosalista')
  var baremo =   document.getElementById('encabezadoBaremoid').innerHTML
  // alert(document.getElementById('encabezadoBaremoid').innerHTML)
  var divsyacreados = document.getElementsByClassName('paginaresultado')
  var listados = document.getElementsByClassName('listadoclasificaciondeprueba')
  var baremo = document.getElementById('encabezadoBaremoid').innerHTML
  var paginascreadas = divsyacreados.length
//  console.log('numerode listados  : ', listados.length)
  var listadoclasificaciondeprueba = document.getElementsByClassName('listadoclasificaciondeprueba')
  for (var indice = 0; indice < listados.length; indice++) {
  //  console.log('buclefor nº ', indice)
    var contador = 0
    for (var indicearray = (indice * 10); contador < 10; indicearray++) {
      contador = contador + 1
      if (indicearray < arrayordenado.length) {
        var li = document.createElement('li')
        li.style.display = 'inline-block'
        
        var spanclass = document.createElement('span')
        spanclass.classList.add('spanpuntos')
        // var caballo = '        ' + arrayordenado[indicearray].caballo
        if (arrayordenado[indicearray].clasificacion == null) {
          // your code here.
          spanclass.innerHTML = ' '
       } else {
        spanclass.innerHTML = arrayordenado[indicearray].clasificacion
       }
       if ((baremo == 'ASC/ACC')|| (baremo == 'ACC/ACC')||(baremo == 'ACC/C') ||(baremo == 'AM5')) {
        var spancaballo = document.createElement('span')
        spancaballo.classList.add('spancaballodosfases')
        spancaballo.innerHTML =  arrayordenado[indicearray].caballo
       } else {
        var spancaballo = document.createElement('span')
        spancaballo.classList.add('spancaballo')
        spancaballo.innerHTML =  arrayordenado[indicearray].caballo
       }        


        if ((baremo == 'ASC/ACC')|| (baremo == 'ACC/ACC')|| (baremo == 'AM5') || (baremo == 'ACC/C'))   {
          var spantiempo2 = document.createElement('span')
          spantiempo2.classList.add('spantiempo')
          var spanpuntos2 = document.createElement('span')
          spanpuntos2.classList.add('spanpuntos')
          if ((arrayordenado[indicearray].puntos2 == '1111') || ((baremo == 'AM5')&& (arrayordenado[indicearray].clasificacion == '?' ))) {
            //si no pasaron a la segunbda fase, NO PINTAMOS PTOS 2 NI TIEMPO2
            spantiempo2.innerHTML = '   '
            spanpuntos2.innerHTML = '   '
          } else {
            spantiempo2.innerHTML = arrayordenado[indicearray].tiempo2
            spanpuntos2.innerHTML = arrayordenado[indicearray].puntos2
          }   
          var spantiempo = document.createElement('span')
          spantiempo.classList.add('spantiempo')
        if (arrayordenado[indicearray].tiempo == 555) {
          spantiempo.innerHTML = 'ELI'
          var spanpuntos = document.createElement('span')
          spanpuntos.classList.add('spanpuntos')
          spanpuntos.innerHTML = '   '
        } else if (arrayordenado[indicearray].tiempo == 666) {
          spantiempo.innerHTML = 'RET'
          var spanpuntos = document.createElement('span')
          spanpuntos.classList.add('spanpuntos')
          spanpuntos.innerHTML = '   '
        } else if (arrayordenado[indicearray].tiempo2 == 999) {
          spantiempo2.innerHTML = 'NP'
          alert('np')
          spantiempo.innerHTML = arrayordenado[indicearray].tiempo
          var spanpuntos = document.createElement('span')
          spanpuntos.classList.add('spanpuntos')
          spanpuntos.innerHTML = arrayordenado[indicearray].puntos
          spanpuntos2.innerHTML = '   '
        }  else if (arrayordenado[indicearray].tiempo2 == 888) {
          var spanpuntos = document.createElement('span')
          spanpuntos.classList.add('spanpuntos')
          spanpuntos2.innerHTML = '    '
          spantiempo2.innerHTML = 'ELI'  
          spantiempo.innerHTML = arrayordenado[indicearray].tiempo
          var spanpuntos = document.createElement('span')
          spanpuntos.classList.add('spanpuntos')
          spanpuntos.innerHTML = arrayordenado[indicearray].puntos
          var spanpuntos = document.createElement('span')
          spanpuntos.classList.add('spanpuntos')
          spanpuntos.innerHTML = arrayordenado[indicearray].puntos  
          }  else if (arrayordenado[indicearray].tiempo2 == 777) {
            var spanpuntos = document.createElement('span')
            spanpuntos.classList.add('spanpuntos')
            spanpuntos2.innerHTML = '    '
            spantiempo2.innerHTML = 'RET'   
            spantiempo.innerHTML = arrayordenado[indicearray].tiempo
            var spanpuntos = document.createElement('span')
            spanpuntos.classList.add('spanpuntos')
            spanpuntos.innerHTML = arrayordenado[indicearray].puntos     
          } else if (arrayordenado[indicearray].tiempo == 9999) {
          //BAREMO CONTRARELOJ, MANTIENE PUNTOS EN TIEMPO MAXIMO
          spantiempo.innerHTML = 'MAX'
          var spanpuntos = document.createElement('span')
          spanpuntos.classList.add('spanpuntos')
          spanpuntos.innerHTML = arrayordenado[indicearray].puntos
        } else {

            spantiempo.innerHTML = arrayordenado[indicearray].tiempo
            var spanpuntos = document.createElement('span')
            spanpuntos.classList.add('spanpuntos')
            spanpuntos.innerHTML = arrayordenado[indicearray].puntos
                 
        }     
          //BAREMO CON DOS RECORRIDOS 
          li.appendChild(spanclass)
          li.appendChild(spancaballo)
          li.appendChild(spanpuntos2)
          li.appendChild(spantiempo2)
          li.appendChild(spanpuntos)
          li.appendChild(spantiempo)

        } else {
          var spanpuntos = document.createElement('span')
          spanpuntos.classList.add('spanpuntos')
          var spantiempo = document.createElement('span')
          spantiempo.classList.add('spantiempo')
          if (arrayordenado[indicearray].tiempo == 555) {
            spantiempo.innerHTML = 'ELI'
            var spanpuntos = document.createElement('span')
            spanpuntos.classList.add('spanpuntos')
            spanpuntos.innerHTML = '   '
          } else if (arrayordenado[indicearray].tiempo == 666) {
            spantiempo.innerHTML = 'RET'
            var spanpuntos = document.createElement('span')
            spanpuntos.classList.add('spanpuntos')
            spanpuntos.innerHTML = '   '
          } else if (arrayordenado[indicearray].tiempo == 999) {
            spantiempo.innerHTML = 'NP'
            var spanpuntos = document.createElement('span')
            spanpuntos.classList.add('spanpuntos')
            spanpuntos.innerHTML = '   '
          }  else if (arrayordenado[indicearray].tiempo2 == 888) {
            var spanpuntos = document.createElement('span')
            spanpuntos.classList.add('spanpuntos')
            spanpuntos2.innerHTML = '    '
            spantiempo.innerHTML = 'ELI'      
           } else if (arrayordenado[indicearray].tiempo == 9999) {
            //BAREMO CONTRARELOJ, MANTIENE PUNTOS EN TIEMPO MAXIMO
            spantiempo.innerHTML = 'MAX'
            var spanpuntos = document.createElement('span')
            spanpuntos.classList.add('spanpuntos')
            spanpuntos.innerHTML = arrayordenado[indicearray].puntos
          } else {
            spantiempo.innerHTML = arrayordenado[indicearray].tiempo
            var spanpuntos = document.createElement('span')
            spanpuntos.classList.add('spanpuntos')
            spanpuntos.innerHTML = arrayordenado[indicearray].puntos
            if(baremo == 'TDIF') {
              spanpuntos.innerHTML = arrayordenado[indicearray].totalpuntos
              spantiempo.innerHTML = arrayordenado[indicearray].tiempo2
            }
          }     

          //BAREMO CON UN RECORRIDO
          li.appendChild(spanclass)
          li.appendChild(spancaballo)
          li.appendChild(spanpuntos)
          li.appendChild(spantiempo)
        }
        listadoclasificaciondeprueba[indice].appendChild(li)
      }
    }
  }
}
function contardivsnecesarios (arrayordenado) {
  if (arrayordenado.length > 10) {
    if (arrayordenado.length % 10 == 0) {
      var cuantosdivs = arrayordenado.length / 10
    } else {
      cuantosdivs = parseInt((arrayordenado.length / 10) + 1)
    }
  } else {
    cuantosdivs = 1
  }
  return cuantosdivs
}
function borrarelementosli () {
  var elementosli = document.getElementsByTagName('li')
  while (elementosli.length > 0) {
    elementosli[0].parentNode.removeChild(elementosli[0])
  }
}
function creardivsnecesarios (cuantosdivs) {
  var contenedor = document.getElementById('contenedor')
  var divsyacreados = document.getElementsByClassName('paginaresultado')
  var paginas = divsyacreados.length

  for (var indice = 0; indice < cuantosdivs; indice++) {
    var paginas = document.getElementsByClassName('paginaresultado').length
    if (paginas < cuantosdivs) {
      var contenedor = document.getElementById('contenedor')
      var nuevodiv = document.createElement('div')
      nuevodiv.classList.add('paginaresultado')
      var nuevolistado = document.createElement('ul')
      nuevolistado.classList.add('listadoclasificaciondeprueba')
      // nuevolistado.appendChild(li)
      nuevodiv.appendChild(nuevolistado)
      nuevodiv.style.display = 'none'
      contenedor.appendChild(nuevodiv)
    }
  //  console.log('divs ya creados ', paginas)
    //console.log('divs necesarios ', cuantosdivs)
  }
}

//RECIBIMOS EL ENCABEZADO DE PANTALLA DE CLASIFICACION
//BAREMO ALTURA TROEFO
socket.on('generarencabezadoclasificaciondeprueba',function (altura, trofeo,baremo){
  console.log('altura : ' + altura + ' trofeo ' + trofeo + 'baremo ' + baremo)
  var encabezadoAlturaid = document.getElementById('encabezadoAlturaid')
  var encabezadoBaremoid = document.getElementById('encabezadoBaremoid')
  var encabezadoTrofeoid = document.getElementById('encabezadoTrofeoid')
  encabezadoAlturaid.innerHTML = altura
   encabezadoTrofeoid.innerHTML = trofeo
   encabezadoBaremoid.innerHTML = baremo
})
//CUANDO CAMBIAMOS DE PRUEBA ACTUALIZAMOS LA PAGINA DE CLASIFICACION
//PARA QUE NO QUEDEN LOS DATOS DE PRUEBAS ANTERIORES
socket.on('recargarpagina', function (){
 location.reload()
})

iniciar()
