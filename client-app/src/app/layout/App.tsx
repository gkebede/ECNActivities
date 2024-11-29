import { Container } from "semantic-ui-react";

import NavBar from "./NavBar";
import { observer } from "mobx-react-lite";
import { Outlet, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import { ToastContainer } from "react-toastify";
import { useStore } from "../stores/store";
import { useEffect } from "react";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/modals/ModalContainer";



// to get more idea about Generics look ERROR HANDLING

function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded())
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded) return < LoadingComponent content="Loading app..." />

  return (
    <>
      <ModalContainer />
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <NavBar />
      {location.pathname === '/' ? <HomePage /> : (
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



//1/ ---COMPONENTS start HERE-----

// dotnet watch --no-hot-reload
// NavBar  => App
// => App => ActivityDashboard } -ActivityList , ActivityListItem, ActivityForm
//1/ ----COMPONENTS end HERE-----


// TO GET THE SOURCE CODE USE THE FOLLOWING GIT URL ADRESS
// ==========================================================

//https://github1s.com/TryCatchLearn/Reactivities/blob/main/Persistence/Migrations/20221204055302_PostgresInitial.cs

//? 1 st Install Better Comments  and then the code below
// ! "=1.../** abc*/  =2...// !PACKAGES    =3...// todo: npm create    =4...//?"
/**  STEPS TO REMEMBER FOR DATA FLOW.. */  
 
// Add the DOBCONTEXT, IDENTIY, ADDsCOPED TOKEN in to programe class

// !PACKAGES and LIBRARIES   - react
 
// todo   *** npm create vite@latest my-vue-app
//?    N.B  - each JSX.Element(like App(), LoginForm(), ...) need some kind of model(modelObject) to display example check all
//            the interfaces in side models folders && when it is necessary create a model for one component if we think we
//            don't use it anywhere else example ModalStore class interface
// 1.mobx-react-lite      ---npm install --save mobx
// 2.react-toastify       ---npm install --save react-toastify
// 3.react-router         ---npm install react-router@6 react-router-dom@6
// 4.semantic-ui-react    ---npm install semantic-ui-react semantic-ui-css
// 5.axios                ---npm install axios
// 6.formik               ---npm install formik
// 7.yup                  ---npm install yup   and then  npm install @types/yup --save-dev
// 8.datepicker           ---npm install react-datepicker and then npm install @types/react-datepicker --save-dev
// 9.datefns              ---npm install date-fns@2.16.1 (i.e the right version # by checking npm ls date-fns)



//?--PASSWORD GENERATOR(URL)    ---https://passwordgenerator.net/

//! PACKAGES and LIBRARIES   - ASP.NETCORE
// -----------------
//      1 to 6 ---to Persistence
//      7 & 8  ---to API
// 1- Microsoft.EntityFrameworkCore                        ---for Identity
// 2- Microsoft.EntityFrameworkCore.Relational             ---for Relational
// 3- Microsoft.EntityFrameworkCore.Design                 ---for Design
// 4- Microsoft.EntityFrameworkCore.SqlServer              ---for SqlServer
// 5- Microsoft.EntityFrameworkCore.Tools                  ---for Tools
// 6- dotnet add package FluentValidation.AspNetCore       ---for Validation
// 7- System.IdentityModel.Tokens.Jwt @Microsoft           ---for IdentityModel (to create token)
// 8- Microsoft.AspNetCore.Authentication.JwtBearer        ---to Authentication User to /API/
// 9- install CloudinaryDotNet         
//

// |
// |NB.... once you created any C# project using vsCode make sure add the project to the solution as follow
//       ... creating a project   ---      dotnet new classlib -n Infrastructure
//       ... add to the sln       ---      dotnet sln add  Infrastructure
//       and if this class need to reference any project cd to project and add the reference project as follow
//       ---C:\Users\ghail\projects\ECNActivities   cd to C:\Users\ghail\projects\ECNActivities\Infrastructure> then after
//       ---C:\Users\ghail\projects\ECNActivities\Infrastructure>dotnet add reference ../Application


