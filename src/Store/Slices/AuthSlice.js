import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice ({
    name:'auth',                        //step 1>name of slice 
    initialState:{                      //initial state..
        username:'',
        email:'',
        id:'',
        password:'',
        isAuth:false

    },
    reducers:{                          //reducers where we will write reducers..
        logInUser:(state,action) => {
            state.username=action.payload.username;
            state.email=action.payload.email;
            state.id=action.payload._id;
            state.password=action.payload.password;
            state.isAuth=true;
            // console.log("all state data",action.payload);
            // console.log("state email is",state.email);
            // console.log("state usernameis",state.username);
            // console.log("state id is",state.id);
            // console.log("authenticated",state.isAuth);

        },
        logOutUser:(state,action) => {
            state.username='';
            state.password='';
            state.email='';
            state.id='';
            state.isAuth=false;

        },
         
    }
})

console.log("authSlice is==>>",authSlice.actions);

export const {logInUser,logOutUser} = authSlice.actions;
export default authSlice.reducer;
