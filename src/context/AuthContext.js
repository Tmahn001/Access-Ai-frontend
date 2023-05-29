import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode"
import { useHistory } from 'react-router-dom';

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) =>{
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)
    let [profile, setProfile] = useState([])
    let [userdata, setUserdata] = useState([])
    let [paymentdata, setPaymentData] = useState([])
    const navigate = useNavigate()


    let loginUser = async (e) =>{
        e.preventDefault()
        let response =  await fetch('https://access-ai.onrender.com/login', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'email':e.target.email.value, 'password':e.target.password.value})

        

    })
        let data = await response.json()
        if (response.status===200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/')


        }else{
            alert('Invalid Credentials!')
        }


}


    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }

    let updateToken = async ()=> {

        let response = await fetch('https://access-ai.onrender.com/token/refresh', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authTokens?.refresh})
        })

        let data = await response.json()
        
        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }else{
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }

    let getProfile = async()=>{
        let response = await fetch('https://access-ai.onrender.com/user/details', {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access) 
            }

        })
        let data = await response.json()

        if(response.status === 200){
            setProfile(data)
            setUserdata(data.data)
        }else if(response.statusText === 'Unauthorized'){
            logoutUser()
        }

    }
   

    let context_data ={
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
        getProfile:getProfile,
        profile:profile,
        userdata:userdata,
    }

    useEffect(()=> {

        if(loading){
            updateToken()
        }

        let fourMinutes = 1000 * 60 * 4

        let interval =  setInterval(()=> {
            if(authTokens){
                updateToken()
            }
        }, fourMinutes)
        return ()=> clearInterval(interval)

    }, [authTokens, loading])

    

    return(
        <AuthContext.Provider value={context_data}>
            {loading? null: children}
           

        </AuthContext.Provider>
    )
}
