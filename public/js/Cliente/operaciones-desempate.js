//FICHERO CON OPERACIONES DEL DESEMPATE EN BAREMO AM5
module.exports.addColumndesempate = function(tblId)
{
  //PRIUMERO MODIFICIAMOS EL ENCABEZADO DE LA TABLA
  var tblHeadObj = document.getElementById(tblId).tHead;
  for (var h=0; h<tblHeadObj.rows.length; h++) {
    var newTH = document.createElement('th') //puntos desempate
    var newTH2 = document.createElement('th')//tiempo desempate
    tblHeadObj.rows[h].appendChild(newTH)
    newTH.id = 'encabezadoPuntos2'
    newTH.classList.add('tablepuntos')
    newTH.innerHTML = 'P '
    tblHeadObj.rows[h].appendChild(newTH2)
    newTH2.id = 'encabezadoTiempo2'
    newTH2.classList.add('tabletiempo')
    newTH2.innerHTML = 'T '
  }
}
