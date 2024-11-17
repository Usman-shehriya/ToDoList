//  import { navigate } from "react-router-dom"

export const PrivateRoute =({isAuthentication, Component})=>{
    console.log(isAuthentication);
    
   if(!isAuthentication){
    return window.location.href = '/';
   }else{
    return <Component />
   }
}
export const PublicRoute =({isAuthentication, Component})=>{
    if(!isAuthentication){
     return <Component />
    }else{
     return window.location.href= '/ToDoList';
    }
 }