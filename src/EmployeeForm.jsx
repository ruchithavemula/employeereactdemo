import React, { useEffect, useState } from "react";

export default function EmployeeForm({ editing, setEditing }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [employees, setEmployees] = useState([]);

  // Load initial mock data
  useEffect(() => {
    const mockEmployees = [
      { id: 1, name: "John Doe", email: "john@example.com", salary: 1000 },
      { id: 2, name: "Jane Smith", email: "jane@example.com", salary: 1200 },
    ];
    setEmployees(mockEmployees);
  }, []);

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
    if (editing) {
      setEmployees(prev =>
        prev.map(emp =>
          emp.id === editing.id
            ? { ...emp, name, email, salary: parseFloat(salary) }
            : emp
        )
      );
      setEditing(null);
    } else {
      const newEmp = {
        id: Date.now(),
        name,
        email,
        salary: parseFloat(salary),
      };
      setEmployees(prev => [...prev, newEmp]);
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
