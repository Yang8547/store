import React from "react";
import Cookies from 'js-cookie';

function Adminhome() {
  const userinfo = Cookies.get('userinfo')? JSON.parse(Cookies.get('userinfo')):{}
  return (
    <>
      Hello {userinfo.username}
    </>
  );
}

export default Adminhome;
