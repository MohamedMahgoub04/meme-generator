import troll from '../images/troll.png'

export default function Header() {
 return (
  <header className="gradient">
   <img src={troll} alt=""/>
   <h2>Meme Generator</h2>
  </header>
 )
}