import React from "react";

export default function Custom(props) {
  return props?.render(props?.value);
}
