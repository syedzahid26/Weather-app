import React, { useState, useEffect } from "react";
import "./Wheather.css";
import searchicon from "../Assests/search-icon.png";
import cloud_icon from "../Assests/cloud-icon.png";
import humidity_icon from "../Assests/humdity.png";
import wind_speed from "../Assests/windspeed.png";
import clear_icon from "../Assests/clear_icon.webp";
import drizzle_icon from "../Assests/drizzle_icon.png";
import rain_icon from "../Assests/rain_icon.png";
import snow_icon from "../Assests/snow_icon.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WheatherApp = () => {
  const [wicon, setWicon] = useState(cloud_icon);
  const [currentTime, setCurrentTime] = useState(new Date());

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=dd94f859a0e52d6e4767fddf735f04a7`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod && data.cod === "404") {
        console.log("Location not found");
        toast.error("Location not found", { position: toast.POSITION.TOP_CENTER });
        return;
      }

      const humidity = document.getElementsByClassName("humidity-percent");
      const wind = document.getElementsByClassName("wind-speed");
      const temp = document.getElementsByClassName("weather-temp");
      const location = document.getElementsByClassName("weather-location");

      humidity[0].innerHTML = data.main.humidity + " %";
      wind[0].innerHTML = data.wind.speed + " km/h";
      temp[0].innerHTML = data.main.temp + " °C";
      location[0].innerHTML = data.name;

      if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
        setWicon(clear_icon);
      } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
        setWicon(cloud_icon);
      } else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
        setWicon(drizzle_icon);
      } else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
        setWicon(drizzle_icon);
      } else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
        setWicon(rain_icon);
      } else if (data.weather[0].icon === "010d" || data.weather[0].icon === "10n") {
        setWicon(rain_icon);
      } else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
        setWicon(snow_icon);
      } else {
        setWicon(clear_icon);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
      toast.error("Message not Sent", { position: toast.POSITION.TOP_CENTER });
    }

    element[0].value = "";
  };

  useEffect(() => {
    // Update the current time every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return <div className="container">
    <div className="title">Weather APP</div>
    <div className="top-bar">
      <input type="text" className="cityInput" placeholder="Search" />
      <div className="search_icon" onClick={() => { search() }}>
        <img src={searchicon} alt="" className="search_img" />
      </div>
    </div>
    <div className="weather-image">
      <img src={wicon} alt="" className="weather-icon" />
    </div>
    <div className="weather-temp">
      24°c
    </div>
    <div className="weather-location">Pulwama</div>
    <div className="time">{currentTime.toLocaleTimeString([], { hour12: true }).toUpperCase()}</div>

    <div className="data-container">
      <div className="element">
        <img src={humidity_icon} alt="" className="icon" />
        <div className="data">
          <div className="humidity-percent">64%</div>
          <div className="text">Humidity</div>
        </div>
      </div>
      <div className="element">
        <img src={wind_speed} alt="" className="icon" />
        <div className="data">
          <div className="wind-speed">18 km/h</div>
          <div className="text">Wind Speed</div>
        </div>
      </div>
    </div>
    <ToastContainer style={{ zIndex: "200000" }} className={"toast"} />
    <div className="developer">©2023 SYED ZAHID | All Rights Reserved</div>
  </div>;
};

export default WheatherApp;
