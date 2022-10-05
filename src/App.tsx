import React, { useState } from 'react';
import './App.css';
import GrindList from './components/GrindList';
import InputField from './components/InputField';
import { Grind } from './components/models';
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { BsGithub, BsLinkedin, BsInstagram} from 'react-icons/bs';
 
const App: React.FC = () => {
  const [grind, setGrind] = useState<string>("");
  const [grinds, setGrinds] = useState<Grind[]>([]);
  const [completedGrinds, setCompletedGrinds] = useState<Grind[]>([]);

  const handleGrindAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (grind) {
      setGrinds([...grinds, { id: Date.now(), grind: grind, isDone: false, currentTimeStamp: new Date() }]);
      setGrind("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    let add,
      pending = grinds,
      completed = completedGrinds;

    if (source.droppableId === "GrindsList") {
      add = pending[source.index];
      pending.splice(source.index, 1);
    } else {
      add = completed[source.index];
      completed.splice(source.index, 1);
    }

    if (destination.droppableId === "GrindsList") {
      pending.splice(destination.index, 0, add);
    } else {
      completed.splice(destination.index, 0, add);

    }
    setCompletedGrinds(completed);
    setGrinds(pending);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <div className="social__links">
          <span className="icon">
            <a href="https://github.com/Coder-Krish" target="_blank" rel="noreferrer">
            <BsGithub />
            </a>
          </span>
          <span className="icon">
            <a href="https://www.linkedin.com/in/krishna-bogati/" target="_blank" rel="noreferrer">
            <BsLinkedin />
            </a>
          </span>
          <span className="icon">
            <a href="https://www.instagram.com/invincible_system" target="_blank" rel="noreferrer">
            <BsInstagram />
            </a>
          </span>
        </div>
        <span className="heading">Daily Grind</span>
        <InputField grind={grind} setGrind={setGrind} handleGrindAdd={handleGrindAdd} />
        <GrindList grinds={grinds} setGrinds={setGrinds} completedGrinds={completedGrinds} setCompletedGrinds={setCompletedGrinds} />
      </div>
    </DragDropContext>

  );
};

export default App;
