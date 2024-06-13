import { Container } from "semantic-ui-react";

import NavBar from "./NavBar";
import { observer } from "mobx-react-lite";
import { Outlet, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import { ToastContainer } from "react-toastify";



// to get more idea about Generics look ERROR HANDLING

function App() {
  const location = useLocation();
  // const { commonStore: {token, setAppLoaded, appLoaded}, userStore: {getUser} } = useStore();
  // const { commonStore, userStore} = useStore();

  return (
    <>
     <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <NavBar />
      {location.pathname === '/' ? <HomePage />  : (
        <>
          <Container style={{ marginTop: '6em' }}>
           <Outlet />       {/*  Outlet === App and its children[]  */}
          </Container>
        </>
      )}
    </>
  )
}


export default observer(App)

/*

//1/ ---COMPONENTS start HERE-----

// dotnet watch --no-hot-reload
// NavBar  => App
// => App => ActivityDashboard } -ActivityList , ActivityListItem, ActivityForm
//1/ ----COMPONENTS end HERE-----


// TO GET THE SOURCE CODE USE THE FOLLOWING GIT URL ADRESS
// ==========================================================

//https://github1s.com/TryCatchLearn/Reactivities/blob/main/Persistence/Migrations/20221204055302_PostgresInitial.cs


// https://github.com/TryCatchLearn/Reactivities

// https://learn.microsoft.com/en-us/aspnet/core/security/authentication/customize-identity-model?view=aspnetcore-7.0


// STEPS TO REMEMBER FOR DATA FLOW..
// for C#
// 1. DOMAIN (Entity Class)
// 2. DbContext inheritance class for read and write (---Persistence---)
// 3. Repository class if it is nessaary for instantiating data
// 4. call the class that inherit DbContext class or use the repository class if any
// 5. in Controller class use #4 class for manipulating the data and pass it to the View

// for react
// 1. Model (Entity Class  ~  Entity interface )
// 2. use axios as a DbContext to read and write 
// 3. storeClass (spesfic class i.e. userStore ore entityStore...) for instantiating data
// 4. import all the storeClasses to the store which combine all the necessary entities

// 5. and use the store class  as a data source for each view
*/

