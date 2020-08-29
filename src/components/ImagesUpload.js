import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { storage, db } from "../firebase";
import firebase from "firebase";
import "./ImagesUpload.css";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function ImagesUpload({ username }) {
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);
  const classes = useStyles();

  const handleChange = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progress Function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // Error function
        alert(error.message);
      },
      () => {
        // Finishing Function
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });

            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="imageUpload">
      <progress
        className={progress !== 0 ? "progress" : "progress-false"}
        value={progress}
        max="100"
      />
      <input
        type="text"
        placeholder="Enter a caption..."
        value={caption}
        className="image-upload-input"
        onChange={(e) => setCaption(e.target.value)}
      />
      <input
        type="file"
        className="image-upload-file"
        onChange={handleChange}
      />
      <Button
        variant="contained"
        color="primary"
        size="medium"
        className={classes.button}
        startIcon={<CloudUploadIcon />}
        onClick={handleUpload}
        disabled={!image}
      >
        Upload
      </Button>
    </div>
  );
}

export default ImagesUpload;
