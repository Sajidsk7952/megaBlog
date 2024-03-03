import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import {Login, Protected, SignUp} from '../src/components'
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AllPostPage from "./pages/AllPostPage.jsx";
import AddPostPage from "./pages/AddPostPage.jsx";
import EditPostPage from "./pages/EditPostPage.jsx";
import Post from "./pages/Post.jsx";

const router = createBrowserRouter([
  {path : '/',element : <App /> , children: [{
    index: true, element: <HomePage />
  },
  {path: '/login',element : <Protected authentication={false}><LoginPage /></Protected>},
  {path:'/signup',element:<Protected authentication={false}><SignUpPage /></Protected>},
  {path:'/allposts',element:<Protected authentication><AllPostPage /></Protected>},
  {path:'/addpost',element:<Protected authentication><AddPostPage /></Protected>},
  {path:`/editpost/:slug`,element:<Protected authentication><EditPostPage /></Protected>},
  {path:'/post/:slug',element:<Protected authentication><Post /></Protected>}
]}
])
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);
