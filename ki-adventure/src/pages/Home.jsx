import { useState, useEffect } from "react";
import "../styles/Home.css";
import Header from "../components/Header";

function Home(props) {
  const [inputField, setInput] = useState("");
  const [storySavedString, setStory] = useState("");
  let lang = "de-DE";
  let publikum = "teens";
  const [start, setStart] = useState("");
  const { sendToParent } = props;

  const [dataText, setText] = useState("");
  const [dataChoice1, setChoice1] = useState("");
  const [dataChoice2, setChoice2] = useState("");
  const [dataChoice3, setChoice3] = useState("");

  const [dataAnswer, setAnswer] = useState("");

  /*const synth = window.speechSynthesis;
      const voices = synth.getVoices();
      for (const voice of voices) {
        console.log(voice);
      }*/
  

  async function firstMessage(e) {
    e.preventDefault();
    setStory("");
    setStart(inputField);

    makefirstImage();
    try {
      const response = await fetch(
        `https://text.pollinations.ai/openai/Write a text-adventure the start of a story with 3 sentences about ${inputField} or something similar and the story should be in this language ${props.language} ,your answer should be in this language aswell - this is the storytext.
                Give three choices after the story about what happen next in the story, it should have to do with the actually story and use just 1-2 sentences for every choice.
                It should be like a book for ${publikum}.
                You should not bring portals and different worlds in this story.
                Just give me please the story as answer. And dont write something after end of the story.
                And dont use the characters after this sentence in your message. \n
                And never put a blank line or blank lines.
                And without backslash even when character talk.
                And dont tell us that the real treasure is something different.
                The player should not have the same options like in the story too often.
                If you have numbers write them in letters expect for the form layout numbers before the answers.

                And use for this layout numbers.
                And type everytime from 0 to 5 in the layout with numbers and not with words.
                Give everytime 3 choices what can happen next in the story.
                i want everytime a storytext and 3 choices.
                The Layout should everytime look like this and start with 0 and ends with 5:

                0: name of the story
                1: storytext (type here 1-3 sentences how the story is ongoing)
                2: what happen next in story (type here the choices the player have)
                3: what happen next in story (type here the choices the player have)
                4: what happen next in story (type here the choices the player have)
                5: nothing here
                type everytime until you be by the 5
                and never use line breaks or new lines`,
        {
          method: "POST",
          temperature: 1,
          max_tokens: 500,
          stream: false,
        }
      );

      const data = await response.json();
      let dataString = JSON.stringify(data.choices[0].message.content);

      let str2 = dataString;
      let str3 = str2.replaceAll("\n", "");
      let str4 = str3.slice(0, -1);

      let myHeader1 = str4.substring(
        str4.indexOf("0") + 1,
        str4.lastIndexOf("1")
      );
      let myHeader2 = myHeader1.slice(1);
      sendToParent(myHeader2);

      let myText1 = str4.substring(
        str4.indexOf("1") + 1,
        str4.lastIndexOf("2")
      );
      let myText2 = myText1.slice(1);
      setText(myText2);
      saveStory(myText2);
      let myChoiceOne1 = str4.substring(
        str4.indexOf("2") + 1,
        str4.lastIndexOf("3")
      );
      let myChoiceOne2 = myChoiceOne1.slice(1);
      setChoice1(myChoiceOne2);

      let myChoiceTwo1 = str4.substring(
        str4.indexOf("3") + 1,
        str4.lastIndexOf("4")
      );
      let myChoiceTwo2 = myChoiceTwo1.slice(1);
      setChoice2(myChoiceTwo2);

      let myChoiceThree1 = str4.substring(
        str4.indexOf("4") + 1,
        str4.lastIndexOf("5")
      );
      let myChoiceThree2 = myChoiceThree1.slice(1);
      setChoice3(myChoiceThree2);

      const synth = window.speechSynthesis;
      const voices = synth.getVoices();
      for (const voice of voices) {
        console.log(voice);
      }

      /*var utterance = new SpeechSynthesisUtterance(myText2);
      utterance.pitch = 1;
      utterance.lang = lang;
      utterance.volume = 1; // 0 to 1
      utterance.rate = 1; // 0.1 to 10
      utterance.voice = voices[0];

      window.speechSynthesis.speak(utterance);*/
    } catch (error) {
      console.log(error);
    }
  }

  function saveStory(variable) {
    setStory(`${storySavedString + variable}`);
  }

  function makefirstImage() {
    let overImage = document.getElementById("imageContainer");
    if (overImage.childNodes.length > 0) {
      let thisImage = document.querySelector("#imageID");
      overImage.removeChild(thisImage);
    }
    const img = document.createElement("img");

    img.src = `https://image.pollinations.ai/prompt/${inputField} and for ${publikum} audience and dont let the body transform or have more than 2 legs and arms.`;
    img.id = "imageID";
    img.alt = "Description of the image"; // Alt text for accessibility
    // Append the image to a specific element in the document
    document.getElementById("imageContainer").appendChild(img);

    let myImage = document.getElementById("imageID");
    myImage.style.maxWidth = "100%";
    myImage.style.maxHeight = "200px";
    myImage.style.display = "grid";
    myImage.style.margin = "auto";
  }

  function makeSecondImage() {
    let overImage = document.getElementById("imageContainer");
    if (overImage.childNodes.length > 0) {
      let thisImage = document.querySelector("#imageID");
      overImage.removeChild(thisImage);
    }
    const img = document.createElement("img");

    img.src = `https://image.pollinations.ai/prompt/${inputField} ${dataText} ${dataAnswer} please and for ${publikum} audience and dont let the body transform or have more than 2 legs and arms.`;
    img.id = "imageID";
    img.alt = "Description of the image"; // Alt text for accessibility
    // Append the image to a specific element in the document
    document.getElementById("imageContainer").appendChild(img);

    let myImage = document.getElementById("imageID");
    myImage.style.maxWidth = "100%";
    myImage.style.maxHeight = "200px";
    myImage.style.display = "grid";
    myImage.style.margin = "auto";
  }

  function firstChoice() {
    setAnswer(dataChoice1);
    saveStory(dataChoice1);
    secondMessage();
  }

  function secondChoice() {
    setAnswer(dataChoice2);
    saveStory(dataChoice2);
    secondMessage();
  }

  function thirdChoice() {
    setAnswer(dataChoice3);
    saveStory(dataChoice3);
    secondMessage();
  }

  async function secondMessage() {
    makeSecondImage();

    try {
      const response = await fetch(
        `https://text.pollinations.ai/openai/   
                Write a text-adventure and the story should be in this language ${props.language} ,your answer should be in this language aswell. write 3 sentences what happen next in the story - this is the storytext.
                Here is the story  -- ${start} ${dataText}. ${dataAnswer}. --
                Give three choices what can happen next in the story it should have to do with the actually story and use just 1-2 sentences for every choice.
                It should be like a book for ${publikum}.
                You should not bring portals and different worlds in this story.
                Just give me the story as answer. And dont write something after end of the story.
                And dont use the characters after this sentence in your message. \n
                this answer should not have a break character.
               
                Dont repeat the story and give the player sometimes exciting choices.
                And never put a blank line or blank lines.
                And dont tell us that the real treasure is something different.
                The last sentence of the story must change mostly the story in this or a similar way.
                The player should not have the same options like in the story too often.
                If you have numbers write them in letters expect for the form layout numbers before the answers.

                And use for this layout numbers.
                And type everytime from 0 to 5 in the layout with numbers and not with words.
                Give everytime 3 choices what can happen next in the story.
                
                i want everytime a storytext and 3 choices.
                and never use line breaks or new lines
                The Layout should everytime look like this and start with 0 and ends with 4:
                

                0: storytext (type here 1-3 sentences how the story is ongoing)
                1: what happen next in story (type here the choices the player have)
                2: what happen next in story (type here the choices the player have)
                3: what happen next in story (type here the choices the player have)
                4: nothing here
                type everytime until you be by the 4: ,the last symbols on your message should be 4:`,
        {
          method: "POST",
          temperature: 1,
          max_tokens: 500,
          stream: false,
        }
      );
      const data = await response.json();
      let dataString = JSON.stringify(data.choices[0].message.content);

      let str2 = dataString;
      let str3 = str2.replaceAll("\n", "");
      let str4 = str3.slice(0, -1);

      let myText1 = str4.substring(
        str4.indexOf("0") + 1,
        str4.lastIndexOf("1")
      );
      let myText2 = myText1.slice(1);
      setText(myText2);
      saveStory(myText2);
      let myChoiceOne1 = str4.substring(
        str4.indexOf("1") + 1,
        str4.lastIndexOf("2")
      );
      let myChoiceOne2 = myChoiceOne1.slice(1);
      setChoice1(myChoiceOne2);

      let myChoiceTwo1 = str4.substring(
        str4.indexOf("2") + 1,
        str4.lastIndexOf("3")
      );
      let myChoiceTwo2 = myChoiceTwo1.slice(1);
      setChoice2(myChoiceTwo2);

      let myChoiceThree1 = str4.substring(
        str4.indexOf("3") + 1,
        str4.lastIndexOf("4")
      );
      let myChoiceThree2 = myChoiceThree1.slice(1);
      setChoice3(myChoiceThree2);

      /*const synth = window.speechSynthesis;
      const voices = synth.getVoices();
      for (const voice of voices) {
        //console.log(voice);
      }

      var utterance = new SpeechSynthesisUtterance(str4);
      utterance.pitch = 1;
      utterance.lang = lang;
      utterance.volume = 1; // 0 to 1
      utterance.rate = 1; // 0.1 to 10
      utterance.voice = voices[0];

      window.speechSynthesis.speak(utterance);*/
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="Home">
        <input onChange={(event) => setInput(event.target.value)}></input>
        <button type="button" onClick={firstMessage}>
          Click!
        </button>
        <div id="imageContainer"></div>

        <p className="text">{dataText}</p>
        <button type="button" className="choice" onClick={firstChoice}>
          <p>{dataChoice1}</p>
        </button>
        <button type="button" className="choice" onClick={secondChoice}>
          <p>{dataChoice2}</p>
        </button>
        <button type="button" className="choice" onClick={thirdChoice}>
          <p>{dataChoice3}</p>
        </button>
      </div>
    </>
  );
}

export default Home;
