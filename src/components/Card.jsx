

export default function Card({card, onClick}) {
  return (
    <div className="card" onClick={() => onClick(card)}>
        <img src={card.image} alt={card.name} />
        <p>{card.name}</p>
    </div>
  )
}