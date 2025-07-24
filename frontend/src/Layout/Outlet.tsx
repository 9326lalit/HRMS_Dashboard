import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"

export default function AppLayout() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "24px" }}>
        <Outlet />
      </main>
    </div>
  )
}