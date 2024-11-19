import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./Board.css";

const generateCards = () => {
  const pairs = [
    { name: "React", concept: "Biblioteca de JavaScript" },
    { name: "HTML", concept: "Lenguaje de marcado" },
    { name: "CSS", concept: "Estilo de diseño" },
    { name: "Node", concept: "Entorno de ejecución de JavaScript" },
  ];

  const items = pairs
    .flatMap((pair) => [
      { id: `${pair.name}-name`, value: pair.name, type: "name" },
      { id: `${pair.concept}-concept`, value: pair.concept, type: "concept" },
    ])
    .sort(() => Math.random() - 0.5);

  return items.map((item) => ({
    ...item,
    isMatched: false,
  }));
};

// Helper para verificar si dos cartas están relacionadas
const isMatch = (first, second) => {
  const pairs = [
    { name: "React", concept: "Biblioteca de JavaScript" },
    { name: "HTML", concept: "Lenguaje de marcado" },
    { name: "CSS", concept: "Estilo de diseño" },
    { name: "Node", concept: "Entorno de ejecución de JavaScript" },
  ];

  return pairs.some(
    (pair) =>
      (first.value === pair.name && second.value === pair.concept) ||
      (first.value === pair.concept && second.value === pair.name)
  );
};

const Board = () => {
  const [cards, setCards] = useState(generateCards());
  const [flippedCards, setFlippedCards] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const handleCardClick = (card) => {
    if (disabled || flippedCards.includes(card) || card.isMatched) return;
    setFlippedCards((prev) => [...prev, card]);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      setDisabled(true);
      const [first, second] = flippedCards;

      if (isMatch(first, second)) {
        setCards((prev) =>
          prev.map((card) =>
            card.value === first.value || card.value === second.value
              ? { ...card, isMatched: true }
              : card
          )
        );
      }

      setTimeout(() => {
        setFlippedCards([]);
        setDisabled(false);
      }, 1000);
    }
  }, [flippedCards]);

  return (
    <div className="board">
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          isFlipped={flippedCards.includes(card) || card.isMatched}
          onClick={() => handleCardClick(card)}
        />
      ))}
    </div>
  );
};

export default Board;
