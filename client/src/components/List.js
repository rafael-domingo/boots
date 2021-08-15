import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { setDestinations } from '../redux/currentTrip';
import LocationCard from '../components/LocationCard';

export default function List({ locations, handleClick, travelTime }) {
    const dispatch = useDispatch();
    
    const onDragEnd = (result) => {
        const arrayMod = Array.from(locations);
        const [reorderedItem] = arrayMod.splice(result.source.index, 1)
        arrayMod.splice(result.destination.index, 0, reorderedItem);        
        dispatch(setDestinations(arrayMod))
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="destinations">
                                {(provided) => (
                                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                                        {
                                            locations.map((item, i) => {
                                                console.log(i)
                                                if (i < travelTime.length) {
                                                    var distance = travelTime[i].distance
                                                    var time = travelTime[i].duration
                                                } else {
                                                    var distance = ''
                                                    var time = ''
                                                }
                                                console.log(travelTime[i])
                                                return (
                                                    <Draggable key={item.id} draggableId={item.id} index={i}>
                                                        {(provided) => (
                                                            <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                            <div style={{width: '100%'}} {...provided.droppableProps} ref={provided.innerRef}>
                                                                <LocationCard 
                                                                    name={item.name} 
                                                                    picture={item.image_url} 
                                                                    location={item.location.address1} 
                                                                    locationInfo={item}
                                                                    handleClick={handleClick}
                                                                />
                                                                {distance}
                                                                {time}
                                                            </div>
                                                            </li>         
                                                        )}
                                                                                                  
                                                    </Draggable>
                                                
                                                )
                                            })
                                        }               
                                        {provided.placeholder}
                                    </ul>
                                )}
                            
                            </Droppable>
                        </DragDropContext>
    )
}