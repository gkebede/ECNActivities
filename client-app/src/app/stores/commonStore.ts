import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/serverError";

export default class CommonStore {
    error: ServerError | null = null;
    token: string | null | undefined = localStorage.getItem('jwt');
    appLoaded = true;
    

    constructor() {
        makeAutoObservable(this);

        // autorun ~~methode run~~  when token: string | null | undefined = localStorage.getItem('jwt');  ---initialization stage 
        // reaction ~~methode run~~ when token: is changes (ONLY if the observable changes)
        reaction(
            () => this.token,
            token => {
                if (token) {
                    localStorage.setItem('jwt', token)
                } else {
                    localStorage.removeItem('jwt')
                }
            }
        )
     }

    setServerError(error: ServerError) {
        this.error = error;
    }

    setToken = (token: string | null) => {
        this.token = token;
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }
}