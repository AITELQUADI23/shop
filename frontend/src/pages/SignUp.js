import React, { useState } from "react";
import icons_user from "../images/icons8-user.gif";
import { BiShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";
import { Link } from "react-router-dom";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/slices/authSlice";
import { Toaster, toast } from "sonner";


const SignUp = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: ""
  });
  console.log(data);

  const handlShowPassword = () => {
    setShowPassword((preve) => !preve);
  };
  const handlShowConfPassword = () => {
    setShowConfPassword((preve) => !preve);
  };
  const handleChangee = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleUploadProfileImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);
    console.log(data);
    setData((preve) => {
      return {
        ...preve,
        image: data,
      };
    });
  };
  console.log(process.env.REACT_APP_SERVER_DOMIN);
  const handlSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = data;
    if (firstName && lastName && email && password ) {
      if (password === data.confirmPassword) {
        console.log(data)
        dispatch(registerUser({ data, toast }));
      } else {
        alert("password and confirm pass not equal");
      }
    } else {
      alert("please enter required fielfs");
    }
  };

  return (
    <div className="p-3 md:p-4"  >
      <Toaster richColors position="bottom-right" />

      <div className="w-full max-w-sm bg-white m-auto flex  flex-col p-4">
        <h1 className="text-center  text-2.5xl font-bold text-gray-500">
          SIGN UP
        </h1>

        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md   m-auto shadow-md  relative">
          <img
            src={data.image ? data.image : icons_user}
            className="w-full h-full "
            alt=""
          />
          <label htmlFor="imgpro">
            <div className="absolute bottom-0 h-1/3 bg-indigo-600 bg-opacity-50 w-full text-center cursor-pointer">
              <p className="text-sm p-1 text-white">Upload</p>
            </div>
            <input
              type={"file"}
              id="imgpro"
              accept="image/*"
              className="hidden"
              onChange={handleUploadProfileImage}
            />
          </label>
        </div>
        <form className="w-full py-3  " onSubmit={handlSubmit}>
          <input
            type="text"
            placeholder="First Name"
            id="firsName"
            name="firstName"
            className="w-full px-4 mb-3 py-2  bg-gray-50 rounded focus-within:outline-blue-300"
            value={data.firstName}
            onChange={handleChangee}
          />
          <input
            type="text"
            placeholder="Last Name"
            id="lastName"
            name="lastName"
            className="w-full px-4 py-2 mb-3 bg-gray-50 rounded focus-within:outline-blue-300"
            value={data.lastName}
            onChange={handleChangee}
          />
          <input
            type="text"
            placeholder="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 mb-3 bg-gray-50 rounded focus-within:outline-blue-300"
            value={data.email}
            onChange={handleChangee}
          />
          <div className=" flex  px-4 py-2 bg-gray-50 rounded mt-1 mb-3  focus-within:outline focus-within:outline-blue-300 ">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="password"
              id="password"
              name="password"
              className="w-full bg-state-200 rounded   bg-gray-50  border-none outline-none"
              value={data.password}
              onChange={handleChangee}
            />
            <span
              className="flex text-xl cursor-pointer "
              onClick={handlShowPassword}
            >
              {showPassword ? <BiShow /> : <BiSolidHide />}
            </span>
          </div>
          <div className=" flex  px-4 py-2 bg-gray-50 rounded mt-1 mb-4 focus-within:outline  focus-within:outline-blue-300 ">
            <input
              type={showConfPassword ? "text" : "password"}
              placeholder="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full bg-state-200 rounded   bg-gray-50 border-none outline-none"
              value={data.confirmPassword}
              onChange={handleChangee}
            />
            <span
              className="flex text-xl cursor-pointer "
              onClick={handlShowConfPassword}
            >
              {showConfPassword ? <BiShow /> : <BiSolidHide />}
            </span>
          </div>
          <input
            type="submit"
            className="w-full mt-2 bg-indigo-600 text-white py-2 rounded-md cursor-pointer font-semibold  "
            value="SIGN UP"
          />
        </form>
        <p className="text-left text-sm mt-1">
          Already have an account?{" "}
          <Link to={"/login"} className="text-red-500 underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SignUp;
