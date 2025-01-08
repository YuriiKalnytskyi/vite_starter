import  { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const DEFAULT_CARDS = [
  // BACKLOG
  { title: "Look into render bug in dashboard", id: "1", column: "backlog" },
  { title: "SOX compliance checklist", id: "2", column: "backlog" },
  { title: "[SPIKE] Migrate to Azure", id: "3", column: "backlog" },
  { title: "Document Notifications service", id: "4", column: "backlog" },
  // TODO
  {
    title: "Research DB options for new microservice",
    id: "5",
    column: "todo",
  },
  { title: "Postmortem for outage", id: "6", column: "todo" },
  { title: "Sync with product on Q3 roadmap", id: "7", column: "todo" },

  // DOING
  {
    title: "Refactor context providers to use Zustand",
    id: "8",
    column: "doing",
  },
  { title: "Add logging to daily CRON", id: "9", column: "doing" },
  // DONE
  {
    title: "Set up DD dashboards for Lambda listener",
    id: "10",
    column: "done",
  },
];

export const CustomKanban = () => {
  return (
    <AppContainer>
      <Board />
    </AppContainer>
  );
};

const Board = () => {
  const [cards, setCards] = useState(DEFAULT_CARDS);

  return (
    <BoardContainer>
      <Column
        title="Backlog"
        column="backlog"
        headingColor="text-neutral-500"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="TODO"
        column="todo"
        headingColor="text-yellow-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="In progress"
        column="doing"
        headingColor="text-blue-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Complete"
        column="done"
        headingColor="text-emerald-200"
        cards={cards}
        setCards={setCards}
      />
      <BurnBarrel setCards={setCards} />
    </BoardContainer>
  );
};

const Column = ({ title, headingColor, cards, column, setCards }) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragEnd = (e) => {
    const cardId = e.dataTransfer.getData("cardId");
    setActive(false);

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, column };

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  };

  const clearHighlights = (els) => {
    const indicators = els || getIndicators();
    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e) => {
    const indicators = getIndicators();
    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);
    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e, indicators) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const filteredCards = cards.filter((c) => c.column === column);

  return (
    <ColumnContainer>
      <ColumnHeader>
        <h3 className={headingColor}>{title}</h3>
        <span>{filteredCards.length}</span>
      </ColumnHeader>
      <CardDropZone
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        active={active}
      >
        {filteredCards.map((c) => (
          <Card key={c.id} {...c} handleDragStart={handleDragStart} />
        ))}
        <DropIndicator beforeId={null} column={column} />
      </CardDropZone>
    </ColumnContainer>
  );
};

const Card = ({ title, id, column, handleDragStart }) => {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <MotionCard
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, column })}
      >
        <p>{title}</p>
      </MotionCard>
    </>
  );
};

const BurnBarrel = ({ setCards }) => {
  const [active, setActive] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDragEnd = (e) => {
    const cardId = e.dataTransfer.getData("cardId");

    setCards((pv) => pv.filter((c) => c.id !== cardId));

    setActive(false);
  };

  return (
    <BurnBarrelContainer
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      active={active}
    >
      {active ? 'active' : 'defaulr' }
    </BurnBarrelContainer>
  );
};

const DropIndicator = ({ beforeId, column }) => {
  return <DropIndicatorStyled data-before={beforeId || "-1"} data-column={column} />;
};

const DropIndicatorStyled = styled.div`
    margin-top: -0.125rem; 
    margin-bottom: -0.125rem; 
    height: 0.125rem;
    width: 100%; 
    background-color: #a78bfa; 
    opacity: 0;
`

// Styled Components
const AppContainer = styled.div`
    height: 100vh;
    width: 100%;
    background-color: #1a1a1a;
    color: #f5f5f5;
`;

const BoardContainer = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    gap: 1rem;
    padding: 3rem;
    overflow-x: auto;
`;

const ColumnContainer = styled.div`
    width: 14rem;
    flex-shrink: 0;
`;

const ColumnHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
`;

const CardDropZone = styled.div`
    height: 100%;
    width: 100%;
    background-color: ${(props) => (props.active ? "#262626" : "#1a1a1a")};
    transition: background-color 0.2s;
`;

const BurnBarrelContainer = styled.div`
  margin-top: 2.5rem;
  display: grid;
  height: 14rem;
  width: 14rem;
  flex-shrink: 0;
  place-content: center;
  font-size: 2rem;
  border-radius: 0.5rem;
  border: ${(props) => (props.active ? "2px solid #991b1b" : "2px solid #737373")};
  background-color: ${(props) => (props.active ? "rgba(153,27,27,0.125)" : "rgba(115,115,115,0.125)")};
  color: ${(props) => (props.active ? "#ef4444" : "#737373")};
  transition: all 0.2s;
`;

const MotionCard = styled(motion.div)`
  cursor: grab;
  border: 1px solid #333;
  background-color: #262626;
  padding: 1rem;
`
