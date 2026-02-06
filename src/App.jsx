import { useEffect,useState } from "react"
import { Card } from "./components/Card"
import { GameHeader } from "./components/GameHeader"
const cardValues =[
  '🍎', '🍌', "🍇", "🍓", "🍊", "🥝", "🍒", "🍑",
  "🍎", "🍌", "🍇", "🍓", "🍊", "🥝", "🍒", "🍑"
]
function App() {
  const [cards,setCards] = useState([])
  const [flipped,setFlipped] = useState([])
  const [matched,setMatched] = useState([])

  const initializeGame = () =>{
    const finalCard = cardValues.map((value,index)=>(
      {
        id: index,
        value,
        isFlipped: false,
        isMatched: false
      }
    ))
    setCards(finalCard);
  }
  useEffect(()=>{
    initializeGame();
  },[])
  const handleCardClick = (card) =>{

    if(card.isFlipped || card.isMatched){
      return;
    }
    const newCards =  cards.map((c)=>{
      if(c.id === card.id){
        return {...c,isFlipped : true}
      }
      else{
        return c;
      }
    });
    setCards(newCards)
    
   
    const newFlippedCards = [...flipped,card.id]
    setFlipped(newFlippedCards)

    if (flipped.length === 1){
        const firstCard = cards[flipped[0]]

        if(firstCard.value === card.value){
          alert("match")
        }else{
           setTimeout(()=>{
           const flipBackCards = newCards.map((c)=>{
           if (newFlippedCards.includes(c.id)|| c.id === card.id){
            return {...c,isFlipped:false}
           } 
           else{
            return {...c}
           }
          })
          setCards(flipBackCards)
           setFlipped([])
           },500)
          
        }
    }
    

  }
  return (
  <div className="app"><GameHeader score= {3} moves={10}/>
  <div className="cards-grid">
    {cards.map((card)=>(
      <Card card={card} onClick={handleCardClick}/>
    ))}
  </div>
  </div>
  
)
}

export default App
