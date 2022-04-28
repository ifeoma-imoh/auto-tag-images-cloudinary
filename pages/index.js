import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";

export default function Home() {
  const [image, setImage] = useState("");
  const [cldImages, setCldImages] = useState([]);
  const [imageTags, setImageTags] = useState([]);

  useEffect(() => {
    (async function getCldImageTags() {
      try {
        const cldTags = await axios.get("/api/getImageTags");
        setImageTags(cldTags.data.tags);
      } catch (error) {
        console.log("tags" + error);
      }
    })();
    getAllImages();
  }, []);

  async function getAllImages() {
    try {
      const images = await axios.get("/api/getImages");
      setCldImages(images.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleInputOnChange = (event) => {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = function (e) {
      setImage(e.target.result);
    };
  };

  const handleOnFormSubmit = (event) => {
    event.preventDefault();
    (async function uploadImage() {
      try {
        const response = await axios.post("/api/uploadImage", {
          image: JSON.stringify(image),
        });
        console.log(response.data);
      } catch (error) {
        console.log("imageUpload" + error);
      }
    })();
  };

  const handleTagClick = (tag) => {
    (async () => {
      try {
        const resImages = await axios.post("/api/getImagesByTag", {
          tag: JSON.stringify({
            tag: tag,
          }),
        });
        setCldImages(resImages.data.resources);
      } catch (error) {
        console.log("tagClick" + error);
      }
    })();
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleOnFormSubmit}>
        <input type="file" onChange={handleInputOnChange}></input>
        <button disabled={image ? false : true}>Upload to Cloudinary</button>
      </form>

      <main>
        <div className={styles.tags}>
          {imageTags
            ? imageTags.map((tag) => (
                <button key={tag} onClick={() => handleTagClick(tag)}>
                  {tag}
                </button>
              ))
            : "upload Image"}
        </div>

        <div className={styles.images}>
          {cldImages
            ? cldImages.map((img) => (
                <div key={img.public_id}>
                  <img src={img.secure_url} alt={img.public_id}></img>
                </div>
              ))
            : "Loading..."}
        </div>
      </main>
    </div>
  );
}
