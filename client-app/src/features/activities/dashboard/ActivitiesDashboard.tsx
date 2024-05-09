//import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
// import LoadingComponent from "../../../app/layout/LoadingComponent";
//import { useStore } from "../../../app/stores/store";
import ActivityList from "./ActivityList";

//import { observer } from 'mobx-react-lite';
// import ActivityFilters from "./ActivityFilters";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
// import ActivityForm from "../form/ActivityForm";



interface Props{
    activities: Activity[],
    selectedActivity: Activity | undefined,
    selectActivity:(id: string)=>void,
    canceleActivity:()=>void,
    editMode : boolean,
    openForm: (id: string) => void,
    closeForm : () => void,
    createOrEdit : (activity: Activity) => void,
    deleteActivity : (id:string) => void,
    submitting:boolean
}

export default  function ActivityDashboard({
    activities, selectedActivity,
    canceleActivity,
    openForm, closeForm,
    selectActivity,editMode,
    createOrEdit, deleteActivity,
    submitting }:Props) {

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList 
                activities={activities} 
                 selectActivity={selectActivity}
                 deleteActivity={deleteActivity}
                 submitting ={submitting}
                 /> 
            </Grid.Column>

            <Grid.Column width='6'>
             
             {  selectedActivity && !editMode &&
                <ActivityDetails
                    activity={selectedActivity} 
                    canceleSelectActivity ={canceleActivity}
                    openForm = {openForm}  />     }   
                    
           {  editMode &&
           <ActivityForm submitting= {submitting} createOrEdit ={createOrEdit}   closeForm={closeForm}  activity={selectedActivity}  />}

            </Grid.Column>


        </Grid>


    )

   // const {activityStore, userStore:{getUser, user}} = useStore();
   // const { loadActivities, activityRegistry} = activityStore;


    //useEffect( () => {
        // if(!user){
        //     return
        // }else{
          //  loadActivities()
       // }
        
    //  }, [loadActivities,getUser])
    
    
  
    // THE following LINE IS NOT WORKING
  
  
   // if (activityStore.selectedActivity) {
  
      //return <LoadingComponent content='Loading activities...' />
  //  }
  
  


}