import {useEffect, useState} from 'react'
import './App.css';
// import { v4 as uuid } from "uuid";
function App() {
  const [images,setImages]=useState([])
  useEffect(()=>{
    fetch('/images').then(r=>r.json()).then(setImages)
  },[])
  const[file,setFile]=useState('')
  const handleSubmit=(e)=>{
    e.preventDefault()
    const formData = new FormData();
    formData.append('image', e.target.image.files[0]);
    fetch('/images', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });

  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="file" name="image" value={file} onChange={(e)=>setFile(e.target.value)}></input>
        <button type="submit">upload</button>
      </form>
      {images&&images.map((image)=>{
        return <img key={image.id} src={image.image_url} alt=" "/>
      })}
    </div>
  );
}

export default App;
