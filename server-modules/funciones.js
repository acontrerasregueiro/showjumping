
//recibe por parametro la cada con el baremo elegido
//devuelve el numero de recorridos de dicho baremo
module.exports.leerbaremo = function(baremoelegido) {
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

module.exports.enviaprueba = function (nombrecompeticion, nombreprueba) {
  MongoClient.connect('mongodb://127.0.0.1:27017/hipica', function (err, db) {
    if (err) throw err
    db.collection(nombrecompeticion).findOne(function (err, competicion) {
      console.log('encontrado competicion : ', competicion)
      console.log('ENVIANBDO competicion : ', competicion)
      socket.emit('ordendesalidacompeticion', competicion, nombreprueba)
    })
    db.close()
  })
}
