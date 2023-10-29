export default (
  auth = JSON.parse(localStorage.getItem("Profile")) || null,
  action
) => {
  switch (action.type) {
    case "AUTH":
      localStorage.setItem("Profile", JSON.stringify({ ...action?.data }));
      return action?.data;
    case "LOGOUT":
      localStorage.clear();
      return { auth: null };
    case "FOLLOW":
      const details = {
        ...auth,
        user: {
          ...auth.user,
          followings: [...auth.user.followings, action.payload],
        },
      };
      localStorage.setItem("Profile", JSON.stringify(details));
      return details;
    case "UNFOLLOW":
      const detailsUnfollow = {
        ...auth,
        user: {
          ...auth.user,
          followings: auth.user.followings.filter(
            (following) => following !== action.payload
          ),
        },
      };
      localStorage.setItem("Profile", JSON.stringify(detailsUnfollow));
      return detailsUnfollow;
    case "UPDATE_USER":
      const update_user = {
        ...auth,
        user: action.payload,
      };
      return update_user;
    default:
      return auth;
  }
};
