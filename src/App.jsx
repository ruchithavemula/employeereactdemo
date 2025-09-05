import React, { useState } from "react";
import EmployeeForm from "./EmployeeForm";
import EmployeeList from "./EmployeeList";

function App() {
  const [editing, setEditing] = useState(null);
  const [reloadFlag, setReloadFlag] = useState(false);

  const triggerReload = () => setReloadFlag(prev => !prev);

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", fontFamily: "Arial", padding: 20 }}>
      <h2 style={{ textAlign: "center", color: "#fff" }}>Employee CRUD (React + Spring Boot)</h2>
      <EmployeeForm editing={editing} setEditing={setEditing} refresh={triggerReload} />
      <EmployeeList setEditing={setEditing} key={reloadFlag} />
    </div>
  );
}

export default App;
