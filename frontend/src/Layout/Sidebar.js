import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useLocation } from "react-router-dom";
import { Users, BarChart2, UserCheck, LogOut, Search, UserPlus } from "lucide-react";
const navItems = [
    {
        section: "Recruitment",
        links: [
            { name: "Candidates", icon: UserPlus, path: "/" },
        ],
    },
    {
        section: "Organization",
        links: [
            { name: "Employees", icon: Users, path: "/employees" },
            { name: "Attendance", icon: BarChart2, path: "/attendance" },
            { name: "Leaves", icon: UserCheck, path: "/leaves" },
        ],
    },
    {
        section: "Others",
        links: [
            { name: "Logout", icon: LogOut, path: "/logout" },
        ],
    },
];
export default function Sidebar() {
    const { pathname } = useLocation();
    return (_jsxs("aside", { style: {
            width: "260px",
            height: "100vh",
            borderRight: "1px solid #e5e7eb",
            background: "#fff",
            padding: "24px 18px",
            display: "flex",
            flexDirection: "column",
            gap: "28px",
            fontSize: "15px"
        }, children: [_jsxs("div", { style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontWeight: "bold",
                    color: "#7c3aed"
                }, children: [_jsx("div", { style: {
                            width: "28px",
                            height: "28px",
                            border: "2px solid #7c3aed",
                            borderRadius: "6px"
                        } }), _jsx("span", { children: "TECHWIZLALIT" })] }), _jsxs("div", { style: { position: "relative" }, children: [_jsx(Search, { style: {
                            position: "absolute",
                            left: "14px",
                            top: "12px",
                            width: "18px",
                            height: "18px",
                            color: "#6b7280"
                        } }), _jsx("input", { placeholder: "Search", style: {
                            paddingLeft: "38px",
                            paddingTop: "8px",
                            paddingBottom: "8px",
                            borderRadius: "999px",
                            background: "#f3f4f6",
                            border: "none",
                            fontSize: "15px",
                            width: "100%"
                        } })] }), navItems.map((section) => (_jsxs("div", { children: [_jsx("div", { style: {
                            color: "#6b7280",
                            textTransform: "uppercase",
                            fontSize: "12px",
                            fontWeight: 600,
                            paddingLeft: "8px",
                            marginBottom: "8px"
                        }, children: section.section }), _jsx("div", { style: { display: "flex", flexDirection: "column", gap: "4px" }, children: section.links.map((item) => {
                            const isActive = pathname === item.path;
                            return (_jsxs(Link, { to: item.path, style: {
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "10px 14px",
                                    borderRadius: "8px",
                                    fontSize: "15px",
                                    fontWeight: 500,
                                    color: isActive ? "#7c3aed" : "#374151",
                                    background: isActive ? "#ede9fe" : "transparent",
                                    textDecoration: "none",
                                    transition: "background 0.2s, color 0.2s"
                                }, onMouseOver: e => {
                                    if (!isActive)
                                        e.currentTarget.style.background = "#f3f4f6";
                                }, onMouseOut: e => {
                                    if (!isActive)
                                        e.currentTarget.style.background = "transparent";
                                }, children: [_jsx(item.icon, { style: { marginRight: "8px", width: "18px", height: "18px" } }), item.name] }, item.name));
                        }) })] }, section.section)))] }));
}
