"use client";
import React, { FC, useState } from "react";
import { ConverSationStyle } from "../api/openai/route";

interface ToggleProps {
  onClick: (ConverSationStyle: ConverSationStyle) => void;
}

export const ConversationStyleToggle: FC<ToggleProps> = (props) => {
  const [selected, setSelected] = useState<ConverSationStyle>("GENERAL");

  const onClick = (style: ConverSationStyle) => {
    setSelected(style);
    props.onClick(style);
  };

  return (
    <div className="bg-slate-900 rounded-full p-1">
      <ul className="flex justify-between gap-1 text-sm items-stretch">
        <ToggleItem
          title="General"
          isSelected={selected === "GENERAL"}
          onClick={() => onClick("GENERAL")}
        >
          ⭐
        </ToggleItem>
        <ToggleItem
          title="Housing"
          isSelected={selected === "HOUSING"}
          onClick={() => onClick("HOUSING")}
        >
          🏠
        </ToggleItem>
        <ToggleItem
          title="Children, Youth & Families"
          isSelected={selected === "CHILDREN_YOUTH_FAMILIES"}
          onClick={() => onClick("CHILDREN_YOUTH_FAMILIES")}
        >
          🍼
        </ToggleItem>
        <ToggleItem
          title="Senior Servies"
          isSelected={selected === "SENIOR_SERVICES"}
          onClick={() => onClick("SENIOR_SERVICES")}
        >
          🤝
        </ToggleItem>
      </ul>
    </div>
  );
};

interface ToggleItemProps {
  children?: React.ReactNode;
  title: string;
  isSelected: boolean;
  onClick?: () => void;
}

export const ToggleItem: FC<ToggleItemProps> = (props) => {
  return (
    <li
      title={props.title}
      onClick={props.onClick}
      className={`border gap-2 border-transparent py-2 hover:bg-slate-800 cursor-pointer grow justify-center flex rounded-full flex-1 items-center  ${
        props.isSelected
          ? "border-x-slate-700 border-b-slate-700 border-t-slate-600 bg-slate-700 hover:bg-slate-700 hover:text-slate-50 fill-white px-3"
          : ""
      }`}
    >
      <span> {props.children}</span>
      {props.isSelected ? props.title : ""}
    </li>
  );
};
export type { ConverSationStyle };

