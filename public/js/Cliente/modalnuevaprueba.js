
var funcionesmodalnuevaprueba = require('.//modalnuevaprueba.js')
var funcionescomunes = require('./funciones-compartidas.js')
function leerdatosformularionuevaprueba() {

  var inputtrofeonuevapruebamodal = document.getElementById('inputtrofeonuevapruebamodal')
  var selectBaremopruebaconfigmodal = document.getElementById('selectBaremopruebaconfigmodal')
  var inputalturanuevapruebamodal = document.getElementById('inputalturanuevapruebamodal')
  var inputnumeronuevapruebamodal = document.getElementById('inputnumeronuevapruebamodal')
  var prueba = {}
  prueba.numero = inputnumeronuevapruebamodal.value
  prueba.trofeo = inputtrofeonuevapruebamodal.value
  prueba.baremo = selectBaremopruebaconfigmodal.value
  prueba.altura = inputalturanuevapruebamodal.value
  return prueba

}
function iniciardivmodalnuevaprueba (socket) {
  var btnnuevaprueba = document.getElementById('btnnuevaprueba')
  btnnuevaprueba.addEventListener('click', function () {
    var formulariodatosprueba = document.getElementById('formulariodatosprueba')
    funcionescomunes.limpiarinputs(formulariodatosprueba)
    var divcompeticionseleccionada = document.getElementById('divcompeticionseleccionada')
    divcompeticionseleccionada.style.display = 'none'
    funcionesmodalnuevaprueba.mostrarmodalnuevaprueba()
  })
  var btnguardarnuevapruebamodal = document.getElementById('btnguardarnuevapruebamodal')
  var btncancelarnuevapruebamodal = document.getElementById('btncancelarnuevapruebamodal')
  btncancelarnuevapruebamodal.addEventListener('click', function () {
    var modalnuevaprueba = document.getElementById('modalnuevaprueba')
    modalnuevaprueba.style.display = 'none'
    var divcompeticionseleccionada = document.getElementById('divcompeticionseleccionada')
    divcompeticionseleccionada.style.display = 'block'
    funcionescomunes.limpiarinputs(modalnuevaprueba)
  })

  btnguardarnuevapruebamodal.addEventListener('click', function () {
    var modalnuevaprueba = document.getElementById('modalnuevaprueba')
    modalnuevaprueba.style.display = 'none'
    var divcompeticionseleccionada = document.getElementById('divcompeticionseleccionada')
    divcompeticionseleccionada.style.display = 'block'
    var prueba = leerdatosformularionuevaprueba()
    if ((prueba.trofeo != '') || (prueba.altura != '')) {
      alert('enviarprueba')
      var inputidCompeticion2 = document.getElementById('inputidCompeticion2').value
      var nombrecoleccion = document.getElementById('inputnombreCompeticion2').value
      socket.emit('enviar_nueva_prueba', prueba, nombrecoleccion, inputidCompeticion2)
        funcionescomunes.limpiarinputs(modalnuevaprueba)
    } else {
      alert('DATOS VACIOS')
        funcionescomunes.limpiarinputs(modalnuevaprueba)
    }
  })
}

module.exports.mostrarmodalnuevaprueba = function () {
  // var formulariodatosprueba = document.getElementById('formulariodatosprueba')
  // formulariodatosprueba.style.disabled = 'none'
  var modalnuevaprueba = document.getElementById('modalnuevaprueba')
  modalnuevaprueba.style.display = 'block'
}
module.exports.iniciarmodalnuevaprueba = function (socket) {
 iniciardivmodalnuevaprueba(socket)
}
