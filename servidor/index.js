// JWT
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
var { expressjwt: expressJWT } = require("express-jwt");
const cors = require('cors');
const crypto = require('crypto');

var cookieParser = require('cookie-parser')

const express = require('express');
const { usuario } = require('./models');

const app = express();

app.set('view engine', 'ejs');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

app.use(cookieParser());
app.use(
  expressJWT({
    secret: process.env.SECRET,
    algorithms: ["HS256"],
    getToken: req => req.cookies.token
  }).unless({ path: [ "/", "/autenticar", "/logar", "/deslogar"] })
);

app.get('/usuarios/cadastrar', async function(req,res){
  res.render('cadastrar')
})

app.post('/usuarios/cadastrar', async function(req,res){
  let {usuario} = req.body
  if(req.body.csenha == req.body.senha) {
    let senhaEncrypt = crypto.encrypt(req.body.senha);
    const newUser = await usuario.create({
      usuario: usuario,
      senha: senhaEncrypt
    });
    const id = newUser.id
    const token = jwt.sign({ id }, process.env.SECRET, {  expiresIn: 300 })
    res.cookie('token', token, { httpOnly: true});
    res.redirect('/usuarios/listar')
  } else(res.status(500).json({mensagem: "Suas senhas não são idênticas!"}))
})

app.get('/usuarios/listar', async function(req,res){
  let nome = await usuario.findAll()
  res.render('listar', {nome})  
})

app.get('/autenticar', async function(req, res){
  res.render('autenticar');
})

app.get('/', async function(req, res){
  res.render("home")  
})

app.post('/logar', (req, res) => {
  let {usuario, senha} = req.body
  if( usuario == 'jamogba' && senha == '123'){
    let senhaDecrypt = crypto.decrypt(senha);
    const id = 1
    const token = jwt.sign({ id }, process.env.SECRET, {  expiresIn: 300 })
    res.cookie('token', token, { httpOnly: true});
    return res.json({
      usuario: usuario,
      token: token,
      senha: senhaDecrypt
    })
  } 
  res.status(500).json({mensagem: "Seu login é inválido!"})
})
app.post('/deslogar', function(req, res) {
  res.cookie('token', null, { httpOnly: true});
  res.json({ deslogado: true })
  
})
app.listen(3000, function() {
  console.log('App de Exemplo escutando na porta 3000!')
});