import { Link, useLocation } from "react-router-dom"
import {
  Users,
  BarChart2,
  UserCheck,
  LogOut,
  Search,
  UserPlus
} from "lucide-react"

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
]

export default function Sidebar() {
  const { pathname } = useLocation()

  return (
    <aside style={{
      width: "260px",
      height: "100vh",
      borderRight: "1px solid #e5e7eb",
      background: "#fff",
      padding: "24px 18px",
      display: "flex",
      flexDirection: "column",
      gap: "28px",
      fontSize: "15px"
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontWeight: "bold",
        color: "#7c3aed"
      }}>
        <div style={{
          width: "28px",
          height: "28px",
          border: "2px solid #7c3aed",
          borderRadius: "6px"
        }} />
        <span>TECHWIZLALIT</span>
      </div>

      <div style={{ position: "relative" }}>
        <Search style={{
          position: "absolute",
          left: "14px",
          top: "12px",
          width: "18px",
          height: "18px",
          color: "#6b7280"
        }} />
        <input
          placeholder="Search"
          style={{
            paddingLeft: "38px",
            paddingTop: "8px",
            paddingBottom: "8px",
            borderRadius: "999px",
            background: "#f3f4f6",
            border: "none",
            fontSize: "15px",
            width: "100%"
          }}
        />
      </div>

      {navItems.map((section) => (
        <div key={section.section}>
          <div style={{
            color: "#6b7280",
            textTransform: "uppercase",
            fontSize: "12px",
            fontWeight: 600,
            paddingLeft: "8px",
            marginBottom: "8px"
          }}>
            {section.section}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {section.links.map((item) => {
              const isActive = pathname === item.path
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  style={{
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
                  }}
                  onMouseOver={e => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.background = "#f3f4f6"
                  }}
                  onMouseOut={e => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent"
                  }}
                >
                  <item.icon style={{ marginRight: "8px", width: "18px", height: "18px" }} />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      ))}
    </aside>
  )
}