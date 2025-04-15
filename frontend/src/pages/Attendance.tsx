import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '@/config'; // Import the base URL

type AttendanceType = {
  name: string;
  position: string;
  department: string;
  task: string;
  status: 'Present' | 'Absent' | 'Remote';
  image: string;
  _id: string; // Include _id for PUT and DELETE
};

const Attendance: React.FC = () => {
  const [records, setRecords] = useState<AttendanceType[]>([]);
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<AttendanceType | null>(null);

  const [form, setForm] = useState<AttendanceType>({
    name: '',
    position: '',
    department: '',
    task: '',
    status: 'Present',
    image: 'https://randomuser.me/api/portraits/lego/1.jpg',
    _id: '', // Include _id for PUT and DELETE
  });

  // Fetch attendance data on component mount
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/attendance/getall`);
        setRecords(response.data);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchRecords();
  }, []);

  const handleEdit = (rec: AttendanceType) => {
    setEditing(rec);
    setForm({ ...rec }); // Pre-fill the form with existing data
    setShowModal(true);
    setDropdownIndex(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/attendance/${id}`);
      setRecords(records.filter((r) => r._id !== id));
      setDropdownIndex(null);
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      // Remove the _id for new entries (let MongoDB handle it)
      const formData = { ...form };
      if (!editing) {
        delete formData._id;
      }
  
      if (editing) {
        // Update existing record
        await axios.put(`${API_BASE_URL}/api/attendance/${editing._id}`, formData);
        setRecords((prev) =>
          prev.map((r) => (r._id === editing._id ? formData : r))
        );
      } else {
        // Add new record
        const response = await axios.post(`http://localhost:5000/api/attendance/create`, formData);
        setRecords([...records, response.data]);
      }
  
      // Reset form after submission
      setForm({
        name: '',
        position: '',
        department: '',
        task: '',
        status: 'Present',
        image: 'https://randomuser.me/api/portraits/lego/1.jpg',
        _id: '', // Reset ID
      });
      setEditing(null);
      setShowModal(false);
    } catch (error) {
      console.error('Error submitting record:', error);
    }
  };
  

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Attendance</h2>
        <button
          onClick={() => {
            setEditing(null);
            setForm({
              name: '',
              position: '',
              department: '',
              task: '',
              status: 'Present',
              image: 'https://randomuser.me/api/portraits/lego/1.jpg',
              _id: '', // Reset ID
            });
            setShowModal(true);
          }}
          className="bg-purple-700 text-white px-4 py-2 rounded-md"
        >
          + Add
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-purple-900 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Profile</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Position</th>
              <th className="px-4 py-3 text-left">Department</th>
              <th className="px-4 py-3 text-left">Task</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {records.map((rec, index) => (
              <tr key={rec._id}>
                <td className="px-4 py-3">
                  <img src={rec.image} alt={rec.name} className="w-10 h-10 rounded-full" />
                </td>
                <td className="px-4 py-3">{rec.name}</td>
                <td className="px-4 py-3">{rec.position}</td>
                <td className="px-4 py-3">{rec.department}</td>
                <td className="px-4 py-3">{rec.task}</td>
                <td className="px-4 py-3">
                  <select
                    value={rec.status}
                    onChange={(e) => {
                      const updated = [...records];
                      updated[index].status = e.target.value as AttendanceType['status'];
                      setRecords(updated);
                    }}
                    className={`text-sm rounded px-2 py-1 ${rec.status === 'Present' ? 'bg-green-100 text-green-800' : rec.status === 'Remote' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Remote">Remote</option>
                  </select>
                </td>
                <td className="px-4 py-3 relative">
                  <button onClick={() => setDropdownIndex(index)}>⋮</button>
                  {dropdownIndex === index && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-10">
                      <button
                        onClick={() => handleEdit(rec)}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(rec._id)}
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
            <h3 className="text-lg font-semibold mb-4">{editing ? 'Edit Attendance' : 'Add Attendance'}</h3>
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border w-full mb-3 px-3 py-2 rounded"
            />
            <input
              placeholder="Position"
              value={form.position}
              onChange={(e) => setForm({ ...form, position: e.target.value })}
              className="border w-full mb-3 px-3 py-2 rounded"
            />
            <input
              placeholder="Department"
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
              className="border w-full mb-3 px-3 py-2 rounded"
            />
            <input
              placeholder="Task"
              value={form.task}
              onChange={(e) => setForm({ ...form, task: e.target.value })}
              className="border w-full mb-3 px-3 py-2 rounded"
            />
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as AttendanceType['status'] })}
              className="border w-full mb-3 px-3 py-2 rounded"
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Remote">Remote</option>
            </select>
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
                {editing ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;
