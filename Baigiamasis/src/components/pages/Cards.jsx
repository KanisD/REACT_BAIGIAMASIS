import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import CardsContext from "../../contexts/CardsContext";
import Card from "../UI/Card";
import styled from "styled-components";
import UsersContext from "../../contexts/UsersContext";

const StyledSection = styled.section`
  text-align: center;

  h1 {
    margin-bottom: 20px;
  }

  p {
    margin-bottom: 20px;

    a {
      text-decoration: none;
      color: black;
      padding: 8px 16px;
      border-radius: 20px;
      box-shadow: 0px 0px 10px rgba(137, 137, 137, 0.5);
      transition: 0.3s;

      &:hover {
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      }
    }
  }

  > div {
    margin: 0 auto;
    width: 85%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 25px;
    border-radius: 20px;
  }
`;

const Cards = () => {
  const { cards } = useContext(CardsContext);
  const { loggedInUser } = useContext(UsersContext);
  const location = useLocation();

  return (
    <StyledSection>
      <h1>Popular Projects</h1>
      {loggedInUser && (
        <p>
          <Link to="/cards/addNew">Add New Project</Link>
        </p>
      )}
      <div>
        {cards.map((card) => (
          <Card key={card.id} data={card} location={location} />
        ))}
      </div>
    </StyledSection>
  );
};

export default Cards;
