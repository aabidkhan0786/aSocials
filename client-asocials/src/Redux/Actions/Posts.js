import * as API from "../index.js"

//actions
export const getPosts = () =>async (dispatch)=>{
    try {
        const {data} =  await API.fetchAllPosts();
        // dispatch({type:"FETCH_ALL",payload:data})
    } catch (error) {
        console.log(error);
    }
}


export const createPosts = (newPost) =>async (dispatch)=>{
    try {
        const {data}= await API.createPosts(newPost);
        dispatch({type:"CREATE_POSTS", payload:data})
    } catch (error) {
       console.log(error) 
    }
}

export const getMyTimeline = (id) => async (dispatch)=> {
    try {
        console.log(id);
        const {data} = await API.getMyTimeline(id);
        console.log(data);
        dispatch({type:'MY_TIMELINE',data})
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (postid,userid)=> async (dispatch)=>{
    try {
        const {data} = await API.likePost(postid,userid)
        dispatch({type:"LIKE_POST",payload:data})
    } catch (error) {
        console.log(error);
    }
}
export const updatePost = (postId,updateDetails)=> async (dispatch)=>{
    try {
        const {data} = await API.updatePost(postId,updateDetails)
        dispatch({type:"UPDATE_POST",payload:data})
    } catch (error) {
        console.log(error);
    }
}
export const deletePost = (postId)=> async (dispatch)=>{
    try {
        const {data} = await API.deletePost(postId)
        dispatch({type:"DELETE_POST",payload:data})
    } catch (error) {
        console.log(error);
    }
}