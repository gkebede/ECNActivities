import { User } from "./users";

export interface IProfile {
    username: string;
    displayName: string;
    image?: string;
    bio?: string;
    followersCount: number;
    followingCount: number;
    following: boolean;
    photos?: Photo[]
}


//! this is to initialize the user in the activityStore using the updateAttendeance method, along with any other
export class Profile implements IProfile {
    username: string;
    displayName: string;
    image?: string | undefined;
    bio?: string | undefined;
    followersCount: number;
    followingCount: number;
    following: boolean;
    photos?: Photo[] | undefined;
    constructor({username, displayName, image}: User) {
        //constructor({username, displayName, image}: User)
        this.username = username;
        this.displayName = displayName;
        this.image = image;
        this.followersCount = 0;
        this.followingCount =0;
        this.following = false;
        this.photos = undefined
    }
   
}

export interface Photo {
    id: string;
    url: string;
    isMain: boolean;
}

export interface UserActivity {
    id: string;
    title: string;
    category: string;
    date: Date;
}