//Incluir librerias
const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3050;


app.use(bodyParser.json());

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









