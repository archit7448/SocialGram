import { FollowSidebar, Modal, Post, Sidebar } from "../../Components";
import { useDispatch, useSelector } from "react-redux";
import "./Explore.css";
import { toggleModal } from "../../reducer/postSlice";
import logo from "../../assets/logo.svg";
import { reverseArrayFunc } from "../../Utility/reverseArray/reverseArray";
export const Explore = () => {
  const { posts, modal } = useSelector((store) => store.posts);
  const dispatch = useDispatch();
  let reverseArray = reverseArrayFunc(posts);
  return (
    <main>
      {modal && <Modal />}
      <Sidebar />
      <div className="post-wrapper-div flex-center flex-col">
        <div className="logo-app logo-show">
          SocialBee
          <img src={logo} alt="logo" className="logo-size"></img>
        </div>
        <div
          className="post-header"
          onClick={() => dispatch(toggleModal(true))}
        >
          <h2>What is in your mind?</h2>
          <button className="button-primary button-header-post">POST</button>
        </div>
        {reverseArray.length > 0 ? (
          reverseArray.map((data) => {
            return <Post prop={{ data }} key={data._id} />;
          })
        ) : (
          <></>
        )}
      </div>
      <FollowSidebar />
    </main>
  );
};
