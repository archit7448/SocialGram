import { useDispatch, useSelector } from "react-redux";
import { followUser } from "../../reducer/user";
import "./FollowSidebar.css";
export const FollowSidebar = () => {
  const { users, userData } = useSelector((store) => store.users);
  const dispatch = useDispatch();
  console.log(userData);
  const userFilter = users.filter(
    (data) =>
      data.username !== userData.username &&
      userData.following.every((element) => element._id !== data._id)
  );
  return (
    <div className="follow-sidebar">
      <h1>Who to Follow</h1>{" "}
      {userFilter.length > 0 ? (
        userFilter.map((data) => {
          const { username, profilePic, firstName, lastName, _id } = data;
          return (
            <div key={username}>
              <div
                key={username}
                className="flex-row follow-sidebar-profile flex-center"
              >
                <div className="flex-row">
                  <img src={profilePic} />
                  <div>
                    <h2>{`${firstName} ${lastName}`}</h2>
                    <h3>{username}</h3>
                  </div>
                </div>
                <button
                  className="button-primary button-follow-sidebar"
                  onClick={() => dispatch(followUser(_id))}
                >
                  Follow
                </button>
              </div>
              <hr />
            </div>
          );
        })
      ) : (
        <div>
          <h2>No suggestion</h2>
        </div>
      )}
    </div>
  );
};
