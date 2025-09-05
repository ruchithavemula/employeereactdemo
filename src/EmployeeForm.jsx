import React, { useEffect, useState } from "react";

export default function EmployeeForm({ editing, setEditing, refresh }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");

  useEffect(() => {
    if (editing) {
      setName(editing.name || "");
      setEmail(editing.email || "");
      setSalary(editing.salary || "");
    } else {
      setName("");
      setEmail("");
      setSalary("");
    }
  }, [editing]);

  function submit(e) {
    e.preventDefault();
    const emp = { name, email, salary: parseFloat(salary) };

    if (editing) {
      fetch(`http://localhost:8080/api/employees/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emp)
      })
        .then(() => {
          setEditing(null);
          refresh();
        })
        .catch(err => console.error(err));
    } else {
      fetch("http://localhost:8080/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emp)
      })
        .then(() => {
          refresh();
        })
        .catch(err => console.error(err));
    }

    setName("");
    setEmail("");
    setSalary("");
  }

  return (
    <form onSubmit={submit} style={{ marginBottom: 30, textAlign: "center" }}>
      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
        style={{ marginRight: 10, padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        style={{ marginRight: 10, padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
      />
      <input
        placeholder="Salary"
        value={salary}
        onChange={e => setSalary(e.target.value)}
        required
        style={{ marginRight: 10, padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
      />
      <button type="submit" style={{ padding: "8px 16px", backgroundColor: "#646cff", color: "#fff", border: "none", borderRadius: 4 }}>
        {editing ? "Update" : "Add"}
      </button>
      {editing && (
        <button
          type="button"
          onClick={() => setEditing(null)}
          style={{ padding: "8px 16px", marginLeft: 10, backgroundColor: "#f44336", color: "#fff", border: "none", borderRadius: 4 }}
        >
          Cancel
        </button>
      )}
    </form>
  );
}
