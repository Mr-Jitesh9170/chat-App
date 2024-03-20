import axios from "axios";
import React, { useEffect, useState } from 'react';

// SCSS Applied =>
export const Styles1 = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  width: "200px",
  height: "170px",
  overflowY: "auto",
  padding: "12px 16px",
  backgroundColor: "#fff",
  borderRadius: "10px"
}

export const EmojiList = ({ setWriteMassage }) => {
  const [emoj, setEmojis] = useState([]);

  useEffect(() => {
    axios.get("https://emoji-api.com/emojis?access_key=214d3619cb6d7e14b37ef532c713329a60077d15")
      .then((res) => {
        setEmojis(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="emojis" style={Styles1}>
      {emoj.map((emoji, index) => (
        <div key={index} onClick={() => {
          setWriteMassage((prevState) => ({
            ...prevState,
            massage: prevState.massage + (emoji?.character || "")
          }))
        }}>
          <span role="img" aria-label={emoji?.unicodeName}>{emoji?.character}</span>
        </div>
      ))}
    </div>
  );
};
