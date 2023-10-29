import * as Api from "../index.js"

export const logIn = (loginDetails,history)=> async (dispatch)=>{
    try {
        const {data} = await Api.logIn(loginDetails)
        dispatch({type:"AUTH", data})
        history("/auth")
    } catch (error) {
        console.log(error.response.data.msg);
        alert(error.response.data.msg)
    }
}
export const register = (loginDetails,history)=> async (dispatch)=>{
    try {
        const {data} = await Api.register(loginDetails)
        dispatch({type:"AUTH", data})
        history("/auth")
    } catch (error) {
        console.log(error);
        alert(error.response.data.msg)
    }
}

export const logout = (history)=> async (dispatch)=>{
    try {
        dispatch({type:"LOGOUT"})
        history("/login")
    } catch (error) {
        console.log(error);
    }
}

export const getAllUsers = ()=> async (dispatch)=>{
    try {
        const {data} = await Api.getAllUsers()
        console.log({data});
        // dispatch({type:"GETALLUSERS",data})
    } catch (error) {
        console.log(error);
    }
}

export const findUser =async (userId)=> {
    try {
        // console.log(userId);
        const {data} = await Api.findUser(userId)
        console.log(data);
        return data
        // dispatch({type:'GET_USER_BY_ID', data})
    } catch (error) {
        console.log(error);   
    }
}

export const updateUser = (userId,userDetails)=> async (dispatch) =>{
    try {
        const result = await Api.updateUser(userId,userDetails)
        console.log(result);
        dispatch({type:'UPDATE_USER',payload: result.data})
    } catch (error) {
        console.log(error);
    }
}

export const followUser = (followerId,userId) =>async (dispatch)=> {
    try {
        // const {data} = await Api.followUser(followerId,userId)
        // console.log(data);
        dispatch({type:"FOLLOW", payload:followerId})
        // return data
    } catch (error) {
        console.log(error);
    }
}
export const unFollowUser = (followerId,userId) =>async (dispatch)=> {
    try {
        // const {data} = await Api.followUser(followerId,userId)
        // console.log(data);
        dispatch({type:"UNFOLLOW", payload:followerId})
        // return data
    } catch (error) {
        console.log(error);
    }
}
// export const followUser = (followerId,userId) => async (dispatch)=>{
//     try {
//         const {data} = await Api.followUser(followerId,userId)
//         console.log(data);
//         // dispatch({type:"FOLLOW_USER", data})
//         return data
//     } catch (error) {
        
//     }
// }
