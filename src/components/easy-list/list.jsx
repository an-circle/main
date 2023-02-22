import React from "react";
import ListContext from "./reducer/listContext";

export default function EasyList(props) {
  return (
    <ListContext.Provider value={props?.instance}>
      {props?.children}
    </ListContext.Provider>
  );
}
