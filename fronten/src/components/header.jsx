import React, { useState, useEffect } from "react";
import { getKeyThenIncreaseKey } from "antd/lib/message";

import "./header.css";
import Cookies from "js-cookie";
import { reqWeather } from "../api/ajax";

const Header = props => {
  const [currentTime, setCurrenTime] = useState(formateDate(Date.now()));
  const [dayPictureUrl, setDayPictureUrl] = useState("");
  const [weather, setWeather] = useState("");

  function formateDate(time) {
    if (!time) return "";
    let date = new Date(time);
    return (
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getDate() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds()
    );
  }

  useEffect(() => {
    // update time each 1 second
    setInterval(() => {
      setCurrenTime(formateDate(Date.now()));
    }, 1000);
    // get weather info
    reqWeather("beijing").then(res => {
      console.log("res", res);
      setDayPictureUrl(res.dayPictureUrl);
      setWeather(res.weather);
    });
  }, []);

  const userinfo = Cookies.getJSON("userinfo") || {};
  return (
    <div className="admin-header">
      <div className="admin-header-top">
        <span>Welcome,{userinfo.username}</span>
        <a href="javascript:">sign out</a>
      </div>
      <div className="admin-header-bottom">
        <div className="admin-header-bottom-left">HOME</div>
        <div className="admin-header-bottom-right">
          <span>{currentTime}</span>
          <img src={dayPictureUrl} alt="" />
          <span>{weather}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
