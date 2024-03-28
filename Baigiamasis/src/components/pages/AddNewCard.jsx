import { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from 'uuid';
import styled from "styled-components";
import UsersContext from "../../contexts/UsersContext";
import CardsContext, { CardsActionTypes } from "../../contexts/CardsContext";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 70px;

  > h1 {
    font-size: 3rem;
    margin-bottom: 20px;
  }

  > form {
    width: 300px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    label {
      font-weight: bold;
    }

    input, textarea {
      width: 100%;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #727272;
      box-shadow: none;
    }

    p {
      color: red;
      text-align: center;
      margin: 0;
    }

    input[type="submit"] {
      background-color: #303030;
      color: #ffffff;
      border: none;
      border-radius: 5px;
      padding: 10px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    input[type="submit"]:hover {
      background-color: #000000;
    }
  }
`;

const AddNewCard = () => {
  const navigate = useNavigate();
  const { loggedInUser } = useContext(UsersContext);
  const { setCards } = useContext(CardsContext);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: ""
    }, 
    onSubmit: values => {
      const newCard = {
        id: uuid(),
        userId: loggedInUser.id,
        ...values
      }
      setCards({
        type: CardsActionTypes.addNew,
        data: newCard
      });
      navigate(-1);
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(5, 'Title must be at least 5 characters long')
        .max(50, "Title can't be longer than 50 characters")
        .required('This field must be filled')
        .trim(),
      description: Yup.string()
        .min(5, 'Description must be at least 5 characters long')
        .max(500, "Description can't be longer than 500 characters")
        .required('This field must be filled')
        .trim()
    })
  });

  return (
    <StyledSection>
      <h1>New Project</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="title">Name:</label>
          <input
            type="text"
            name="title" id="title"
            placeholder="Write card title..."
            value={formik.values.title}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.title && formik.errors.title &&
            <p>{formik.errors.title}</p>
          }
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            name="description" id="description"
            placeholder="Write card description..."
            value={formik.values.description}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.description && formik.errors.description &&
            <p>{formik.errors.description}</p>
          }
        </div>
        <input type="submit" value="Add New" />
      </form>
    </StyledSection>
  );
}

export default AddNewCard;
