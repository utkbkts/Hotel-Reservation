import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../ui/Input";
import "../styles/auth.scss";
import picture from "../image/image.png";
import { toast } from "react-hot-toast";
const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    profileImage: null,
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const register_form = new FormData();

      for (let key in formData) {
        register_form.append(key, formData[key]);
        //key name temsil eder formdata ise girilen değer
      }
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        {
          method: "POST",
          body: register_form,
        }
      );
      const data = await response.json();
      if (data.success === true) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="register-container">
      <div className="content">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit} className="form">
          <Input
            onChange={handleChange}
            type={"text"}
            name={"firstname"}
            value={formData.firstname}
            placeholder={"First Name"}
          />
          <Input
            onChange={handleChange}
            value={formData.lastname}
            type={"text"}
            name={"lastname"}
            placeholder={"Last Name"}
          />

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
          <Input
            onChange={handleChange}
            value={formData.confirmpassword}
            name={"confirmpassword"}
            type={"password"}
            placeholder={"Confirm Password"}
          />
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleChange}
            name="profileImage"
            style={{ display: "none" }}
          />
          <label htmlFor="profileImage">
            <img src={picture} alt="profileImage" />
            <p>Upload Your Photo</p>
          </label>
          {formData.profileImage && (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="imageprofile"
              style={{ maxWidth: "60px", borderRadius: "50%" }}
            />
          )}
          <button type="submit" className="btn">
            Sign Up
          </button>
        </form>
        <p>
          Already have an account ? <Link to={"/login"}>Log In Here</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
