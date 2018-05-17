/*Fichero en el que se realizan todas las operaciones relacionadas
con las bases de datos de competiciones*/
'use strict'

var funcionespruebas = require('./funciones-pruebas.js')
var funcionesdesempate = require('./funciones-pruebas.js')
var funcionesmodaldesempate = require('.//modaldesempate.js')
var funcionescontextmenupruebaactiva = require('./contextmenuempezarprueba.js')


//AÑADE LOS PARTICIPANTES EN LA PANTALLA EMPEZARPRUEBA QUE SI NO ES DESEMPATE
function anadirjineteapantallaordensalidaempezarprueba(participante) {
  var pantallaordendesalidaempezarprueba = document.getElementById('pantallaordendesalidaempezarprueba')
  var li = document.createElement('li')
  var spanorden = document.createElement('span')
  spanorden.innerHTML = participante.orden
  var spanjinete = document.createElement('span')
  spanjinete.innerHTML = participante.jinete
  var spancaballo = document.createElement('span')
  spancaballo.innerHTML = participante.caballo
  li.appendChild(spanorden)
  li.appendChild(spancaballo)
  // li.appendChild(spanjinete)
  pantallaordendesalidaempezarprueba.appendChild(li)
}
function actualizarpantallaordensalidaempezarprueba (filaid,socket) {
    console.log('RECIBIDO actualizarpantallaordendesalida')
    var filaseleccionada = document.getElementById(filaid)
    console.log('seleccionado : ', filaseleccionada)
    var arrayordendesalida = []
    var jinetesamostrar = 10
    var elementopadre = document.getElementById(filaid)
    var desempate = document.getElementById('checkboxdesempate').checked
      if (!desempate) {
        var pantallaordendesalidaempezarprueba = document.getElementById('pantallaordendesalidaempezarprueba')
        pantallaordendesalidaempezarprueba.innerHTML = '' //limpieamos 
        // alert('desempate NO CHECKED')
        for (var indice = 0; indice < jinetesamostrar; indice++) {
          var hermanosiguiente = document.getElementById(filaseleccionada.id).nextSibling
          if (hermanosiguiente != null) { // siempre y cuando el hermano siguiente exista
            //  console.log('nextsibling : ',hermanosiguiente);
            var indicedefila = hermanosiguiente.id
            var indicedefila = indicedefila.replace('filapruebaactiva', '')
            //  console.log('INBDICE FILA : ',indicedefila)
            var participante = {}
            var caballo = document.getElementById('participante' + indicedefila + 'Caballo')
            var jinete = document.getElementById('participante' + indicedefila + 'Jinete')
            var orden = document.getElementById('participante' + indicedefila + 'Orden')
            participante.caballo = caballo.innerHTML
            participante.jinete = jinete.innerHTML
            participante.orden = orden.innerHTML
            arrayordendesalida[indice] = participante
            //  console.log('participante : ',participante)
            console.log('ACTUALIZAR PANTALLA ORDEN DE SALIDA , ARRAY  : indice ,', arrayordendesalida[indice])
            filaseleccionada = hermanosiguiente
            anadirjineteapantallaordensalidaempezarprueba(participante)
          } // fin if
        }// fin for
      }
      if (desempate) {
        // alert('DESEMPATE CHECKED')
        var pantallaordendesalidaempezarprueba = document.getElementById('pantallaordendesalidaempezarprueba')
        pantallaordendesalidaempezarprueba.innerHTML = '' //limpieamos 
        var filas = document.getElementById('tablaempezarprueba').rows.length
        // alert('participantes totales : '+ filas)
        //SI ESTAMOS EN UN DESEMPATE ANADIMOS AQUELLOS QUE ESTEN EMPATADOS AL PRIMER PUESTO
        for (var indice = 0; indice < filas; indice++) {
          var hermanosiguiente = document.getElementById(filaseleccionada.id).nextSibling
          if (hermanosiguiente != null) { // siempre y cuando el hermano siguiente exista
            //  console.log('nextsibling : ',hermanosiguiente);
            var indicedefila = hermanosiguiente.id
            var indicedefila = indicedefila.replace('filapruebaactiva', '')
            //  console.log('INBDICE FILA : ',indicedefila)
            var participante = {}
            var caballo = document.getElementById('participante' + indicedefila + 'Caballo')
            var jinete = document.getElementById('participante' + indicedefila + 'Jinete')
            var orden = document.getElementById('participante' + indicedefila + 'Orden')
            var Class = document.getElementById('participante' + indicedefila + 'Class')
            participante.caballo = caballo.innerHTML
            participante.jinete = jinete.innerHTML
            participante.orden = orden.innerHTML
            participante.Class = Class.innerHTML
            if (arrayordendesalida.length < 10){
              if (participante.Class == '?') {
                // alert('encontrado un desempateroooo ' + participante.caballo)
                arrayordendesalida.push(participante)
                //  console.log('participante : ',participante)
                anadirjineteapantallaordensalidaempezarprueba(participante)                  

              }
            }
       
            filaseleccionada = hermanosiguiente
            console.log('ACTUALIZAR PANTALLA ORDEN DE SALIDA , ARRAY  : indice ,', arrayordendesalida[indice])
          } // fin if
        }// fin for
      }
    
    console.log(arrayordendesalida)
    socket.emit('actualizarpantallaordensalida', arrayordendesalida) 
}
function resetearcolumnasencabezado() {
  var numerodecolumnas = document.getElementById('tablaempezarprueba').rows[0].cells.length
  if (numerodecolumnas > 7) {
    //baremo previo era un A o C, hay que eliminar 3 columnas
    //tiempo, puntos de la segunda fase y total.
    deleteColumn('filaencabezadoempezarprueba')
    deleteColumn('filaencabezadoempezarprueba')
    deleteColumn('filaencabezadoempezarprueba')
  }
}

