import React, { useEffect, useRef, useState } from 'react'
import { Grind } from './models';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import './styles.css';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
  grind: Grind;
  grinds: Grind[];
  setGrinds: React.Dispatch<React.SetStateAction<Grind[]>>;
  index: number;
}

const SingleGrind: React.FC<Props> = ({ index, grind, grinds, setGrinds }) => {

  const [edit, setEdit] = useState<boolean>(false);
  const [editGrind, setEditGrind] = useState<string>(grind.grind);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleGrindDone = (id: number) => {
    setGrinds(grinds.map((grind) =>
      grind.id === id ? { ...grind, isDone: !grind.isDone } : grind
    ));
  };

  const handleGrindDelete = (id: number) => {
    setGrinds(grinds.filter((grind) => grind.id !== id));
  };

  const handleGrindEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setGrinds(grinds.map((grind) => grind.id === id ? { ...grind, grind: editGrind, currentTimeStamp: new Date() } : grind));
    setEdit(false);
  };

  return (
    <Draggable draggableId={grind.id.toString()} index={index}>
      {
        (provided) => (
          <form className='grind__single' onSubmit={(e) => handleGrindEdit(e, grind.id)} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
            {edit ? (
              <input value={editGrind} onChange={(e) => setEditGrind(e.target.value)} className="grinds__single--text" ref={inputRef} />
            ) : (
              grind.isDone ? (
                <s className="grinds__single--text">{grind.grind}</s>
              ) : (
                <div className='grinds__single--text'>
                <span>{grind.grind}</span> <br />
                <span className='grinds__single--time'>{grind.currentTimeStamp.toString()}</span>
                </div>
              )
            )}

            <div className='action__icons'>
              <span className="icon" onClick={() => {
                if (!edit && !grind.isDone) {
                  setEdit(!edit);
                }
              }}>
                <AiFillEdit />
              </span>
              <span className="icon" onClick={() => handleGrindDelete(grind.id)}>
                <AiFillDelete />
              </span>
              <span className="icon" onClick={() => handleGrindDone(grind.id)}>
                <MdDone />
              </span>
            </div>
          </form>
        )
      }

    </Draggable>

  )
};

export default SingleGrind;
