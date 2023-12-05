import { decode } from 'jsonwebtoken'

const validateToken = async (token) => {
    try{
        const isTokenValid = decode(token)
        console.log(isTokenValid)
        if(isTokenValid){
            return true
        }
    } catch {
        return false
    }
}   
export {validateToken};