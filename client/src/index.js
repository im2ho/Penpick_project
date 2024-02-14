import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Link from "./components/LinkList";
import reportWebVitals from "./reportWebVitals";
import ReviewList from "./components/ReviewList";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Link />
  // <ReviewList />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
