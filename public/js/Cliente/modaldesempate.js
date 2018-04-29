
var funcionescomunes = require('./funciones-compartidas.js')

function addDesempatecolumn() {
  
   var tablaempezarprueba = document.getElementById('tablaempezarprueba')
   var rows = tablaempezarprueba.rows
  
    for(var i = 1; i < tablaempezarprueba.rows.length ; i++) {
      //Recorremos filas y anadimos dos celdas por fila, ptos y tpo desempate
      var id = tablaempezarprueba.rows[i].id
      var id = 'participante' + id.replace('filapruebaactiva', '')		
      var x = tablaempezarprueba.rows[i].insertCell(-1)
      x.id = id + 'PDTE' //puntos desempate
      x.innerHTML = 'Ptos Dpte'
      var y = tablaempezarprueba.rows[i].insertCell(-1)
      y.innerHTML = 'Tpo Dpte'
      y.id = id +'TDTE'
    }
  
  }
function iniciardivmodaldesempate () {
  var selectdesempate = document.getElementById('selectdesempate')
  var btnaceptardesempate = document.getElementById('btnaceptardesempate')
  var btncancelardesempate = document.getElementById('btncancelardesempate')
  var span = document.getElementsByClassName("close")[0]

  btnaceptardesempate.addEventListener('click', function () {
    var seleccion = document.getElementById('selectdesempate').value
    var checkboxdesempate = document.getElementById('checkboxdesempate')
    checkboxdesempate.checked = true  
    // addDesempatecolumn()
    var divmodaldesempate =  document.getElementById('divmodaldesempate')
    divmodaldesempate.style.display = 'none'
  })

  btncancelardesempate.addEventListener('click',function () {
    alert('CANCELAR')
    var divmodaldesempate =  document.getElementById('divmodaldesempate')
    divmodaldesempate.style.display = 'none'
  })
}

module.exports.iniciarmodaldesempate = function () {
 iniciardivmodaldesempate()
}
