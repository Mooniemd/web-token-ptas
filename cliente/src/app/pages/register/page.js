'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation'
import Cookies from "js-cookie";
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { newUser } from '@/app/functions/handlerAcessAPI';

export default function Login() {
    const [user, setUser] = useState({
      name: '',
      email: '',
      password: '',
    });

const { push } = useRouter();

const handleFormSubmit = async (event) => {
  event.preventDefault();
  try{
    console.log(user)
    await newUser(user);
    return push("/pages/dashboard");
  } catch{
    return toast.error("Usuário inválido!")
  }
};

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
      <h1>Cadastre seu usuário</h1>
      <form onSubmit={handleFormSubmit} id="formRegister">
        <label htmlFor="name">Nome</label>
      <input placeholder='Name' type="text" name="name" required id="name"
          onChange={(e) => { setUser({ ...user, name: e.target.value }) }}>
        </input>
        <label htmlFor="email">Email</label>
        <input placeholder='E-mail' type="email" name="email" required id="email"
          onChange={(e) => { setUser({ ...user, email: e.target.value }) }}>
        </input>
        <label htmlFor="password">Senha</label>
        <input placeholder='Senha' type='password' name="password" required id="password"
          onChange={(e) => { setUser({ ...user, password: e.target.value }) }}>
        </input>
        <div className="displayBtn">
        <button id="btn" className="btn">Cadastrar</button>
        <button type="button" onClick={()=> deleteToken()}>Deslogar</button>
        </div>
      </form>
      <ToastContainer/>
    </div>
    </div>
)
}