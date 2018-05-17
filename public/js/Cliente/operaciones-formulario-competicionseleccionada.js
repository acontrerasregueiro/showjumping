'use strict'

var funcionescomunes = require('./funciones-compartidas.js')
// var funcionesbbddpruebas = require('.//operaciones-bbdd-pruebas.js')
// var funcionesmodalnuevaprueba = require('./modalnuevaprueba.js')
// var funcionesformulariocompeticionseleccionada = require('.//operaciones-formulario-competicionseleccionada.js')

module.exports.moverabajoordendesalida = function (socket) {
    //ALMACENO EN VARIABLE EL ELEMENTO SELECCIONADO Y EL ELEMENTO ANTERIOR
    var elementoordendesalidaseleccionado  = document.getElementById('listadoordendesalida').getElementsByClassName('active')
    var elementosiguiente = elementoordendesalidaseleccionado[0].nextSibling
    var elementosiguienteid = elementoordendesalidaseleccionado[0].nextSibling.id
    var nombrefilareal = elementoordendesalidaseleccionado[0].id.substring(0,elementoordendesalidaseleccionado[0].id.length -2)
    var nombrefilasiguientereal = elementosiguienteid.substring(0,elementosiguienteid.length -2)
    //ALMACENO EL ELEMENTO ANTERIOR EN UNA VARIABLE PARA EL INTERCAMBIO DE DATOS
    console.log('ELEMENTO SELECCIONADO : ', elementoordendesalidaseleccionado[0].id)
    console.log('elemento SIGUIENTE : ', elementosiguienteid)
    //LIMPIO EL ELEMENTO ANTERIOR
    //AÑADO LOS DATOS
    var ordenelementoseleccionado = document.getElementById(nombrefilareal + 'NumeroOS')
    var jineteelementoseleccionado = document.getElementById(nombrefilareal + 'JineteOS')
    var caballoelementoseleccionado = document.getElementById(nombrefilareal + 'CaballoOS')
    var imagencaballoseleccionado = nombrefilareal + 'imgOS'
    var ordenelementointercambio = document.getElementById(nombrefilasiguientereal + 'NumeroOS')
    var jineteelementointercambio = document.getElementById(nombrefilasiguientereal + 'JineteOS')
    var caballoelementointercambio = document.getElementById(nombrefilasiguientereal + 'CaballoOS')
    var imagencaballointercambio = document.getElementById(nombrefilasiguientereal + 'imgOS')
    //ELEMENTO ANTERIOR  SE GUARDA PÀRA EL INTERCAMBIO
    elementosiguiente.innerHTML = ''
    // ASIGNO A LA FILA SELECCIONADA LOS DATOS GUARDOS PARA INTERCAMBIO DE LA FILA ANTERIOR
    elementosiguiente.appendChild(funcionescomunes.creaSpan(ordenelementoseleccionado.innerHTML,nombrefilasiguientereal + 'NumeroOS','NumeroOS'))
    elementosiguiente.appendChild(funcionescomunes.creaSpan(caballoelementoseleccionado.innerHTML,nombrefilasiguientereal + 'CaballoOS','caballoOS'))
    // elementosiguiente.appendChild(anadirimagenborrar(imagencaballoseleccionado,15,15,'binomio'))
    elementoordendesalidaseleccionado[0].innerHTML = ''
    elementoordendesalidaseleccionado[0].appendChild(funcionescomunes.creaSpan(ordenelementointercambio.innerHTML,nombrefilareal + 'NumeroOS','NumeroOS'))
    elementoordendesalidaseleccionado[0].appendChild(funcionescomunes.creaSpan(caballoelementointercambio.innerHTML,nombrefilareal + 'CaballoOS','caballoOS'))
    var btnborrarbinomio = document.createElement('button')
    btnborrarbinomio.id = nombrefilareal + 'imgOS'
    btnborrarbinomio.classList.add('iconoborrarprueba')
    btnborrarbinomio.innerHTML = 'X'
    btnborrarbinomio.addEventListener('click',function (){
      funcionescomunes.borrarbinomiodeordensalida(this.id,socket)
      socket.emit('generarordendesalida',document.getElementById('inputnombreCompeticion').value, document.getElementById('inputnombrenuevaprueba').value)
    })
    elementoordendesalidaseleccionado[0].appendChild(btnborrarbinomio)
    elementoordendesalidaseleccionado[0].appendChild(funcionescomunes.creaSpan(jineteelementointercambio.innerHTML,nombrefilareal + 'JineteOS','JineteOS'))
    // elementoordendesalidaseleccionado[0].appendChild(anadirimagenborrar(imagencaballointercambio,15,15,'binomio'))
    var btnborrarbinomio = document.createElement('button')
    btnborrarbinomio.id = nombrefilasiguientereal + 'imgOS'
    btnborrarbinomio.classList.add('iconoborrarprueba')
    btnborrarbinomio.innerHTML = 'X'
    btnborrarbinomio.addEventListener('click',function (){
      funcionescomunes.borrarbinomiodeordensalida(this.id,socket)
      socket.emit('generarordendesalida',document.getElementById('inputnombreCompeticion').value, document.getElementById('inputnombrenuevaprueba').value)
    })
    elementosiguiente.appendChild(btnborrarbinomio)
    elementosiguiente.appendChild(funcionescomunes.creaSpan(jineteelementoseleccionado.innerHTML,nombrefilasiguientereal + 'JineteOS','JineteOS'))
    elementoordendesalidaseleccionado[0].classList.remove('active')
    elementosiguiente.classList.add('active')
    funcionesformulariocompeticionseleccionada.actualizarnumerosdeordendesalida(socket)
    // actualizarnumerosdeordendesalida()
  }

