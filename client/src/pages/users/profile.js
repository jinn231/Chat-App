import UserDetails from "@/components/UserDetails/UserDetails";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField } from "@mui/material";
import { generateBase64FromImage } from "@/components/Base64/Base64";
import CloseIcon from '@mui/icons-material/Close';
import { data } from "autoprefixer";
import Axios from "@/Axios";
import Link from "next/link";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const UserProfile = ({ user }) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(user)
  const [file, setFile] = useState(null);
  const [bio, setBio] = useState(user?.bio);
  const [phone, setPhone] = useState(user?.phone);
  const [imagePreview, setImagePreview] = useState(null);
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    if (!currentUser) {
      // router.push("/");
    }
  }, []);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    setImgError(false)
    if (file.type === "image/jpg" || file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/svg+xml") {
      setFile(file) 
      generateBase64FromImage(file)
        .then(b64 => {
          setImagePreview(b64);
        })
    } else {
      // Image form Error
      setImgError(true)
    }
  }

  const cancelImage = () => {
    setFile(null)
    setImagePreview(null)
  }

const handleSubmit = async (e) => {
  e.preventDefault()

  const form = new FormData;

  form.append("bio", bio);
  form.append("img", file)
  form.append("phone", phone)

  try {
    
    const {data} = await Axios.put("/users/update", form)

    setCurrentUser(data)

    setBio("")
    setPhone("")
    setFile(null)
    setImagePreview(null)
  } catch (error) {
    console.log(error) 
  }
}

return (
  <>
    <Link href={"/chat"}>
      <div className="m-[1rem] text-xl">
        <ArrowBackIcon />
      </div>
    </Link>
    <div className="w-[80%]" style={{ marginInline: "auto" }}>
      <UserDetails currentUser={currentUser} />
    </div>
    <div className="w-[80%]" style={{ marginInline: "auto" }}>
      <form className="w-[80%] p-5" style={{ marginInline: "auto" }} onSubmit={handleSubmit}>
        <TextField
          value={bio}
          onChange={e => setBio(e.target.value)}
          variant="standard"
          sx={{width: "100%",marginInline: "auto", margin: "1rem auto" }}
          placeholder="Bio (Optional)"
        />
        <TextField
          value={phone}
          onChange={e => setPhone(e.target.value)}
          variant="standard"
          sx={{width: "100%",marginInline: "auto", margin: "1rem auto" }}
          placeholder="Phone Number (Optional) * Published"
        />
        <label>Profile Picture</label>

          {
            imgError && <p className="text-red-600 text-sm font-semibold " >File type doesn't support</p>
          }
          {
            !file ? (
              <div className="h-[150px] flex-col border my-3 shadow flex items-center justify-center">
                <div className="relative cursor-pointer text-sm font-semibold overflow-hidden">
                  <input className="absolute p-1 opacity-0" type="file" name="img" onChange={handleImageChange}
                  />
                  <button className="text-white absoute cursor-pointer bg-green-500 p-2 rounded">Upload videos</button>
                </div>

                <p className="m-1">
                  Drag here to Upload
                </p>
              </div>
            ) : (
              <div className="relative p-5">
                <img src={imagePreview} className="w-[300px] h-[280px] mx-auto rounded-full"/>
                <div className="absolute cursor-pointer right-0 top-0 " onClick={cancelImage} >
                  <CloseIcon />
                </div>
              </div>
            )
          }

        <div className="flex justify-center my-4">
          <button type="submit" className="bg-blue-700 text-white p-2 rounded shadow">Update Profile</button>
        </div>
      </form>
    </div>
  </>
);
};

export default UserProfile;

export const getServerSideProps = async ({ req }) => {
  try {
    const cookie = req.headers.cookie;
    const res = await axios.get("http://localhost:8080/api/users/find", {
      headers: { Cookie: cookie },
    });
    return {
      props: {
        user: res.data.user,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        user: null,
      },
    };
  }
}