import "./LandingPage.css";
import React from "react";
import exercises from "../images/exercises.jpg";
import workouts from "../images/workouts.jpg";
import stats from "../images/stats.jpg";
import ImageSlider from "../components/ImageSlider/ImageSlider";
import Slide from "../components/ImageSlider/Slide";

const LandingPage = () => {
  return (
    <React.Fragment>
      <div className="main--container">
        <div className="landing--page">
          <div className="title-area">
            <h1>InWorkOut - simple web application for your fitness life</h1>
          </div>

          <ImageSlider>
            <Slide
              img={exercises}
              text="Create unique set of exercises for future workouts"
            />
            <Slide img={workouts} text="Manage your workouts library" />
            <Slide img={stats} text="Explore your results and progress" />
          </ImageSlider>
        </div>
      </div>

      <div className="footer">
        <div className="main--container">
          <p>Created with Apollo GraphQl and React</p>
          <p>solomkaruslan3@gmail.com</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LandingPage;
