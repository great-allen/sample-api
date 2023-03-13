import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("/images")
      .then((r) => r.json())
      .then(setImages);
  }, []);

  const [file, setFile] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", e.target.image.files[0]);
    fetch("/images", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setImages([...images, data]); // add the new image to the list
        setFile(""); // clear the input value
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="file" name="image" onChange={(e) => setFile(e.target.value)} />
        <button type="submit" disabled={!file}>
          Upload
        </button>
      </form>
      {images &&
        images.map((image) => {
          return <img key={image.id} src={image.image_url} alt=" " />;
        })}
    </div>
  );
}

export default App;