module.exports.moverarribaordendesalida = function(socket) {
    //ALMACENO EN VARIABLE EL ELEMENTO SELECCIONADO Y EL ELEMENTO ANTERIOR
  var elementoordendesalidaseleccionado  = document.getElementById('listadoordendesalida').getElementsByClassName('active')
  var elementoanterior = elementoordendesalidaseleccionado[0].previousSibling
  var elementoanteriorid = elementoordendesalidaseleccionado[0].previousSibling.id
  var nombrefilareal = elementoordendesalidaseleccionado[0].id.substring(0,elementoordendesalidaseleccionado[0].id.length -2)
  var nombrefilaanteriorreal = elementoanteriorid.substring(0,elementoanteriorid.length -2)
 //ALMACENO EL ELEMENTO ANTERIOR EN UNA VARIABLE PARA EL INTERCAMBIO DE DATOS
 console.log('ELEMENTO SELECCIONADO : ', elementoordendesalidaseleccionado[0].id)
 console.log('elemento anterior  : ', elementoanteriorid)
 //LIMPIO EL ELEMENTO ANTERIOR
 //AÑADO LOS DATOS
 var ordenelementoseleccionado = document.getElementById(nombrefilareal + 'NumeroOS')
 var jineteelementoseleccionado = document.getElementById(nombrefilareal + 'JineteOS')
 var caballoelementoseleccionado = document.getElementById(nombrefilareal + 'CaballoOS')
 var imagencaballoseleccionado = nombrefilareal + 'imgOS'
 var ordenelementointercambio = document.getElementById(nombrefilaanteriorreal + 'NumeroOS')
 var jineteelementointercambio = document.getElementById(nombrefilaanteriorreal + 'JineteOS')
 var caballoelementointercambio = document.getElementById(nombrefilaanteriorreal + 'CaballoOS')
 var imagencaballointercambio = document.getElementById(nombrefilaanteriorreal + 'imgOS')
  //ELEMENTO ANTERIOR  SE GUARDA PÀRA EL INTERCAMBIO
  elementoanterior.innerHTML = ''
  // ASIGNO A LA FILA SELECCIONADA LOS DATOS GUARDOS PARA INTERCAMBIO DE LA FILA ANTERIOR
  //  //creaspan texto id clase
  elementoanterior.appendChild(funcionescomunes.creaSpan(ordenelementoseleccionado.innerHTML,nombrefilaanteriorreal + 'NumeroOS','NumeroOS'))
  elementoanterior.appendChild(funcionescomunes.creaSpan(caballoelementoseleccionado.innerHTML,nombrefilaanteriorreal + 'CaballoOS','caballoOS'))
  var btnborrarbinomio = document.createElement('button')
  btnborrarbinomio.id = nombrefilaanteriorreal + 'imgOS'
  btnborrarbinomio.classList.add('iconoborrarprueba')
  btnborrarbinomio.innerHTML = 'X'
  btnborrarbinomio.addEventListener('click',function (){
    funcionescomunes.borrarbinomiodeordensalida(this.id,socket)
    socket.emit('generarordendesalida',document.getElementById('inputnombreCompeticion').value, document.getElementById('inputnombrenuevaprueba').value)
  })
  elementoanterior.appendChild(btnborrarbinomio)
  elementoanterior.appendChild(funcionescomunes.creaSpan(jineteelementoseleccionado.innerHTML,nombrefilaanteriorreal + 'JineteOS','JineteOS'))
  elementoordendesalidaseleccionado[0].innerHTML = ''
  elementoordendesalidaseleccionado[0].appendChild(funcionescomunes.creaSpan(ordenelementointercambio.innerHTML,nombrefilareal + 'NumeroOS','NumeroOS'))
  elementoordendesalidaseleccionado[0].appendChild(funcionescomunes.creaSpan(caballoelementointercambio.innerHTML,nombrefilareal + 'CaballoOS','caballoOS'))
  var btnborrarbinomio = document.createElement('button')
  btnborrarbinomio.id = imagencaballoseleccionado
  btnborrarbinomio.classList.add('iconoborrarprueba')
  btnborrarbinomio.innerHTML = 'X'
  btnborrarbinomio.addEventListener('click',function (){
    funcionescomunes.borrarbinomiodeordensalida(this.id,socket)
    socket.emit('generarordendesalida',document.getElementById('inputnombreCompeticion').value, document.getElementById('inputnombrenuevaprueba').value)
  })
  elementoordendesalidaseleccionado[0].appendChild(btnborrarbinomio)
  elementoordendesalidaseleccionado[0].appendChild(funcionescomunes.creaSpan(jineteelementointercambio.innerHTML,nombrefilareal + 'JineteOS','JineteOS'))
  elementoordendesalidaseleccionado[0].classList.remove('active')
  elementoanterior.classList.add('active')
  funcionesformulariocompeticionseleccionada.actualizarnumerosdeordendesalida(socket)
}
function anadirbinomioalistaordendesalida(dato) {
  var li = document.createElement('li')
  var cuantosli = document.getElementById('listadoordendesalida').getElementsByTagName('li').length
  li.id = 'fila' + cuantosli + 'OS'
  var idjinete = 'fila' + cuantosli + 'JineteOS'
  var idcaballo = 'fila' + cuantosli + 'CaballoOS'
  var idnumero = 'fila' + cuantosli + 'NumeroOS'
  var idimg = 'fila' + cuantosli + 'imgOS'
  var jinete = dato.jinete
  var caballo = dato.caballo
  var os = dato.orden
  li.appendChild(funcionescomunes.creaSpan(os, idnumero, 'NumeroOS'))
  li.appendChild(funcionescomunes.creaSpan(caballo, idcaballo, 'caballoOS'))
  var btnborrarbinomio = document.createElement('button')
  btnborrarbinomio.id = idimg
  btnborrarbinomio.classList.add('iconoborrarprueba')
  btnborrarbinomio.innerHTML = 'X'
  btnborrarbinomio.addEventListener('click',function (){
    funcionescomunes.borrarbinomiodeordensalida(this.id,socket)
    socket.emit('generarordendesalida',document.getElementById('inputnombreCompeticion').value, document.getElementById('inputnombrenuevaprueba').value)
  })
  li.appendChild(btnborrarbinomio)
  li.classList.add('list-group-item')
  listadoordendesalida.appendChild(li)
  li.appendChild(funcionescomunes.creaSpan(jinete, idjinete, 'jineteOS'))
  li.addEventListener('click',function (){
    console.log('click en LI : ', this.id)
    borrarLiactivo(listadoordendesalida)
    this.classList.add('active')
  })
}
//actualiza los numeros del listadoordendesalida
// y los modifica en la bbdd
module.exports.actualizarnumerosdeordendesalida = function(socket) {
  var cuantosli = document.getElementById('listadoordendesalida').getElementsByTagName('li').length
  console.log('ELEMENTOS LI : ', cuantosli)
  for (var indice = 0 ; indice < cuantosli ; indice ++) {
    var binomio = {}  //ALMACENAMOS EL BINOMIO ANTIGUO7
    var binomioordenado = {}
    var jinete = document.getElementById('fila' + indice + 'JineteOS')
    var caballo = document.getElementById('fila' + indice + 'CaballoOS')
    var spanorden = document.getElementById('fila' + indice + 'NumeroOS')
    binomio.orden = spanorden.innerHTML
    binomio.jinete = jinete.innerHTML
    binomio.caballo = caballo.innerHTML
    var orden = indice + 1  // + 1 YA QUE EL PRIMER ELEMENTO ES CERO
    spanorden.innerHTML = orden
    binomioordenado.orden = spanorden.innerHTML
    binomioordenado.jinete = jinete.innerHTML
    binomioordenado.caballo = caballo.innerHTML
    var coleccion = document.getElementById('inputnombreCompeticion').value
    var prueba = document.getElementById('inputnombrenuevaprueba').value
    var baremo = document.getElementById('inputbaremonuevaprueba').value
    socket.emit('actualizarnumerosordendesalida',binomio,binomioordenado,coleccion,prueba,baremo)
  }
}

