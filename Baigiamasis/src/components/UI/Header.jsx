import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import UsersContext from "../../contexts/UsersContext";
import { useContext } from "react";



const StyledHeader = styled.header`
  padding: 0 20px;
  height: 80px;
  background-color: #e6e6e6;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px; 


  display: flex;
  justify-content: space-between;
  align-items: center;
  
  > div:nth-child(1){
    height: 150px;
    
    > a{
      > img{
        height: 100%;
      }
    }
  }

  > nav{
    > ul{
      margin: 0;
      padding: 0;
      list-style-type: none;
      display: flex;
      gap: 10px;
      > li{
        > a{
          text-decoration: none;
          font-size: 1.5rem;
          color: #a1a1a1;
          font-weight: bold;
        }
        > a.active{
          color: #787878;
        }
        > a:hover{
          color: #303030;
        }
      }
    }
  }

  > div:nth-child(3){
    display: flex;
    gap: 10px;
    align-items: center;
    >p{
      >a{
        color: black;
        text-decoration: none;
      }
    }
  }
`;

const Header = () => {

  const navigate = useNavigate();
  const { loggedInUser, setLoggedInUser } = useContext(UsersContext);

  return (
    <StyledHeader>
      <div>
      <Link to='/'>
  <img
   src="https://i.postimg.cc/phzTmgwZ/1.png" 
   alt="logo"
  />
    </Link>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink to='/cards/allCards'>Cards</NavLink>
          </li>
        </ul>
      </nav>
      {
        loggedInUser ?
        <div>
          {
            loggedInUser.role === 'admin' &&
            <p>
              <Link to={'/user/adminPanel'}>Admin Panel</Link>
            </p>
          }
          <p>
            <Link to={`/user/${loggedInUser.userName}`}>{loggedInUser.userName}</Link>
          </p>
          <button
            onClick={() => {
              setLoggedInUser(false);
              navigate('/');
            }}
          >Log Out</button>
        </div> : 
        <nav>
          <ul>
            <li>
              <NavLink to='/user/register'>Sign up</NavLink>
            </li>
            <li>
              <NavLink to='/user/login'>Login</NavLink>
            </li>
          </ul>
        </nav>
      }
    </StyledHeader>
  );
}
 
export default Header;