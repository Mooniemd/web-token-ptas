'use server'

import { cookies } from "next/dist/client/components/headers";

const url = "http://localhost:4000"
const getUserAuthenticated = async(user) =>{
    const respondeOfApi = await fetch(url + "/logar",
        {
            method: "POST", 
            headers: { "Content-Type": "Application/Json"  },
            body: JSON.stringify(user),
            cache: "no-cache"
        }
    );
        const userAuth = await respondeOfApi.json();
        return userAuth;
}

const newUser = async (user) =>{
    console.log(user)
    try{
        const responseOfApi = await fetch( url + "/usuarios/cadastrar", {
            method: 'POST',
            headers: { 'Content-Type': 'Application/json'},
            body: JSON.stringify(user)
        });
        const saveUser = await responseOfApi.json();
        return saveUser;
    } catch{
        return null
    }
}

const getUsers = async () =>{
    try{
        const respondeOfApi = await fetch( url + "/usuarios/listar",{
            next: { revalidate: 10},
            headers: { 'Content-Type': 'Application/json', Cookie: `token=${cookies().get("token").value}`},
        });
        const listUsers = respondeOfApi.json()
        return listUsers;
    } catch(err){
        //return []
    }

}

export { getUsers, getUserAuthenticated, newUser };

/* const users = [{
    name: 'Moonie',
    email: 'moonieoliveira@gmail.com',
    password: 'senha',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
},
{
    name: 'Caio',
    email: 'hyginkay@gmail.com',
    password: 'senha2',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'  
},
{
    name: 'Vito',
    email: 'victorhugow@gmail.com',
    password: 'senha3',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'  
},
{
    name: 'Lipe',
    email: 'filipe@gmail.com',
    password: 'senha4',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'  
},
{
    name: 'Joseph',
    email: 'jose@gmail.com',
    password: 'senha5',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'  
},
{
    name: 'Marcelino',
    email: 'joao.santos@gmail.com',
    password: '123',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
}

];

const getUserAuthenticated = (user) => {
    let userAuth = 0;
    for (var i = 0; i < users.length; i++) {
        if (user.email == users[i].email && user.password == users[i].password){
            userAuth = users[i];
        }
    }   
    return userAuth;
}
const getUsers = () =>{
    return users;
        
}
export { getUsers, getUserAuthenticated };
*/