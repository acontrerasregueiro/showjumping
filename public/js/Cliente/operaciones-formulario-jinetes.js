
/*Fichero en el que se realizan todas las operaciones relacionadas
con la base de datos de jinete*/
//
var funcionescomunes = require('./funciones-compartidas.js')
var funcionesformulariojinete = require('./operaciones-formulario-jinetes.js')
var socket = io()

module.exports.leerformulariojinete = function () {
  //asignamos valores
  //elementos input con datos de los jientes
  var inputnombreJinete = document.getElementById('inputnombreJinete')
  var inputapellido1Jinete = document.getElementById('inputapellido1Jinete')
  var inputapellido2Jinete = document.getElementById('inputapellido2Jinete')
  var inputlicenciaJinete = document.getElementById('inputlicenciaJinete')
  var inputidJinete = document.getElementById('inputidJinete')
  var jinete = {}
  jinete.nombre = inputnombreJinete.value
  jinete.apellido1 = inputapellido1Jinete.value
  jinete.apellido2 = inputapellido2Jinete.value
  jinete.licencia = inputlicenciaJinete.value
  jinete.id = inputidJinete.value
  return jinete
}

module.exports.mostrardatosJinetes = function ( filaid) {
  var inputnombreJinete = document.getElementById('inputnombreJinete')
  var celdanombreJinete = document.getElementById(filaid + 'NombreJ')
  inputnombreJinete.value = celdanombreJinete.innerHTML
  var inputapellido1Jinete = document.getElementById('inputapellido1Jinete')
  var celdaapellido1Jinete = document.getElementById(filaid + 'Apellido1J')
  inputapellido1Jinete.value = celdaapellido1Jinete.innerHTML
  var inputapellido2Jinete = document.getElementById('inputapellido2Jinete')
  var celdaapellido2Jinete = document.getElementById(filaid + 'Apellido2J')
  inputapellido2Jinete.value = celdaapellido2Jinete.innerHTML
  var inputlicenciaJinete = document.getElementById('inputlicenciaJinete')
  var celdalicenciaJinete = document.getElementById(filaid + 'LicenciaJ')
  //para que no anada los span con los iconos
  inputlicenciaJinete.value = celdalicenciaJinete.textContent
  var inputidJinete = document.getElementById('inputidJinete')
  var celdaidJinete = document.getElementById(filaid + 'IDJ')
  inputidJinete.value = celdaidJinete.innerHTML
}
function generarListaJinetesordendesalida(data) {

    var listadoJinetesconfiguracionordendesalida = document.getElementById('listadoJinetesconfiguracionordendesalida')
    listadoJinetesconfiguracionordendesalida.innerHTML = ''
    data.forEach(function (data,indice){
      var elemListado
      // alert(jinete)
      elemListado = document.createElement('li')
      elemListado.id = 'fila' + indice + 'jinete'
      data.nombre = data.nombre + ' ' + data.apellido1 + ' ' + data.apellido2
      elemListado.appendChild(funcionescomunes.creaSpan(data.nombre, elemListado.id,'nombreJinete'))
      // // elemListado.appendChild(funcionescomunes.creaSpan(jinete.nombre,elemListado.id + 'NombreJOS','linombreJOS'))
      listadoJinetesconfiguracionordendesalida.appendChild(elemListado)
      elemListado.addEventListener('click', function () {
        funcionesformulariocompeticionseleccionada.mostrarJineteordendesalida('fila' + indice + 'jinete')
      })
      // detectarClick(elemListado)
    })
  }
module.exports.generartablaJinetes = function(data,socket) {
  var tbodyjinetes = document.getElementById('tbodyjinetes')
  tbodyjinetes.innerHTML = ''
  data.forEach(function (jinete,i) {
    elementotr = document.createElement('tr')
    elementotr.id = 'fila' + i
    var tdnombre = document.createElement('td')
    var tdapellido = document.createElement('td')
    var tdapellido2 = document.createElement('td')
    var tdlicencia = document.createElement('td')
    var tdid = document.createElement('td')
    //CREAMOS UN SPAN POR CADA PROPIEDAD DE CADA CABALLO,NOMBRE,LICENCIA,ID
    tdnombre.appendChild(funcionescomunes.creaSpan(jinete.nombre, elementotr.id +'NombreJ','liNombreJ'))
    tdapellido.appendChild(funcionescomunes.creaSpan(jinete.apellido1,elementotr.id +'Apellido1J','liApellido1J'))
    tdapellido2.appendChild(funcionescomunes.creaSpan(jinete.apellido2,elementotr.id +'Apellido2J','liApellido2J'))
    tdlicencia.appendChild(funcionescomunes.creaSpan(jinete.licencia, elementotr.id +'LicenciaJ','liLicenciaJ'))
    tdid.appendChild(funcionescomunes.creaSpan(jinete._id, elementotr.id +'IDJ','liIDJ'))
    elementotr.appendChild(tdnombre)
    elementotr.appendChild(tdapellido)
    elementotr.appendChild(tdapellido2)
    elementotr.appendChild(tdlicencia)
    elementotr.appendChild(tdid)
    tbodyjinetes.appendChild(elementotr)
    elementotr.addEventListener('click', function (){
      funcionescomunes.borrarclase('text-primary', this.parentNode)//eliminamos la clase bgsuccess del nodopadre(color)
      this.classList.add('text-primary')//anadimos nueva clase a este elemento (color)
      funcionesformulariojinete.mostrardatosJinetes(this.id)//mostramos los datos de esta fila
      funcionescomunes.removeclasselements('tablajinetes','fas fa-trash') //eliminamos los glyphicon de tablajientes
     
      var span = document.createElement('span')
      span.classList.add('glyphicon')
      span.id = this.id + 'glyphicon'
      span.appendChild(funcionescomunes.addiconelement('fas fa-trash',''))//anadimos icono en la celda LicenciaJ
      document.getElementById(this.id + 'LicenciaJ').appendChild(span)
      span.addEventListener('click',function () {
        var inputnombreJinete = document.getElementById('inputnombreJinete')
        var jinete = funcionesformulariojinete.leerformulariojinete()
        console.log(jinete)
        socket.emit('borrar_jinete',jinete.id)
        socket.emit('leer_jinetes')
        })
      document.getElementById('btnguardarjinete').setAttribute("disabled","disabled");
    })
  })
  generarListaJinetesordendesalida(data)
}
