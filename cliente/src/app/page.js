'use client'
import { useState } from "react";
import handlerAcessUser from "./functions/handlerAcess"
import { useRouter } from "next/navigation";
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Login() {
  const [user, setUser] = useState({
    name: '',
    password: '',
  });
  const { push, refresh } = useRouter();

  const handlerLogin = async (e) => { e.preventDefault();
    try {
      const userAuth = await handlerAcessUser(user);
      console.log(userAuth)
      if(userAuth.token === undefined){
        toast.error('Seu login está incorreto!');
      }
      push('/pages/dashboard')

    } catch {
      toast.error('o form está incorreto')
      refresh();
    }
  }

  return (
    <div>
    <nav className="navbar">
      <a href="/">Login</a>  
      <a href="/pages/alter">Alterar</a>    
      <a href="/pages/register">Registrar</a>      
      </nav>  
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handlerLogin}>
      <label htmlFor="name">Nome</label>
        <input placeholder='Nome' type="text" name="name" required id="name"
          onChange={(e) => { setUser({ ...user, name: e.target.value }) }}>
        </input>
        <label htmlFor="password">Senha</label>
        <input placeholder='Senha' type='password' name="password" required id="password"
          onChange={(e) => { setUser({ ...user, password: e.target.value }) }}>
        </input>
        <button id="btn">Entrar</button>
      </form>
      <ToastContainer/>
    </div>
    </div>
  )
}
