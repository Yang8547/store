import React from "react";
import "./header.css";

const Header = () => {
  return (
    <div className="admin-header">
      <div className="admin-header-top">
        <span>Welcome,admin</span>
        <a href="javascript:">sign out</a>
      </div>
      <div className="admin-header-bottom">
        <div className="admin-header-bottom-left">HOME</div>
        <div className="admin-header-bottom-right">
          <span>time</span>
          <img src="http://api.map.baidu.com/images/weather/day/leizhenyu.png" alt="" />
          <span>rain</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
