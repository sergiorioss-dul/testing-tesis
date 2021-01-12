const express = require('express');
const router = require('./routes');
const db = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config({path:'variables.env'});

require('./models/Usuarios')
db.sync().then(()=> console.log('🚀')).catch(e => console.log(e));
const app = express();
//carpeta publica para que el front se comunique
app.use(express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const whitelist = ['http://localhost:3000','https://nostalgic-gates-eaa5a7.netlify.app/'];
const corsOptions= {
    origin: (origin,callback)=>{
        const existe= whitelist.some(dominio => dominio === origin);
        if(existe){
            callback(null,true)
        }else{
            callback(new Error('No permitido por Cors'))
        }
    }
}
app.use(cors(corsOptions));

app.use('/',router());

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;

app.listen(port,host,()=>{
    console.log('Servidor Funcionando')
});