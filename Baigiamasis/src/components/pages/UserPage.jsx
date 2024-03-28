import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import CardsContext from "../../contexts/CardsContext";
import UsersContext from "../../contexts/UsersContext";
import Card from "../UI/Card";
import styled from "styled-components";

const StyledSection = styled.section`
  text-align: center;

  > h1 {
    margin-bottom: 20px;
  }

  > .addProjectLink {
    display: inline-block;
    margin-bottom: 20px;
    text-decoration: none;
    padding: 10px 20px;
    border-radius: 20px;
    background-color: #ffffff;
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    color: #333;
    font-weight: bold;
  }

  > .addProjectLink:hover {
    transform: translateY(-3px);
    box-shadow: 0px 12px 25px rgba(0, 0, 0, 0.2);
  }

  > .cardContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    margin-top: 30px;
  }
`;

const UserPage = () => {
  const { cards } = useContext(CardsContext);
  const { loggedInUser } = useContext(UsersContext);
  const location = useLocation();
  const userCards = cards.filter((card) => card.userId === loggedInUser.id);

  return (
    <StyledSection>
      <h1>All {loggedInUser.userName} Projects</h1>
      <Link to="/cards/addNew" className="addProjectLink">
        Add New Project
      </Link>
      <div className="cardContainer">
        {userCards.length ? (
          userCards.map((card) => (
            <Card key={card.id} data={card} location={location} />
          ))
        ) : (
          <p>You have yet to create any projects...</p>
        )}
      </div>
    </StyledSection>
  );
};

export default UserPage;
