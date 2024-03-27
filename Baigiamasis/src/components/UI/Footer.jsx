import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledFooter = styled.footer`
  height: auto;
  padding: 0 20px;
  background-color: #e6e6e6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px; 

  > div{
    height: 100%;
    display: flex;
    align-items: center;

    > a{
      height: 100%;
      > img{
        height: 100%;
      }
    }
  }

  > ul{
    list-style-type: none;
    > li:first-child{
      font-size: 17px;
      font-weight: bold;
      margin-bottom: 10px;
      color: #8e8e8e;
    }
    > li{
      margin-bottom: 5px;
      color: #8e8e8e;
      > a{
        text-decoration: none;
        color: #3e3e3e;
        > i{
          font-size: 20px;
          margin-right: 10px;
          color: #3e3e3e;
        }
      }
    }
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <div>
        <Link to='/'>
          <img
            src="https://i.postimg.cc/phzTmgwZ/1.png" 
            alt="logo"
          />
        </Link>
        <p> &copy; 2024</p>
      </div>
      <ul>
        <li>Legal</li>
        <li><Link>Terms & Conditions</Link></li>
        <li><Link>Privacy Policy</Link></li>
        <li><Link>Terms of use</Link></li>
      </ul>
      <ul>
        <li>Socials</li>
        <li>
          <Link><i className="bi bi-facebook"></i></Link>
          <Link><i className="bi bi-instagram"></i></Link>
        </li>
        <li>
          <Link><i className="bi bi-twitter-x"></i></Link>
          <Link><i className="bi bi-linkedin"></i></Link>
        </li>
      </ul>
    </StyledFooter>
  );
}
 
export default Footer;