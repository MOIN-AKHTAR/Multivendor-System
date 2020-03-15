import React, { useState, useEffect } from "react";
import "./SelectBar.css";

function SelectBar(props) {
  const { onInput, id } = props;
  const [role, setRole] = useState("user");
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
        <option value="user">User</option>
        <option value="admin">Admin</option>
        <option value="vendor">Vendor</option>
      </select>
    </div>
  );
}

export default SelectBar;
