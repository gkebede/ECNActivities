import { Button, Item, Label, Segment } from "semantic-ui-react"
import { Activity } from "../../../app/models/activity"

interface Props{
    activities: Activity[],
     selectActivity:(id: string)=>void,
     deleteActivity:(id: string)=>void,
}

export default function ActivityList({activities, selectActivity, deleteActivity }:Props) {

    return(
        <Segment>
        <Item.Group divided>
            {activities.map(activity => (
                <Item key={activity.id}>
                    <Item.Content>
                        <Item.Header as='a'>{activity.title}</Item.Header>
                          <Item.Meta>{activity.date?.toString()}</Item.Meta>  
                        <Item.Description>
                            <div>{activity.description}</div>
                            <div>{activity.city}, {activity.venue}</div>
                        </Item.Description>
                        <Item.Extra>
                            <Button onClick={() => selectActivity(activity.id)} floated='right' content='View' color='blue' />
                            <Button onClick={() => deleteActivity(activity.id)}  floated='right' content='Delete' color='red' />
                                    {/* onClick={() => canceleActivity()} /> */}
                            <Label basic content={activity.category}/>
                        </Item.Extra>
                    </Item.Content>
                </Item>
            ))}
        </Item.Group>
    </Segment>
    )
}






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