function deleteColumn(tblId) {
  var row = document.getElementById('filaencabezadoempezarprueba')
  row.deleteCell(-1)
}

function addColumn(tblId)
{
  //PRIUMERO MODIFICIAMOS EL ENCABEZADO DE LA TABLA
  var tblHeadObj = document.getElementById(tblId).tHead;
  for (var h=0; h<tblHeadObj.rows.length; h++) {
    var newTH = document.createElement('th') //puntos segunda fase
    var newTH2 = document.createElement('th')//tiempo segunda fase
    var newTH3 = document.createElement('th')//total puntos

    tblHeadObj.rows[h].appendChild(newTH)
    newTH.id = 'encabezadoPuntos2'
    newTH.classList.add('tablepuntos')
    newTH.innerHTML = 'Pto 2ª'
    tblHeadObj.rows[h].appendChild(newTH2)
    newTH2.id = 'encabezadoTiempo2'
    newTH2.classList.add('tabletiempo')
    newTH2.innerHTML = 'Tpo 2ª'
    tblHeadObj.rows[h].appendChild(newTH3)
    newTH3.id = 'encabezadoPenalidadesTotal'
    newTH3.classList.add('tablepuntos')
    newTH3.innerHTML = 'Total'
  }
}

// function actualizarpantallaordendesalida(filaid) {
// }


