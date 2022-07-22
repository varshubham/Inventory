import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const Emailverify = () => {
    const navigate = useNavigate();

    const verifyy = async()=>{
        const response = await fetch(`http://localhost:5000/api/auth/getuser`, {
            method: 'POST',
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        })
        const user = await response.json();

        console.log(user)

        const verification = await fetch(`http://localhost:5000/api/auth/email-verification`, {
            method: 'POST',
            headers: {
                'auth-token': localStorage.getItem('token')
            },
            body:{
                "email" : JSON.stringify(user.email)
            }
        })
        const verify = await verification.json()
        console.log(verify)

    }

    useEffect(()=>{
        verifyy();
        
    },[])

    const handleclick = async (e) => {
        e.preventDefault();
        
        const otp = document.getElementById('input').value;
        console.log(otp);
        // if (otp === verify.emailToken) {
        //     console.log("yes")
        // }
    }

    return (
        <div>
            <form >
                <input id='input' type="text" minLength={4} required />
                <button type='submit' onClick={handleclick}>submit</button>
            </form>
        </div>
    )
}

export default Emailverify
