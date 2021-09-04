import {
    BrowserRouter,
     Switch,
     Route
   } from "react-router-dom";
   import routes from './routes.js'
   
   
   const Router = ()=> (
       <BrowserRouter>
          <Switch>
           {
               routes.map(route=>(
                   <Route path={route.path} key={route.path} component={route.component} exact={route.exact} />
               ))
           }
         </Switch>
       </BrowserRouter>
   )
   
   export default Router;
   
   