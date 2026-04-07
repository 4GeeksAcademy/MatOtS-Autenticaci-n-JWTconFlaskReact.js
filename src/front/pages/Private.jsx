import { Navigate, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect, useState } from "react";

export const Private = () => {
  const { store, dispatch } = useGlobalReducer()
  const navigate = useNavigate()
  const [tokenApi, setTokenApi] = useState("")
  const urlApi = import.meta.env.VITE_BACKEND_URL
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    setTokenApi(localStorage.getItem("token"))
  }, [])

  useEffect(() => {
    if (tokenApi != "") {
      authUser();
    }
  }, [tokenApi])

  useEffect(()=> {
    if (localStorage.getItem("userAuth") == true) {
      setIsLogged(localStorage.getItem("userAuth"))
    }
    if (localStorage.getItem("token") != null && localStorage.getItem("token") != "") {
      setTokenApi(localStorage.getItem("token"))
    }
  },[])

  async function authUser() {
    try {
      const response = await fetch(`${urlApi}/api/protected`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tokenApi}`
        },
      })

      if (!response.ok) {
        navigate('/login')
      }
      setIsLogged(response.ok)
      dispatch({ type: "ADD_LOGIN_STATUS", payload: response.ok })
      localStorage.setItem("userAuth", response.ok)
    }

    catch (error) {
      console.log("Error on fetch: ", error.message)
    }
  }


  return (
    <>
      {store.userAuth === false ?
        setTimeout(() => {
          <Navigate to="/login" />
        }, 1000)
        : null}
      <div className="container">
        <h1>This page is private</h1>
      </div>

    </>
  );
};