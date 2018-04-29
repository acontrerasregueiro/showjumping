
'use strict'
//CANCELA EL REFRESCAR CON F5 PARA PREVENIR ERRORES
function disablemouse(e) {
  // var whichButton = function (e) {
    // Handle different event models
    var e = e || window.event;
    var btnCode;
  if ('object' === typeof e) {
    btnCode = e.button;

    switch (btnCode) {
        case 0:
            alert('Left button clicked.');
        break;

        case 1:
            alert('Middle button clicked.');
        break;

        case 2:
            alert('Right button clicked.');
        break;

        default:
            alert('Unexpected code: ' + btnCode);
    }
}
  }
//  }

module.exports.iniciardisablemousebuttons = function(socket) {
  document.addEventListener("onmousedown", function (e){
    disablemouse(e)
  })
}
