//Incluir librerias
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const { response } = require('express');
const PORT = process.env.PORT || 3050;

const corsOption = {
    origin: ['http://localhost:3050/patient/newPatient'],
};


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//var urlencodedParser = bodyParser.urlencoded({ extended: true })  

//CONFIGURACIONES PARA MYSQL 
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vitalcare'
});

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Rutas
app.get('/', (req,res) =>{
    res.send('Welcome to vitalcare');
});

//Ruta para elaborar reportes pdf y excel
app.get('/pacient/getAll', (req, res, next) => {
    const sql = 'select * from VW_getAll where Fecha = DATE_FORMAT(now(), "%y-%m-%d");';
    connection.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.json({message: 'No hay resultados'});
        }
    });
});

//Ruta para heartrate
app.get('/pacient/heartrate', (req, res, next) => {
    const sql = 'select * from VW_getHeartRate where Fecha = DATE_FORMAT(now(), "%y-%m-%d");';
    connection.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.json({message: 'No hay resultados'});
        }
    });
});

//Ruta para bloodPressure.
app.get('/pacient/bloodPressure', (req, res) => {
    const sql = 'select * from VW_getBloodPressure where Fecha = DATE_FORMAT(now(), "%y-%m-%d");';
    connection.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.json({message: 'No hay resultados'});
        }
    });
});

//Ruta para temperature
app.get('/pacient/temperature', (req, res) => {
    const sql = 'select * from VW_getTemperature where Fecha = DATE_FORMAT(now(), "%y-%m-%d");';
    connection.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.json({message: 'No hay resultados'});
        }
    });
});

//Ruta para oxygen
app.get('/pacient/oxygen', (req, res) => {
    const sql = 'select * from VW_getOxygen where Fecha = DATE_FORMAT(now(), "%y-%m-%d");';
    connection.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.json({message: 'No hay resultados'});
        }
    });
});

//Ruta para fechas de reportes
app.get('/pacient/dates', (req, res) => {
    const sql = 'select * from VW_getDates';
    connection.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.json({message: 'No hay resultados'});
        }
    });
});

//Ruta para patientInfo
app.get('/pacient/patientInfo', (req, res) => {
    const sql = 'select * from VW_patientInfo';
    connection.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.json({message: 'No hay resultados'});
        }
    });
});

//Ruta para patienStatus
app.get('/pacient/patientStatus', (req, res) => {
    const sql = 'select * from VW_patientStatus where Fecha = DATE_FORMAT(now(), "%y-%m-%d");';
    connection.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.json({message: 'No hay resultados'});
        }
    });
});

app.get('/patient/newPatient', function (req, res) {
    //res.status(200).send({ name: req.FirstName}) 
    const sql = `select * from patient`;
    connection.query(sql, function(err, result){
        if (err){
            throw err;
        } else {
            res.json(result);
        }
    });
 });

//Ruta para insertar pacientes
app.post('/patient/newPatient', function (req, res) {
    var r_name = req.body.name;
    var r_lastname = req.body.LastName;
    var r_fullName = r_name + r_lastname;
    var r_age = req.body.age;
    var r_blood = req.body.bloodType;
    var r_weight = req.body.weight;
    var r_idMeds = 1;
    var r_idRoom = 1;
    
    const sql = `insert into patient(name,age,bloodType,weigth,idMeds,idRoom) values('${r_fullName}', '${r_age}', '${r_blood}', '${r_weight}', '${r_idMeds}', '${r_idRoom}')`;
    connection.query(sql, function(err, result){
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.json({ message: result.affectedRows+ " Filas afectadas"});
        } else {
            res.json({message: "No se insertaron registros"});
        }
    })
});

app.get('/patient/lastPatient', function(req, res){
    const sql = `SELECT patientStatus FROM medicalInfo ORDER BY id DESC LIMIT 1;`;
    connection.query(sql, function(err, result){
        if (err){
            throw err;
        } else {
            res.json(result);
        }
    });
});


/*=========================RUTA PACIENTES SIMULADOS=================================*/
/*==================================================================================*/
//Blood pressure paciente simulado.
app.get('/pacient/bloodPressureSimulated', (req, res) => {
    const sql = 'select * from VW_bloodPressureSimulated where Fecha = DATE_FORMAT(now(), "%y-%m-%d");';
    connection.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.json({message: 'No hay resultados'});
        }
    });
});

//heartRate paciente simulado.
app.get('/pacient/heartRateSimulated', (req, res) => {
    const sql = 'select * from VW_heartRateSimulated where Fecha = DATE_FORMAT(now(), "%y-%m-%d");';
    connection.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.json({message: 'No hay resultados'});
        }
    });
});

//temperatue paciente simulado.
app.get('/pacient/temperatureSimulated', (req, res) => {
    const sql = 'select * from VW_temperatureSimulated where Fecha = DATE_FORMAT(now(), "%y-%m-%d");';
    connection.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.json({message: 'No hay resultados'});
        }
    });
});

//oxygen paciente simulado.
app.get('/pacient/oxygenSimulated', (req, res) => {
    const sql = 'select * from VW_oxygenSimulated where Fecha = DATE_FORMAT(now(), "%y-%m-%d");';
    connection.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.json({message: 'No hay resultados'});
        }
    });
});

//patient status simulated
app.get('/pacient/patientStatusSimulated', (req, res) => {
    const sql = 'select * from  VW_patientStatusSimulated  where Fecha = DATE_FORMAT(now(), "%y-%m-%d");';
    connection.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.json({message: 'No hay resultados'});
        }
    });
});



//CHECK connect 
connection.connect(error => {
    if (error) throw err;
    console.log('Database server running');
});

app.listen(PORT, () => {
    console.log(`Server running on port  ${PORT}`);
    
});