function mostrardatospruebaenformulario(fila,socket){
  // iniciarbbddpruebas(socket) // iniciamos el modulo bbdd pruebas
  var inputnombrenuevaprueba = document.getElementById('inputnombrenuevaprueba')
  var inputtrofeonuevaprueba = document.getElementById('inputtrofeonuevaprueba')
  var inputbaremonuevaprueba = document.getElementById('inputbaremonuevaprueba')
  var inputalturanuevaprueba = document.getElementById('inputalturanuevaprueba')
  var inputindicenuevaprueba = document.getElementById('inputindicenuevaprueba')
  inputnombrenuevaprueba.value = fila.childNodes[1].innerHTML
  inputtrofeonuevaprueba.value = fila.childNodes[2].innerHTML
  inputalturanuevaprueba.value = fila.childNodes[3].innerHTML
  inputbaremonuevaprueba.value = fila.childNodes[4].innerHTML
  inputindicenuevaprueba.value = fila.childNodes[0].innerHTML
}
function borrarLiactivo(ul) {
  var liItems = ul.getElementsByTagName('li')
  for (var i = 0 ; i < liItems.length; i++){
    liItems[i].classList.remove('active')
  }
}
module.exports.anadirbinomiosaordendesalida = function (jinete,caballo,socket) {
  // alert(jinete)
  // var inputbaremonuevaprueba = document.getElementById('inputbaremonuevaprueba')
  // var inputnombrenuevaprueba = document.getElementById('inputnombrenuevaprueba')
  var baremodeprueba = inputbaremonuevaprueba.value
  var inputjineteordensalida = document.getElementById('inputjineteordendesalida')
  var inputcaballoordendesalida = document.getElementById('inputcaballoordendesalida')
  // var li = document.createElement('li')
  // //contamos los elementos LI para asignarle un ID a la filavar myUL = document.getElementById("myUL");
  var cuantosli = document.getElementById('listadoordendesalida').getElementsByTagName('li').length
  var dato = {}
  dato.jinete = jinete
  dato.caballo = caballo
  dato.orden = cuantosli
  anadirbinomioalistaordendesalida(dato)
  // li.id = 'fila' + cuantosli + 'OS'
  // var idjinete = 'fila' + cuantosli + 'JineteOS'
  // var idcaballo = 'fila' + cuantosli + 'CaballoOS'
  // var idnumero = 'fila' + cuantosli + 'NumeroOS'
  // var idimg = 'fila' + cuantosli +'imgOS'

  // var binomio = {}
  // binomio.jinete = jinete
  // binomio.caballo = caballo
  // binomio.numero = cuantosli + 1
  var prueba = inputnombrenuevaprueba.value
  var coleccion = document.getElementById('inputnombreCompeticion').value
  // //primero añadimos el nºde orden de SALIDA
  // var numerodeordensalida = cuantosli + 1
  // li.appendChild(funcionescomunes.creaSpan(numerodeordensalida,idnumero,'NumeroOS'))
  // li.appendChild(funcionescomunes.creaSpan(caballo,idcaballo,'caballoOS'))
  // var btnborrarbinomio = document.createElement('button')
  // var idimg = 'fila' + cuantosli + 'imgOS'
  // btnborrarbinomio.id = idimg
  // btnborrarbinomio.classList.add('iconoborrarprueba')
  // btnborrarbinomio.innerHTML = 'X'
  // btnborrarbinomio.addEventListener('click',function (){
  // funcionescomunes.borrarbinomiodeordensalida(this.id,socket)
  //   socket.emit('generarordendesalida',document.getElementById('inputnombreCompeticion').value, document.getElementById('inputnombrenuevaprueba').value)
  // })
  // li.appendChild(btnborrarbinomio)
  // li.appendChild(funcionescomunes.creaSpan(jinete,idjinete,'jineteOS'))
  socket.emit('nuevo_binomio', dato,prueba,coleccion,baremodeprueba)
  // li.addEventListener('click',function (){
  //   borrarLiactivo(listadoordendesalida)
  //   this.classList.add('activo')
  // })
  // listadoordendesalida.appendChild(li)
  // // detectarClick(li)
  inputjineteordensalida.value = ''
  inputcaballoordendesalida.value = ''
  var  pixeles = listadoordendesalida.scrollTop;
  listadoordendesalida.scrollTop = pixeles + 500
}

