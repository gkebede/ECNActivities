/*
import { Fragment, useEffect } from 'react';
import { Container } from 'semantic-ui-react';


import '../layout/styles.css';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import { ToastContainer } from 'react-toastify';
import { useStore } from '../stores/store';
// import CommonStore from '../stores/commonStore';
import LoadingComponent from './LoadingComponent';  */
// import ModalContainer from '../common/modals/ModalContainer';


import { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivitiesDashboard";

import axios from "axios";
import {v4 as uuid} from 'uuid';


// to get more idea about Generics look ERROR HANDLING

export default function App() {

 const [activities, setActivities] = useState<Activity[]>([])
 const [selectActivity, setSelectActivity] = useState<Activity | undefined>(undefined)
 const [editMode, setEditMode] = useState(false)

 // const location = useLocation();
 // const { commonStore: {token, setAppLoaded, appLoaded}, userStore: {getUser} } = useStore();
 // const { commonStore, userStore} = useStore();

 useEffect(()=> {
  axios.get('http://localhost:5000/api/activities')
       .then(response => setActivities(response.data))
 }, [])

 function handleSelecteActivity(id: string){
    setSelectActivity(activities.find(x => x.id === id));
 }
 

 function handleCanceleActivity(){
  setSelectActivity(undefined);
 }

 function handleFormOpen(id?: string){
    id ? handleSelecteActivity(id) : handleCanceleActivity;
    setEditMode(true);
 }

 function handleFormClose(){
  setEditMode(false);
}

function handleCreateOrEditActivity(activity: Activity) {

   activity.id
   ?setActivities([...activities.filter(x=> x.id !== activity.id), activity]) 
   :setActivities([...activities, {...activity, id: uuid()}]);
   setEditMode(false);
   setSelectActivity(activity)

}

function handleDeleteActivity(id: string) {

   setActivities([...activities.filter(x=> x.id !== id)]) 

}



 return(
  
   <>
    <NavBar openForm={handleFormOpen}  />

    <Container style={{ marginTop: '6em'}}>
     <ActivityDashboard
      activities={activities}
      selectedActivity={selectActivity}
      selectActivity = {handleSelecteActivity} 
      canceleActivity = {handleCanceleActivity}
      editMode= {editMode}
      openForm = {handleFormOpen}
      closeForm = {handleFormClose}
      createOrEdit = {handleCreateOrEditActivity}
      deleteActivity = {handleDeleteActivity}

       />
    </Container>

   </>
 )

  
}

//selectedActivity??: This uses the nullish coalescing operator (??), which checks if the value of selectedActivity is null or undefined. If it is either of these, it evaluates to the expression 
// Example  ===  const activity = selectedActivity?? "Default Activity";
//selectedActivity?: This uses optional chaining (?) and is typically used when accessing properties of potentially nullable objects. For instance:
// Example  ===  const activityName = selectedActivity?.name;


//1/ ---COMPONENTS start HERE-----
// NavBar  => App
// => App => ActivityDashboard } -ActivityList , ActivityDetails, ActivityForm
//1/ ----COMPONENTS end HERE-----

//font-size: clamp(1rem, 1.25vw, 1.25rem)

// App -> ActivityDashboard -> ActivityList  -> ActivityDetails

//Activity --under domain for C# class
//models/Activity  interface in under clinet-app


// TO GET THE SOURCE CODE USE THE FOLLOWING GIT URL ADRESS
// ==========================================================

//https://github1s.com/TryCatchLearn/Reactivities/blob/main/Persistence/Migrations/20221204055302_PostgresInitial.cs


// https://github.com/TryCatchLearn/Reactivities

// https://learn.microsoft.com/en-us/aspnet/core/security/authentication/customize-identity-model?view=aspnetcore-7.0


// STEPS TO REMEMBER FOR DATA FLOW..
    // for C#
// 1. DOMAIN (Entity Class)
// 2. DbContext inheritance class for read and write (---Persistence---)
// 3. Repository class if it is nessaary for instantiating data
// 4. call the class that inherit DbContext class or use the repository class if any
// 5. in Controller class use #4 class for manipulating the data and pass it to the View

// for react
// 1. Model (Entity Class  ~  Entity interface )
// 2. use axios as a DbContext to read and write 
// 3. storeClass (spesfic class i.e. userStore ore entityStore...) for instantiating data
// 4. import all the storeClasses to the store which combine all the necessary entities

// 5. and use the store class  as a data source for each view


