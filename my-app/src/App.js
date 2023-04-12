import './App.css';
import React, {useEffect, useState} from "react";
import logo from "./meme-logo.png";

function App() {

  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    imgUrl: "https://i.imgflip.com/34vt4i.jpg"
  })
  const [state, setState] = useState([])
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
    .then(res => res.json())
    .then(response => setState((response.data.memes)))
  })

  function getMemeImage() {
    const randNum = Math.floor(Math.random() * state.length)
    let memeImg = state[randNum].url;
    setMeme(preMeme => {
      return {...preMeme, imgUrl: memeImg}
    })
  }

  function update(event) {
    const {name, value} = event.target
    setMeme(prevMeme => {
      return {
        ...prevMeme,
        [name]: value 
      }
    })
  }

  return (
    <div>
      <div className="container">
        <div className="header">
          <img className="logo" src={logo} alt="meme logo" />
          <h2>My Meme Generator</h2>
        </div>

        <hr />

      <button className="btn" onClick={getMemeImage}>Get Random Meme</button>

        <div className="inputs">
        <input type="text"
          name="topText"
          value={meme.topText || ""}
          onChange={update}
          placeholder="Top Text"
        />
        <input type="text"
          name="bottomText"
          value={meme.bottomText || ""}
          onChange={update}
          placeholder="Bottom Text"
        />
        </div>

      <div className="image-body">
        <img src={meme.imgUrl} alt="meme" />
        <h3 className="top-text">{meme.topText}</h3>
        <h3 className="bottom-text">{meme.bottomText}</h3>
      </div>

      </div>
    </div>
  )
}

export default App;
