import { makeAutoObservable, runInAction } from "mobx";
import { Activity, ActivityFormValues } from "../models/activity";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';
import { format } from "date-fns";
import { Profile } from "../models/Profile";
import { store } from "./store";


export default class ActivityStore {
  //!  #region-MODEFIED/obsolete/ varuables start 
  activities: Activity[] = [];  //=== get activitiesByDate()
  activity: Activity | undefined = undefined;  //=== get activitiesByDate()
  //!#endregion-MODEFIED/obsolete/ varuables end 

  activityRegistry = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  //!     defending mecanisms 
  editMode = false;
  loading = false;               //  if (!IsPostBack){}
  loadingInitial = false;        //   if (IsPostBack){}


  constructor() { makeAutoObservable(this); }

  //! RETURN   Activity[]  in Ascending order 1,2,3...
  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort((a, b) =>
      a.date!.getTime() - b.date!.getTime())
  }

  //! RETURN   Activity[]   groupedBy date
  get groupedActivities() {

    return Object.entries(
      this.activitiesByDate.reduce((activities, currentActivity) => {
        //const date = activity.date!.toString().split('T')[0];
        // const date = currentActivity.date!.toISOString().split('T')[0];
        const date = format(currentActivity.date!, 'dd MMM yyyy');
        activities[date] = activities[date] ? [...activities[date], currentActivity] : [currentActivity];
        return activities;
      }, {} as { [key: string]: Activity[] })
    )
  }

  // todo:   1.A   setActivity
  private setActivity = (activity: Activity) => {
    const user = store.userStore.user;
    if (user) {
      activity.isGoing = activity.attendees!.some(
        a => a.username === user.username
      );
      activity.isHost = activity.hostUsername === user.username;
      activity.host = activity.attendees?.find(x => x.username === activity.hostUsername);
    }

    activity.date = new Date(activity.date!) //activity.date.split('T')[0];
    //this.activities =  [...this.activities, activity] //===this.activities.push(activity)
    //! activityRegistry          INITIALIZED here
    this.activityRegistry.set(activity.id, activity)
  }

  // todo:   1.B getting  activity
  getActivity = (id: string): Activity | undefined => {
    return this.activityRegistry.get(id);
  }

  //!  2.A   =========     getting activities in the MAP OBJECT
  // todo  : this is getActivities      METHOD
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

  //! 2.B   =========   initializing     &&  getting activitY in the MAP OBJECT
  // todo  : this is getActivitY      METHOD
  loadActivity = async (id: string) => {
    let activity = this.getActivity(id)
    if (activity) {
      this.setSelectedActivity(activity)
      //   this.selectedActivity = activity;
      return activity;
    }
    else {
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



  private setSelectedActivity(activity: Activity) {
    this.selectedActivity = activity;
  }

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  }


  createActivity = async (activity: ActivityFormValues) => {
    // this.loading = true;
    //activity.id = uuid();
    const user = store.userStore.user;  // technically this could be null.
    const attendee = new Profile(user!);
    console.log(attendee, user);
    try {
      await agent.Activities.create(activity);  //! creating Activity on the server
      const newActivity = new Activity(activity)  //! creating Activity on the clint side to add other proprties
      newActivity.hostUsername = user!.username;
      newActivity.attendees = [attendee];
      this.setActivity(newActivity);
      runInAction(() => {
        this.selectedActivity = newActivity;
        //! REFERENCES
        //this.activities.push(activity);
        //this.activityRegistry.set(activity.id!, activity)
        //this.selectedActivity = activity;
       // this.editMode = false;
      //  this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
      //  this.loading = false;
      })
    }
  }


  updateActivity = async (activity: ActivityFormValues) => {
    if (activity.id)
      try {
        await agent.Activities.update(activity);
        runInAction(() => {
          if(activity.id){
            let updatedActivity = {...this.getActivity(activity.id), ...activity};
            this.activityRegistry.set(activity.id, updatedActivity as Activity)
            this.selectedActivity = updatedActivity as Activity;
          }
        });
      } catch (error) {
        console.log(error);
        runInAction(() => {
          this.loading = false;
        })
      }
  }


  deleteActivity = async (id: string) => {
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


  updateAttendeeFollowing = (username: string) => {
    this.activityRegistry.forEach(activity => {
      activity.attendees!.forEach((attendee: Profile) => {
        if (attendee.username === username) {
          attendee.following ? attendee.followersCount-- : attendee.followersCount++;
          attendee.following = !attendee.following;
        }
      })
    })
  }


  updateAttendeance = async () => {
    const user = store.userStore.user;
    this.loading = true;
    try {
      //!http://localhost:5000/api/activities/id/attend
      await agent.Activities.attend(this.selectedActivity!.id);
      runInAction(() => {

        if (this.selectedActivity?.isGoing) {
          this.selectedActivity.attendees = this.selectedActivity.attendees?.filter(a => a.username !== user?.username);
          this.selectedActivity.isGoing = false;
        } else {
          const attendee = new Profile(user!);
          this.selectedActivity?.attendees?.push(attendee);
          this.selectedActivity!.isGoing = true;
        }
        this.activityRegistry.set(this.selectedActivity!.id, this.selectedActivity!);
      })
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => this.loading = false);
    }
  }

  cancelActivityToggle = async () => {
    this.loading = true;
    try {
        await agent.Activities.attend(this.selectedActivity!.id);
        runInAction(() => {
            this.selectedActivity!.isCancelled = !this.selectedActivity!.isCancelled;
            this.activityRegistry.set(this.selectedActivity!.id, this.selectedActivity!);
        })
    } catch (error) {
        console.log(error);
    } finally {
        runInAction(() => this.loading = false);
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

