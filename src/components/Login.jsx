import react from "react";
import axios from "axios";

export default function Login(){

    async function handleSubmit(e){
         e.preventDefault();

         const email = e.target.email.value;

         const res = await axios.post("http://localhost:5500/api/users/login",{
            email,
         })

         if(res.status == 200)
        {
            console.log(res.data)
            localStorage.setItem("User",JSON.stringify(res.data))
        }
        else
        {
            console.log(res.data)
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='email' name="email"/>
                <button>Login</button>
            </form>
        </div>
    )
}
