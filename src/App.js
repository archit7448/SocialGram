import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Explore,
  Home,
  Bookmark,
  SignIn,
  SignUp,
  PrivateRoute,
  RestrictedRoute,
  ProfilePage,
  ProfilePerPage,
} from "./pages/index";
import { useEffect } from "react";
import { getUserData } from "./reducer/user";
import { getBookMark, getPost } from "./reducer/post";
import { useDispatch, useSelector } from "react-redux";
import { updateToken } from "./reducer/userSlice";
function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.users);
  useEffect(() => {
    dispatch(getUserData());
    dispatch(getPost());
    dispatch(updateToken());
  }, []);
  useEffect(() => {
    if (token !== null) {
      dispatch(getBookMark(token));
    }
  }, [token]);
  return (
    <div className="App">
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Explore />} />
          <Route path="/home" element={<Home />} />
          <Route path="/bookmark" element={<Bookmark />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/pageProfile/:profileId" element={<ProfilePerPage />} />
        </Route>
        <Route element={<RestrictedRoute />}>
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
