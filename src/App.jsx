import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {login,logout} from './store/authSlice';
import authService from "./appwrite/auth";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
function App() {
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState('');
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.userData);
  useEffect(()=>{
    authService.getCurrentUser().then((userData)=>{
      if(userData){
        dispatch(login({userData}));
      }else{
        dispatch(logout());
      }
    }).catch((error)=>{setError(error.message)}).finally(()=>{setLoading(false)})
  },[])
  console.log(userData);
  return (
    <>
      <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
        <div className="w-full block">
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
