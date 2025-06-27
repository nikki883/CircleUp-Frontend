import React , {useState , useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp({ setUserData }) {

  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);



   //agar user pehle se hi login hai toh signup ki jarurt ni hogi jb bhi loggedIn user signup page par manually ayega toh use profile par navigate kr diya jayega
   //baki agar user login hoga toh usko screen par koi signup button ni dikhega
    useEffect(()=>{
        function GetDataFromLocalStorage()
        {
            try {
                let Data = JSON.parse(localStorage.getItem("User"));
                if (Data)
                {
                    navigate("/profile");
                }
            } catch (error) {
                console.error("Error parsing user data from localStorage:", error);
                // Clear corrupted data
                localStorage.removeItem("User");
            }
          }
          
        GetDataFromLocalStorage();

    },[])


  async function handleSubmit(e){
   e.preventDefault();
    setIsLoading(true);


   const newUserData = {
    fullname : e.target.fullname.value,
    profilePic : e.target.profilePic.value,
    username : e.target.username.value,
    email : e.target.email.value,
    password : e.target.password.value
   }

   const res = await axios.post("http://localhost:5500/api/users/signUp",newUserData);

   if(res.status == 201){

    console.log(res.data);
    localStorage.setItem("User" , JSON.stringify(res.data));
    setUserData(res.data);
    setIsLoading(false);
    navigate("/profile");

   }else{
          console.log(res.data)
           setIsLoading(false);

        }



  }
  return (
    
    <div>
 
     <form onSubmit={handleSubmit}>
      <input type="text" placeholder='enter fullname' name="fullname" />
      <br/>
      <br/>
      <input type="text" placeholder='enter profilePic link' name="profilePic" />
      <br/>
      <br/>
      <input type="text" placeholder='enter username' name="username" />
      <br/>
      <br/>
      <input type="email" placeholder='enter email' name="email" />
      <br/>
      <br/>
      <input type="password" placeholder='enter password' name="password" />
      <br/>
      <br/>
      <button type="submit"  disabled={isLoading}>Sign Up 
           {isLoading ? 'Creating Account...' : 'Create Account'}      </button>
     </form>
    </div>
  )
}