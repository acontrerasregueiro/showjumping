
'use strict'
//CANCELA EL REFRESCAR CON F5 PARA PREVENIR ERRORES
function disableF5(e) {
   if(e.keyCode == 116) {
     alert('pulsado F5 = 116')
     e.preventDefault()
   }
 }

module.exports.iniciardisableF5 = function(socket) {
  document.addEventListener("keydown", function (e){
    disableF5(e)
  })
}
