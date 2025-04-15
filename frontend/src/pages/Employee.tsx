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

  const fetchEmployees = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/employees/getall');
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
      await axios.delete(`http://localhost:5000/api/employees/${email}`);
      fetchEmployees();
    } catch (err) {
      console.error('Error deleting employee:', err);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingEmployee) {
        await axios.put(`http://localhost:5000/api/employees/${editingEmployee.email}`, form);
      } else {
        await axios.post('http://localhost:5000/api/employees/create', form);
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
    <div className="min-h-screen bg-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Employees</h2>
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
          className="bg-purple-700 text-white px-4 py-2 rounded-md"
        >
          + Add
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-purple-900 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Profile</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Position</th>
              <th className="px-4 py-3 text-left">Department</th>
              <th className="px-4 py-3 text-left">Joining Date</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {employees.map((emp, index) => (
              <tr key={index}>
                <td className="px-4 py-3">
                  <img src={emp.image} alt={emp.name} className="w-10 h-10 rounded-full" />
                </td>
                <td className="px-4 py-3">{emp.name}</td>
                <td className="px-4 py-3">{emp.email}</td>
                <td className="px-4 py-3">{emp.phone}</td>
                <td className="px-4 py-3">{emp.position}</td>
                <td className="px-4 py-3">{emp.department}</td>
                <td className="px-4 py-3">{emp.joiningDate}</td>
                <td className="px-4 py-3 relative">
                  <button onClick={() => setDropdownIndex(index)}>⋮</button>
                  {dropdownIndex === index && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-50">
                      <button
                        onClick={() => openEdit(emp)}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteEmployee(emp.email)}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
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
        <div className="fixed inset-0 bg-blue bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {editingEmployee ? 'Edit Employee' : 'Add Employee'}
            </h3>
            {['name', 'email', 'phone', 'position', 'department', 'joiningDate'].map((field) => (
              <input
                key={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={form[field as keyof EmployeeType]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                className="border w-full mb-3 px-3 py-2 rounded"
              />
            ))}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-purple-700 text-white rounded"
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
