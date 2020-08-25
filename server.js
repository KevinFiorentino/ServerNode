/*Importo todos los modulos que necesito para tranajar*/
const express = require("express");
let mongoClient = require('mongodb').MongoClient;

servidor = express();

const userBd = "GAK"; 
const passBd = "9VBNbGNJuoWiHhtT";
const nameBd = "ChatKAG";

const uri = "mongodb+srv://" + userBd +":"+ passBd +"@cluster0.x80q3.mongodb.net/" + nameBd +"?retryWrites=true&w=majority";

// let url = "mongodb://localhost:27017/usuarios";





servidor
    .use(express.static('public'))
    .use('/static', express.static(__dirname + '/public'))
    .use(express.json())

    .post("/usuarios",(req,res) => {
        console.log(req.body);
      
        mongoClient.connect(uri, (err, db) => {
            if (err) throw err;
            console.log("Database conectada!");
            
            var dbo = db.db("ChatKAG");
            
            if (req.body.opcion == '1'){
                let query = {'usuario': req.body.usuario, 'nombre': req.body.nombre}
                dbo.collection("Usuarios").find(query).toArray(function(err, result) {
                // dbo.collection("usuarios").find({} , { projection: query }).toArray(function(err, result) {    
                    try{
                        if (result[0].usuario == query.usuario &&
                            result[0].nombre == query.nombre)
                        {
                            res.write("ok");
                            db.close();
                            res.end()
                        }
                        else{
                            res.write("nok");
                            db.close();
                            res.end()
                        }
                    }catch(err){
                        res.write("nok");
                        db.close();
                        res.end()
                    }
                    
                })
            }else{
                let myUsuario = {
                    'usuario': req.body.user, 
                    'email': req.body.email,
                    'nombre': req.body.name,
                    'sexo': req.body.sex, 
                };
                dbo.collection("Usuarios").insertOne(myUsuario, function(err, res) {
                    if (err) throw err;
                    console.log("1 document inserted");
                    db.close();
                  });
            }

  
            
        })
        
      
    })

    .listen(8887,()=>{
        console.log("Escuchando el puerto 8887 con exito");
    });
