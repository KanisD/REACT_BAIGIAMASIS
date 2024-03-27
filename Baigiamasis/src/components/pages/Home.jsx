import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const StyledSection = styled.section`
  display: flex;
  justify-items: center;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  background-color: #f0f0f0;

  > h1 {
    font-size: 40px;
  }

  > p {
    padding-bottom: 20px;
    margin: 20px;
    font-size: 18px;
    width: 80%;
    justify-self: start;
  }

  button {
    padding: 10px 20px;
    font-size: 20px;
    background-color: #707770;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
  
  }
`;

const Button = styled.button`
  /* Add your button styles here */
`;

const Home = () => {
  const navigate = useNavigate();

  const handleNavigateToCards = () => {
    navigate('/cards/allCards');
  };

  return (
    <StyledSection>
      <h1>Crypto Scam Hunters</h1>
      <img
        src="https://cdni.iconscout.com/illustration/premium/thumb/crypto-scams-or-fraud-8373962-6695005.png"
        alt="image"
      />
      <p>
        Our platform provides a vital space for users to share their experiences and insights regarding crypto projects, allowing for an informed and empowered community. Real people's comments serve as valuable testimonials, shedding light on both the successes and pitfalls of various projects. By encouraging users to rate projects based on their experiences, we foster transparency and accountability within the crypto space. To safeguard against scams, our platform equips users with essential knowledge on how to identify and avoid fraudulent schemes. Through collaborative efforts and shared knowledge, we empower investors to make informed decisions and navigate the complex landscape of crypto investments with confidence.
      </p>
      <Button onClick={handleNavigateToCards}>Join the community and vote!</Button>
    </StyledSection>
  );
};
 
export default Home;
