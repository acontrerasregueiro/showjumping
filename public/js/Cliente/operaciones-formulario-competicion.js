// 'use strict'
// var funcionesbbddcaballos = require('.//operaciones-bbdd-caballos.js')
var funcionescomunes = require('./funciones-compartidas.js')
var funcionesformulariocompeticion = require('.//operaciones-formulario-competicion.js')
var funcionesbbddcompeticiones = require('.//operaciones-bbdd-competicion.js')
var funcionesformulariocompeticionseleccionada = require('.//operaciones-formulario-competicionseleccionada.js')

//BUSCA EN TODOS LOS CAMPOS SPAN DE UNA LISTA
//SI ENCUENTRA EL VALOR EN ALGUNO MUESTRA EL ELEMENTO LI
//SI NO OCULTA ESE ELEMENTO LI
//NO DISCRIMINA MAYUSCULAS-MINUSCULAS
//recibe por parámetro el UL
//recibe por parámetro la palabra a buscar
function buscarenListado(ul,filter){
  var filter = filter.toUpperCase()  //pasamos a mayusculas
  var filas = ul.getElementsByTagName('li') //
  var spans = filas[0].getElementsByTagName("span")
  for (var i = 0; i < filas.length; i++) {
    var spanActualtexto
    spanActualtexto = filas[i].getElementsByTagName('span')
    for (var ind = 0; ind < spans.length; ind++) {
      if (spanActualtexto[ind].innerHTML.toUpperCase().indexOf(filter) > -1) {
        //si encuentra la palabra a buscar (filter), muestra el elemento y pasa a la siguiente fila
        filas[i].style.display = ""
        break
      } else {
        //si no lo encuentra, oculta el elemento LI
        filas[i].style.display = "none"
      }
    }
  }
}
function borrarLiactivo(ul) {
  var liItems = ul.getElementsByTagName('li')
  for (var i = 0 ; i < liItems.length; i++){
    liItems[i].classList.remove('activo')
  }
}
function importarorden(socket) {
  var thefile = document.getElementById('btnimportarordendesalida')
  var filename = thefile.files[0].name
  socket.emit('importarcsv', filename)
  alert(filename)
}