function moverabajoempezarprueba() {
  var elementoseleccionado  = document.getElementById('tbodyempezarprueba').getElementsByClassName('activo')
  var elementoseleccionadoaborrar = elementoseleccionado[0]
  var elementosiguiente = elementoseleccionado[0].nextSibling
  var seleccionadoclonado = elementoseleccionadoaborrar.cloneNode(true)
  tbodyempezarprueba.removeChild(elementoseleccionado[0])
  tbodyempezarprueba.insertBefore(seleccionadoclonado,elementosiguiente.nextSibling)
    // actualizarpantallaordendesalida(seleccionadoclonado.id)
    console.log('enviando actualizarpantallaordendesalida');
   seleccionadoclonado.addEventListener('click',function (){
  // //  console.log('Nid clonado: ',anteriorclonado.id)
    funcionespruebas.borrarfilaempezarprueba(tbodyempezarprueba)
    seleccionadoclonado.classList.add('activo')
    funcionespruebas.actualizarjineteenpista(seleccionadoclonado.id)

   })
   seleccionadoclonado.oncontextmenu = function(e) {//anadimmos el context menu
    // alert("CONTEXT MENUUU")
    var contextmenu = document.getElementById('context-menu')
     e.preventDefault();
    contextmenu.style.left = e.pageX + 'px';
    contextmenu.style.top = e.pageY + 'px';
    contextmenu.style.display = 'inline-block';
 }
}
function moverarribaempezarprueba() {
  var elementoseleccionado  = document.getElementById('tbodyempezarprueba').getElementsByClassName('activo')
  var elementoanterior = elementoseleccionado[0].previousSibling
  var elementosiguiente = elementoseleccionado[0].nextSibling
  var anteriorclonado = elementoanterior.cloneNode(true)
  tbodyempezarprueba.removeChild(elementoanterior)
  tbodyempezarprueba.insertBefore(anteriorclonado,elementosiguiente)
  console.log('enviando actualizarpantallaordendesalida');
  anteriorclonado.addEventListener('click',function (){
    console.log('Nid clonado: ',anteriorclonado.id)
    funcionespruebas.borrarfilaempezarprueba(tbodyempezarprueba)
    anteriorclonado.classList.add('activo')

    funcionespruebas.actualizarjineteenpista(anteriorclonado.id)
  })
      anteriorclonado.oncontextmenu = function(e) {//ANADIMOS EL CONTEXT MENU
      // alert("CONTEXT MENUUU")
      var contextmenu = document.getElementById('context-menu')
       e.preventDefault();
      contextmenu.style.left = e.pageX + 'px';
      contextmenu.style.top = e.pageY + 'px';
      contextmenu.style.display = 'inline-block';
   }
  // actualizarpantallaordendesalida(elementoseleccionado[0].id)
}

