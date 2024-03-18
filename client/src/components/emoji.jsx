import axios from "axios";
import React, { useEffect, useState } from 'react';

const emojiStyle = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  width: "200px",
  height: "170px",
  overflowY: "auto",
  padding: "7px 10px"
}

export const EmojiList = () => {
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
    <div className="emojis" style={emojiStyle}>
      {emoj.map((emoji, index) => (
        <div key={index}>
          <span role="img" aria-label={emoji?.unicodeName}>{emoji?.character}</span>
        </div>
      ))}
    </div>
  );
};
