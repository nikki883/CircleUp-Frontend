import react from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({ setUserData }){

    let navigate = useNavigate();

    async function handleSubmit(e){
         e.preventDefault();

         const email = e.target.email.value;
         const password  = e.target.password.value;
         console.log(email,password);
         const res = await axios.post("http://localhost:5500/api/users/login",{
            email,
            password
         })

         if(res.status == 200)
        {
            console.log("user ki id " ,res.data._id,"data aaya")
            setUserData(res.data);
            localStorage.setItem("User", JSON.stringify(res.data));
            navigate("/profile");
        }
        else
        {
            console.log(res.data) 
        }
    }

     return (
      <center>  <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 flex items-center justify-center p-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-white/70">Sign in to your account</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Enter your email" 
                            name="email"
                            className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                        />
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-400/20 to-blue-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                    <label htmlFor="password">Password</label>
                    <br/>
                    <input type="password" placeholder="password" name="password"/>
                    <br/>
                    <button 
                       type="submit"
                        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 active:scale-95"
                    >
                        Sign In
                    </button>
                </form>
                
             
            </div>
        </div></center>
    );
}