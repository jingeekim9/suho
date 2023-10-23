import React, { useState } from 'react'
import store from "./store"
import { Provider } from "react-redux"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import PrivateScreen from './view/Component/Login/screens/PrivateScreen'
import LoginScreen from './view/Component/Login/screens/LoginScreen'
import RegisterScreen from './view/Component/Login/screens/RegisterScreen'
import ForgotPasswordScreen from './view/Component/Login/screens/ForgotPasswordScreen'
import ResetPasswordScreen from './view/Component/Login/screens/ResetPasswordScreen'

import Main from './view/Pages/Main'
import Bookmark from './view/Pages/Review/Bookmark';
import History from './view/Pages/Review/History';
import Reference from './view/Pages/Reference'



import Layout from './view/Layout/Layout';
import Recommend from './view/Pages/Recommend'


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route exact path="/Main" element={<Main />}/>
            <Route exact path="/Review" element={<Navigate replace to="/Review/Bookmark"/>}/>
            <Route exact path="/Review/Bookmark" element={<Bookmark />}/>
            <Route exact path="/Review/History" element={<History />}/>
            <Route exact path="/Reference" element={<Reference/>}/>
            <Route exact path="/Recommended" element={<Recommend />}/>
            {/* <Route path="/" element={<Navigate replace to="/Main"/>}/> */}
            <PrivateRoute exact path="/" component={PrivateScreen} />
            <Route exact path="/login" component={LoginScreen} />
            <Route exact path="/register" component={RegisterScreen} />
            <Route exact path="/forgotpassword" component={ForgotPasswordScreen} />
            <Route exact path="/passwordreset/:resetToken" component={ResetPasswordScreen} />
          </Routes>                    
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}
  
export default App;