function anadirfila (participante, indice,baremo) {
  // alert('anadirfila')
// //  var inputBaremodepruebaconfig = document.getElementById('inputBaremodepruebaconfig')
//   var baremodeprueba = inputBaremodepruebaconfig.value
var tbodyempezarprueba = document.getElementById('tbodyempezarprueba')
  var newrow = tbodyempezarprueba.insertRow(-1)

  var celdaseleccionarparticipante = newrow.insertCell(-1)
  celdaseleccionarparticipante.id = 'participante' + indice + 'Seleccion'
  celdaseleccionarparticipante.classList.add('tablecursor')
  newrow.id = 'filapruebaactiva' + indice
  var celdaorden = newrow.insertCell(-1)
  celdaorden.id = 'participante' + indice + 'Orden'
  celdaorden.classList.add('tableorden')
  var newText = document.createTextNode(participante.orden)
  celdaorden.appendChild(newText)
  var celdacaballo = newrow.insertCell(-1)
  celdacaballo.id = 'participante' + indice + 'Caballo'
  celdacaballo.classList.add('tablecaballo')
  var newText = document.createTextNode(participante.caballo)
  celdacaballo.appendChild(newText)
  var celdajinete = newrow.insertCell(-1)
  celdajinete.id = 'participante' + indice + 'Jinete'
  celdajinete.classList.add('tablejinete')
  var newText = document.createTextNode(participante.jinete)
  celdajinete.appendChild(newText)

  var celdarank = newrow.insertCell(-1)
  celdarank.id = 'participante' + indice + 'Class'
  celdarank.classList.add('tableorden')
  if (participante.rank === undefined) { //por si no tuviera ranking
    newText = document.createTextNode('') // si no tiene ranking no pintamos nada
  } else {
    var newText = document.createTextNode(participante.rank)//si tiene ranking lo pintamos    
  } 
  celdarank.appendChild(newText)

  var celdapuntos = newrow.insertCell(-1)
  celdapuntos.id = 'participante' + indice + 'Penalidades'
  celdapuntos.classList.add('tablepuntos')
  var newText = document.createTextNode(participante.puntos)
  celdapuntos.appendChild(newText)
  var celdatiempo = newrow.insertCell(-1)
  celdatiempo.id = 'participante' + indice + 'Tiempo'
  celdatiempo.classList.add('tabletiempo')
  var newText = document.createTextNode(participante.tiempo)
  celdatiempo.appendChild(newText)
  celdatiempo.classList.add('tableclasificar')
  if (funcionespruebas.leerbaremo(baremo) == '2') {
    var celdapuntos2 = newrow.insertCell(-1)
    celdapuntos2.id = 'participante' + indice + 'Penalidades2'
    celdapuntos2.classList.add('tablepuntos')
    var newText = document.createTextNode(participante.puntos2)
    celdapuntos2.appendChild(newText)
    var celdatiempo2 = newrow.insertCell(-1)
    celdatiempo2.id = 'participante' + indice + 'Tiempo2'
    celdatiempo2.classList.add('tabletiempo')
    var newText = document.createTextNode(participante.tiempo2)
    celdatiempo2.appendChild(newText)
    celdatiempo2.classList.add('tableclasificar')
    var celdapuntostotal = newrow.insertCell(-1)
    celdapuntostotal.id = 'participante' + indice + 'PenalidadesTotal'
    celdapuntostotal.classList.add('tabletiempo')
    var newText = document.createTextNode(participante.totalpuntos)
    celdapuntostotal.appendChild(newText)
    celdapuntostotal.classList.add('tableclasificar')
  }

  newrow.addEventListener('click', function () {
    funcionespruebas.borrarfilaempezarprueba(tbodyempezarprueba)
    newrow.classList.add('activo')
    funcionespruebas.actualizarjineteenpista(newrow.id)
  })
  newrow.oncontextmenu = function(e) {
    var contextmenu = document.getElementById('context-menu')
 	  e.preventDefault();
    contextmenu.style.left = e.pageX + 'px';
    contextmenu.style.top = e.pageY + 'px';
    contextmenu.style.display = 'inline-block';
 }
}
function grabarresultado(socket) {
  // console.log('click en btn clasificar prueba!!!!')
  var elementostractivo = document.getElementById('tbodyempezarprueba').getElementsByClassName('activo')
  var elementoseleccionado = elementostractivo[0]
  var participante = {}
  var baremo = document.getElementById('inputbaremonuevaprueba').value
  participante.nombrejinete = elementoseleccionado.childNodes[3].innerHTML
  participante.nombrecaballo = elementoseleccionado.childNodes[2].innerHTML
  participante.puntos = elementoseleccionado.childNodes[5].innerHTML
  participante.tiempo = elementoseleccionado.childNodes[6].innerHTML
  var prueba = inputnombrenuevaprueba.value
  var coleccion = document.getElementById('inputnombreCompeticion2').value

  if (funcionespruebas.leerbaremo(baremo) == '2') {
    participante.puntos2 = elementoseleccionado.childNodes[7].innerHTML
    participante.tiempo2 = elementoseleccionado.childNodes[8].innerHTML
    participante.totalpuntos = elementoseleccionado.childNodes[9].innerHTML
    socket.emit('grabaresultadoparticipante', coleccion, prueba, baremo, participante)
    console.log(participante)
  } else {
    console.log(participante)
    socket.emit('grabaresultadoparticipante', coleccion, prueba, baremo, participante)
  }
  var elementoseleccionado = document.getElementById('tbodyempezarprueba').getElementsByClassName('activo')
  elementoseleccionado[0].style.backgroundColor = 'rgb(194, 240, 228)'
}
function crearceldasdesempate() {
  var tbodyempezarprueba = document.getElementById('tbodyempezarprueba')
  var rows = tbodyempezarprueba.getElementsByTagName('tr')
  for (var i=0;i < rows.length ; i++) {
    // var indicedefila = indicedefila.replace('filapruebaactiva', '')
    
    var id = 'participante' + rows[i].id.replace('filapruebaactiva', '')
    // alert(id) 
    var x = rows[i].insertCell(-1)
    x.id = id + 'ptosdesempate'
    var y = rows[i].insertCell(-1)
    y.id = id + 'tpodesempate'    
    x.innerHTML = 'new cell'
    y.innerHTML = 'new cell2'
  }
}

