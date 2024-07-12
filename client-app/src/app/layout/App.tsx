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


// STEPS TO REMEMBER FOR DATA FLOW..

// Add the DOBCONTEXT, IDENTIY, ADDsCOPED TOKEN in to programe class


PACKAGES and LIBRARIES   - react
-----------------
    *** npm create vite@latest my-vue-app
1.mobx-react-lite      ---npm install --save mobx
2.react-toastify       ---npm install --save react-toastify
3.react-router         ---npm install react-router@6 react-router-dom@6
4.semantic-ui-react    ---npm install semantic-ui-react semantic-ui-css
5.axios                ---npm install axios
6.formik               ---npm install formik
7.yup                  ---npm install yup   and then  npm install @types/yup --save-dev
8.datepicker           ---npm install react-datepicker and then npm install @types/react-datepicker --save-dev
9.datefns              ---npm install date-fns@2.16.1 (i.e the right version # by checking npm ls date-fns)



//---PASSWORD GENERATOR(URL)    ---https://passwordgenerator.net/   

PACKAGES and LIBRARIES   - ASP.NETCORE
-----------------
     1 to 6 ---to Persistence
     7 & 8  ---to API   
1- Microsoft.EntityFrameworkCore                        ---for Identity
2- Microsoft.EntityFrameworkCore.Relational             ---for Relational
3- Microsoft.EntityFrameworkCore.Design                 ---for Design
4- Microsoft.EntityFrameworkCore.SqlServer              ---for SqlServer
5- Microsoft.EntityFrameworkCore.Tools                  ---for Tools
6- dotnet add package FluentValidation.AspNetCore       ---for Validation
7- System.IdentityModel.Tokens.Jwt @Microsoft           ---for IdentityModel (to create token)
8- Microsoft.AspNetCore.Authentication.JwtBearer        ---to Authentication User to /API/
*/

