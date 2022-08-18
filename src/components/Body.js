// Import modules
import React, { useState, useEffect, useRef } from "react";
import * as htmlToImage from 'html-to-image';

// Define component
export default function Meme() {

 // Set states and define functions
 const [meme, setMeme] = useState({
  topText: "",
  bottomText: "",
  randomImage: "http://i.imgflip.com/1bij.jpg"
 })
 const [allMemes, setAllMemes] = useState("")

 useEffect(() => {
  fetch("https://api.imgflip.com/get_memes")
  .then(response => response.json())
  .then(data => setAllMemes(data.data.memes))
 })

 function handleChange(event) {
  const {name, value} = event.target
  setMeme(prevMeme => ({
   ...prevMeme,
   [name]: value
  }))
 }
 
 function changeMeme() {
  const randomNumber = Math.floor((Math.random()*allMemes.length));
  const Url = allMemes[randomNumber].url

  setMeme(prevMeme => ({
   ...prevMeme,
   randomImage: Url
  }))
 }
 
 const domEl = useRef(null);
 async function downloadImg() {
  const dataUrl = await htmlToImage.toPng(domEl.current)

  const link = document.createElement('a');
  link.download = "meme.png";
  link.href = dataUrl;
  link.click();
 }

 // Render elements
 return (
  <main>

   <div className="form">
    <input value={meme.topText} name="topText" type="text" placeholder="Top text" onChange={handleChange} />
    <input value={meme.bottomText} name="bottomText" type="text" placeholder="Bottom text" onChange={handleChange} />
    <button className="save gradient" onClick={downloadImg}>Save</button>
    <button 
    type="submit" className="new-meme gradient" onClick={changeMeme}>Get new meme image</button>
   </div>
   
   <div id="domeEl" ref={domEl} className="wrapper">
    <p className="meme-text top">{meme.topText}</p>
    <img src={meme.randomImage} alt="meme"/>
    <p className="meme-text bottom">{meme.bottomText}</p>
   </div>

  </main>
 )
}