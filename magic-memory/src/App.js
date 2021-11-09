import { useState, useEffect } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

/* defining an array for card images outside the componen so that every time component changes it will not be recreated */
const cardImages = [
  {"src": "/img/helmet-1.png", matched: false},
  {"src": "/img/potion-1.png", matched: false},
  {"src": "/img/ring-1.png", matched: false},
  {"src": "/img/scroll-1.png", matched: false},
  {"src": "/img/shield-1.png", matched: false},
  {"src": "/img/sword-1.png", matched: false},
];



function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const[disabled, setDisabled] = useState(false);

  
  
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  useEffect(() => {
    //shuffle cards on the first render
    shuffleCards();
    setTurns(0);
  }, []);

  useEffect(() => {
    choiceOne && choiceTwo ? compareChoicesMade() : console.log("*");
  }, [choiceOne, choiceTwo]);


  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const compareChoicesMade = () => {
    setDisabled(true);
    let matched = false;
    choiceOne.src === choiceTwo.src ? matched = true
    : matched = false;

    if(matched){
      console.log("A match! : " + choiceOne.src);
      setCards(prevCards => {
        return prevCards.map(card => {
          if(card.src === choiceOne.src){
            return {...card, matched: true};
          }else{
            return card;
          }
        });
      });
    }else{
      console.log("Not a match! " + choiceOne.src + ": " + choiceTwo.src);
    }

    setTimeout(() => resetTurn(), 1000);
  };

  console.log(cards);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  };
 
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid"> 
        {cards.map(card => (
            <SingleCard 
            key={card.id} 
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}/>
        ))
        }
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
