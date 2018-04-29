
// var funcionesmodalnuevojinete = require('.//modalnuevojinete.js')
var funcionescomunes = require('./funciones-compartidas.js')
function leerdatosformularionuevojinetemodal() {
  //asignamos valores
  //elementos input con datos de los jientes
  var inputnombreJinetemodal = document.getElementById('inputnombreJinetemodal')
  var inputapellido1Jinetemodal = document.getElementById('inputapellido1Jinetemodal')
  var inputapellido2Jinetemodal = document.getElementById('inputapellido2Jinetemodal')
  var inputlicenciaJinetemodal = document.getElementById('inputlicenciaJinetemodal')
  var inputidJinetemodal = document.getElementById('inputidJinetemodal')
  var jinete = {}
  jinete.nombre = inputnombreJinetemodal.value
  jinete.apellido1 = inputapellido1Jinetemodal.value
  jinete.apellido2 = inputapellido2Jinetemodal.value
  jinete.licencia = inputlicenciaJinetemodal.value
  jinete.id = inputidJinetemodal.value
  return jinete
}
function mostrarmodalnuevojinete() {
  var divmodalnuevojinete = document.getElementById('divmodalnuevojinete')
  divmodalnuevojinete.style.display = 'block'
}

function mostrarordendesalida() {
  var divordendesalida = document.getElementById('divordendesalida')
  divordendesalida.style.display = 'block'
  var divmodalnuevojinete = document.getElementById('divmodalnuevojinete')
  divmodalnuevojinete.style.display = 'none'
}

function iniciardivmodalnuevojinete (socket) {
  var btnanadirjineteordendesalida = document.getElementById('btnanadirjineteordendesalida')
  btnanadirjineteordendesalida.addEventListener('click', function () {
    var divordendesalida = document.getElementById('divordendesalida')
    divordendesalida.style.display = 'none'
   mostrarmodalnuevojinete()
  })
  var btncancelarnuevojinetemodal = document.getElementById("btncancelarnuevojinetemodal")
  btncancelarnuevojinetemodal.addEventListener('click',function () {
    mostrarordendesalida()
    funcionescomunes.limpiarinputs(formulariodatosjinetemodal)
  })
  var btnguardarnuevojinetemodal = document.getElementById('btnguardarnuevojinetemodal')
  btnguardarnuevojinetemodal.addEventListener('click', function () {
    var jinete = leerdatosformularionuevojinetemodal()
    socket.emit('new_jinete', jinete)
    funcionescomunes.limpiarinputs(formulariodatosjinetemodal)
    mostrarordendesalida()
  })
}

module.exports.iniciarmodalnuevojinete = function (socket) {
 iniciardivmodalnuevojinete(socket)
}
