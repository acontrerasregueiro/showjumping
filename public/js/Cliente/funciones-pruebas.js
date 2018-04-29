module.exports.leerbaremo = function (baremoelegido) {
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
      recorrido = '2'
      break
    case 'DOSMANGAS':
      recorrido = '1'
      break
    case '"DOSMANGASDESEMPATE':
      recorrido = '1'
  }
  return recorrido
}
//lo utilizamos para buscar binomio caballo/jinete en la tablaid
//nos devuelve el id del elemento tr que contiene ese binomio
module.exports.buscarentabla = function(tablaid,campo1,campo2) {
  var tabla = document.getElementById(tablaid) // tabla donde buscar elementos
  var filter = campo1.toUpperCase()
  var filter2 = campo2.toUpperCase()
  // alert(tablaempezarprueba.rows.length )
  for(var i = 0; i < tablaempezarprueba.rows.length  ; i++) {//CAMBIADO EL -1 AQUI OJOOOOOOOOOOOOOO
    //recorremos las filas
    
    var caballo = document.getElementById('participante'+ i + 'Caballo')
    var jinete = document.getElementById('participante'+ i + 'Jinete')
    if ((caballo) && (jinete)) {
      var caballo = document.getElementById('participante'+ i + 'Caballo').innerHTML
      var jinete = document.getElementById('participante'+ i + 'Jinete').innerHTML
      if ((caballo.toUpperCase().indexOf(filter) > -1) &&
      (jinete.toUpperCase().indexOf(filter2) > -1)) {
        //si encuentra la palabra a buscar (filter),devuelve el id de la celda de ranking o Clasificacion
        var celdaclasificacion = document.getElementById('participante'+ i + 'Class')
        return celdaclasificacion
        break
      }
    } 
  } 
  //devolvemos el id de la tr donde se encontraron los campo1 y campo2
  // return filaencontrada
}

module.exports.borrarfilaempezarprueba = function(table) {
  var tableitems = table.getElementsByTagName('tr')
  for (var i = 0 ; i < tableitems.length; i++){
    tableitems[i].classList.remove('activo')
  }
}
/*modulos testeo diseno modular*/
module.exports.test = function  () {
  console.log('test!!!')
 }
module.exports.test2 = function () {
 console.log('test222222')
 }

 function download_csv (csv, filename) {
  var csvFile
  var csv = "\ufeff" + csv // al andadir esto "\ufeff" funciona.... no se el motivo
  var downloadLink
    // CSV FILE
  csvFile = new Blob([csv], { type: 'text/plain;charset=utf8'})
    // Download link
  downloadLink = document.createElement('a')
    // File name
  downloadLink.download = filename
    // We have to create a link to the file
  downloadLink.href = window.URL.createObjectURL(csvFile)
    // Make sure that the link is not displayed
  downloadLink.style.display = 'none'
    // Add the link to your DOM
  document.body.appendChild(downloadLink)
    // Lanzamos
  downloadLink.click()
}

//esta funcion se le pasa por parametro una cadena y
//revise se trata de un 1111,999,555,666,777,888 
//si es uno dce esos datos devuelve false
//esos datos no los hay que exportar al csv
function datosamostrar(data)  {
  // alert('datos am aostrar funciton')
  if ((data == '1111') ||  (data ==  '555') ||(data == '666') ||(data == '777') ||(data == '888') ||(data == '999')) { 
    return false   
  } else {
    return true
  }
}
//esta funcion nos pasa los datos del parametro a formato UTF'8
function decode_utf8(s) {
  return unescape(decodeURIComponent(s))
}

module.exports.export_table_to_csv = function(html, filename) {    // CLASS DE TABLE = “TABLA”
   var csv = []
 //  var rows = document.getElementById()
   var rows = document.querySelectorAll('#tablaempezarprueba tr')
   for (var i = 0; i < rows.length; i++) {
     var row = [], cols = rows[i].querySelectorAll('td, th')
     for (var j = 0; j < cols.length; j++) { 
       var a = datosamostrar(cols[j].innerText)
      if (a == true) {
        var textoutf8  = decode_utf8(cols[j].innerText)
        row.push(textoutf8 ) //`pasamos a UTF 8
      }      
    }
     csv.push(row.join(';'))
   }
     // Download CSV
   download_csv(csv.join('\n'), filename)
 }

 module.exports.actualizarjineteenpista = function(filaid) {
   //RECIBE POR PARAMETRO EL ID DE LA FILA,
   //ACTUALIZA LAS LABEL CON NOMBRES DE CABALLO Y JINETE EN PISTA
   var indicedefila =  filaid.replace('filapruebaactiva','')

   var caballo = document.getElementById('participante'+ indicedefila +'Caballo')
   var jinete = document.getElementById('participante'+ indicedefila +'Jinete')

   var labelcaballo = document.getElementById('labelcaballoempezarprueba')
   var labeljinete = document.getElementById('labeljineteempezarprueba')
   labeljinete.innerHTML = jinete.innerHTML
   labelcaballo.innerHTML = caballo.innerHTML
 }