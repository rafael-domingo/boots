import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { setDestinations } from '../redux/currentTrip';
import LocationCard from '../components/LocationCard';
import Card from '@material-ui/core/Card';
import { Badge, CardContent } from '@material-ui/core';

export default function List({ locations, handleClick, travelTime, reorderList }) {
    const dispatch = useDispatch();

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
                                                var distance = ''
                                                var time = ''
                                                if (i >= 1 && i <= travelTime.length) {
                                                    distance = travelTime[i-1].distance
                                                    time = travelTime[i-1].duration
                                                } else {
                                                    distance = ''
                                                    time = ''
                                                }
                                                var index = i + 1
                                                index.toString()
                                                console.log(travelTime[i])
                                                return (
                                                    <Draggable key={item.id} draggableId={item.id} index={i} isDragDisabled={!reorderList}>
                                                        {(provided) => (
                                                            <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                            <div style={{width: '100%'}} {...provided.droppableProps} ref={provided.innerRef}>
                                                              

                                                                <Card style={{width: '100%', marginBottom: '1em'}}>  
                                                                
                                                                <CardContent style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%'}}>
                                                                <Badge 
                                                                    style={{width: '100%'}}
                                                                    badgeContent={i+1} 
                                                                    color="secondary"
                                                                    anchorOrigin={{
                                                                        vertical: 'top',
                                                                        horizontal: 'left',
                                                                      }}
                                                                >  
                                                                <LocationCard 
                                                                        name={item.name} 
                                                                        picture={item.image_url} 
                                                                        location={item.location.address1} 
                                                                        locationInfo={item}
                                                                        handleClick={handleClick}
                                                                        time={time} 
                                                                        distance={distance}
                                                                        reorder={reorderList}
                                                                        index={i}
                                                                    />    
                                                                </Badge>                                
 
                                                                </CardContent>

                                                                  
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