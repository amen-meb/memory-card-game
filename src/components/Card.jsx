

export default function Card({card, onClick}) {
  return (
    <button className="card" type="button" onClick={() => onClick(card)}>
        <img src={card.image} alt={card.name} />
        <p>{card.name}</p>
    </button>
  )
}