function leerygenerarempezarprueba (objetoprueba,socket) {
  alert('leer y generar empezar prueba')
  var labeltrofeoempezarprueba = document.getElementById('labeltrofeoempezarprueba')
  var labelalturaempezarprueba = document.getElementById('labelalturaempezarprueba')
  var labelbaremoempezarprueba = document.getElementById('labelbaremoempezarprueba')
  var tbodyempezarprueba = document.getElementById('tbodyempezarprueba')
  tbodyempezarprueba.innerHTML = ''
  console.log('OBJETO PRUEBA : ', objetoprueba)

  labelbaremoempezarprueba.innerHTML = objetoprueba.baremo
  labeltrofeoempezarprueba.innerHTML = objetoprueba.trofeo
  labelalturaempezarprueba.innerHTML = objetoprueba.altura
  //enviamos por socket los datos del encabezado del listado de clasificacioin
  // alert('enviando encabezadoclasificaciondeprueba')
  // socket.emit('encabezadoclasificaciondeprueba',objetoprueba.baremo, objetoprueba.trofeo,objetoprueba.altura)
  console.log('ORDEN DE SALIDA                 ->', objetoprueba.os)
  if (objetoprueba.os.length > 0) {  // SI HAY POR LO MENOS UN PARTICIPANTE
    var arrayparticipantes = []
    for (var indice = 0; indice < objetoprueba.os.length; indice++) {
      var objetoparticipante = {}
      objetoparticipante.jinete = objetoprueba.os[indice].jinete
      objetoparticipante.caballo = objetoprueba.os[indice].caballo
      objetoparticipante.orden = objetoprueba.os[indice].orden
      // OJO CAMBNIOS
      // ANADIMOS PUNTOS Y TIEMPO
      objetoparticipante.puntos = objetoprueba.os[indice].puntos
      objetoparticipante.tiempo = objetoprueba.os[indice].tiempo
      if (funcionespruebas.leerbaremo(objetoprueba.baremo) == '2') {
        objetoparticipante.puntos2 = objetoprueba.os[indice].puntos2
        objetoparticipante.tiempo2 = objetoprueba.os[indice].tiempo2
        objetoparticipante.totalpuntos = objetoprueba.os[indice].totalpuntos
      }
      arrayparticipantes.push(objetoparticipante)
    }
    arrayparticipantes.sort(
      firstBy('orden')
    )
    // crearprimerafila(objetoprueba.altura,objetoprueba.baremo)
    for (var indice = 0; indice < arrayparticipantes.length; indice++) {
      var participante = arrayparticipantes[indice]
      var baremo = objetoprueba.baremo
      anadirfila(participante, indice,baremo)
    }
    resetearcolumnasencabezado()
    //anadir primerafila para que se muestre el primer participante
  //  anadirfila()
    if (funcionespruebas.leerbaremo(objetoprueba.baremo) == '2') {
      addColumn('tablaempezarprueba')
    }
  }
} // FIN LEERYGENERAREMPEZARPRUEBA



