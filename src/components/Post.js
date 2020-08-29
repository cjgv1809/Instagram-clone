import React, { useEffect, useState } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "../firebase";
import firebase from "firebase";
import { Button } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import NearMeOutlinedIcon from "@material-ui/icons/NearMeOutlined";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";

function Post({ caption, username, imageUrl, postId, user }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className="post">
      <div className="post-header">
        <Avatar
          className="post-avatar"
          alt={username}
          src="/static/images/avatar/1.jpg"
        />
        <h3>{username}</h3>
      </div>
      <img className="post-image" src={imageUrl} alt="" />
      <div className="post-icons">
        <FavoriteIcon fontSize="medium" />
        <ModeCommentOutlinedIcon fontSize="medium" />
        <NearMeOutlinedIcon fontSize="medium" />
        <BookmarkBorderOutlinedIcon fontSize="medium" />
      </div>
      <h4 className="post-text">
        <strong className="post-user">{username}</strong>
        {caption}
      </h4>

      <div className="post-comments">
        {comments.map((comment) => {
          return (
            <p>
              <strong>{comment.username}</strong> {comment.text}
            </p>
          );
        })}
      </div>

      {user && (
        <form className="post-commentBox">
          <Avatar />
          <input
            className="post-input"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            className="post-button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
            color="default"
            variant="outlined"
          >
            Post
          </Button>
        </form>
      )}
    </div>
  );
}

export default Post;