//FIN MOSTRARJINETE(FILA)
module.exports.leerygenerarordendesalida = function (objetoprueba,socket) {
     var listadoordendesalida = document.getElementById('listadoordendesalida')
     listadoordendesalida.innerHTML = ''

    if (objetoprueba.os.length > 0) {
      //   COMENZamos coN PRUEBAS PARA PASAR VCALORES Y ORDENAR ARRAY//
      var arrayprueba = []
      for (var indice = 0; indice < objetoprueba.os.length; indice++) {
      //* ************** SI EL ORDEN ES IGUAL AL INDICE -1 (PARA QUE SE INTRODUZCAN DATOS EN ORDEN)
        var objetoparticipante = {}
        objetoparticipante.jinete = objetoprueba.os[indice].jinete
        objetoparticipante.caballo = objetoprueba.os[indice].caballo
        objetoparticipante.orden = objetoprueba.os[indice].orden
        arrayprueba.push(objetoparticipante)
        console.log('OBJETO PARTICPANTE          :', objetoparticipante)
      }
      arrayprueba.sort(funcionescomunes.SortByID)
      console.log('ARRAY ORDENADOOOOOOOOOOOO    :', arrayprueba)
      for (var indice = 0; indice < arrayprueba.length; indice++) {
        anadirbinomioalistaordendesalida(arrayprueba[indice])
        // var li = document.createElement('li')
        // li.id = 'fila' + indice + 'OS'
        // var cuantosli = document.getElementById('listadoordendesalida').getElementsByTagName('li').length
        // var idjinete = 'fila' + cuantosli + 'JineteOS'
        // var idcaballo = 'fila' + cuantosli + 'CaballoOS'
        // var idnumero = 'fila' + cuantosli + 'NumeroOS'
        // var idimg = 'fila' + cuantosli + 'imgOS'
        // var jinete = arrayprueba[indice].jinete
        // var caballo = arrayprueba[indice].caballo
        // var os = arrayprueba[indice].orden
        // li.appendChild(funcionescomunes.creaSpan(os, idnumero, 'NumeroOS'))
        // li.appendChild(funcionescomunes.creaSpan(caballo, idcaballo, 'caballoOS'))
        // var btnborrarbinomio = document.createElement('button')
        // btnborrarbinomio.id = idimg
        // btnborrarbinomio.classList.add('iconoborrarprueba')
        // btnborrarbinomio.innerHTML = 'X'
        // btnborrarbinomio.addEventListener('click',function (){
        //   funcionescomunes.borrarbinomiodeordensalida(this.id,socket)
        //   socket.emit('generarordendesalida',document.getElementById('inputnombreCompeticion').value, document.getElementById('inputnombrenuevaprueba').value)
        // })
        // li.appendChild(btnborrarbinomio)
        // li.classList.add('list-group-item')
        // listadoordendesalida.appendChild(li)
        // li.appendChild(funcionescomunes.creaSpan(jinete, idjinete, 'jineteOS'))
        // li.addEventListener('click',function (){
        //   console.log('click en LI : ', this.id)
        //   borrarLiactivo(listadoordendesalida)
        //   this.classList.add('active')
        // })
        // detectarClick(li)
      }
    }
  }
