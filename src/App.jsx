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
  const [score,setScore] = useState(0)
  const [moves,setMoves] = useState(0)
  const [isLocked,setIsLocked] = useState(false)
  const shuffleArray = (array) =>{
    const shuffled = [...array];
    for(let i = shuffled.length -1;i>0;i--){
      const  j = Math.floor(Math.random()*(i+1));
      [shuffled[i],shuffled[j]] = [shuffled[j],shuffled[i]];

    }
    return shuffled
  }
  const initializeGame = () =>{
    setMoves(0);
    setScore(0);
    setMatched([])
    setFlipped([])
    setIsLocked(false)
    const finalCard = shuffleArray(cardValues).map((value,index)=>(
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

    if(card.isFlipped || card.isMatched || isLocked || flipped.length === 2){
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
      setIsLocked(true)
        const firstCard = cards[flipped[0]]

        if(firstCard.value === card.value){
          setScore((prev)=> prev+1)
        setTimeout(() => {
          
       
          setMatched((prev)=>[...prev,firstCard.id,card.id])

            const newMatchedCards =(prev)=>prev.map((c)=>{
      if(c.id === card.id || c.id === firstCard.id){
        return {...c, isMatched : true}
      }
      else{
        return c;
      }
    });
    setCards(newMatchedCards)
    setFlipped([])
    setIsLocked(true)
        },300); }else{
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
           setIsLocked(false)
           },500)
          
        }
        setMoves((prev)=> prev+1)
    }
    

  }
  return (
  <div className="app"><GameHeader score= {score} moves={moves} onReset={initializeGame}/>
  <div className="cards-grid">
    {cards.map((card)=>(
      <Card card={card} onClick={handleCardClick}/>
    ))}
  </div>
  </div>
  
)
}

export default App
