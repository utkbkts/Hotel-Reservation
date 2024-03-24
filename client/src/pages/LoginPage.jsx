import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../ui/Input";
import "../styles/auth.scss";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setLogin } from "../redux/state";
const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );
      const data = await response.json();
      // console.log(data);
      if (data.success === true) {
        toast.success(data.message);
        dispatch(
          setLogin({
            token: data.token,
            user: data.user,
          })
        );

        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="register-container">
      <div className="content">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit} className="form">
          <Input
            type={"email"}
            onChange={handleChange}
            name={"email"}
            placeholder={"Email"}
          />
          <Input
            onChange={handleChange}
            value={formData.password}
            type={"password"}
            name={"password"}
            placeholder={"Password"}
          />
          <button type="submit" className="btn">
            Sign In
          </button>
        </form>
        <p>
          Do you haven't an account ? <Link to={"/signup"}>Sign Up Here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
