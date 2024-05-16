// //import React from "react";
// import { makeAutoObservable, runInAction, values } from "mobx";
// import agent from "../api/agent";
// // import { Result } from "../models/result";
// import { v4 as uuid } from 'uuid';
// // import { format } from "date-fns";

import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";
import {v4 as uuid} from 'uuid';
import axios from "axios";




 export default class ActivityStore   {
       activities: Activity[] = [];  //=== get activitiesByDate()
       activity: Activity | undefined = undefined;  //=== get activitiesByDate()
       activityRegistry = new Map<string, Activity>();
       selectedActivity: Activity | undefined = undefined;
       //     defending mecanisms 
       editMode = false;   
       loading = false;
       loadingInitial = false;

       constructor() { makeAutoObservable(this);}

              // 1   =========   initializing     activities   
       loadActivities = async () => {
       //this.setloadingInitial(true); 
       try  {
                   // const output =  axios.get<Activity[]>("http://localhost:5000/api/activities/");// 
             const activities = await agent.Activities.list();
             
             console.log(activities)
             console.log(this.activities)
             //this.activities = []
             runInAction(() => {
                           activities.forEach(activity => {
                                   activity.date = activity.date.split('T')[0];
                                   this.activities.push(activity)
                          console.log(activity.category, "pushed")

                           })
                           // this.setloadingInitial(false); 
                          
                     })}catch (error) {
                             console.log(error)
                             runInAction(() => {
                    // this.setloadingInitial(false); 
                             })
              };
       }
     setloadingInitial = (state: boolean) => {
        this.loadingInitial = state;
     }

       // 2   ========= select an  Activity   
     selectActivity = async (id: string) => {
        this.selectedActivity = this.activities.find(activity => activity.id === id )
     }

     // 3   ========= canciling seleced Activity
     cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
     }

     // 4   ========= opening a page if there is seleced Activity
     openForm=(id?:string)=> {
       id?this.selectActivity(id):this.cancelSelectedActivity()  
       this.editMode = true; //to open/close edit or create page
     }

     // 5   ========= closing a page if there is no Activity
     closeForm =() => {
       this.editMode = false;
     }

     createActivity = async(activity: Activity) => {
      this.loading = true;
      activity.id = uuid();
      try {
        await agent.Activities.create(activity);
        runInAction(() => {
          this.activities.push(activity);
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
         this.activities =[...this.activities.filter(activity => activity.id !== activity.id), activity];
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
        this.activities =[...this.activities.filter(activity => activity.id !== activity.id)];
        if(this.selectedActivity?.id === id) this.cancelSelectedActivity;
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

