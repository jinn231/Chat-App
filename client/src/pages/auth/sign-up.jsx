import style from "./sign-in.module.css";
import Link from "next/link";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect, useState } from "react";
import Axios from "@/Axios";
import { useDispatch, useSelector } from "react-redux";
import { startlogin, loginsuccess, loginfail } from "@/redux/Slices/UserSlice";
import { useRouter } from "next/router";
import WifiLoader from "@/components/loaders/WifiLoader";
import { auth, provider } from "@/firebase";
import { signInWithPopup } from "firebase/auth";

const SignUp = ({currentUser}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter()
    const dispatch = useDispatch()
    const { isLoading } = useSelector(state => state.user)
    const [passwordError, setPassError] = useState(false)
    const [error, setError] = useState(false)
    const [errMessage, setErrMessage] = useState("")

    useEffect(() => {
        if(currentUser){
            router.push("/")
        }
    },[])

    const handleForm = async (e) => {
        e.preventDefault()
        
        if( password.length < 8 ) {
            setPassError(true)
        }else{
            dispatch(startlogin())
            try {
                const res = await Axios.post("/auth/sign-up", {
                    name, email, password
                })
    
                await dispatch(loginsuccess(res.data.user))
                router.push("/")
            } catch (error) {
                setError(true)
                setErrMessage(error.response.data.message)
                dispatch(loginfail())
            }
        }     
    }

    const SignInWithGoogle = async () => {
        try {

            dispatch(startlogin())
      
            const {user} = await signInWithPopup(auth , provider);
      
            const data = {
              email: user.email,
              name: user.displayName,
              image: user.photoURL
            }
            
            const resp = await Axios.post("/auth/oAuth", data)
      
            await dispatch(loginsuccess(resp.data))
            router.push("/")
          } catch (error) {
            dispatch(loginfail())
          }
    }

    return(
        <>
        <div className={style.container}>

            {
                isLoading && (
                    <div className="absolute rounded-full bg-slate-50 bg-opacity-20">
                        <WifiLoader desktopSize="60px" frontColor="rgb(97, 253, 97)" backColor="silver" />
                    </div>
                )
            } 
            
            <div className={style.form_container}>
                <Link href="/">
                    <h1 className={style.meta_title}>Chat.io</h1>
                </Link>
                <div className={style.form_parent}>
                    <img src="/images/chat_logo.png" alt="" className={style.form_img} />
                    <form className={style.form} onSubmit={handleForm}>
                        <h1 className={style.input_title}>Create your account</h1>
                        <p className="text-gray-400">Login to connect with friends.</p>
                        {
                            error && <p className="text-red-500 font-bold"> &#x2022; {errMessage}</p>
                        }
                        
                        <div className={style.form_input}>
                            <div className="absolute pl-4 inset-y-0 left-0 flex items-center pointer-events-none">
                                <AccountCircleIcon className="text-white"/>
                            </div>
                            <input type="text" className={style.input_field} placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                        </div>

                        <div className={style.form_input}>
                            <div className="absolute pl-4 inset-y-0 left-0 flex items-center pointer-events-none">
                                <svg className="w-5 h-5"  id="Layer_1" version="1.1" viewBox="0 0 100.354 100.352" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><path fill="white" d="M93.09,76.224c0.047-0.145,0.079-0.298,0.079-0.459V22.638c0-0.162-0.032-0.316-0.08-0.462  c-0.007-0.02-0.011-0.04-0.019-0.06c-0.064-0.171-0.158-0.325-0.276-0.46c-0.008-0.009-0.009-0.02-0.017-0.029  c-0.005-0.005-0.011-0.007-0.016-0.012c-0.126-0.134-0.275-0.242-0.442-0.323c-0.013-0.006-0.023-0.014-0.036-0.02  c-0.158-0.071-0.33-0.111-0.511-0.123c-0.018-0.001-0.035-0.005-0.053-0.005c-0.017-0.001-0.032-0.005-0.049-0.005H8.465  c-0.017,0-0.033,0.004-0.05,0.005c-0.016,0.001-0.032,0.004-0.048,0.005c-0.183,0.012-0.358,0.053-0.518,0.125  c-0.01,0.004-0.018,0.011-0.028,0.015c-0.17,0.081-0.321,0.191-0.448,0.327c-0.005,0.005-0.011,0.006-0.016,0.011  c-0.008,0.008-0.009,0.019-0.017,0.028c-0.118,0.135-0.213,0.29-0.277,0.461c-0.008,0.02-0.012,0.04-0.019,0.061  c-0.048,0.146-0.08,0.3-0.08,0.462v53.128c0,0.164,0.033,0.32,0.082,0.468c0.007,0.02,0.011,0.039,0.018,0.059  c0.065,0.172,0.161,0.327,0.28,0.462c0.007,0.008,0.009,0.018,0.016,0.026c0.006,0.007,0.014,0.011,0.021,0.018  c0.049,0.051,0.103,0.096,0.159,0.14c0.025,0.019,0.047,0.042,0.073,0.06c0.066,0.046,0.137,0.083,0.21,0.117  c0.018,0.008,0.034,0.021,0.052,0.028c0.181,0.077,0.38,0.121,0.589,0.121h83.204c0.209,0,0.408-0.043,0.589-0.121  c0.028-0.012,0.054-0.03,0.081-0.044c0.062-0.031,0.124-0.063,0.181-0.102c0.03-0.021,0.057-0.048,0.086-0.071  c0.051-0.041,0.101-0.082,0.145-0.129c0.008-0.008,0.017-0.014,0.025-0.022c0.008-0.009,0.01-0.021,0.018-0.03  c0.117-0.134,0.211-0.288,0.275-0.458C93.078,76.267,93.083,76.246,93.09,76.224z M9.965,26.04l25.247,23.061L9.965,72.346V26.04z   M61.711,47.971c-0.104,0.068-0.214,0.125-0.301,0.221c-0.033,0.036-0.044,0.083-0.073,0.121l-11.27,10.294L12.331,24.138h75.472  L61.711,47.971z M37.436,51.132l11.619,10.613c0.287,0.262,0.649,0.393,1.012,0.393s0.725-0.131,1.011-0.393l11.475-10.481  l25.243,23.002H12.309L37.436,51.132z M64.778,49.232L90.169,26.04v46.33L64.778,49.232z" /></svg>
                            </div>
                            <input type="email" className={style.input_field} placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>

                        <div className={style.form_input}>
                            <div className="absolute pl-4 inset-y-0 left-0 flex items-center pointer-events-none">
                                <svg  className="w-5 h-5 text-gray-500 dark:text-gray-400" version="1.1" viewBox="0 0 24 24" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="info"/><g id="icons"><path fill="white" d="M20,10h-4H8l0-2.8c0-2.1,1.5-4,3.6-4.2C14,2.8,16,4.7,16,7l0,0c0,0.6,0.4,1,1,1h1c0.6,0,1-0.4,1-1l0,0   c0-3.8-3-6.9-6.8-7C8.3-0.1,5,3.1,5,7v3H4c-1.1,0-2,0.9-2,2v7c0,2.8,2.2,5,5,5h10c2.8,0,5-2.2,5-5v-7C22,10.9,21.1,10,20,10z    M13,17.7V19c0,0.5-0.5,1-1,1s-1-0.5-1-1v-1.3c-0.6-0.3-1-1-1-1.7c0-1.1,0.9-2,2-2s2,0.9,2,2C14,16.7,13.6,17.4,13,17.7z" id="password"/></g></svg>                       
                            </div>
                            <input type="password" className={style.input_field} placeholder="Password" value={password} onChange={e => setPassword(e.target.value) } />
                        </div>
                        <p className={`${passwordError ? "text-red-500" : "text-green-500"} opacity-75`}> &#x2022; Password must be greater than 8 characters.</p>

                        
                        <button type="submit" disabled={isLoading && true} className={style.form_input_btn}>Create my account</button>
                        <p className="text-gray-400">Already have an account ? <Link className="text-blue-700 font-bold" href="/auth/sign-in">Sign In</Link></p>                    
                    
                        <div className="text-center py-2 text-white font-serif text-xl">
                            Or
                        </div>

                        <div disabled={isLoading && true} onClick={SignInWithGoogle} className={style.form_input_btn} style={{display: "flex",alignItems: "center", justifyContent: "center",background: "green", fontFamily: "sans-serif"}}>
                            <svg className="w-8 h-8 mx-3" enableBackground="new 0 0 128 128" id="Social_Icons" version="1.1" viewBox="0 0 128 128" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="_x31__stroke"><g id="Google"><rect clipRule="evenodd" fill="none" fillRule="evenodd" height="128" width="128"/><path clipRule="evenodd" d="M27.585,64c0-4.157,0.69-8.143,1.923-11.881L7.938,35.648    C3.734,44.183,1.366,53.801,1.366,64c0,10.191,2.366,19.802,6.563,28.332l21.558-16.503C28.266,72.108,27.585,68.137,27.585,64" fill="#FBBC05" fillRule="evenodd"/><path clipRule="evenodd" d="M65.457,26.182c9.031,0,17.188,3.2,23.597,8.436L107.698,16    C96.337,6.109,81.771,0,65.457,0C40.129,0,18.361,14.484,7.938,35.648l21.569,16.471C34.477,37.033,48.644,26.182,65.457,26.182" fill="#EA4335" fillRule="evenodd"/><path clipRule="evenodd" d="M65.457,101.818c-16.812,0-30.979-10.851-35.949-25.937    L7.938,92.349C18.361,113.516,40.129,128,65.457,128c15.632,0,30.557-5.551,41.758-15.951L86.741,96.221    C80.964,99.86,73.689,101.818,65.457,101.818" fill="#34A853" fillRule="evenodd"/><path clipRule="evenodd" d="M126.634,64c0-3.782-0.583-7.855-1.457-11.636H65.457v24.727    h34.376c-1.719,8.431-6.397,14.912-13.092,19.13l20.474,15.828C118.981,101.129,126.634,84.861,126.634,64" fill="#4285F4" fillRule="evenodd"/></g></g></svg>                        
                            Continue with Google
                        </div>                                           
                    </form>
                </div>
                
            
        
            </div>
        </div>
    </>
    )
}

export default SignUp;

export const getServerSideProps = async ({req}) => {
    try {
      const cookie = req.headers.cookie;
      const res = await axios.get("http://localhost:8080/api/users/find", {
      headers:{ Cookie: cookie }
      })
      return {
        props: {
          currentUser: res.data.user
        }
      }
    } catch (error) {
      console.log(error)
      return {
        props: {
          currentUser: null
        }
      }
    }
  }
  
  