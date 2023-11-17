'use client'
import { useState } from "react";
import handlerAcessUser from "./functions/handlerAcess"
import { useRouter } from "next/navigation";
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { push, refresh } = useRouter();

  const handlerLogin = async (e) => { e.preventDefault();
    try {
      const userAuth = await handlerAcessUser(user);
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
      <label htmlFor="email">Email</label>
        <input placeholder='E-mail' type="email" name="email" required id="email"
          onChange={(e) => { setUser({ ...user, email: e.target.value }) }}>
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
