import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import './Candidate.css';
const API_BASE = 'https://hrmsbackend-27mf.onrender.com/api/candidates';
export default function CandidatesPage() {
    const [candidates, setCandidates] = useState([]);
    const [search, setSearch] = useState('');
    const [openMenuId, setOpenMenuId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [newCandidate, setNewCandidate] = useState({ name: '', email: '', phone: '' });
    const [filterStatus, setFilterStatus] = useState('');
    const [filterPosition, setFilterPosition] = useState('');
    useEffect(() => {
        fetchCandidates();
        const handleClickOutside = (e) => {
            const target = e.target;
            if (!target.closest('.candidate-action-cell')) {
                setOpenMenuId(null);
            }
        };
        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, []);
    const fetchCandidates = async () => {
        try {
            const response = await fetch(`${API_BASE}/getall`);
            const data = await response.json();
            setCandidates(data);
        }
        catch (error) {
            console.error('Failed to fetch candidates:', error);
        }
    };
    const toggleMenu = (id) => {
        setOpenMenuId(openMenuId === id ? null : id);
    };
    const statusBadge = (status) => {
        return `status-badge ${status.toLowerCase()}`;
    };
    const handleDelete = async (id) => {
        try {
            await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
            fetchCandidates();
        }
        catch (error) {
            console.error('Failed to delete candidate:', error);
        }
    };
    const handleAddCandidate = async () => {
        try {
            await fetch(`${API_BASE}/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...newCandidate,
                    position: 'Not Assigned',
                    status: 'New',
                    experience: '0',
                }),
            });
            setShowModal(false);
            setNewCandidate({ name: '', email: '', phone: '' });
            fetchCandidates();
        }
        catch (error) {
            console.error('Failed to add candidate:', error);
        }
    };
    const updateStatus = async (id, newStatus) => {
        try {
            await fetch(`${API_BASE}/${id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            fetchCandidates();
        }
        catch (error) {
            console.error('Failed to update status:', error);
        }
    };
    const filteredCandidates = candidates.filter((candidate) => {
        const matchesSearch = candidate.name.toLowerCase().includes(search.toLowerCase()) ||
            candidate.email.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = filterStatus ? candidate.status === filterStatus : true;
        const matchesPosition = filterPosition ? candidate.position.includes(filterPosition) : true;
        return matchesSearch && matchesStatus && matchesPosition;
    });
    return (_jsxs("div", { className: "candidate-container", children: [_jsxs("div", { className: "candidate-header", children: [_jsxs("div", { className: "candidate-filters", children: [_jsxs("select", { value: filterStatus, onChange: (e) => setFilterStatus(e.target.value), className: "candidate-select", children: [_jsx("option", { value: "", children: "All Status" }), _jsx("option", { value: "New", children: "New" }), _jsx("option", { value: "Selected", children: "Selected" }), _jsx("option", { value: "Rejected", children: "Rejected" })] }), _jsxs("select", { value: filterPosition, onChange: (e) => setFilterPosition(e.target.value), className: "candidate-select", children: [_jsx("option", { value: "", children: "All Positions" }), _jsx("option", { value: "Developer", children: "Developer" }), _jsx("option", { value: "Designer", children: "Designer" }), _jsx("option", { value: "Human Resource Intern", children: "Human Resource Intern" }), _jsx("option", { value: "Senior Developer", children: "Senior Developer" })] })] }), _jsxs("div", { className: "candidate-search-add", children: [_jsx("input", { type: "text", placeholder: "Search by name/email", value: search, onChange: (e) => setSearch(e.target.value), className: "candidate-input" }), _jsx("button", { className: "candidate-add-btn", onClick: () => setShowModal(true), children: "Add Candidate" })] })] }), _jsxs("table", { className: "candidate-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Sr no." }), _jsx("th", { children: "Name" }), _jsx("th", { children: "Email" }), _jsx("th", { children: "Phone" }), _jsx("th", { children: "Position" }), _jsx("th", { children: "Status" }), _jsx("th", { children: "Experience" }), _jsx("th", { children: "Action" })] }) }), _jsx("tbody", { children: filteredCandidates.map((candidate, index) => (_jsxs("tr", { children: [_jsx("td", { children: String(index + 1).padStart(2, '0') }), _jsx("td", { children: candidate.name }), _jsx("td", { children: candidate.email }), _jsx("td", { children: candidate.phone }), _jsx("td", { children: candidate.position }), _jsx("td", { children: _jsxs("select", { value: candidate.status, onChange: (e) => updateStatus(candidate.id, e.target.value), className: statusBadge(candidate.status), children: [_jsx("option", { value: "New", children: "New" }), _jsx("option", { value: "Selected", children: "Selected" }), _jsx("option", { value: "Rejected", children: "Rejected" })] }) }), _jsx("td", { children: candidate.experience }), _jsxs("td", { className: "candidate-action-cell", children: [_jsx("button", { className: "candidate-action-btn", onClick: () => toggleMenu(candidate.id), children: _jsx(FaEllipsisV, {}) }), openMenuId === candidate.id && (_jsxs("div", { className: "candidate-action-menu", children: [_jsx("button", { className: "candidate-menu-item", children: "Download Resume" }), _jsx("button", { onClick: () => handleDelete(candidate.id), className: "candidate-menu-item candidate-menu-delete", children: "Delete Candidate" })] }))] })] }, candidate.id))) })] }), showModal && (_jsx("div", { className: "candidate-modal-overlay", children: _jsxs("div", { className: "candidate-modal", children: [_jsx("h2", { children: "Add New Candidate" }), _jsx("input", { type: "text", placeholder: "Name", value: newCandidate.name, onChange: (e) => setNewCandidate({ ...newCandidate, name: e.target.value }), className: "candidate-input" }), _jsx("input", { type: "email", placeholder: "Email", value: newCandidate.email, onChange: (e) => setNewCandidate({ ...newCandidate, email: e.target.value }), className: "candidate-input" }), _jsx("input", { type: "tel", placeholder: "Phone", value: newCandidate.phone, onChange: (e) => setNewCandidate({ ...newCandidate, phone: e.target.value }), className: "candidate-input" }), _jsxs("div", { className: "candidate-modal-actions", children: [_jsx("button", { className: "candidate-cancel-btn", onClick: () => setShowModal(false), children: "Cancel" }), _jsx("button", { className: "candidate-save-btn", onClick: handleAddCandidate, children: "Save" })] })] }) }))] }));
}
