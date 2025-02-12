import React, { useState } from "react";

export interface CardProps {
  title: string;
  details: string;
}

export const Card = (props: CardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="shadow border border-black transition-all cursor-pointer">
      <p
        className="text-lg flex justify-between p-4"
        onClick={() => setExpanded(!expanded)}
      >
        {props.title}
        <svg
          className={`w-6 h-6 text-black transition-transform duration-300 ${
            expanded ? "rotate-180" : ""
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 9-7 7-7-7"
          />
        </svg>
      </p>
      {expanded && (
        <p className="select-text cursor-text border mx-4 py-4 border-t-black border-transparent">
          {props.details}
        </p>
      )}
    </div>
  );
};
