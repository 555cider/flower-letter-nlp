import React from "react";
import SidebarComponent from "../components/SidebarComponent";
import Fullpage from "../components/Fullpage";

const axios = require("axios");

const Home = ({ history }) => {
  async function testPing() {
    try {
      const response = await axios.get("https://api.flowerletter.co.kr/ping");
      alert(response.data["hello"]);
      console.log(response);
    } catch (error) {
      alert("error");
      console.log(error);
    }
  }

  return (
    <>
      <button onClick={testPing}>Test Ping</button>
      <SidebarComponent></SidebarComponent>
      <Fullpage></Fullpage>
    </>
  );
};
export default Home;
