'use client'

import { useState } from 'react';
import Cookies from "js-cookie";
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    const [user, setUser] = useState({
      name: '',
      email: '',
      password: '',
    });

    const form = document.getElementById('formAlter')
      const showAlertAlter = (e) => { e.preventDefault();
        toast.success('Seus dados foram alterados com sucesso!')
        form.reset()
      }

      function deleteToken(){
        Cookies.set('token', '')
        toast.success('Você foi deslogado com sucesso!')
      }

return (
<div>
      <nav className="navbar">
      <a href="/">Login</a>  
      <a href="/pages/alter">Alterar</a>    
      <a href="/pages/register">Registrar</a>      
      </nav> 
    <div className="container">
      <h1>Altere seu usuário</h1>
      <form onSubmit={showAlertAlter} id="formAlter">
        <label htmlFor="name">Nome</label>
      <input placeholder='Name' type="text" name="name" required
          onChange={(e) => { setUser({ ...user, name: e.target.value }) }}>
        </input>
        <label htmlFor="email">Email</label>
        <input placeholder='E-mail' type="email" name="email" required
          onChange={(e) => { setUser({ ...user, email: e.target.value }) }}>
        </input>
        <label htmlFor="password">Senha</label>
        <input placeholder='Senha' type='password' name="password" required
          onChange={(e) => { setUser({ ...user, password: e.target.value }) }}>
        </input>
        <button>Alterar</button> 
        <button type="button" onClick={()=> deleteToken()}>Deslogar</button>
      </form>
      <ToastContainer/> 
    </div>
    </div>
)
}