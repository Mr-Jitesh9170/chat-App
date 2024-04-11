import React, { useEffect, useState } from 'react';
import { getEmojis } from "../APIs/api";

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
    // get emojis api =>
    getEmojis(setEmojis)
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
