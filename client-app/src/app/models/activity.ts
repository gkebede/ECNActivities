import { Profile } from "./Profile";


// Activity.cs
export interface IActivity {
  id: string;
  title: string;
  description: string;
  category: string;
  date: Date | null;
  city: string;
  venue: string;
  isCancelled: boolean;
  // ---extra prop compare to the actual  Activity.cs that extracted from MappingProfiles conditinally
  hostUsername: string;
  // && attendees distructed from activity.attendees[]  & returned as ProfileDto
  attendees?: Profile[]    // ProfileDTO
  host?: Profile;          // ProfileDTO
  // ---extra added prop compare to the actual  Activity.cs
  isGoing: boolean;
  isHost: boolean

}

export class  Activity implements IActivity {
  id: string;
  title: string;
  description: string;
  category: string;
  date: Date | null;
  city: string;
  venue: string;

  hostUsername: string = '';
  isCancelled: boolean = false;
  isGoing: boolean = false;
  isHost: boolean = false
  host?: Profile;
  attendees?: Profile[];

  constructor(init: ActivityFormValues) {
    //  Object.assign(this, init);
    this.id = init.id!;
    this.title = init.title;
    this.category = init.category;
    this.description = init.description;
    this.date = init.date;
    this.venue = init.venue;
    this.city = init.city;
  }
}

export class ActivityFormValues {
  id?: string = undefined;
  title: string = '';
  category: string = '';
  description: string = '';
  date: Date | null = null;
  city: string = '';
  venue: string = '';

  constructor(activity?: ActivityFormValues) {
    if (activity) {
      this.id = activity.id;
      this.title = activity.title;
      this.category = activity.category;
      this.description = activity.description;
      this.date = activity.date;
      this.venue = activity.venue;
      this.city = activity.city;
    }
  }
}





