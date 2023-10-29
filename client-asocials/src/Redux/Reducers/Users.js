export default (users = [], action) => {
  switch (action.type) {
    case "GETALLUSERS":
      console.log(action.data);
      return action.data;
    case "GET_USER_BY_ID":
      return action.data;
    default:
      return users;
  }
};
