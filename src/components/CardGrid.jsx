import Card from './Card.jsx'

export default function CardGrid({cards, onCardClick}) {
  return (
    <div className="card-grid">
      {cards.map((card) => (
        <Card 
            key={card.id} 
            card={card} 
            onClick={onCardClick} 
        />
      ))}
    </div>
  )
}