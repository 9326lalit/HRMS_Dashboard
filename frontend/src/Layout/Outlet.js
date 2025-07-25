import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
export default function AppLayout() {
    return (_jsxs("div", { style: { display: "flex" }, children: [_jsx(Sidebar, {}), _jsx("main", { style: { flex: 1, padding: "24px" }, children: _jsx(Outlet, {}) })] }));
}
