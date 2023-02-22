import React, { useEffect, useRef, useReducer, useContext } from "react";
import useForm from "./useForm";
import EForm from "./form";
import FormItem from "./formItem";

EForm.useForm = useForm;
EForm.Item = (props) => {
  return <FormItem {...props}></FormItem>;
};
export default EForm;
