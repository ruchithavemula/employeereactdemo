import React, { useEffect, useState } from "react";

export default function EmployeeList({ setEditing }) {
  const [employees, setEmployees] = useState([]);

  function fetchEmployees() {
   fetch("http://localhost:2030/EmployeeSpringBoot/api/employees")
      .then(res => res.json())
      .then(data => setEmployees(data))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  function remove(id) {
    if (!window.confirm("Delete this employee?")) return;
    fetch(`http://localhost:8080/api/employees/${id}`, { method: "DELETE" })
      .then(() => fetchEmployees())
      .catch(err => console.error(err));
  }

  return (
    <div>
      <h3 style={{ color: "#fff" }}>Employees</h3>
      <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#333", color: "#fff" }}>
        <thead>
          <tr style={{ backgroundColor: "#646cff" }}>
            <th style={{ padding: 8 }}>ID</th>
            <th style={{ padding: 8 }}>Name</th>
            <th style={{ padding: 8 }}>Email</th>
            <th style={{ padding: 8 }}>Salary</th>
            <th style={{ padding: 8 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(e => (
            <tr key={e.id} style={{ borderBottom: "1px solid #555" }}>
              <td style={{ padding: 8 }}>{e.id}</td>
              <td style={{ padding: 8 }}>{e.name}</td>
              <td style={{ padding: 8 }}>{e.email}</td>
              <td style={{ padding: 8 }}>{e.salary}</td>
              <td style={{ padding: 8 }}>
                <button
                  onClick={() => setEditing(e)}
                  style={{ padding: "4px 8px", marginRight: 6, backgroundColor: "#ff9800", color: "#fff", border: "none", borderRadius: 4 }}
                >
                  Edit
                </button>
                <button
                  onClick={() => remove(e.id)}
                  style={{ padding: "4px 8px", backgroundColor: "#f44336", color: "#fff", border: "none", borderRadius: 4 }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {employees.length === 0 && (
            <tr>
              <td colSpan={5} style={{ padding: 12, textAlign: "center" }}>No employees found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
