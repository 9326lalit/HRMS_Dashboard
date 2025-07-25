import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEllipsisV } from 'react-icons/fa';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { AiOutlinePlus } from 'react-icons/ai';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Leaves.css';
const Leave = () => {
    const [leaves, setLeaves] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [showDropdown, setShowDropdown] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editingLeave, setEditingLeave] = useState(null);
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
        }
        catch (error) {
            console.error('Error fetching leaves:', error);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchLeaves();
    }, []);
    const handleDelete = async (id) => {
        await axios.delete(`https://hrmsbackend-27mf.onrender.com/api/leaves/${id}`);
        fetchLeaves();
    };
    const handleEdit = (leave) => {
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
        }
        else {
            await axios.post('https://hrmsbackend-27mf.onrender.com/api/leaves/create', formData);
        }
        setShowModal(false);
        fetchLeaves();
    };
    const filteredLeaves = leaves.filter(leave => leave.name.toLowerCase().includes(search.toLowerCase()) &&
        (statusFilter ? leave.status === statusFilter : true));
    return (_jsx("div", { className: "leaves-container", children: loading ? (_jsx("div", { className: "loading-text", children: "Loading leaves..." })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "leaves-header", children: [_jsxs("div", { className: "leaves-filters", children: [_jsxs("select", { className: "leaves-select", value: statusFilter, onChange: e => setStatusFilter(e.target.value), children: [_jsx("option", { value: "", children: "All Statuses" }), _jsx("option", { value: "Approved", children: "Approved" }), _jsx("option", { value: "Pending", children: "Pending" })] }), _jsx("input", { className: "leaves-input", placeholder: "Search by name", value: search, onChange: e => setSearch(e.target.value) })] }), _jsxs("button", { className: "leaves-add-btn", onClick: handleAdd, children: [_jsx(AiOutlinePlus, { style: { marginRight: 6, verticalAlign: 'middle' } }), " Add Leave"] })] }), _jsxs("div", { className: "leaves-main", children: [_jsx("div", { className: "leaves-table-wrapper", children: _jsxs("table", { className: "leaves-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Profile" }), _jsx("th", { children: "Name" }), _jsx("th", { children: "Date" }), _jsx("th", { children: "Reason" }), _jsx("th", { children: "Status" }), _jsx("th", { children: "Action" })] }) }), _jsx("tbody", { children: filteredLeaves.map((leave) => (_jsxs("tr", { children: [_jsx("td", { children: _jsx("img", { src: leave.image, alt: leave.name, className: "leaves-avatar" }) }), _jsxs("td", { children: [_jsx("div", { className: "leaves-name", children: leave.name }), _jsx("div", { className: "leaves-role", children: leave.role })] }), _jsx("td", { children: new Date(leave.date).toLocaleDateString() }), _jsx("td", { children: leave.reason }), _jsx("td", { children: _jsx("span", { className: `leaves-status ${leave.status === 'Approved' ? 'approved' : 'pending'}`, children: leave.status }) }), _jsxs("td", { className: "leaves-action-cell", children: [_jsx("button", { className: "leaves-action-btn", onClick: () => setShowDropdown(leave._id === showDropdown ? null : leave._id), children: _jsx(FaEllipsisV, {}) }), showDropdown === leave._id && (_jsxs("div", { className: "leaves-action-menu", children: [_jsxs("button", { className: "leaves-menu-item", onClick: () => handleEdit(leave), children: [_jsx(FiEdit, {}), " Edit"] }), _jsxs("button", { className: "leaves-menu-item leaves-menu-delete", onClick: () => handleDelete(leave._id), children: [_jsx(FiTrash2, {}), " Delete"] })] }))] })] }, leave._id))) })] }) }), _jsx("div", { className: "leaves-calendar-section", children: _jsxs("div", { className: "leaves-calendar-card", children: [_jsx("h2", { className: "leaves-calendar-title", children: "Leave Calendar" }), _jsx(Calendar, { onChange: setSelectedDate, value: selectedDate }), _jsx("h3", { className: "leaves-calendar-subtitle", children: "Approved Leaves" }), leaves.filter(l => l.status === 'Approved').map(l => (_jsxs("div", { className: "leaves-approved-leave", children: [_jsx("img", { src: l.image, alt: l.name, className: "leaves-approved-avatar" }), _jsxs("div", { children: [_jsx("div", { className: "leaves-approved-name", children: l.name }), _jsx("div", { className: "leaves-approved-date", children: new Date(l.date).toLocaleDateString() })] })] }, l._id)))] }) })] }), showModal && (_jsx("div", { className: "leaves-modal-overlay", onClick: () => setShowModal(false), children: _jsxs("div", { className: "leaves-modal", onClick: e => e.stopPropagation(), children: [_jsx("h2", { children: editingLeave ? 'Edit Leave' : 'Add Leave' }), _jsx("input", { className: "leaves-modal-input", placeholder: "Name", value: formData.name, onChange: e => setFormData({ ...formData, name: e.target.value }) }), _jsx("input", { className: "leaves-modal-input", placeholder: "Role", value: formData.role, onChange: e => setFormData({ ...formData, role: e.target.value }) }), _jsx("input", { type: "date", className: "leaves-modal-input", value: formData.date, onChange: e => setFormData({ ...formData, date: e.target.value }) }), _jsx("input", { className: "leaves-modal-input", placeholder: "Reason", value: formData.reason, onChange: e => setFormData({ ...formData, reason: e.target.value }) }), _jsx("input", { className: "leaves-modal-input", placeholder: "Image URL", value: formData.image, onChange: e => setFormData({ ...formData, image: e.target.value }) }), _jsxs("div", { className: "leaves-modal-actions", children: [_jsx("button", { className: "leaves-cancel-btn", onClick: () => setShowModal(false), children: "Cancel" }), _jsx("button", { className: "leaves-modal-save", onClick: handleSubmit, children: editingLeave ? 'Update Leave' : 'Add Leave' })] })] }) }))] })) }));
};
export default Leave;
