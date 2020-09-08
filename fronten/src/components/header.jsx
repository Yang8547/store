import React, { useState, useEffect } from "react";
import { getKeyThenIncreaseKey } from "antd/lib/message";
import {withRouter} from 'react-router-dom';
import "./header.css";
import Cookies from "js-cookie";
import { reqWeather } from "../api/ajax";
import menuList from "../config/menucofig";

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

  // get the title and display on header
  const getTitle = ()=> {
    const path = props.location.pathname;
    let title;
    menuList.forEach(item => {
      if (item.key===path) { // if current path equals item key, the title is current item key
        title = item.title
      } else if (item.children) {
        //  find title in children
        const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
        if(cItem) {
          title = cItem.title
        }
      }
    })
    return title
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
  const title = getTitle();
  return (
    <div className="admin-header">
      <div className="admin-header-top">
        <span>Welcome,{userinfo.username}</span>
        <a href="javascript:">sign out</a>
      </div>
      <div className="admin-header-bottom">
        <div className="admin-header-bottom-left">{title}</div>
        <div className="admin-header-bottom-right">
          <span>{currentTime}</span>
          <img src={dayPictureUrl} alt="" />
          <span>{weather}</span>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Header);
