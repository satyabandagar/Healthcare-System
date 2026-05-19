import React from "react";
import { useTranslation } from "react-i18next";
import { assets } from "../assets/img/assets";
import "./Home.css"
function Home() {

  const { t } = useTranslation();
  return (
    <div className="home">
      <div className="hender">
        <h1 style={{color:"#222"}}>{t("title")} <br /><span>{t("subtitle")}</span> </h1>
        <button><a href="/regsiter">{t("register")}</a></button>
       
      </div>
       <div className="img">
          <img src={assets.header_img} alt="" />
        </div>
    </div>
  );
}

export default Home;
