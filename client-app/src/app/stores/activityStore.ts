import {  makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";
import {v4 as uuid} from 'uuid';


 export default class ActivityStore   {
          // MODEFIED/obsolete/ varuables start 
       activities: Activity[] = [];  //=== get activitiesByDate()
       activity: Activity | undefined = undefined;  //=== get activitiesByDate()
        // MODEFIED/obsolete/ varuables end
         
       activityRegistry = new Map<string, Activity>();
       selectedActivity: Activity | undefined = undefined;
       //     defending mecanisms 
       editMode = false;   
       loading = false;               //  if (!IsPostBack){}
       loadingInitial = false;        //   if (IsPostBack){}
    

       constructor() { makeAutoObservable(this);}

       getActivites  =() => {
        return Array.from (this.activityRegistry.values()).sort((a,b) =>
            Date.parse(a.date) - Date.parse(b.date));
       }

       getActivity  =(id: string) => {
        return this.activityRegistry.get(id);
       }

              // 1.A   =========   initializing     activities && setting activities in the MAP OBJECT
       loadActivities = async () => {
        this.setLoadingInitial(true);
                try {
                  const activities = await agent.Activities.list();

                  activities.forEach(activity => {
                    this.setActivity(activity)
                  })
                  this.setLoadingInitial(false);
                } catch (error) {
                  console.log(error)
                  this.setLoadingInitial(false);
                }
       }

        // 1.A   =========   initializing     activitY && setting activitY in the MAP OBJECT
       loadActivity = async (id: string) => {
        let activity = this.getActivity(id)
        if(activity){
          this.setSelectedActivity(activity)
        //   this.selectedActivity = activity;
           return activity;
          }
        else{
          this.setLoadingInitial(true)
          try {
            activity = await agent.Activities.details(id);
            this.setActivity(activity);
             // this.selectedActivity = activity;
            this.setSelectedActivity(activity)
            this.setLoadingInitial(false);
            return activity;
          } catch (error) {
            console.log(error);
            this.setLoadingInitial(false)
          }
        }

        return activity;
       }

     private  setActivity = (activity: Activity) => {
      activity.date = activity.date.split('T')[0];
       //this.activities =  [...this.activities, activity] //===this.activities.push(activity)
       this.activityRegistry.set(activity.id, activity)
       }

       private setSelectedActivity(activity: Activity) {
          this.selectedActivity = activity;
       }

     setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
     }
     createActivity = async(activity: Activity) => {
      this.loading = true;
      activity.id = uuid();
      try {
        await agent.Activities.create(activity);
        runInAction(() => {
          //this.activities.push(activity);
          this.activityRegistry.set(activity.id, activity)
          this.selectedActivity = activity;
          this.editMode= false;
          this.loading = false;
        });
      } catch (error) {
        console.log(error);
        runInAction(() => {
          this.loading = false;
        })
      }
     }

     updateActivity = async(activity: Activity) => {
      this.loading = true;
       if(activity.id)
      try {
        await agent.Activities.update(activity);
        runInAction(() => {
         //this.activities =[...this.activities.filter(activity => activity.id !== activity.id), activity];
         this.activityRegistry.set(activity.id, activity)
         this.selectedActivity = activity;
          this.editMode= false;
          this.loading = false;
        });
      } catch (error) {
        console.log(error);
        runInAction(() => {
          this.loading = false;
        })
      }
     }

     deleteActivity = async(id: string) => {
      this.loading = true;

     try {
       await agent.Activities.delete(id);
       runInAction(() => {
        //this.activities =[...this.activities.filter(activity => activity.id !== activity.id)];
        this.activityRegistry.delete(id)
         this.loading = false;
       });
     } catch (error) {
       console.log(error);
       runInAction(() => {
         this.loading = false;
       })
     }
     }
}

     /*
     
    //    // 2   ========= select an  Activity   
    //  selectActivity = async (id: string) => {
    //     //this.selectedActivity = this.activities.find(activity => activity.id === id )
    //     this.selectedActivity = this.activityRegistry.get(id)
    //  }

    //  // 3   ========= canciling seleced Activity
    //  cancelSelectedActivity = () => {
    //     this.selectedActivity = undefined;
    //  }

    //  // 4   ========= opening a page if there is seleced Activity
    //  openForm=(id?:string)=> {
    //    id?this.selectActivity(id):this.cancelSelectedActivity()  
    //    this.editMode = true; //to open/close edit or create page
    //  }

    //  // 5   ========= closing a page if there is no Activity
    //  closeForm =() => {
    //    this.editMode = false;
    //  }
*/
    
