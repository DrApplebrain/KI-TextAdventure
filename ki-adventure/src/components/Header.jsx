import "../styles/Header.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "../pages/Home";
import deutsch from "../images/flags/deutschland.svg";
import englisch from "../images/flags/gb.svg";
import französisch from "../images/flags/france.svg"
import belgisch from "../images/flags/belgien.svg"
import canadisch from "../images/flags/canada.svg"
import czech from "../images/flags/czech.svg"
import italy from "../images/flags/italy.svg"
import mexikanisch from "../images/flags/mexiko.svg"
import holländisch from "../images/flags/netherlands.svg"
import russisch from "../images/flags/russia.svg"
import koreanisch from "../images/flags/south korea.svg"
import spanisch from "../images/flags/spain.svg"
import schweizerisch from "../images/flags/switzerland.svg"
import türkisch from "../images/flags/türkei.svg"
import amerikanisch from "../images/flags/usa.svg"
import japanisch from "../images/flags/jp.svg"


function Header() {
  const [language, setLanguage] = useState("englisch");
  const [headerVar, setHeaderVar] = useState(false);
  const [header, setHeader] = useState(false);
  const [choosenLanguage, setchoosenLanguage] = useState(englisch);

  const [menuClick, setmenuClick] = useState(false);

  
  function getCurrentURL() {
    return window.location.href;
  }

  const handleClick = (param) => {
    setHeaderVar(param);
    setHeader(true);
  };

  useEffect(() => {
   
      const saveLanguage = localStorage.getItem("myLanguage");
      const saveLanguageFlag = localStorage.getItem("myLanguageFlag");

      if(localStorage.getItem("myLanguage") && localStorage.getItem("myLanguageFlag")){
        setLanguage(saveLanguage);
        setchoosenLanguage(saveLanguageFlag);
      }
  
  });

  //let navigate = useNavigate();
  const routeChangeHome = () => {
    window.location.reload();
  };

  let site = "";


  // Example
  if (header === false) {
    let url = getCurrentURL();
    if (url.slice(-1) === "/") {
      site = "Home";
    }
  } else {
    site = headerVar;
  }

  function showFlags() {
    if (menuClick === false) {
      setmenuClick(true);
      loadThis();
    } else {
      setmenuClick(false);
      loadThis();
    }
  }

  function loadThis() {
    let menu = document.querySelector(".menu");
    if (menuClick === true) {
      menu.style.display = "block";
    } else {
      menu.style.display = "none";
    }
  }

  function changeEnglisch() {
    setLanguage("english");
    setchoosenLanguage(englisch);
    localStorage.setItem("myLanguage", "english");
    localStorage.setItem("myLanguageFlag", englisch);
    setmenuClick(false)
    loadThis();
  }

  function changeDeutsch() {
    setLanguage("deutsch");
    setchoosenLanguage(deutsch);
    localStorage.setItem("myLanguage", "deutsch");
    localStorage.setItem("myLanguageFlag", deutsch);
    setmenuClick(false)
    loadThis();
  }

  function changeFranzösisch() {
    setLanguage("französisch");
    setchoosenLanguage(französisch);
    localStorage.setItem("myLanguage", "französisch");
    localStorage.setItem("myLanguageFlag", französisch);
    setmenuClick(false)
    loadThis();
  }

  function changeAmerikanisch() {
    setLanguage("american");
    setchoosenLanguage(amerikanisch);
    localStorage.setItem("myLanguage", "american");
    localStorage.setItem("myLanguageFlag", amerikanisch);
    setmenuClick(false)
    loadThis();
  }

  function changeSpanisch() {
    setLanguage("spanish");
    setchoosenLanguage(spanisch);
    localStorage.setItem("myLanguage", "spanish");
    localStorage.setItem("myLanguageFlag", spanisch);
    setmenuClick(false)
    loadThis();
  }

  function changeJapanisch() {
    setLanguage("japanese");
    setchoosenLanguage(japanisch);
    localStorage.setItem("myLanguage", "japanese");
    localStorage.setItem("myLanguageFlag", japanisch);
    setmenuClick(false)
    loadThis();
  }

  function changeTürkisch() {
    setLanguage("türkisch");
    setchoosenLanguage(türkisch);
    localStorage.setItem("myLanguage", "türkisch");
    localStorage.setItem("myLanguageFlag", türkisch);
    setmenuClick(false)
    loadThis();
  }

  return (
    <>
      <div className="header">
        <div className="house" onClick={routeChangeHome}>
          <i className="fa-solid fa-house-chimney"></i>{" "}
        </div>
        <h1 className="headerh1">{site}</h1>
        <div className="flag" onClick={showFlags}>
          <img className="choosenLanguage" src={choosenLanguage}></img>
        </div>
      </div>

      <div className="menuwrapper">
        <div></div>
        <div></div>
        <div className="menu">
          <div className="flagButton" onClick={changeAmerikanisch}><img className="flags" src={amerikanisch}></img></div>
          <div className="flagButton" onClick={changeEnglisch}><img className="flags" src={englisch}></img></div>
          <div className="flagButton" onClick={changeDeutsch}><img className="flags" src={deutsch}></img></div>
          <div className="flagButton" onClick={changeFranzösisch}><img className="flags" src={französisch}></img></div>
          <div className="flagButton" onClick={changeSpanisch}><img className="flags" src={spanisch}></img></div>
          <div className="flagButton" onClick={changeJapanisch}><img className="flags" src={japanisch}></img></div>
          <div className="flagButton" onClick={changeTürkisch}><img className="flags" src={türkisch}></img></div>
        </div>
      </div>

      <Home language={language} sendToParent={handleClick}></Home>
    </>
  );
}

export default Header;
