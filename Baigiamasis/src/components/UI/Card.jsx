import { useContext, useState } from "react";
import styled from "styled-components";
import UsersContext from "../../contexts/UsersContext";
import CardsContext, { CardsActionTypes } from "../../contexts/CardsContext";

const StyledDiv = styled.div`
  padding: 10px 20px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); 

  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;

  > h3 {
    margin: 0;
  }
  > p {
    margin: 0;
    text-align: justify;
    border: none;
  }

  .like-dislike {
    display: flex;
    gap: 10px;
  }

  .like,
  .dislike {
    cursor: pointer;
    padding: 7px 15px; 
    border: none;
    border-radius: 5px;
    background-color: #2f2f2f; 
    color: #fff; 
    font-weight: bold;
    transition: background-color 0.3s ease;
  }

  .like:hover,
  .dislike:hover {
    background-color: #111111; 
  }

  .comment-section {
    margin-top: 10px;
  }

  .comment {
    padding: 20px;
    padding-left: 30px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    text-align: left;
    margin-bottom: 5px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }


  .comment-options button {
    padding: 5px 15px;
    margin-top: 10px;
    margin-right: 10px;
    border: none;
    border-radius: 20px;
    background-color: #2f2f2f; 
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;
    row-gap: 5px;
  }

  .comment-options button:hover {
    background-color: #000000;
  }

  .comment-form {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }

  .comment-input {
    flex-grow: 1;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  .comment-submit {
    padding: 8px 17px; 
    border: none;
    border-radius: 5px;
    background-color: #2f2f2f; 
    color: #fff; 
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .comment-submit:hover {
    background-color: #000000;
  }

  .delete {
    padding: 5px 15px; 
    margin-top: 10px;
    border: none;
    border-radius: 20px;
    background-color: #000; 
    color: #fff; 
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .delete:hover {
    background-color: #333; 
  }
`;

const Card = ({ data }) => {
  const { setCards } = useContext(CardsContext);
  const { loggedInUser } = useContext(UsersContext);
  const [likes, setLikes] = useState(data.likes || 0);
  const [dislikes, setDislikes] = useState(data.dislikes || 0);
  const [comments, setComments] = useState(data.comments || []);
  const [newComment, setNewComment] = useState("");
  const [editIndex, setEditIndex] = useState(null); // Index of comment being edited

  const handleLike = () => {
    if (likes === 0 && dislikes === 0) {
      setLikes(likes + 1);
    } else if (likes === 0 && dislikes > 0) {
      setLikes(likes + 1);
      setDislikes(dislikes - 1);
    }
  };

  const handleDislike = () => {
    if (likes === 0 && dislikes === 0) {
      setDislikes(dislikes + 1);
    } else if (likes > 0 && dislikes === 0) {
      setDislikes(dislikes + 1);
      setLikes(likes - 1);
    }
  };

  const handleCommentSubmit = () => {
  if (newComment.trim() !== "") {
    if (editIndex !== null) {
      const updatedComments = [...comments];
      updatedComments[editIndex] = {
        user: loggedInUser.userName,
        text: newComment
      };
      setComments(updatedComments);
      setEditIndex(null);
    } else {
      const updatedComments = [...comments, { user: loggedInUser.userName, text: newComment }];
      setComments(updatedComments);
    }
  }
  };

  const handleDeleteComment = (index) => {
    const updatedComments = [...comments];
    updatedComments.splice(index, 1);
    setComments(updatedComments);
  };

  const handleDelete = () => {
    setCards({
      type: CardsActionTypes.delete,
      id: data.id
    });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewComment(comments[index].text);
  };

  return (
    <StyledDiv>
      <h3>{data.title}</h3>
      <p>{data.description}</p>
      <div className="like-dislike">
        <button className="like" onClick={handleLike}>
          Like ({likes})
        </button>
        <button className="dislike" onClick={handleDislike}>
          Dislike ({dislikes})
        </button>
      </div>
      <div className="comment-section">
        {comments.map((comment, index) => (
          <div key={index} className="comment">
            <strong>{comment.user}: </strong> {comment.text}
            <div className="comment-options">
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDeleteComment(index)}>Delete</button>
            </div>
          </div>
        ))}
        <div className="comment-form">
          <input
            type="text"
            className="comment-input"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button className="comment-submit" onClick={handleCommentSubmit}>
            {editIndex !== null ? "Update" : "Comment"}
          </button>
        </div>
        <button className="delete" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </StyledDiv>
  );
};

export default Card;
