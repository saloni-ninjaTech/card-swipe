import React, { useState } from "react";
import { Card } from "./Card";

export const App = props => {
  const [data, setData] = useState([0, 1, 2, 3, 4]);
  var box = data.map((item, i) => {
    return <Card key={i} no={i} />;
  });
  return <div className="app">{box}</div>;
};