module.exports.mostrarJineteordendesalida = function (filaid) {
  var inputjineteordensalida = document.getElementById('inputjineteordendesalida')
  var nombre = filaid
  var nombrejinete = document.getElementById(nombre).innerText
  inputjineteordensalida.value = nombrejinete
}
module.exports.mostrarCaballoordendesalida = function (filaid) {
  var inputcaballoordensalida = document.getElementById('inputcaballoordendesalida')
  var nombre = filaid
  var nombrecaballo = document.getElementById(nombre).innerText
  inputcaballoordensalida.value = nombrecaballo
}
function mostrardatosenformulariocompeticionseleccionada (competicion) {
//   var inputnombreCompeticion2 = document.getElementById('inputnombreCompeticion2')
//   var inputlugarCompeticion2 = document.getElementById('inputlugarCompeticion2')
//   var inputfechaCompeticion2 = document.getElementById('inputfechaCompeticion2')
//   var inputcategoriaCompeticion2 = document.getElementById('inputcategoriaCompeticion2')
//   var inputidCompeticion2 = document.getElementById('inputidCompeticion2')
//   inputnombreCompeticion2.value  = competicion.nombre
//   inputlugarCompeticion2.value = competicion.lugar
//   inputfechaCompeticion2.value = competicion.fecha
//   inputcategoriaCompeticion2.value = competicion.categoria
//   inputidCompeticion2.value = competicion._id
}
// function borrarprueba(socket) {
//   var inputnombreCompeticion2 = document.getElementById('inputnombreCompeticion2')
//   var inputnombrenuevaprueba = document.getElementById('inputnombrenuevaprueba')
//   socket.emit('borrarprueba', inputnombreCompeticion2.value, inputnombrenuevaprueba.value)
// }
function leerformulariodatosprueba() {
  var datosprueba = {}
  datosprueba.nombreprueba = document.getElementById('inputnombrenuevaprueba').value
  datosprueba.nombrecompeticion = document.getElementById('inputnombreCompeticion2').value
  datosprueba.baremodeprueba = document.getElementById('inputbaremonuevaprueba').value
  datosprueba.altura = document.getElementById('inputalturanuevaprueba').value
  datosprueba.trofeo = document.getElementById('inputtrofeonuevaprueba').value
  datosprueba.baremo = document.getElementById('inputbaremonuevaprueba').value
  return datosprueba
}
module.exports.iniciardropwdown = function(socket) {
  btnclasificarprueba.addEventListener('click',function (){
    alert('btnclasficarprueba')
  })

  btnordenprueba.addEventListener('click',function () {
    var inputnombrenuevaprueba = document.getElementById('inputnombrenuevaprueba')
    // alert(inputnombrenuevaprueba.value)
    funcionescomunes.showdiv('tab-ordendesalida','tab-content')
    socket.emit('generarordendesalida', document.getElementById('inputnombreCompeticion').value, inputnombrenuevaprueba.value)

  })

  btnanadirprueba.addEventListener('click',function (){
    alert('btnanadirprueba')
  })

  btnconfigurarprueba.addEventListener('click',function (){
    alert('btnconfigurarprueba')
  })

  btnborrarprueba.addEventListener('click',function () {
    alert('click en iconoborrarprueba')
    if (confirm('Are you sure you want to save this thing into the database?')) {
      borrarprueba(socket)
        // BORRAR PRUEBA
    } else {
        // Do nothing!
        alert('Borrado cancelado!')
    }
  })
  // var btnempezarrueba = document.getElementById('btnempezarprueba')
  btnempezarprueba.addEventListener('click',function () {
    // socket.emit('recargarpaginaclasificacion')
    alert('click enboton EMPEZAR PRUEBA')
    var nombreprueba = document.getElementById('inputnombrenuevaprueba').value
    var nombrecompeticion = document.getElementById('inputnombreCompeticion').value
    var baremodeprueba = document.getElementById('inputbaremonuevaprueba').value
    var altura = document.getElementById('inputalturanuevaprueba').value
    var trofeo = document.getElementById('inputtrofeonuevaprueba').value
    var baremo = document.getElementById('inputbaremonuevaprueba').value
    funcionescomunes.showdiv('tab-empezarprueba','tab-content')

    //enviamos solicitud de prueba a servdior
    socket.emit('empezarprueba', nombrecompeticion, nombreprueba, baremodeprueba)

    // funcionescomunes.showdiv('divempezarprueba','contenido')
    //enviamos solicitud de nuevo encabezado pantalla clasificacion


    // socket.emit('encabezadoclasificaciondeprueba',altura, trofeo,baremo)
    //enviamos solicitud de recargar pagina de clasificacion

  })
}
module.exports.generartablaCompeticionSeleccionada = function(competicion,socket) {
  mostrardatosenformulariocompeticionseleccionada(competicion) //cargamos datos de competicion en formulario de la derecha
  var tbodycompeticionseleccionada = document.getElementById('tbodycompeticionseleccionada')
  tbodycompeticionseleccionada.innerHTML = ''
  if (competicion.pruebas.length > 0) { // SI EXISTE ALGUNA PUEBRA
    // alert('mas de 1 prueba')
     for (var indice = 0; indice < competicion.pruebas.length; indice++) {
       var elementotr = document.createElement('tr')
       var indiceprueba = document.createElement('td')
       var nombreprueba = document.createElement('td')
       var trofeoprueba = document.createElement('td')
       var alturaprueba = document.createElement('td')
       var baremoprueba = document.createElement('td')

      indiceprueba.innerHTML = indice
      nombreprueba.innerHTML = competicion.pruebas[indice].nombreprueba
      trofeoprueba.innerHTML = competicion.pruebas[indice].trofeo
      alturaprueba.innerHTML = competicion.pruebas[indice].altura
      baremoprueba.innerHTML = competicion.pruebas[indice].baremo
      elementotr.appendChild(indiceprueba)
      elementotr.appendChild(nombreprueba)
      elementotr.appendChild(trofeoprueba)
      elementotr.appendChild(alturaprueba)
      elementotr.appendChild(baremoprueba)
      elementotr.id = indice
      tbodycompeticionseleccionada.appendChild(elementotr)
      elementotr.addEventListener(`click`, function (){
        
        funcionescomunes.removeclasselements('tbodycompeticionseleccionada','fas fa-chevron-circle-right') //eliminamos los glyphicon de tablajientes
     var span = document.createElement('span')
    span.classList.add('iconoborrarjinete')
    span.id =  this.id + 'iconoborrar'
    span.appendChild(funcionescomunes.addiconelement('fas fa-chevron-circle-right',''))//anadimos icono en la celda LicenciaJ
    // span.insertBefore(span, (this.id).firstChild);
    document.getElementById(this.id).appendChild(span)
      // eElement.insertBefore(newFirstElement, eElement.firstChild);
    funcionescomunes.borrarclase('text-primary', this.parentNode)//eliminamos la clase bgsuccess del nodopadre(color)
        this.classList.add('text-primary')//anadimos nueva clase a este elemento (color)
        var dropdownprueba = document.getElementById('dropdownprueba')
        dropdownprueba.classList.remove('disabled')
       mostrardatospruebaenformulario(this)
     
    //    var span = document.createElement('span')
    //    span.classList.add('glyphicon')
    //    span.id = this.id + 'glyphicon'
    //    span.appendChild(funcionescomunes.addiconelement('fas fa-trash',''))//anadimos icono en la celda LicenciaJ
    //    funcionescomunes.removeclasselements('tablacompeticioneseleccionada','iconoborrarprueba') //eliminamos los glyphicon de tablajientes
    //    var btnborrarprueba = document.createElement('span')
    //    btnborrarprueba.classList.add('iconoborrarprueba')
    //    btnborrarprueba.appendChild(funcionescomunes.addiconelement('fas fa-trash',''))
    //    var btnclasificacionprueba = document.createElement('span')
    //    btnclasificacionprueba.classList.add('iconoborrarprueba')
    //    btnclasificacionprueba.appendChild(funcionescomunes.addiconelement('fas fa-list-ol',''))
    //    var btnordenprueba = document.createElement('span')
    //    btnordenprueba.classList.add('iconoborrarprueba')
    //    btnordenprueba.appendChild(funcionescomunes.addiconelement('fas fa-list',''))
    //    var btnempezarrueba = document.createElement('span')
    //    btnempezarrueba.classList.add('iconoborrarprueba')
    //    btnempezarrueba.innerHTML = 'S'
      //  var spanborrarprueba = document.createElement('span')
      //  spanborrarprueba.classList.add('iconoborrarprueba')
      // spanborrarprueba.appendChild(funcionescomunes.addiconelement('glyphicon glyphicon-ok','left'))//anadimos icono en la celda LicenciaJ

    //   btnempezarrueba.addEventListener('click',function () {
    //     // socket.emit('recargarpaginaclasificacion')

    //     var nombreprueba = document.getElementById('inputnombrenuevaprueba').value
    //     var nombrecompeticion = document.getElementById('inputnombreCompeticion2').value
    //     var baremodeprueba = document.getElementById('inputbaremonuevaprueba').value
    //     var altura = document.getElementById('inputalturanuevaprueba').value
    //     var trofeo = document.getElementById('inputtrofeonuevaprueba').value
    //     var baremo = document.getElementById('inputbaremonuevaprueba').value
    //     //enviamos solicitud de prueba a servdior
    //     socket.emit('empezarprueba', nombrecompeticion, nombreprueba, baremodeprueba)

    //     funcionescomunes.showdiv('divempezarprueba','contenido')
    //     //enviamos solicitud de nuevo encabezado pantalla clasificacion


    //     socket.emit('encabezadoclasificaciondeprueba',altura, trofeo,baremo)
    //     //enviamos solicitud de recargar pagina de clasificacion
  
    //   })

    //   btnclasificacionprueba.addEventListener('click',function () {
    //     // alert('click en btnclasificacionprueba')
    //     socket.emit('recargarpaginaclasificacion')
    //     // borrarprueba(socket)
    //   })
    //   btnordenprueba.addEventListener('click',function () {
    //     var inputnombrenuevaprueba = document.getElementById('inputnombrenuevaprueba')
    //     alert(inputnombrenuevaprueba.value)
    //     funcionescomunes.showdiv('divordendesalida','contenido')
    //     socket.emit('generarordendesalida', document.getElementById('inputnombreCompeticion').value, inputnombrenuevaprueba.value)

    //   })
    //   this.appendChild(btnordenprueba)
    // //   this.appendChild(btnempezarrueba)
    //   this.appendChild(btnclasificacionprueba)
    //   this.appendChild(btnborrarprueba)


      })
     }
  }


}
