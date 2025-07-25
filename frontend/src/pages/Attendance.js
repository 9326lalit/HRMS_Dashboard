import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// Attendance.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Attendance.css';
import API_BASE_URL from '../config';
const Attendance = () => {
    const [records, setRecords] = useState([]);
    const [dropdownIndex, setDropdownIndex] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({
        name: '',
        position: '',
        department: '',
        task: '',
        status: 'Present',
        image: 'https://randomuser.me/api/portraits/lego/1.jpg'
    });
    useEffect(() => {
        const fetchRecords = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_BASE_URL}/api/attendance/getall`);
                setRecords(response.data);
            }
            catch (error) {
                console.error('Error fetching attendance data:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchRecords();
    }, []);
    const handleEdit = (rec) => {
        setEditing(rec);
        const { _id, ...editableForm } = rec;
        setForm(editableForm);
        setShowModal(true);
        setDropdownIndex(null);
    };
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/api/attendance/${id}`);
            setRecords((prev) => prev.filter((r) => r._id !== id));
            setDropdownIndex(null);
        }
        catch (error) {
            console.error('Error deleting record:', error);
        }
    };
    const handleSubmit = async () => {
        try {
            if (editing) {
                await axios.put(`${API_BASE_URL}/api/attendance/${editing._id}`, form);
                setRecords((prev) => prev.map((r) => (r._id === editing._id ? { ...form, _id: editing._id } : r)));
            }
            else {
                const response = await axios.post(`${API_BASE_URL}/api/attendance/create`, form);
                setRecords((prev) => [...prev, response.data]);
            }
            resetForm();
        }
        catch (error) {
            console.error('Error submitting record:', error);
        }
    };
    const resetForm = () => {
        setForm({
            name: '',
            position: '',
            department: '',
            task: '',
            status: 'Present',
            image: 'https://randomuser.me/api/portraits/lego/1.jpg'
        });
        setEditing(null);
        setShowModal(false);
    };
    return (_jsxs("div", { className: "container", children: [loading ? (_jsx("div", { className: "loading", children: "Loading attendance..." })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "header", children: [_jsx("h2", { children: "Attendance" }), _jsx("button", { onClick: () => {
                                    setEditing(null);
                                    resetForm();
                                    setShowModal(true);
                                }, className: "add-btn", children: "+ Add" })] }), _jsx("div", { className: "table-wrapper", children: _jsxs("table", { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Profile" }), _jsx("th", { children: "Name" }), _jsx("th", { children: "Position" }), _jsx("th", { children: "Department" }), _jsx("th", { children: "Task" }), _jsx("th", { children: "Status" }), _jsx("th", { children: "Action" })] }) }), _jsx("tbody", { children: records.map((rec, index) => (_jsxs("tr", { children: [_jsx("td", { children: _jsx("img", { src: rec.image, alt: rec.name, className: "avatar" }) }), _jsx("td", { children: rec.name }), _jsx("td", { children: rec.position }), _jsx("td", { children: rec.department }), _jsx("td", { children: rec.task }), _jsx("td", { children: _jsxs("select", { value: rec.status, onChange: (e) => {
                                                        const updated = [...records];
                                                        updated[index].status = e.target.value;
                                                        setRecords(updated);
                                                    }, className: `status-select ${rec.status.toLowerCase()}`, children: [_jsx("option", { value: "Present", children: "Present" }), _jsx("option", { value: "Absent", children: "Absent" }), _jsx("option", { value: "Remote", children: "Remote" })] }) }), _jsxs("td", { className: "action-cell", children: [_jsx("button", { onClick: () => setDropdownIndex(index), children: "\u22EE" }), dropdownIndex === index && (_jsxs("div", { className: "dropdown", children: [_jsx("button", { onClick: () => handleEdit(rec), children: "Edit" }), _jsx("button", { className: "delete", onClick: () => handleDelete(rec._id), children: "Delete" })] }))] })] }, rec._id))) })] }) })] })), showModal && (_jsx("div", { className: "modal-backdrop", children: _jsxs("div", { className: "modal", children: [_jsx("h3", { children: editing ? 'Edit Attendance' : 'Add Attendance' }), _jsx("input", { placeholder: "Name", value: form.name, onChange: (e) => setForm({ ...form, name: e.target.value }) }), _jsx("input", { placeholder: "Position", value: form.position, onChange: (e) => setForm({ ...form, position: e.target.value }) }), _jsx("input", { placeholder: "Department", value: form.department, onChange: (e) => setForm({ ...form, department: e.target.value }) }), _jsx("input", { placeholder: "Task", value: form.task, onChange: (e) => setForm({ ...form, task: e.target.value }) }), _jsxs("select", { value: form.status, onChange: (e) => setForm({ ...form, status: e.target.value }), children: [_jsx("option", { value: "Present", children: "Present" }), _jsx("option", { value: "Absent", children: "Absent" }), _jsx("option", { value: "Remote", children: "Remote" })] }), _jsxs("div", { className: "modal-actions", children: [_jsx("button", { onClick: () => setShowModal(false), children: "Cancel" }), _jsx("button", { onClick: handleSubmit, children: editing ? 'Update' : 'Add' })] })] }) }))] }));
};
export default Attendance;
