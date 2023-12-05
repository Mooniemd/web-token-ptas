// JWT
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
var { expressjwt: expressJWT } = require("express-jwt");
const cors = require('cors');

const corsopt = {
  origin: "https://localhost:3000",
  methods: "GET, PUT, POST, DELTE",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true
}

const crypto = require('./crypto');

var cookieParser = require('cookie-parser')

const express = require('express');
const { usuario } = require('./models');

const app = express();

app.set('view engine', 'ejs');
app.use(cors(corsopt));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

app.use(cookieParser());
app.use(
  expressJWT({
    secret: process.env.SECRET,
    algorithms: ["HS256"],
    getToken: req => req.cookies.token
  }).unless({ path: [ "/", "/autenticar", "/usuarios/cadastrar", "/deslogar", "/logar"] })
);

app.get('/usuarios/cadastrar', async function(req,res){
  res.render('cadastrar')
})

app.post('/usuarios/cadastrar', async function(req,res){
  if(req.body.cpassword == req.body.password) {
    let senhaEncrypt = crypto.encrypt(req.body.password);
    await usuario.create({
      usuario: req.body.name,
      senha: senhaEncrypt
    });
    res.redirect('/usuarios/listar')
  } else(res.status(500).json({mensagem: "Suas senhas não são idênticas!"}))
})

app.get('/usuarios/listar', async function(req,res){
  let nome = await usuario.findAll()
  res.json(nome)  
})

app.get('/autenticar', async function(req, res){
  res.render('autenticar');
})

app.get('/', async function(req, res){
  res.render("home")  
})

app.post('/logar', async (req, res) => {
  const logIn = await usuario.findOne({ where: {usuario: req.body.name, senha: crypto.encrypt(req.body.password)} })
  if(logIn){
    const id = logIn.id;
    const token = jwt.sign({ id }, process.env.SECRET, {  expiresIn: 400 })
    return res.cookie('token', token, { httpOnly: true}).json({
      nome: logIn.usuario,
      token: token
    }); 
    //return res.json(logIn)
  } 
})

app.post('/deslogar', function(req, res) {
  res.cookie('token', null, { httpOnly: true});
  res.json({ deslogado: true })
})

app.listen(4000, function() {
  console.log('App de Exemplo escutando na porta 4000!')
});