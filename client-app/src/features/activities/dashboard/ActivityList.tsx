import { Button, Item, Label, Segment } from "semantic-ui-react"
import { SyntheticEvent, useState } from "react"
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";


export default observer(function ActivityList(){
     const {activityStore} = useStore();
     const {deleteActivity,getActivites, loading} = activityStore;
     const [target, setTarget] = useState('');

    
      

     //: SyntheticEvent<HTMLButtonElement>
     function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
       setTarget(e.currentTarget.name);
       deleteActivity(id)
     }
 
    return(
       
        <Segment>
           
        <Item.Group divided>
      
             {getActivites().map(activity => ( 
                <Item key={activity.id}>
                    <Item.Content>
                        <Item.Header as='a'>{activity.title}</Item.Header>
                          <Item.Meta>{activity.date}</Item.Meta>  
                        <Item.Description>
                            <div>{activity.description}</div>
                            <div>{activity.city}, {activity.venue}</div>
                        </Item.Description>
                        <Item.Extra>
                                <Button as={Link} to={`/activities/${activity.id}`}
                         floated='right' content='View' color='blue' />
                        
                           <Button
                            name= {activity.id}
                            loading={loading && target === activity.id}
                            onClick={(e) => handleActivityDelete(e, activity.id)} 
                            floated='right' content='Delete' color='red' />
                            <Label basic content={activity.category}/>
                        </Item.Extra>
                    </Item.Content>
                </Item>
             )) } 
        </Item.Group>
    </Segment>
    
    )

   
})


   






// import { observer } from 'mobx-react-lite';
// import { Fragment, useEffect } from 'react';
// import { Header, Item, Segment } from "semantic-ui-react";
// import { useStore } from '../../../app/stores/store';
// import ActivityListItem from './ActivityListItem';

// export default observer(function ActivityList() {
//     const { activityStore, userStore: {isLoggedIn, user} } = useStore();
//     const { groupedActivities, loadActivities, activitiesByDate } = activityStore;


//     return (
//         <>
//             {groupedActivities.map(([group, activities]) => (

//                 <Fragment key={group}>
//                     <Header sub color='teal'>
//                         {group}
//                     </Header>
                
//                         {   
//                             activities.map(activity => (

//                                 <ActivityListItem key={activity.id} activity={activity} />

//                             ))
                            
//                             }

//                 </Fragment>

//             ))}
//         </>

//     )
// })


// // https://github.com/TryCatchLearn/Reactivities/blob/main/client-app/src/features/activities/dashboard/ActivityList.tsx