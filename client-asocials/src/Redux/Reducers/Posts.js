export default (post = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "CREATE_POST":
      return [...post, action.payload];
    case "MY_TIMELINE":
      return action?.data;
    case "LIKE_POST":
      return post.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case "UPDATE_POST":
      return post.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case "DELETE_POST":
      return post.filter((post) => post._id !== action.payload);
    default:
      return post;
  }
};