function iniciarformulariocompeticiones(socket) {

  var inputjineteordendesalida = document.getElementById('inputjineteordendesalida')
  var inputcaballoordendesalida = document.getElementById('inputcaballoordendesalida')
  //buscamos en jinetes y caballos en la pagina de crear el orden de SALIDA
  var inputBuscarenlistadojinetesycaballos = document.getElementById('inputBuscarenlistadojinetesycaballos')
  var btnanadirbinomioaordendesalida = document.getElementById('btnanadirbinomioaordendesalida')
  var listadoordendesalida = document.getElementById('listadoordendesalida')
  var btnactualizarordendesalida = document.getElementById('btnactualizarordendesalida')
  var btnmoverarribaordendesalida = document.getElementById('btnmoverarribaordendesalida')
  var btnmoverabajoordendesalida = document.getElementById('btnmoverabajoordendesalida')
  var btnimportarordendesalida = document.getElementById('btnimportarordendesalida')
  var btnanadirjineteordendesalida = document.getElementById('btnanadirjineteordendesalida')


  btnimportarordendesalida.addEventListener('change',function (){
   importarorden(socket)
  })
//   btnmoverabajoordendesalida.addEventListener('click', function (){
//     funcionesformulariocompeticionseleccionada.moverabajoordendesalida(socket)

//   })
//   btnmoverarribaordendesalida.addEventListener('click',function (){
//     funcionesformulariocompeticionseleccionada.moverarribaordendesalida(socket)
//   })

  // btnactualizarordendesalida.addEventListener('click', function (){
  //   alert('HOLAAAAA')
  //   funcionesformulariocompeticionseleccionada.actualizarnumerosdeordendesalida(socket)
  // })

  btnanadirbinomioaordendesalida.addEventListener('click', function (){
    var inputbaremonuevaprueba = document.getElementById('inputbaremonuevaprueba')
    var inputnombrenuevaprueba = document.getElementById('inputnombrenuevaprueba')
    var baremodeprueba = inputbaremonuevaprueba.value
    inputBuscarenlistadojinetesycaballos.value = ''
    var inputjineteordensalida = document.getElementById('inputjineteordendesalida')
    var inputcaballoordendesalida = document.getElementById('inputcaballoordendesalida')
    var jineteacargarenordensalida = inputjineteordensalida.value
    var caballoacargarenordensalida = inputcaballoordendesalida.value
    if ((inputjineteordensalida.value != '') && (inputcaballoordendesalida.value != '')) {
    var li = document.createElement('li')
    //contamos los elementos LI para asignarle un ID a la filavar myUL = document.getElementById("myUL");
    var cuantosli = document.getElementById('listadoordendesalida').getElementsByTagName('li').length
    li.id = 'fila' + cuantosli + 'OS'
    var idjinete = 'fila' + cuantosli + 'JineteOS'
    var idcaballo = 'fila' + cuantosli + 'CaballoOS'
    var idnumero = 'fila' + cuantosli + 'NumeroOS'
    var idimg = 'fila' + cuantosli +'imgOS'

    var binomio = {}
    binomio.jinete = jineteacargarenordensalida
    binomio.caballo = caballoacargarenordensalida
    binomio.numero = cuantosli + 1
    var prueba = inputnombrenuevaprueba.value
    var coleccion = document.getElementById('inputnombreCompeticion').value
    console.log (binomio,prueba,coleccion)
    //primero añadimos el nºde orden de SALIDA
    var numerodeordensalida = cuantosli + 1
    li.appendChild(funcionescomunes.creaSpan(numerodeordensalida,idnumero,'NumeroOS'))
    li.appendChild(funcionescomunes.creaSpan(caballoacargarenordensalida,idcaballo,'caballoOS'))
    var btnborrarbinomio = document.createElement('button')
    btnborrarbinomio.id = idimg
    btnborrarbinomio.classList.add('iconoborrarprueba')
    btnborrarbinomio.innerHTML = 'X'
    btnborrarbinomio.addEventListener('click',function (){
      funcionescomunes.borrarbinomiodeordensalida(this.id,socket)
      // socket.emit('generarordendesalida',document.getElementById('inputnombreCompeticion').value, document.getElementById('inputnombrenuevaprueba').value)
    })
    li.appendChild(btnborrarbinomio)
    li.classList.add('list-group-item')
    listadoordendesalida.appendChild(li)
    li.appendChild(funcionescomunes.creaSpan(jineteacargarenordensalida, idjinete, 'jineteOS'))
    li.addEventListener('click',function (){
      console.log('click en LI : ', this.id)
      borrarLiactivo(listadoordendesalida)
      this.classList.add('active')
    })
    // var btnborrarbinomio = document.createElement('button')
    // var idimg = 'fila' + cuantosli + 'imgOS'
    // btnborrarbinomio.id = idimg
    // btnborrarbinomio.classList.add('iconoborrarprueba')
    // btnborrarbinomio.innerHTML = 'X'
    // btnborrarbinomio.addEventListener('click',function (){
    //   funcionescomunes.borrarbinomiodeordensalida(this.id,socket)
    //   // socket.emit('generarordendesalida',document.getElementById('inputnombreCompeticion').value, document.getElementById('inputnombrenuevaprueba').value)

    //   // var listadoordendesalida = document.getElementById('listadoordendesalida')
    //   // listadoordendesalida.innerHTML = ''
    //   // socket.emit('generarordendesalida',document.getElementById('inputnombreCompeticion').value, document.getElementById('inputnombrenuevaprueba').innerHTML)
    // })
    li.appendChild(btnborrarbinomio)
    li.appendChild(funcionescomunes.creaSpan(jineteacargarenordensalida,idjinete,'jineteOS'))
    socket.emit('nuevo_binomio', binomio,prueba,coleccion,baremodeprueba)
    li.addEventListener('click',function (){
      borrarLiactivo(listadoordendesalida)
      this.classList.add('activo')
    })
    listadoordendesalida.appendChild(li)
    // detectarClick(li)
    inputjineteordensalida.value = ''
    inputcaballoordendesalida.value = ''
    var  pixeles = listadoordendesalida.scrollTop;
    listadoordendesalida.scrollTop = pixeles + 500
   }
})

  inputBuscarenlistadojinetesycaballos.addEventListener('keyup',function() {
    buscarenListado(listadoCaballosconfiguracionordendesalida,inputBuscarenlistadojinetesycaballos.value)
    buscarenListado(listadoJinetesconfiguracionordendesalida,inputBuscarenlistadojinetesycaballos.value)
  })
//   //btnlimpiarbuscarordensalida inputbuscar en caballosy jinetes pantalla orden de salida
  var btnlimpiarbuscarordensalida = document.getElementById('btnlimpiarbuscarordensalida')
  btnlimpiarbuscarordensalida.addEventListener('click',function (){
    inputBuscarenlistadojinetesycaballos.value = ''
    buscarenListado(listadoJinetesconfiguracionordendesalida,'')
    buscarenListado(listadoCaballosconfiguracionordendesalida,'')
    inputjineteordendesalida.value =''
    inputcaballoordendesalida.value = ''
  })

  inputnombreCompeticion.addEventListener('keydown',function (){
    document.getElementById('btnguardarcompeticion').removeAttribute('disabled')
  })
  inputlugarCompeticion.addEventListener('keydown',function (){
    document.getElementById('btnguardarcompeticion').removeAttribute('disabled')
  })
  inputfechaCompeticion.addEventListener('keydown',function (){
    document.getElementById('btnguardarcompeticion').removeAttribute('disabled')
  })
  inputcategoriaCompeticion.addEventListener('keydown',function (){
    document.getElementById('btnguardarcompeticion').removeAttribute('disabled')
  })
  funcionesbbddcompeticiones.iniciarcompeticiones(socket)//Iniciamos operaciones con sockets Caballos
  var btnnuevacompeticion = document.getElementById('btnnuevacompeticion')
  btnnuevacompeticion.addEventListener('click',function () {
    funcionescomunes.limpiarinputs(document.getElementById('formulariodatoscompeticion'))
    document.getElementById('inputnombreCompeticion').focus()
  })
}



