
// import CommonStore from "./commonStore";
// import ModalStore from "./modalStore";
// import UserStore from "./userStore";
// import ProfileStore from "./ProfileStore";

import { createContext, useContext } from "react";
import  ActivityStore  from "./activityStore";


 interface Store {
    activityStore : ActivityStore;
}

// The states (value)
export const store : Store = {
    activityStore : new ActivityStore(),
}

// state provider (context)
export const StoreContext = createContext(store);

export function useStore() {

    return useContext(StoreContext)
}

// interface Store {

//     activityStore : ActivityStore;
//     commonStore : CommonStore;
//     userStore : UserStore;
//     modalStore: ModalStore;
//     profileStore: ProfileStore
// }


// export const store : Store = {
   

//     activityStore : new ActivityStore(),
//     commonStore : new CommonStore(),
//     userStore :  new UserStore(),
//     modalStore: new ModalStore(),
//     profileStore: new ProfileStore()

// }

// // the following code is how to instantiate the store and use it in react Context

// export const StoreContext = createContext(store);

// export function useStore() {

//     return useContext(StoreContext);
// }

