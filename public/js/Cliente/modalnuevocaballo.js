
var funcionescomunes = require('./funciones-compartidas.js')
function leerdatosformularionuevocaballomodal() {
  //asignamos valores
  //elementos input con datos de los jientes
  var caballo = {}
  caballo.nombre = document.getElementById('inputnombrecaballomodal').value
  caballo.licencia = document.getElementById('inputlicenciacaballomodal').value
  return caballo
}
function mostrarmodalnuevocaballo() {
  var divmodalnuevocaballo = document.getElementById('divmodalnuevocaballo')
  divmodalnuevocaballo.style.display = 'block'
}

function mostrarordendesalida() {
  var divordendesalida = document.getElementById('divordendesalida')
  divordendesalida.style.display = 'block'
  var divmodalnuevocaballo = document.getElementById('divmodalnuevocaballo')
  divmodalnuevocaballo.style.display = 'none'
}

function iniciardivmodalnuevocaballo (socket) {
  var inputnombrecaballomodal = document.getElementById('inputnombrecaballomodal')
  var inputlicenciacaballomodal = document.getElementById('inputlicenciacaballomodal')
  var btncancelarnuevocaballomodal = document.getElementById('btncancelarnuevocaballomodal')
  var btnguardarnuevocaballomodal = document.getElementById('btnguardarnuevocaballomodal')
  var btnanadircaballoordendesalida = document.getElementById('btnanadircaballoordendesalida')

  btnanadircaballoordendesalida.addEventListener('click', function () {
    var divordendesalida = document.getElementById('divordendesalida')
    divordendesalida.style.display = 'none'
   mostrarmodalnuevocaballo()
  })

btncancelarnuevocaballomodal.addEventListener('click',function () {
    mostrarordendesalida()
    funcionescomunes.limpiarinputs(formulariodatoscaballomodal)
  })
btnguardarnuevocaballomodal.addEventListener('click', function () {
    var caballo = leerdatosformularionuevocaballomodal()
    socket.emit('new_caballo', caballo)
    funcionescomunes.limpiarinputs(formulariodatoscaballomodal)
    mostrarordendesalida()
  })
}

module.exports.iniciarmodalnuevocaballo = function (socket) {
 iniciardivmodalnuevocaballo(socket)
}
