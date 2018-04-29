#Gestion Competiciones Salto de Obstaculos

+ Necesita dos bases de datos mongodb "Table_Jinetes" y "Table_Caballos"
+ Modulos necesarios :
    -mongodb
    -serialport
    -thenby
    -
+ Lanzar bbdd
cd "Program Files\MongoDB\Server\3.4\bin\
mongod --dbpath c:\data\db
cd \dev\gestion\public\js\
watchify operaciones-bbdd-jinetes.js -o bundle.js

+ //SOFTWARE PARA PUERTO SERIAL TERMITE
