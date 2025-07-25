import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import axios from 'axios';
const Employee = () => {
    const [employees, setEmployees] = useState([]);
    const [dropdownIndex, setDropdownIndex] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [form, setForm] = useState({
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
        }
        catch (err) {
            console.error('Error fetching employees:', err);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchEmployees();
    }, []);
    const openEdit = (emp) => {
        setForm(emp);
        setEditingEmployee(emp);
        setShowModal(true);
        setDropdownIndex(null);
    };
    const deleteEmployee = async (email) => {
        try {
            await axios.delete(`https://hrmsbackend-27mf.onrender.com/api/employees/${email}`);
            fetchEmployees();
        }
        catch (err) {
            console.error('Error deleting employee:', err);
        }
    };
    const handleSubmit = async () => {
        try {
            if (editingEmployee) {
                await axios.put(`https://hrmsbackend-27mf.onrender.com/api/employees/${editingEmployee.email}`, form);
            }
            else {
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
        }
        catch (err) {
            console.error('Error saving employee:', err);
        }
    };
    return (_jsx("div", { style: {
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "32px",
            background: "#f7f8fa",
            minHeight: "100vh",
            fontFamily: "'Segoe UI', Arial, sans-serif"
        }, children: loading ? (_jsx("div", { style: {
                minHeight: "60vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                color: "#6b21a8",
                fontWeight: 600
            }, children: "Loading employees..." })) : (_jsxs(_Fragment, { children: [_jsxs("div", { style: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "28px"
                    }, children: [_jsx("h2", { style: {
                                fontSize: "26px",
                                fontWeight: 700,
                                color: "#6b21a8"
                            }, children: "Employees" }), _jsx("button", { onClick: () => {
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
                            }, style: {
                                background: "linear-gradient(90deg, #6b21a8 60%, #6b21a8 100%)",
                                color: "#fff",
                                padding: "10px 28px",
                                border: "none",
                                borderRadius: "6px",
                                fontWeight: 600,
                                fontSize: "16px",
                                cursor: "pointer",
                                transition: "background 0.2s"
                            }, onMouseOver: e => (e.currentTarget.style.background = "linear-gradient(90deg, #5b21b6 60%, #a78bfa 100%)"), onMouseOut: e => (e.currentTarget.style.background = "linear-gradient(90deg, #7c3aed 60%, #a78bfa 100%)"), children: "+ Add" })] }), _jsx("div", { style: {
                        overflowX: "auto",
                        borderRadius: "12px",
                        boxShadow: "0 2px 16px rgba(60, 72, 88, 0.08)",
                        background: "#fff"
                    }, children: _jsxs("table", { style: {
                            width: "100%",
                            borderCollapse: "separate",
                            borderSpacing: 0,
                            background: "#fff",
                            borderRadius: "12px",
                            overflow: "hidden"
                        }, children: [_jsx("thead", { children: _jsx("tr", { children: ["Profile", "Name", "Email", "Phone", "Position", "Department", "Joining Date", "Action"].map((th) => (_jsx("th", { style: {
                                            background: "linear-gradient(90deg, #6b21a8 60%, #6b21a8 100%)",
                                            color: "#fff",
                                            fontWeight: 600,
                                            fontSize: "15px",
                                            padding: "14px 16px",
                                            textAlign: "left"
                                        }, children: th }, th))) }) }), _jsx("tbody", { children: employees.map((emp, index) => (_jsxs("tr", { style: {
                                        borderBottom: "1px solid #e5e7eb",
                                        transition: "background 0.2s"
                                    }, children: [_jsx("td", { style: { padding: "14px 16px" }, children: _jsx("img", { src: emp.image, alt: emp.name, style: {
                                                    width: "40px",
                                                    height: "40px",
                                                    borderRadius: "50%",
                                                    objectFit: "cover",
                                                    border: "2px solid #a78bfa"
                                                } }) }), _jsx("td", { style: { padding: "14px 16px" }, children: emp.name }), _jsx("td", { style: { padding: "14px 16px" }, children: emp.email }), _jsx("td", { style: { padding: "14px 16px" }, children: emp.phone }), _jsx("td", { style: { padding: "14px 16px" }, children: emp.position }), _jsx("td", { style: { padding: "14px 16px" }, children: emp.department }), _jsx("td", { style: { padding: "14px 16px" }, children: emp.joiningDate }), _jsxs("td", { style: { position: "relative", padding: "14px 16px" }, children: [_jsx("button", { style: {
                                                        background: "none",
                                                        border: "none",
                                                        cursor: "pointer",
                                                        fontSize: "20px",
                                                        color: "#6b7280",
                                                        padding: "4px"
                                                    }, onClick: () => setDropdownIndex(index), children: "\u22EE" }), dropdownIndex === index && (_jsxs("div", { style: {
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
                                                    }, children: [_jsx("button", { style: {
                                                                padding: "10px 18px",
                                                                background: "none",
                                                                border: "none",
                                                                textAlign: "left",
                                                                fontSize: "15px",
                                                                cursor: "pointer",
                                                                transition: "background 0.15s"
                                                            }, onClick: () => openEdit(emp), children: "Edit" }), _jsx("button", { style: {
                                                                padding: "10px 18px",
                                                                background: "none",
                                                                border: "none",
                                                                textAlign: "left",
                                                                fontSize: "15px",
                                                                cursor: "pointer",
                                                                color: "#e11d48",
                                                                transition: "background 0.15s"
                                                            }, onClick: () => deleteEmployee(emp.email), children: "Delete" })] }))] })] }, index))) })] }) }), showModal && (_jsx("div", { style: {
                        position: "fixed",
                        inset: 0,
                        background: "rgba(60, 72, 88, 0.18)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 100
                    }, children: _jsxs("div", { style: {
                            background: "#fff",
                            padding: "32px 28px 24px 28px",
                            borderRadius: "12px",
                            boxShadow: "0 4px 32px rgba(60, 72, 88, 0.18)",
                            width: "380px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "14px"
                        }, children: [_jsx("h3", { style: {
                                    fontSize: "20px",
                                    fontWeight: 700,
                                    marginBottom: "10px",
                                    color: "#7c3aed"
                                }, children: editingEmployee ? 'Edit Employee' : 'Add Employee' }), ['name', 'email', 'phone', 'position', 'department', 'joiningDate'].map((field) => (_jsx("input", { placeholder: field.charAt(0).toUpperCase() + field.slice(1), value: form[field], onChange: (e) => setForm({ ...form, [field]: e.target.value }), style: {
                                    padding: "10px 14px",
                                    borderRadius: "6px",
                                    border: "1px solid #d1d5db",
                                    fontSize: "15px",
                                    background: "#fff"
                                } }, field))), _jsxs("div", { style: {
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    gap: "10px",
                                    marginTop: "10px"
                                }, children: [_jsx("button", { style: {
                                            background: "#e5e7eb",
                                            color: "#374151",
                                            padding: "8px 18px",
                                            border: "none",
                                            borderRadius: "6px",
                                            fontWeight: 500,
                                            cursor: "pointer",
                                            transition: "background 0.2s"
                                        }, onClick: () => setShowModal(false), children: "Cancel" }), _jsx("button", { onClick: handleSubmit, style: {
                                            background: "linear-gradient(90deg, #7c3aed 60%, #a78bfa 100%)",
                                            color: "#fff",
                                            padding: "8px 18px",
                                            border: "none",
                                            borderRadius: "6px",
                                            fontWeight: 600,
                                            cursor: "pointer",
                                            transition: "background 0.2s"
                                        }, onMouseOver: e => (e.currentTarget.style.background = "linear-gradient(90deg, #5b21b6 60%, #a78bfa 100%)"), onMouseOut: e => (e.currentTarget.style.background = "linear-gradient(90deg, #7c3aed 60%, #a78bfa 100%)"), children: editingEmployee ? 'Update' : 'Add' })] })] }) }))] })) }));
};
export default Employee;
