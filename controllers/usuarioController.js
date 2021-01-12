const Usuarios = require('../models/Usuarios');
const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');

exports.borrarUsuario = async(req,res,next) =>{
    const usuario = await Usuarios.findOne({where:{id:req.params.id}});
    if(!usuario){
        res.json('No Encontrado!');
        return next();
    }
    eliminarImagenCliente(usuario.imagen);
    await Usuarios.destroy({
        where : {
            id: req.params.id
        }
    });

}

exports.nuevoUsuario = async(req,res,next) =>{
    const usuario = new Usuarios(req.body);
    if(req.file){
    usuario.imagen = req.file.filename;
    }
    try {
        await usuario.save();
        res.json({mensaje:'Nuevo Cliente'})
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.mostrarUsuarios = async(req,res,next) =>{
   try {
      const usuarios = await Usuarios.findAll({});
      res.json(usuarios);
   } catch (error) {
       console.log(error);
       next();
   }
}

exports.subirImagen = async(req,res,next) =>{
    upload(req,res,function(error){
        if(error){
            console.log(error);
        }else{
            next();
        }
    })
}

const configuracionMulter = {
    limits: { filesize: 300000}, //tamaño de 3MG
    storage: fileStorage = multer.diskStorage({
        destination: (req,file,next) =>{
            next(null, __dirname + "../../uploads/");
        },
        filename: (req,file,next) => {
            const extension = file.mimetype.split('/')[1];
            next(null,`${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req,file,next){
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            next(null,true);
        }else{
            next(new Error('Formato no válido'),false);
        }
    }
}

const upload = multer(configuracionMulter).single('imagen');

const eliminarImagenCliente= (path) => {
    const productoAnteriorPath = __dirname+`/../uploads/${path}`;
    //eliminar archivo
    fs.unlink(productoAnteriorPath,e =>{
        if(e){
            console.log(e)
        }
        return;
    });
}