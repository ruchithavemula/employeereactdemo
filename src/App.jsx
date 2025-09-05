import React, { useState } from "react";
import EmployeeForm from "./EmployeeForm";
import EmployeeList from "./EmployeeList";

function App() {
  const [editing, setEditing] = useState(null);

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", fontFamily: "Arial", padding: 20 }}>
      <h2 style={{ textAlign: "center", color: "#fff" }}>Employee System</h2>
      <EmployeeForm editing={editing} setEditing={setEditing} />
      <EmployeeList setEditing={setEditing} />
    </div>
  );
}

export default App;
