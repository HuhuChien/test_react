
import React,{ useState, useEffect,useRef,useReducer } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({setLog_in}) => {
    const [username_ad,setUsername_ad] = useState('')
    const [password_ad,setPassword_ad] = useState('')
    const navigate = useNavigate()

const username_ChangeHandler = (e) => {
        setUsername_ad(e.target.value)
    
    }

const password_ChangeHandler = (e) => {
    setPassword_ad(e.target.value)
}


const handle_login = (async(e) => {
    e.preventDefault()
    console.log('handle_login')
    const url = 'http://localhost:5020/auth/login'
  
    try{
        //axios.defaults.withCredentials = true;
        const result = await axios.post(url,{
            username:username_ad,
            password:password_ad
        })
        
 
        console.log(result)
        if(result.status === 200){
            navigate('/create_ec2')
            //setLog_in(true)
        } else {
            navigate('/login')
            console.log('weird')
        }
        console.log(result.status)
   
  console.log('apple')
    }catch(error){
        console.log(error)
    }
    

  
})





  return <>
        <form method="POST" onSubmit={handle_login}>
                <div className="container">
                    <label htmlFor="">Username</label>
                    <input onChange={username_ChangeHandler} type="text" name="ad_username"/>

                    <label htmlFor="">Password</label>
                    <input onChange={password_ChangeHandler} type="text" name="ad_password"/>
                    <button type="submit">登入</button>
                </div>
        </form>
    
  </>
}

export default Login