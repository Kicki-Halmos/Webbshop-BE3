import React from "react";
import { useReducer } from "react";
import UserContext from "../contexts/user-context";
import { userApis } from '../api/api';

const {getUser, login, register, updateUser} = userApis;
const defaultUserState = { user: {}};

const userReducer = (state, action) => {
    switch (action.type) {
        case "get_me": return { user: action.user };
        case "update_user": return { user: action.user};
    }
}

const UserProvider = (props) => {
    const [userState, dispatchUserAction] = useReducer(userReducer, defaultUserState);

    const getMeHandler = async() => {
        try {
            const token = localStorage.getItem('token');
        if(token){
          const user = await getUser(token);
          dispatchUserAction({ type: "get_me", user: user.data.data})  
        } 
        } catch(error){
            console.log(error);
        }
      }

      const updateHandler = async(id, fullName, email, phoneNumber, address) => {
        try {
            const token = localStorage.getItem('token');
            if(token){
                const updatedUser = await updateUser(token, id, fullName, email, phoneNumber, address);
                dispatchUserAction({ type: "update_user", user: updatedUser.data.data})  
            }

        }catch(err){
            console.log(err.response.data.data.message);
        }
      }

      const loginHandler = async(email, password) =>{
          try {
            const token = await login(email, password);
            localStorage.setItem('token', token.data.token);
          }catch(err){
              console.log(err.response.data.data.message);
          }
      }

      const registerHandler = async(fullName, email, password, phoneNumber, address) => {
        try {
            await register(fullName, email, password, phoneNumber, address);
        }catch(err){
            console.log(err.response.data.data.message);
        }
      }

      const logoutHandler = () => {
        try {
            localStorage.removeItem("token");
        }catch(err){
            console.log(err);
        }
      };
      
      const userContext = {
          user: userState.user,
          getUser: getMeHandler,
          loginUser: loginHandler,
          registerUser: registerHandler,
          logoutUser: logoutHandler,
          updateUser: updateHandler
      }

      return (
        <UserContext.Provider value={userContext}>
            {props.children}
        </UserContext.Provider>
    );
}
export default UserProvider;
