import React, { useState, useEffect } from "react";
import { getKeyThenIncreaseKey } from "antd/lib/message";
import { withRouter } from "react-router-dom";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import "./header.css";
import Cookies from "js-cookie";
import { reqWeather } from "../api/ajax";
import menuList from "../config/menucofig";
import LinkedButton from "./linked-button";

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
  const getTitle = () => {
    const path = props.location.pathname;
    let title;
    menuList.forEach(item => {
      if (item.key === path) {
        // if current path equals item key, the title is current item key
        title = item.title;
      } else if (item.children) {
        //  find title in children
        const cItem = item.children.find(
          cItem => path.indexOf(cItem.key) === 0
        );
        if (cItem) {
          title = cItem.title;
        }
      }
    });
    return title;
  };
  // handle signout modal
  const handleLogout = e => {
    e.preventDefault();
    Modal.confirm({
      title: "Do you Want to Logout?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        // console.log('OK');
        Cookies.remove("userinfo"); //remove useinfo
        props.history.replace("/admin/login"); //redirect to login page
      },
      onCancel() {
        // console.log('Cancel');
      }
    });
  };

  useEffect(() => {
    // update time each 1 second
    const interval = setInterval(() => {
      setCurrenTime(formateDate(Date.now()));
    }, 1000);
    // get weather info
    reqWeather("beijing").then(res => {
      console.log("res", res);
      setDayPictureUrl(res.dayPictureUrl);
      setWeather(res.weather);
    });
    // unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  const userinfo = Cookies.getJSON("userinfo") || {};
  const title = getTitle();
  return (
    <div className="admin-header">
      <div className="admin-header-top">
        <span>Welcome,{userinfo.username}</span>
        <LinkedButton onClick={handleLogout}>sign out</LinkedButton>
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
