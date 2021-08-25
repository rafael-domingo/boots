import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { setDestinations } from '../redux/currentTrip';
import LocationCard from '../components/LocationCard';
import TimeDistance from './TimeDistance';
import Card from '@material-ui/core/Card';

export default function List({ locations, handleClick, travelTime, reorderList }) {
    const dispatch = useDispatch();
    const [reorder, setReorder] = React.useState(true);

    const onDragEnd = (result) => {
        if (!result.destination) {
            return
        };
        const arrayMod = Array.from(locations);
        const [reorderedItem] = arrayMod.splice(result.source.index, 1)
        arrayMod.splice(result.destination.index, 0, reorderedItem);        
        dispatch(setDestinations(arrayMod))
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="destinations">
                                {(provided) => (
                                    <ul style={{listStyleType: 'none', margin: '0', padding: '0', width: '100%', height: '100%'}} {...provided.droppableProps} ref={provided.innerRef}>
                                        {
                                            locations.map((item, i) => {
                                                console.log(i)
                                                if (i >= 1 && i <= travelTime.length) {
                                                    var distance = travelTime[i-1].distance
                                                    var time = travelTime[i-1].duration
                                                } else {
                                                    var distance = ''
                                                    var time = ''
                                                }
                                                console.log(travelTime[i])
                                                return (
                                                    <Draggable key={item.id} draggableId={item.id} index={i} isDragDisabled={!reorderList}>
                                                        {(provided) => (
                                                            <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                            <div style={{width: '100%'}} {...provided.droppableProps} ref={provided.innerRef}>
                                                                <Card style={{width: '100%', marginBottom: '1em'}}>
                                                                    <LocationCard 
                                                                        name={item.name} 
                                                                        picture={item.image_url} 
                                                                        location={item.location.address1} 
                                                                        locationInfo={item}
                                                                        handleClick={handleClick}
                                                                        time={time} 
                                                                        distance={distance}
                                                                        reorder={reorderList}
                                                                    />
                                                                </Card>
                                                             
                                                                {/* {
                                                                    !reorderList && (
                                                                    <Card style={{width: '50%'}} elevation={3}>
                                                                        <TimeDistance time={time} distance={distance}/>
                                                                    </Card>
                                                                    )
                                                                } */}
                                                                
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