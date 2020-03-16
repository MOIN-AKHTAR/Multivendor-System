import React, { useState, useEffect } from "react";
import "./SelectBar.css";

function SelectBar(props) {
  const { onInput, id } = props;
  const [role, setRole] = useState(props.Arr[0].toLowerCase());
  const SelectValue = e => {
    setRole(e.target.value);
  };
  useEffect(() => {
    onInput(id, role, true);
  }, [id, onInput, role]);
  return (
    <div id="SelectNavBar">
      <span>Role</span>
      <select onChange={SelectValue}>
        {props.Arr.map((Data, Index) => (
          <option value={Data.toLowerCase()} key={Index}>
            {Data.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectBar;
