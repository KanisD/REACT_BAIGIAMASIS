import { useFormik } from "formik";
import * as Yup from 'yup';
import { useContext, useState } from "react";
import UsersContext from "../../contexts/UsersContext";
import styled from "styled-components";
import { v4 as uuid } from 'uuid';
import { useNavigate } from "react-router-dom";
import { UsersActionTypes } from "../../contexts/UsersContext";
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

  > p + p {
    color: red;
  }
`;

const Register = () => {

  const navigate = useNavigate();
  const [sameNameError, setSameNameError] = useState(false);
  const { users, setUsers, setLoggedInUser } = useContext(UsersContext);

  const formik = useFormik({
    initialValues:{
      userName: "",
      password: "",
      passwordRepeat: ""
    },
    onSubmit: (values) => {


      if(users.find(user => user.userName === values.userName)){
        setSameNameError(true);
      } else {
        const newUser = {
          id: uuid(),
          userName: values.userName,
          password: bcrypt.hashSync(values.password, 8),
          passwordNoHash: values.password,
          role: "user"
        };
        setUsers({
          type: UsersActionTypes.addNew,
          data: newUser
        });
        setLoggedInUser(newUser);
        navigate('/');
      }
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .min(4, 'Username must be at least 4 symbols length')
        .max(20, "Username can't be longer than 20 symbols")
        .required('This field must be filled')
        .trim(),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,25}$/,
          'Password must be at least: one lower case, one upper case, one number, one special symbol and length to be between 8 and 25'
        )
        .required('This field must be filled')
        .trim(),
      passwordRepeat: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('This field must be filled')
        .trim()
    })
  });

  return (
    <StyledSection>
      <form onSubmit={formik.handleSubmit}>
        <h1>Sign up!</h1>
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
            placeholder="Create password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {
            formik.touched.password && formik.errors.password &&
            <p>{formik.errors.password}</p>
          }
        </div>
        <div>
          <label htmlFor="passwordRepeat"></label>
          <input
            type="password"
            name="passwordRepeat" id="passwordRepeat"
            placeholder="Confirm password"
            value={formik.values.passwordRepeat}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {
            formik.touched.passwordRepeat && formik.errors.passwordRepeat &&
            <p>{formik.errors.passwordRepeat}</p>
          }
        </div>
        <input type="submit" value="Sign up" />
      </form>
      {
        sameNameError && <p>Username is invalid</p>
      }
    </StyledSection>
  );
}
 
export default Register;
