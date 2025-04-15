import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEllipsisV } from 'react-icons/fa';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { AiOutlinePlus } from 'react-icons/ai';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

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
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    date: '',
    reason: '',
    status: 'Pending',
    image: '',
  });

  const fetchLeaves = async () => {
    const res = await axios.get('http://localhost:5000/api/leaves/getall');
    setLeaves(res.data);
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleDelete = async (id: string) => {
    await axios.delete(`http://localhost:5000/api/leaves/${id}`);
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
      await axios.put(`http://localhost:5000/api/leaves/${editingLeave._id}`, formData);
    } else {
      await axios.post('http://localhost:5000/api/leaves/create', formData);
    }
    setShowModal(false);
    fetchLeaves();
  };

  const filteredLeaves = leaves.filter(leave =>
    leave.name.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter ? leave.status === statusFilter : true)
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <select
            className="border rounded px-3 py-1"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
          </select>
          <input
            className="border rounded px-3 py-1"
            placeholder="Search by name"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded"
          onClick={handleAdd}
        >
          <AiOutlinePlus className="inline mr-1" /> Add Leave
        </button>
      </div>

      <div className="flex gap-6">
        <div className="flex-1 overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead className="bg-purple-700 text-white">
              <tr>
                <th className="py-2 px-4">Profile</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Reason</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaves.map((leave, _id) => (
                <tr key={leave._id} className="border-t">
                  <td className="py-2 px-4">
                    <img src={leave.image} alt={leave.name} className="w-10 h-10 rounded-full" />
                  </td>
                  <td className="py-2 px-4">
                    <p className="font-medium">{leave.name}</p>
                    <p className="text-xs text-gray-500">{leave.role}</p>
                  </td>
                  <td className="py-2 px-4">{new Date(leave.date).toLocaleDateString()}</td>
                  <td className="py-2 px-4">{leave.reason}</td>
                  <td className="py-2 px-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${leave.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {leave.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 relative">
                    <button onClick={() => setShowDropdown(leave._id === showDropdown ? null : leave._id)}>
                      <FaEllipsisV />
                    </button>
                    {showDropdown === leave._id && (
                      <div className="absolute right-0 mt-2 bg-white border rounded shadow-md z-10">
                        <button
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full"
                          onClick={() => handleEdit(leave)}
                        >
                          <FiEdit /> Edit
                        </button>
                        <button
                          className="flex items-center gap-2 px-4 py-2 hover:bg-red-100 w-full text-red-600"
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

        <div className="w-80">
          <div className="bg-white border rounded-lg p-4">
            <h2 className="font-semibold mb-2">Leave Calendar</h2>
            <Calendar onChange={setSelectedDate} value={selectedDate} />
            <h3 className="mt-4 font-medium">Approved Leaves</h3>
            {leaves.filter(l => l.status === 'Approved').map(l => (
              <div key={l._id} className="flex items-center mt-2">
                <img src={l.image} alt={l.name} className="w-8 h-8 rounded-full mr-2" />
                <div>
                  <p className="text-sm font-medium">{l.name}</p>
                  <p className="text-xs text-gray-500">{new Date(l.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-blue bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">{editingLeave ? 'Edit Leave' : 'Add Leave'}</h2>
            <input
              className="w-full border rounded px-3 py-2 mb-2"
              placeholder="Name"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              className="w-full border rounded px-3 py-2 mb-2"
              placeholder="Role"
              value={formData.role}
              onChange={e => setFormData({ ...formData, role: e.target.value })}
            />
            <input
              type="date"
              className="w-full border rounded px-3 py-2 mb-2"
              value={formData.date}
              onChange={e => setFormData({ ...formData, date: e.target.value })}
            />
            <input
              className="w-full border rounded px-3 py-2 mb-2"
              placeholder="Reason"
              value={formData.reason}
              onChange={e => setFormData({ ...formData, reason: e.target.value })}
            />
            <input
              className="w-full border rounded px-3 py-2 mb-2"
              placeholder="Image URL"
              value={formData.image}
              onChange={e => setFormData({ ...formData, image: e.target.value })}
            />
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded w-full"
              onClick={handleSubmit}
            >
              {editingLeave ? 'Update Leave' : 'Add Leave'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leave;