function iniciarprueba(socket) {
    socket.on('pruebaaempezar', function (competicion, prueba) {
    alert('PRUEBA EMPEZATR')
    for (var indice = 0; indice < competicion.pruebas.length; indice++) {
      if (competicion.pruebas[indice].nombreprueba == prueba) {
        console.log('objeto prueba :', competicion.pruebas[indice])
        var objetoprueba = competicion.pruebas[indice]
        leerygenerarempezarprueba(objetoprueba,socket)
      }
    }
  })
  
  var checkboxdesempate = document.getElementById('checkboxdesempate')
  var checkboxcontenteditableempezarprueba = document.getElementById('checkboxcontenteditableempezarprueba')
  var btnmoverarribaempezarprueba = document.getElementById('btnmoverarribaempezarprueba')
  var btnmoverabajooempezarprueba = document.getElementById('btnmoverabajooempezarprueba')
  var btnconectarpuertoserie = document.getElementById('btnconectarpuertoserie')
  // var btnactualizarpantallaordensalida = document.getElementById('btnactualizarpantallaordensalida')
  var textarealogalge = document.getElementById('textarealogalge')
  var btnleertiemposdealge = document.getElementById('btnleertiemposdealge')
  var btnexportarexcel = document.getElementById('btnexportarexcel')
  var btnAddNewWindow = document.getElementById('btnAddNewWindow')
  var btnclasificarempezarprueba = document.getElementById('btnclasificarempezarprueba')
  var btngenerardesempate = document.getElementById('btngenerardesempate')
  //SI CHECKLBOX DESEMPATE ESTA MARCADO ES UN DESEMPATE

  btngenerardesempate.addEventListener('click',function (){
    // funcionesmodaldesempate.iniciarmodaldesempate() 
    var divmodaldesempate = document.getElementById('divmodaldesempate')
    divmodaldesempate.style.display = 'block' 
      // alert('lanzando div cuantos desempata')  
  })

  checkboxcontenteditableempezarprueba.addEventListener('click',function (){
    if (checkboxcontenteditableempezarprueba.checked) {
      console.log (checkboxcontenteditableempezarprueba.checked)
      tbodyempezarprueba.setAttribute("contentEditable", true)
    } else {
      console.log (checkboxcontenteditableempezarprueba.checked)
      tbodyempezarprueba.setAttribute("contentEditable", false)
    }
  })

  // btnactualizarpantallaordensalida.addEventListener('click', function (){
  // // alert()
  // var elementoseleccionado  = document.getElementById('tbodyempezarprueba').getElementsByClassName('activo')
  //   actualizarpantallaordensalidaempezarprueba(elementoseleccionado[0].id,socket)
  // })

  btnclasificarempezarprueba.addEventListener('click',function () {
    //AL BORRAR CON CONTENT EDITABLE SI BORRAMOS EL CONTENIDO CREA UN <BR>
    //POR LO QUE LO BORRAMOS PARA QUE SE GUARDE EN LA BBDD
    // alert('PRUEBAENCUIRSO.JS')
    var brs = document.getElementById('tbodyempezarprueba').getElementsByTagName('br');
    while (brs.length) {
      brs[0].parentNode.removeChild(brs[0]);
    } //ELIMINAMOS TODOS LOS BR QUE SE CREAN POR EL BUG CONTENT EDITABLE
    var labelbaremoempezarprueba = document.getElementById('labelbaremoempezarprueba')
    var elementostractivo = document.getElementById('tbodyempezarprueba').getElementsByClassName('activo')
    var elementoseleccionado = elementostractivo[0]

    // if ((elementoseleccionado.childNodes[7]) && (elementoseleccionado.childNodes[8])){
    //   alert(elementoseleccionado.childNodes[7].innerHTML + '  ' + elementoseleccionado.childNodes[8].innerHTML)
    // }
    if (((labelbaremoempezarprueba.innerHTML == 'ASC/ACC')
      ||(labelbaremoempezarprueba.innerHTML == 'ACC/ACC')
      ||(labelbaremoempezarprueba.innerHTML == 'ACC/C')) &&
      ((elementoseleccionado.childNodes[5].innerHTML == 555) ||
      (elementoseleccionado.childNodes[5].innerHTML == 666)) ||// NO PASAN A LA SEGUNDA FASE
      ((elementoseleccionado.childNodes[7]) && ((elementoseleccionado.childNodes[8].innerHTML == ''))))
      {
        // alert(labelbaremoempezarprueba.innerHTML)
        var elementostractivo = document.getElementById('tbodyempezarprueba').getElementsByClassName('activo')
        var elementoseleccionado = elementostractivo[0]
        elementoseleccionado.childNodes[7].innerHTML = 1111 // NO PASAN A LA SEGUNDA FASE
        elementoseleccionado.childNodes[8].innerHTML = 1111
     }
    grabarresultado(socket)//graba el resultado pero no la clasificacion
  })
  btnexportarexcel.addEventListener('click', function () {
    alert('click en exportar')
    var html2 = document.getElementById('tablaempezarprueba').outerHTML
      // var html = document.querySelector(".tabla").outerHTML;  //.TABLA (CLASE DE TABLE)
    funcionespruebas.export_table_to_csv(html2, 'table.csv')
  })

//   socket.on('pruebaaempezar', function (competicion, prueba) {
//   alert('PRUEBA EMPEZATR')
//   for (var indice = 0; indice < competicion.pruebas.length; indice++) {
//     if (competicion.pruebas[indice].nombreprueba == prueba) {
//       console.log('objeto prueba :', competicion.pruebas[indice])
//       var objetoprueba = competicion.pruebas[indice]
//       leerygenerarempezarprueba(objetoprueba,socket)
//     }
//   }
//  })

 socket.on('enviandobinomioaempezarprueba', function (binomio) {
  alert('RECIBIDFO enviandobinomioaempezarprueba')
  var labelbaremoempezarprueba = document.getElementById('labelbaremoempezarprueba').innerHTML
  console.log('ENVIANDO BINOMIOA EMPEZAR PUREBA BINOMIO', binomio)
  var indice = tbodyempezarprueba.rows.length
  console.log('indice envinandobinomioempezarprueba', indice)
  var objetobinomio = {
    'orden': binomio.numero,
    'jinete': binomio.jinete,
    'caballo': binomio.caballo,
    'puntos': '',
    'tiempo': '',
    'puntos2': '',
    'tiempo2': '',
    'totalpuntos': '',
    'totaltiempo': ''
  }
  anadirfila(objetobinomio, indice,labelbaremoempezarprueba)
})

 btnAddNewWindow.addEventListener('click',function(){
  alert('click en BOTON añadir bin1')
  var myWindow = window.open("http://127.0.0.1:9000/add", "", "width=400,height=150");
})

 btnmoverabajooempezarprueba.addEventListener('click',function(){
  funcionescontextmenupruebaactiva.iniciarcontextmenu()
   moverabajoempezarprueba()
  
 })

 btnmoverarribaempezarprueba.addEventListener('click',function(){
  funcionescontextmenupruebaactiva.iniciarcontextmenu()
   moverarribaempezarprueba()
 })
}

module.exports.iniciarpruebaencurso = function(socket) {
  // socket.on('pruebaaempezar', function (competicion, prueba) {
  //   alert('PRUEBA EMPEZATR')
  //   for (var indice = 0; indice < competicion.pruebas.length; indice++) {
  //     if (competicion.pruebas[indice].nombreprueba == prueba) {
  //       console.log('objeto prueba :', competicion.pruebas[indice])
  //       var objetoprueba = competicion.pruebas[indice]
  //       leerygenerarempezarprueba(objetoprueba,socket)
  //     }
  //   }
  // })
  // funcionesmodaldesempate.iniciarmodaldesempate() 
  iniciarprueba(socket)
}
