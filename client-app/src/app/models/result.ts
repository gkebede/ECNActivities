import { Activity } from "./activity";

// Result.cs
 export interface Result{
    isSuccess:boolean,
    error:string,
    value: Activity[]
}