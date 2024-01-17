/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authservice from "./AppWrite/auth";
import login from "./store/authSlice";
import logout from "./store/authSlice";
import "./App.css";
import { Header, Footer } from "./components/Index";
import Outlet from "react-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authservice
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return !loading ? (
    
      <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
        <div className="w-full block">
        <Header />
        <main>
           TODO: { /*<Outlet /> */}
        </main>
        <Footer />
        </div>
        
      </div>
    
  ) : null;
}

export default App;
