import React, { useState, useRef, useEffect } from "react";

function ToggleText({ value }) {
  const [expanded, setExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const contentElement = contentRef.current;
    if (contentElement.scrollHeight > contentElement.clientHeight) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, []);

  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <>
      <p
        ref={contentRef}
        className={`content overflow-hidden transition-transform ${
          expanded ? "max-h-none line-clamp-none" : "max-h-24 line-clamp-4"
        }`}
      >
        {value}
      </p>
      {showButton && (
        <span
          className="toggle-btn text-blue-500 hover:text-red-600 hover:underline  cursor-pointer"
          onClick={toggleExpanded}
        >
          {expanded ? "Show less" : "Show more"}
        </span>
      )}
    </>
  );
}

export default ToggleText;
