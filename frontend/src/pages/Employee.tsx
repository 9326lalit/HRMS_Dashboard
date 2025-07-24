import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Employee.css';

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

  const fetchEmployees = async () => {
    try {
      const res = await axios.get('https://hrmsbackend-27mf.onrender.com/api/employees/getall');
      setEmployees(res.data);
    } catch (err) {
      console.error('Error fetching employees:', err);
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
    <div className="employee-container">
      <div className="employee-header">
        <h2>Employees</h2>
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
          className="employee-add-btn"
        >
          + Add
        </button>
      </div>

      <div className="employee-table-wrapper">
        <table className="employee-table">
          <thead>
            <tr>
              <th>Profile</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Position</th>
              <th>Department</th>
              <th>Joining Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={index}>
                <td>
                  <img src={emp.image} alt={emp.name} className="employee-avatar" />
                </td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.phone}</td>
                <td>{emp.position}</td>
                <td>{emp.department}</td>
                <td>{emp.joiningDate}</td>
                <td className="employee-action-cell">
                  <button className="employee-action-btn" onClick={() => setDropdownIndex(index)}>⋮</button>
                  {dropdownIndex === index && (
                    <div className="employee-action-menu">
                      <button
                        onClick={() => openEdit(emp)}
                        className="employee-menu-item"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteEmployee(emp.email)}
                        className="employee-menu-item employee-menu-delete"
                      >
                        Delete
                      </button>
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
        <div className="employee-modal-overlay">
          <div className="employee-modal">
            <h3>
              {editingEmployee ? 'Edit Employee' : 'Add Employee'}
            </h3>
            {['name', 'email', 'phone', 'position', 'department', 'joiningDate'].map((field) => (
              <input
                key={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={form[field as keyof EmployeeType]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                className="employee-input"
              />
            ))}
            <div className="employee-modal-actions">
              <button
                onClick={() => setShowModal(false)}
                className="employee-cancel-btn"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="employee-save-btn"
              >
                {editingEmployee ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employee;