import React, { useEffect, useState } from 'react';
import axios from 'axios';

type EmployeeType = {
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  joiningDate: string;
  image: string;
};

const Employee: React.FC = () => {
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<EmployeeType | null>(null);
  const [form, setForm] = useState<EmployeeType>({
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    joiningDate: '',
    image: 'https://randomuser.me/api/portraits/lego/1.jpg',
  });
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://hrmsbackend-27mf.onrender.com/api/employees/getall');
      setEmployees(res.data);
    } catch (err) {
      console.error('Error fetching employees:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const openEdit = (emp: EmployeeType) => {
    setForm(emp);
    setEditingEmployee(emp);
    setShowModal(true);
    setDropdownIndex(null);
  };

  const deleteEmployee = async (email: string) => {
    try {
      await axios.delete(`https://hrmsbackend-27mf.onrender.com/api/employees/${email}`);
      fetchEmployees();
    } catch (err) {
      console.error('Error deleting employee:', err);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingEmployee) {
        await axios.put(`https://hrmsbackend-27mf.onrender.com/api/employees/${editingEmployee.email}`, form);
      } else {
        await axios.post('https://hrmsbackend-27mf.onrender.com/api/employees/create', form);
      }

      setForm({
        name: '',
        email: '',
        phone: '',
        position: '',
        department: '',
        joiningDate: '',
        image: 'https://randomuser.me/api/portraits/lego/1.jpg',
      });
      setEditingEmployee(null);
      setShowModal(false);
      fetchEmployees();
    } catch (err) {
      console.error('Error saving employee:', err);
    }
  };

  return (
    <div style={{
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "32px",
      background: "#f7f8fa",
      minHeight: "100vh",
      fontFamily: "'Segoe UI', Arial, sans-serif"
    }}>
      {loading ? (
        <div style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "22px",
          color: "#6b21a8",
          fontWeight: 600
        }}>
          Loading employees...
        </div>
      ) : (
        <>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "28px"
          }}>
            <h2 style={{
              fontSize: "26px",
              fontWeight: 700,
              color: "#6b21a8"
            }}>Employees</h2>
            <button
              onClick={() => {
                setEditingEmployee(null);
                setForm({
                  name: '',
                  email: '',
                  phone: '',
                  position: '',
                  department: '',
                  joiningDate: '',
                  image: 'https://randomuser.me/api/portraits/lego/1.jpg',
                });
                setShowModal(true);
              }}
              style={{
                background: "linear-gradient(90deg, #6b21a8 60%, #6b21a8 100%)",
                color: "#fff",
                padding: "10px 28px",
                border: "none",
                borderRadius: "6px",
                fontWeight: 600,
                fontSize: "16px",
                cursor: "pointer",
                transition: "background 0.2s"
              }}
              onMouseOver={e => (e.currentTarget.style.background = "linear-gradient(90deg, #5b21b6 60%, #a78bfa 100%)")}
              onMouseOut={e => (e.currentTarget.style.background = "linear-gradient(90deg, #7c3aed 60%, #a78bfa 100%)")}
            >
              + Add
            </button>
          </div>

          <div style={{
            overflowX: "auto",
            borderRadius: "12px",
            boxShadow: "0 2px 16px rgba(60, 72, 88, 0.08)",
            background: "#fff"
          }}>
            <table style={{
              width: "100%",
              borderCollapse: "separate",
              borderSpacing: 0,
              background: "#fff",
              borderRadius: "12px",
              overflow: "hidden"
            }}>
              <thead>
                <tr>
                  {["Profile", "Name", "Email", "Phone", "Position", "Department", "Joining Date", "Action"].map((th) => (
                    <th key={th} style={{
                      background: "linear-gradient(90deg, #6b21a8 60%, #6b21a8 100%)",
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: "15px",
                      padding: "14px 16px",
                      textAlign: "left"
                    }}>{th}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {employees.map((emp, index) => (
                  <tr key={index} style={{
                    borderBottom: "1px solid #e5e7eb",
                    transition: "background 0.2s"
                  }}>
                    <td style={{ padding: "14px 16px" }}>
                      <img src={emp.image} alt={emp.name} style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "2px solid #a78bfa"
                      }} />
                    </td>
                    <td style={{ padding: "14px 16px" }}>{emp.name}</td>
                    <td style={{ padding: "14px 16px" }}>{emp.email}</td>
                    <td style={{ padding: "14px 16px" }}>{emp.phone}</td>
                    <td style={{ padding: "14px 16px" }}>{emp.position}</td>
                    <td style={{ padding: "14px 16px" }}>{emp.department}</td>
                    <td style={{ padding: "14px 16px" }}>{emp.joiningDate}</td>
                    <td style={{ position: "relative", padding: "14px 16px" }}>
                      <button
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "20px",
                          color: "#6b7280",
                          padding: "4px"
                        }}
                        onClick={() => setDropdownIndex(index)}
                      >⋮</button>
                      {dropdownIndex === index && (
                        <div style={{
                          position: "absolute",
                          right: 0,
                          top: "36px",
                          background: "#fff",
                          border: "1px solid #e5e7eb",
                          boxShadow: "0 2px 8px rgba(60, 72, 88, 0.12)",
                          borderRadius: "8px",
                          minWidth: "120px",
                          zIndex: 10,
                          display: "flex",
                          flexDirection: "column"
                        }}>
                          <button
                            style={{
                              padding: "10px 18px",
                              background: "none",
                              border: "none",
                              textAlign: "left",
                              fontSize: "15px",
                              cursor: "pointer",
                              transition: "background 0.15s"
                            }}
                            onClick={() => openEdit(emp)}
                          >Edit</button>
                          <button
                            style={{
                              padding: "10px 18px",
                              background: "none",
                              border: "none",
                              textAlign: "left",
                              fontSize: "15px",
                              cursor: "pointer",
                              color: "#e11d48",
                              transition: "background 0.15s"
                            }}
                            onClick={() => deleteEmployee(emp.email)}
                          >Delete</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal */}
          {showModal && (
            <div style={{
              position: "fixed",
              inset: 0,
              background: "rgba(60, 72, 88, 0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 100
            }}>
              <div style={{
                background: "#fff",
                padding: "32px 28px 24px 28px",
                borderRadius: "12px",
                boxShadow: "0 4px 32px rgba(60, 72, 88, 0.18)",
                width: "380px",
                display: "flex",
                flexDirection: "column",
                gap: "14px"
              }}>
                <h3 style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  marginBottom: "10px",
                  color: "#7c3aed"
                }}>
                  {editingEmployee ? 'Edit Employee' : 'Add Employee'}
                </h3>
                {['name', 'email', 'phone', 'position', 'department', 'joiningDate'].map((field) => (
                  <input
                    key={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={form[field as keyof EmployeeType]}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    style={{
                      padding: "10px 14px",
                      borderRadius: "6px",
                      border: "1px solid #d1d5db",
                      fontSize: "15px",
                      background: "#fff"
                    }}
                  />
                ))}
                <div style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                  marginTop: "10px"
                }}>
                  <button
                    style={{
                      background: "#e5e7eb",
                      color: "#374151",
                      padding: "8px 18px",
                      border: "none",
                      borderRadius: "6px",
                      fontWeight: 500,
                      cursor: "pointer",
                      transition: "background 0.2s"
                    }}
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    style={{
                      background: "linear-gradient(90deg, #7c3aed 60%, #a78bfa 100%)",
                      color: "#fff",
                      padding: "8px 18px",
                      border: "none",
                      borderRadius: "6px",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "background 0.2s"
                    }}
                    onMouseOver={e => (e.currentTarget.style.background = "linear-gradient(90deg, #5b21b6 60%, #a78bfa 100%)")}
                    onMouseOut={e => (e.currentTarget.style.background = "linear-gradient(90deg, #7c3aed 60%, #a78bfa 100%)")}
                  >
                    {editingEmployee ? 'Update' : 'Add'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Employee;