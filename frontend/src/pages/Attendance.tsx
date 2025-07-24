// Attendance.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '@/config';
import './Attendance.css'; // Vanilla CSS import

type AttendanceType = {
  name: string;
  position: string;
  department: string;
  task: string;
  status: 'Present' | 'Absent' | 'Remote';
  image: string;
  _id: string;
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
    _id: '',
  });

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/attendance/getall`);
        setRecords(response.data);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };
    fetchRecords();
  }, []);

  const handleEdit = (rec: AttendanceType) => {
    setEditing(rec);
    setForm({ ...rec });
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
      const formData = { ...form };
      if (!editing)  formData._id;

      if (editing) {
        await axios.put(`${API_BASE_URL}/api/attendance/${editing._id}`, formData);
        setRecords((prev) => prev.map((r) => (r._id === editing._id ? formData : r)));
      } else {
        const response = await axios.post(`${API_BASE_URL}/api/attendance/create`, formData);
        setRecords([...records, response.data]);
      }

      setForm({
        name: '',
        position: '',
        department: '',
        task: '',
        status: 'Present',
        image: 'https://randomuser.me/api/portraits/lego/1.jpg',
        _id: '',
      });
      setEditing(null);
      setShowModal(false);
    } catch (error) {
      console.error('Error submitting record:', error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Attendance</h2>
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
              _id: '',
            });
            setShowModal(true);
          }}
          className="add-btn"
        >
          + Add
        </button>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Profile</th>
              <th>Name</th>
              <th>Position</th>
              <th>Department</th>
              <th>Task</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map((rec, index) => (
              <tr key={rec._id}>
                <td><img src={rec.image} alt={rec.name} className="avatar" /></td>
                <td>{rec.name}</td>
                <td>{rec.position}</td>
                <td>{rec.department}</td>
                <td>{rec.task}</td>
                <td>
                  <select
                    value={rec.status}
                    onChange={(e) => {
                      const updated = [...records];
                      updated[index].status = e.target.value as AttendanceType['status'];
                      setRecords(updated);
                    }}
                    className={`status-select ${rec.status.toLowerCase()}`}
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Remote">Remote</option>
                  </select>
                </td>
                <td className="action-cell">
                  <button onClick={() => setDropdownIndex(index)}>⋮</button>
                  {dropdownIndex === index && (
                    <div className="dropdown">
                      <button onClick={() => handleEdit(rec)}>Edit</button>
                      <button className="delete" onClick={() => handleDelete(rec._id)}>Delete</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>{editing ? 'Edit Attendance' : 'Add Attendance'}</h3>
            <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input placeholder="Position" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} />
            <input placeholder="Department" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
            <input placeholder="Task" value={form.task} onChange={(e) => setForm({ ...form, task: e.target.value })} />
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as AttendanceType['status'] })}>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Remote">Remote</option>
            </select>
            <div className="modal-actions">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button onClick={handleSubmit}>{editing ? 'Update' : 'Add'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;
