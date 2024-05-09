// import { observer } from "mobx-react-lite";
// import React, { useEffect, useState } from "react";
// import { Link, NavLink, useParams } from "react-router-dom";
 import { Button, Card, Grid, Image } from "semantic-ui-react";
// import { updateQualifiedName } from "typescript";
// import LoadingComponent from "../../../app/layout/LoadingComponent";
// import { useStore } from "../../../app/stores/store";
// import ActivityDetailedChat from "./ActivityDetailedChat";
// import ActivityDetailedHeader from "./ActivityDetailedHeader";
// import ActivityDetailedInfo from "./ActivityDetailedInfo";
// import ActivityDetailedSidebar from "./ActivityDetailedSidebar";
 import { Activity } from "../../../app/models/activity";

interface Props {
  activity: Activity,
  canceleSelectActivity:() => void,
  openForm : (id: string) => void,

}

export default function ActivityDetails({ canceleSelectActivity, activity, openForm }: Props) {

  return (

    <>
    <Card fluid>
      
    <Image src={`/assets/categoryImages/${activity.category}.jpg`} className="visible content"
     alt={`/assets/categoryImages/${activity.category}.jpg`}  />
    <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
            <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>
            {activity.description}
        </Card.Description>
    </Card.Content>
    <Card.Content extra>
        <Button.Group widths='2'>
            {  
             activity &&
              <Button onClick={() => openForm(activity.id)}  basic color='blue' content='Edit' />}
            <Button  basic color='grey' onClick={canceleSelectActivity} content='Cancel' />
        </Button.Group>
    </Card.Content>
</Card>

</>

  )


{/* 
  //const { activityStore } = useStore();
  //const [ids , setIds] = useState( '');
  //const { selectedActivity: activity, loadActivity, loadingInitial } = activityStore;
  //const {id} = useParams();

  // useEffect( ()=> {

  //   setIds(id!);
     
  //    if(id) loadActivity(id);

    
    
  // }, [id, loadActivity]);

  // if (!activity ) return < LoadingComponent content={"Loading..."} />;

<Grid >
  <Grid.Column width={10} >
    <ActivityDetailedHeader activity={activity} />
    <ActivityDetailedInfo activity={activity} />
    <ActivityDetailedChat />
  </Grid.Column>
  <Grid.Column width={6}  >
    <ActivityDetailedSidebar />
  </Grid.Column>
</Grid> */}

  

}