module.exports.iniciarmodulocompeticiones = function (socket) {
 iniciarformulariocompeticiones(socket)
}

module.exports.leerformulariocompeticion = function (){
  var inputnombreCompeticion = document.getElementById('inputnombreCompeticion')
  var inputlugarCompeticion = document.getElementById('inputlugarCompeticion')
  var inputfechaCompeticion = document.getElementById('inputfechaCompeticion')
  var inputcategoriaCompeticion = document.getElementById('inputcategoriaCompeticion')
  var competicion = {}
  competicion.nombre = inputnombreCompeticion.value
  competicion.lugar = inputlugarCompeticion.value
  competicion.fecha = inputfechaCompeticion.value
  competicion.categoria = inputcategoriaCompeticion.value
  return competicion
}

module.exports.mostrardatosCompeticion = function ( filaid) {
  var inputnombreCompeticion = document.getElementById('inputnombreCompeticion')
  var celdanombreCompeticion = document.getElementById(filaid + 'nombreCompeticion')
  inputnombreCompeticion.value = celdanombreCompeticion.textContent
  var inputlugarCompeticion = document.getElementById('inputlugarCompeticion')
  var celdalugarCompeticion = document.getElementById(filaid + 'lugarCompeticion')
  inputlugarCompeticion.value = celdalugarCompeticion.innerHTML
  var inputfechaCompeticion = document.getElementById('inputfechaCompeticion')
  var celdafechaCompeticion = document.getElementById(filaid + 'fechaCompeticion')
  inputfechaCompeticion.value = celdafechaCompeticion.innerHTML
  var inputcategoriaCompeticion = document.getElementById('inputcategoriaCompeticion')
  var celdacategoriaCompeticion = document.getElementById(filaid + 'categoriaCompeticion')
  //para que no anada los span con los iconos
  inputcategoriaCompeticion.value = celdacategoriaCompeticion.textContent
  var inputidCompeticion = document.getElementById('inputidCompeticion')
  var celdaidCompeticion = document.getElementById(filaid + 'IDCompeticion')
  inputidCompeticion.value = celdaidCompeticion.innerHTML
}
//
module.exports.generartablaCompeticiones = function(competicion,socket) {
    // alert(competicion.nombre)
  var tbodycompeticion = document.getElementById('tbodycompeticion')
  var elementotr = document.createElement('tr')
  elementotr.id = 'filacompeticion' + (tbodycompeticion.children.length + 1)
  var tdnombre = document.createElement('td')
  var tdlugar = document.createElement('td')
  var tdfecha = document.createElement('td')
  var tdcategoria = document.createElement('td')
  var tdid = document.createElement('td')
  var tdbotones = document.createElement('td')
  //CREAMOS UN SPAN POR CADA PROPIEDAD DE CADA CABALLO,NOMBRE,LICENCIA,ID
  tdnombre.appendChild(funcionescomunes.creaSpan(competicion.nombre, elementotr.id +'nombreCompeticion','nombreCompe'))
  tdlugar.appendChild(funcionescomunes.creaSpan(competicion.lugar,elementotr.id +'lugarCompeticion','lugarCompe'))
  tdfecha.appendChild(funcionescomunes.creaSpan(competicion.fecha,elementotr.id +'fechaCompeticion','fechaCompe'))
  tdcategoria.appendChild(funcionescomunes.creaSpan(competicion.categoria, elementotr.id +'categoriaCompeticion','categoriaCompe'))
  tdid.appendChild(funcionescomunes.creaSpan(competicion._id, elementotr.id +'IDCompeticion','IDCompe'))
  elementotr.appendChild(tdnombre)
  elementotr.appendChild(tdlugar)
  elementotr.appendChild(tdfecha)
  elementotr.appendChild(tdcategoria)
  elementotr.appendChild(tdid)
  tbodycompeticion.appendChild(elementotr)

  elementotr.addEventListener('click', function (){
    funcionescomunes.borrarclase('text-primary', this.parentNode)//eliminamos la clase bgsuccess del nodopadre(color)
    this.classList.add('text-primary')//anadimos nueva clase a este elemento (color)
    funcionesformulariocompeticion.mostrardatosCompeticion(this.id)//mostramos los datos de esta fila
    funcionescomunes.removeclasselements('tablacompeticiones','fas fa-chevron-circle-right') //eliminamos los glyphicon de tablajientes
     var span = document.createElement('span')
    span.classList.add('iconoborrarjinete')
    span.id =  this.id + 'iconoborrar'
    span.appendChild(funcionescomunes.addiconelement('fas fa-chevron-circle-right',''))//anadimos icono en la celda LicenciaJ
    document.getElementById(this.id + 'nombreCompeticion').appendChild(span)
    // document.getElementById(this.id + 'nombreCompeticion').appendChild(div)
    span.addEventListener('click',function () {
      var nombrecompeticionseleccionada = document.getElementById('inputnombreCompeticion').value
      socket.emit('solicita_competicion', nombrecompeticionseleccionada)
      var formulariodatosprueba = document.getElementById('formulariodatosprueba')//LIMPIAMOS LOS DATOS DEL FORMULARIO DE PRUEBA
      funcionescomunes.limpiarinputs(formulariodatosprueba)
      var dropdownprueba = document.getElementById('dropdownprueba') //DESACTIVAMOS EL DROPDOWN DE PRUEBAS
      // dropdownprueba.classList.add('disabled')//
      funcionescomunes.showdiv('tab-competicionseleccionada','tab-content')//MOSTRAMOS EL TAB DE LA COMPETICION SELECCIONADA     
    })
  })
}
