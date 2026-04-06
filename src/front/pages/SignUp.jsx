import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const SignUp = () => {
  const { store, dispatch } = useGlobalReducer()

  const urlApi = import.meta.env.VITE_BACKEND_URL
  const [email, setEmail] = useState("")
  const [pw, setPw] = useState("")
  const navigate = useNavigate()

  async function signUpUser(e) {
    e.preventDefault();
    console.log(email);
    console.log(pw);
    try {
      const response = await fetch(`${urlApi}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "email": email,
          "password": pw
        })
      })
      if (!response.ok) {
        throw new Error("Error on post fetch, status: ", response.status)
      }
      setTimeout(() => {
        if (response.ok) {
          navigate('/login');
        }
      }, 1000);
    }
    catch (error) {
      console.log("Error on fetch: ", error.message)
    }
  }

  return (
    <div className="container row mx-auto mt-5">
      <div className="col-4 ms-5">
        <img src={rigoImageUrl} alt="" style={{ width: "100%" }} />
      </div>
      <div className="col-8 pt-4 w-50">
        <h2 className="d-flex justify-content-center mb-5">Register to MyApp</h2>
        <form onSubmit={signUpUser}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} value={email} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPw(e.target.value)} value={pw} />
          </div>
          <button type="submit" className="btn btn-primary d-grid gap-2 col-6 mx-auto" onClick={signUpUser}>Sign Up</button>
        </form>
      </div>
    </div>
  );
};
