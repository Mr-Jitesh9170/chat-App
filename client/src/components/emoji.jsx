// API URL => "https://emoji-api.com/emojis?access_key=214d3619cb6d7e14b37ef532c713329a60077d15";

import React from 'react';

export const EmojiList = () => {
  return (
    <div>
      {emojis.map((emoji, index) => (
        <div key={index}>
          <span role="img" aria-label={emoji?.unicodeName}>{emoji?.character}</span>
        </div>
      ))}
    </div>
  );
};
const emojis = [
  {
    slug: "grinning-face",
    character: "\ud83d\ude00",
    unicodeName: "grinning face",
    codePoint: "1F600",
    group: "smileys-emotion",
    subGroup: "face-smiling"
  },
  {
    slug: "grinning-face-with-big-eyes",
    character: "\ud83d\ude03",
    unicodeName: "grinning face with big eyes",
    codePoint: "1F603",
    group: "smileys-emotion",
    subGroup: "face-smiling"
  },
  {
    slug: "grinning-face-with-smiling-eyes",
    character: "\ud83d\ude04",
    unicodeName: "grinning face with smiling eyes",
    codePoint: "1F604",
    group: "smileys-emotion",
    subGroup: "face-smiling"
  },
  {
    slug: "beaming-face-with-smiling-eyes",
    character: "\ud83d\ude01",
    unicodeName: "beaming face with smiling eyes",
    codePoint: "1F601",
    group: "smileys-emotion",
    subGroup: "face-smiling"
  },
  {
    slug: "grinning-squinting-face",
    character: "\ud83d\ude06",
    unicodeName: "grinning squinting face",
    codePoint: "1F606",
    group: "smileys-emotion",
    subGroup: "face-smiling"
  }
];


