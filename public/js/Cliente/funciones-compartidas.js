//Busca los elementos html con una clase dentro de otro elementoid
//y los elimina. ELIMINA LOS ELEMENTOS, NO BORRA LA CLASE.
//Recibe por paramentro el id del nodo donde buscar los elementos con clase,
//tambien recibe la clase a buscar y
//Elimina los elementos con dicha clase, dentro de ese elemento.
module.exports.removeclasselements = function(elementoid,clase) {
  var elementosaborrar = document.getElementById(elementoid).getElementsByClassName(clase)
  while (elementosaborrar[0]) {
    elementosaborrar[0].parentNode.removeChild(elementosaborrar[0])
  }
}
//recibe por parametro una elemento html(padre),y un tipo de elemento html(hijo) y nombre de una clase
//elimina la clase pasada por argumento de los elementos hijos
module.exports.borrarclase = function (padre,clase) {
  var liItems = padre.getElementsByTagName('li')
  for (var i = 0 ; i < liItems.length; i++){
    liItems[i].classList.remove(clase)
  }
}
//Crea un span elemento span dentro del elementoid y le anade una clase
module.exports.addiconelement = function(clase,float) {
  var iconoborrar = document.createElement('i')
  iconoborrar.setAttribute('class', clase);
  iconoborrar.style.float = float
  // iconoborrar.style.verticalAlign = 'middle'
  return iconoborrar
}
module.exports.borrarLiactivo = function(ul) {
  var liItems = ul.getElementsByTagName('li')
  for (var i = 0 ; i < liItems.length; i++){
    liItems[i].classList.remove('active')
  }
}
//PASAMOS POR PARAMETRO EL ID DE LA TABLA DONDE BUSCAR
//PASAMOS POR PARAMETRO LA PALABRA CLAVE A BUSCAR
//SI LA ENCUENTRA MUESTRA LAS FILAS DE LA TABLA QUE CONTIENEN LA CLAVE
//EL RESTO DE FILAS LAS OCULTA
module.exports.buscarenTabla = function (tablaid,clave) { 
    var tableReg = tablaid
    var searchText = clave.toLowerCase()   
    var cellsOfRow=""
    var found=false
    var compareWith=""
    // alert(tableReg.rows.length)
    // Recorremos todas las filas con contenido de la tabla
    for (var i = 1; i < tableReg.rows.length; i++)
    {
      cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
      found = false;
      // Recorremos todas las celdas
      for (var j = 0; j < cellsOfRow.length && !found; j++)
      {
        if ((cellsOfRow[j].innerText.toUpperCase().indexOf(clave) > -1) ||//comprobamos si esta en mayusculas
           (cellsOfRow[j].innerText.toLowerCase().indexOf(clave) > -1)){ //comprobamos si esta en minus
          //si encuentra la palabra a buscar (filter), muestra el elemento y pasa a la siguiente fila
          tableReg.rows[i].style.display = '';
          break
        } else {
          //si no lo encuentra, oculta el elemento LI
          tableReg.rows[i].style.display = 'none';
        }
    }
  }
}
//FIN BUSCAR EN TABLA

//pasamos por parametro 
module.exports.buscarenListado = function(ul,filter) { 
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
//recibe por parametro el id de un div a mostrar y el tipo de clase
//oculta todos los elementos con esa clase
//y muestra el div que se pasa por parametro
module.exports.showdiv = function (divid,clase) {
 var elementosaocultar = document.getElementsByClassName(clase)
 var divamostrar = document.getElementById(divid)
 for (var i = 0; i < elementosaocultar.length ; i ++) {
   elementosaocultar[i].style.display = 'none'
 }
 divamostrar.style.display = 'block'
}

//ELMINA LA CLASE PASADA POR PARAMETRO DE TODOS LOS ELEMENTOS HIJOS
module.exports.borrarclase = function (clase,elementopadre) {
  var items = elementopadre.children
  for (var i = 0 ; i < elementopadre.children.length; i++){
    items[i].classList.remove(clase)
  }
}
module.exports.borrarclase2 = function (clase,elementopadre) {
  var items = document.getElementsByClassName('nav-link')
  for (var i = 0 ; i < items.length; i++){
    items[i].classList.remove('active')
  }
}
//cambia los values de todos los elementos input tipo text de un nodopadre a = ""
module.exports.limpiarinputs = function (nodopadre) {
  // alert(nodopadre.id)
    //guardamos los elementos input del nodopadre
    var elementosinput = nodopadre.getElementsByTagName('input')
    // los recorremos y eliminamos el value de los tipo text
    for (var i = 0 ; i < elementosinput.length; i ++) {
      if (elementosinput[i].type == 'text') {
        elementosinput[i].value = ''
      }
    }
 }
/*
Recibe por parametro el ID de un elemento HTML y le añade la clase "activo"
*/

/*
Texto : el texto a introducir
id : id del elemento html creado
clase : clase del elemento html creado
Devuelve : devuelve un elemento html , con innerhtml, y propiedades id y clase
*/
module.exports.creaSpan = function (texto, id, clase , callback ){
  var elementospan = document.createElement('span')
  elementospan.innerHTML = texto
  elementospan.id = id
  elementospan.classList.add(clase)
  return elementospan
  callback()
}
module.exports.SortByID = function (x, y) {
  // ORDENAMOS EL ARRAY EN MODO ASCENDIENTE
  return x.orden - y.orden
}

module.exports.borrarbinomiodeordensalida = function (filaid,socket) {
  // alert('borrarbinomioorden de salida')
  console.log('CLICK EN SPANIMAGEN ID : ', filaid)  //id : fila2imgOS
  var fila = filaid.replace('imgOS',"")  //eliminamos imgOS para quedarnos con la fila en la que se encuentra
  var jinete = document.getElementById(fila +'JineteOS').innerHTML
  var caballo = document.getElementById(fila + 'CaballoOS').innerHTML
  var orden = document.getElementById(fila+ 'NumeroOS').innerHTML
  console.log ('JINETE ,caballo , orden : ', jinete + ' ' ,caballo + ' ',orden)
  // var prueba = inputNombrepruebaconfig.value
  // var coleccion = inputNombrecompeticionOS.value
  var binomio = {}
  binomio.jinete = jinete
  binomio.caballo = caballo
  binomio.numero = orden
  socket.emit('borrarbinomiodeordensalida', binomio, document.getElementById('inputnombrenuevaprueba').value ,document.getElementById('inputnombreCompeticion').value)
  /* OJO CON LA FUNCION ASYNCRONA, AHORA FUNCIONA PERO CUIDADO */
 //  actualizarnumerosdeordendesalida()
}

module.exports.ocultarelemento = function(elementoid) {
  var elementoaocultar = document.getElementById(elementoid)
  elementoaocultar.style.display = 'none'
}

module.exports.mostrarelemento = function (elementoid) {
  var elementoamostrar = document.getElementById(elementoid)
  elementoamostrar.style.display = 'block'
}

/*modulos testeo diseno modular*/
module.exports.test = function  () {
  console.log('test!!!')
 }
module.exports.test2 = function () {
 console.log('test222222')
 }
// module.exports = function (n) { return n * 111 }
