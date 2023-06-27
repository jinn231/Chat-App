import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { loginsuccess, loginfail } from "@/redux/Slices/UserSlice"
import axios from "axios"
import { useRouter } from "next/router"

const Home = ({user}) => {

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if(user){
      dispatch(loginsuccess(user))
      router.push("/chat")
    }else{
      dispatch(loginfail())
      router.push("/auth/sign-in")
    }
  }, [])

}


export const getServerSideProps = async ({req}) => {
  try {
    const cookie = req.headers.cookie;
    const res = await axios.get("http://localhost:8080/api/users/find", {
    headers:{ Cookie: cookie }
    })
    return {
      props: {
        user: res.data.user
      }
    }
  } catch (error) {
    console.log(error)
    return {
      props: {
        user: null
      }
    }
  }
}


export default Home;