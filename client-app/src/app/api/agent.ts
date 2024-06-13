import axios, { AxiosError, AxiosResponse } from "axios";
// import { toast } from "react-toastify";
import { Activity } from "../models/activity";
// 
//import { Result } from "../models/result";
import { User, UserFormValues } from "../models/users";
//import { store } from "../stores/store";
//import { router } from "../router/Routes";
import { Photo, Profile, UserActivity } from "../models/Profile";
import { store } from "../stores/store";
import { router } from "../router/Routes";
import { toast } from "react-toastify";
import { resolvePath } from "react-router-dom";


function sleep(delay: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}


axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.response.use(async response => {
    //  PLEASE NOTE -how Promise work in ->axios.interceptors.response.use() as follow
    // const promise = new Promise((resolve, reject) =>{}  *resolve=>return response; && reject => return Promise.reject(error);)
    await sleep(1000);
    return response;
}, (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                console.log(data.errors);
                router.navigate('/not-found')
            }
            if (data.errors) {
             
                const modalStateError = [];
                for (const key in data.errors) {
                    if(data.errors[key]){
                        modalStateError.push(data.errors[key]);
                    }
                }
                throw modalStateError.flat();
             
            } else {
                toast.error(data);
            }
            toast.error('bad request');
            break;
        case 401:
            toast.error('unauthorised');
            break;
        case 403:
            toast.error('forbidden');
            break;
        case 404:
            router.navigate('/not-found');
            break;
        case 500:
             store.commonStore.setServerError(data);
            router.navigate('/server-error');
            break;
    }

    return Promise.reject(error);
})

const requests = {

    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}


const Activities = {
    // list: () => requests.get<Result>(`/activities`),
    list: () => requests.get<Activity[]>(`/activities`),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => requests.post<void>(`/activities/`, activity),
    update: (activity: Activity) => requests.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.delete(`/activities/${id}`),
}

const Account = {
    current: () => requests.get<User>('account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user)
}

const Profiles = {
    get: (username: string) => requests.get<Profile>(`/profiles/${username}`),
    uploadPhoto: (file: any) => {
        let formData = new FormData();
        formData.append('File', file);
        return axios.post<Photo>('photos', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
    setMainPhoto: (id: string) => axios.post(`/photos/${id}/setMain`, {}),
    deletePhoto: (id: string) => axios.delete(`/photos/${id}`),
    updateProfile: (profile: Partial<Profile>) => requests.put(`/profiles`, profile),
    updateFollowing: (username: string) => requests.post(`/follow/${username}`, {}),
    listFollowings: (username: string, predicate: string) => requests
        .get<Profile[]>(`/follow/${username}?predicate=${predicate}`),
    listActivities: (username: string, predicate: string) =>
        requests.get<UserActivity[]>(`/profiles/${username}/activities?predicate=${predicate}`)
}

const agent = {
    Activities,
    Account,
    Profiles
}

export default agent;


