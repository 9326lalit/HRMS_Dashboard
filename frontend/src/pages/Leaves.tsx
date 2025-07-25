import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEllipsisV } from 'react-icons/fa';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { AiOutlinePlus } from 'react-icons/ai';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Leaves.css';

interface Leave {
  _id: string;
  name: string;
  role: string;
  date: string;
  reason: string;
  status: string;
  image: string;
}

const Leave: React.FC = () => {
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingLeave, setEditingLeave] = useState<Leave | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    date: '',
    reason: '',
    status: 'Pending',
    image: '',
  });

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://hrmsbackend-27mf.onrender.com/api/leaves/getall');
      setLeaves(res.data);
    } catch (error) {
      console.error('Error fetching leaves:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleDelete = async (id: string) => {
    await axios.delete(`https://hrmsbackend-27mf.onrender.com/api/leaves/${id}`);
    fetchLeaves();
  };

  const handleEdit = (leave: Leave) => {
    setEditingLeave(leave);
    setFormData({
      name: leave.name,
      role: leave.role,
      date: leave.date,
      reason: leave.reason,
      status: leave.status,
      image: leave.image,
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingLeave(null);
    setFormData({
      name: '',
      role: '',
      date: selectedDate.toISOString().split('T')[0],
      reason: '',
      status: 'Pending',
      image: '',
    });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (editingLeave) {
      await axios.put(`https://hrmsbackend-27mf.onrender.com/api/leaves/${editingLeave._id}`, formData);
    } else {
      await axios.post('https://hrmsbackend-27mf.onrender.com/api/leaves/create', formData);
    }
    setShowModal(false);
    fetchLeaves();
  };

  const filteredLeaves = leaves.filter(leave =>
    leave.name.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter ? leave.status === statusFilter : true)
  );

  return (
    <div className="leaves-container">
      {loading ? (
        <div className="loading-text">Loading leaves...</div>
      ) : (
        <>
          <div className="leaves-header">
            <div className="leaves-filters">
              <select
                className="leaves-select"
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
              </select>
              <input
                className="leaves-input"
                placeholder="Search by name"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <button
              className="leaves-add-btn"
              onClick={handleAdd}
            >
              <AiOutlinePlus style={{ marginRight: 6, verticalAlign: 'middle' }} /> Add Leave
            </button>
          </div>

          <div className="leaves-main">
            <div className="leaves-table-wrapper">
              <table className="leaves-table">
                <thead>
                  <tr>
                    <th>Profile</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeaves.map((leave) => (
                    <tr key={leave._id}>
                      <td>
                        <img src={leave.image} alt={leave.name} className="leaves-avatar" />
                      </td>
                      <td>
                        <div className="leaves-name">{leave.name}</div>
                        <div className="leaves-role">{leave.role}</div>
                      </td>
                      <td>{new Date(leave.date).toLocaleDateString()}</td>
                      <td>{leave.reason}</td>
                      <td>
                        <span className={`leaves-status ${leave.status === 'Approved' ? 'approved' : 'pending'}`}>
                          {leave.status}
                        </span>
                      </td>
                      <td className="leaves-action-cell">
                        <button className="leaves-action-btn" onClick={() => setShowDropdown(leave._id === showDropdown ? null : leave._id)}>
                          <FaEllipsisV />
                        </button>
                        {showDropdown === leave._id && (
                          <div className="leaves-action-menu">
                            <button
                              className="leaves-menu-item"
                              onClick={() => handleEdit(leave)}
                            >
                              <FiEdit /> Edit
                            </button>
                            <button
                              className="leaves-menu-item leaves-menu-delete"
                              onClick={() => handleDelete(leave._id)}
                            >
                              <FiTrash2 /> Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="leaves-calendar-section">
              <div className="leaves-calendar-card">
                <h2 className="leaves-calendar-title">Leave Calendar</h2>
                <Calendar onChange={setSelectedDate} value={selectedDate} />
                <h3 className="leaves-calendar-subtitle">Approved Leaves</h3>
                {leaves.filter(l => l.status === 'Approved').map(l => (
                  <div key={l._id} className="leaves-approved-leave">
                    <img src={l.image} alt={l.name} className="leaves-approved-avatar" />
                    <div>
                      <div className="leaves-approved-name">{l.name}</div>
                      <div className="leaves-approved-date">{new Date(l.date).toLocaleDateString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {showModal && (
            <div
              className="leaves-modal-overlay"
              onClick={() => setShowModal(false)}
            >
              <div
                className="leaves-modal"
                onClick={e => e.stopPropagation()}
              >
                <h2>{editingLeave ? 'Edit Leave' : 'Add Leave'}</h2>
                <input
                  className="leaves-modal-input"
                  placeholder="Name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                  className="leaves-modal-input"
                  placeholder="Role"
                  value={formData.role}
                  onChange={e => setFormData({ ...formData, role: e.target.value })}
                />
                <input
                  type="date"
                  className="leaves-modal-input"
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                />
                <input
                  className="leaves-modal-input"
                  placeholder="Reason"
                  value={formData.reason}
                  onChange={e => setFormData({ ...formData, reason: e.target.value })}
                />
                <input
                  className="leaves-modal-input"
                  placeholder="Image URL"
                  value={formData.image}
                  onChange={e => setFormData({ ...formData, image: e.target.value })}
                />
                <div className="leaves-modal-actions">
                  <button
                    className="leaves-cancel-btn"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="leaves-modal-save"
                    onClick={handleSubmit}
                  >
                    {editingLeave ? 'Update Leave' : 'Add Leave'}
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

export default Leave;
