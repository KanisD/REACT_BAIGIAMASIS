import { useContext, useState } from "react";
import UsersContext from "../../contexts/UsersContext";
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import styled from 'styled-components';
import bcrypt from 'bcryptjs';

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 70px;

  > form {
    display: flex;
    flex-direction: column;
    gap: 18px;
    background-color: white;
    border-radius: 10px;
    padding: 30px;
    padding-bottom: 40px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);

    > h1 {
      text-align: center;
      font-size: 24px;
      padding-top: 12px;
      padding-bottom: -5px;
    }

    > div {
      width: 250px;
      display: flex;
      flex-direction: column;

      > p {
        color: red;
        text-align: center;
      }
    }

    input[type="text"],
    input[type="password"] {
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #ccc;
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
      outline: none;
      transition: box-shadow 0.3s ease;
    }

    input[type="text"]:focus,
    input[type="password"]:focus {
      box-shadow: 0px 0px 10px rgba(173, 173, 178, 0.5);
    }

    input[type="submit"] {
      padding: 10px 20px;
      border-radius: 5px;
      background-color: #252627;
      color: white;
      border: none;
      outline: none;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    input[type="submit"]:hover {
      background-color: #67686a;
    }
  }

  > p + p {
    color: red;
  }
`;

const Login = () => {

  const navigate = useNavigate();
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const { users, setLoggedInUser } = useContext(UsersContext);

  const formik = useFormik({
    initialValues:{
      userName: "",
      password: ""
    },
    onSubmit: (values) => {
      const loggedInUser = users.find(user => user.userName === values.userName && bcrypt.compareSync(values.password, user.password));

      if(loggedInUser === undefined){
        setWrongCredentials(true);
      } else {
        setLoggedInUser(loggedInUser);
        navigate('/');
      }
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .required('This fields must be filled')
        .trim(),
      password: Yup.string()
      .required('This fields must be filled')
      .trim()
    })
  });

  return (
    <StyledSection>
      <form onSubmit={formik.handleSubmit}>
        <h1>Login</h1>
        <div>
          <label htmlFor="userName"></label>
          <input
            type="text"
            name="userName" id="userName"
            placeholder="Username"
            value={formik.values.userName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {
            formik.touched.userName && formik.errors.userName &&
            <p>{formik.errors.userName}</p>
          }
        </div>
        <div>
          <label htmlFor="password"></label>
          <input
            type="password"
            name="password" id="password"
            placeholder="Password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {
            formik.touched.password && formik.errors.password &&
            <p>{formik.errors.password}</p>
          }
        </div>
        <input type="submit" value="Login" />
      </form>
      {
        wrongCredentials && <p>No user with such username or password combination</p>
      }
    </StyledSection>
  );
}
 
export default Login;
