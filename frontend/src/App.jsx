import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CourseDetailPage from "./pages/CourseDetailPage";
import Profile from "./pages/BuyedCourse";
import CourseListingPage from "./pages/CourseListingPage";
import Navbar from "./components/Navbar";
import { Provider } from 'react-redux';
import { store } from './store/store';


const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<CourseListingPage />} />
          <Route path="/courses/:courseId" element={<CourseDetailPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
