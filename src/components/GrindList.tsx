import React from 'react'
import { Droppable } from 'react-beautiful-dnd';
import { Grind } from './models';
import SingleGrind from './SingleGrind';
import './styles.css';

interface Props {
    grinds: Grind[];
    setGrinds: React.Dispatch<React.SetStateAction<Grind[]>>;
    completedGrinds: Grind[];
    setCompletedGrinds: React.Dispatch<React.SetStateAction<Grind[]>>;
}

const GrindList: React.FC<Props> = ({ grinds, setGrinds, completedGrinds, setCompletedGrinds }) => {
    return (
        <div className="container">
            <Droppable droppableId='GrindsList'>
                {
                    (provided, snapshot) => (
                        <div className={`grinds $ {snapshot.isDraggingOver ? "dragactive" : ""}`} ref={provided.innerRef} {...provided.droppableProps} >
                            <span className='grinds__heading'>Pending Grinds</span>
                            {grinds.map((grind, index) => (
                                <SingleGrind index={index} grind={grind} key={grind.id} grinds={grinds} setGrinds={setGrinds} />
                            ))}
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
            <Droppable droppableId='GrindsRemove'>
                {
                    (provided, snapshot) => (
                        <div className={`grinds remove $ {snapshot.isDraggingOver ? "dragcomplete" : ""}`} ref={provided.innerRef} {...provided.droppableProps}>
                            <span className='grinds__heading'>Grinds Completed</span>
                            {completedGrinds.map((grind, index) => (
                                <SingleGrind index={index} grind={grind} key={grind.id} grinds={completedGrinds} setGrinds={setCompletedGrinds} />
                            ))}
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>

        </div>
    )
};

export default GrindList;
