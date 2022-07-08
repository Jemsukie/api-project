import React from "react";

const TextWithHighlight = ({ text = "", term = "" }) => {
  if (!term.trim()) {
    return <span>{text}</span>;
  }
  const regex = new RegExp(`(${term})`, "gi");
  const parts = text.split(regex);

  return (
    <span>
      {parts.filter(String).map((part, i) => {
        return regex.test(part) ? (
          <>
            {/*<mark key={i}>{part}</mark>*/}
            <span key={i} className="highlight">
              {part}
            </span>
          </>
        ) : (
          <span key={i}>{part}</span>
        );
      })}
    </span>
  );
};

export default TextWithHighlight;
