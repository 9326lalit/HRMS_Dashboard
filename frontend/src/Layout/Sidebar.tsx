// src/components/Sidebar.tsx
import { Input } from "@/components/ui/input"
import { Link, useLocation } from "react-router-dom"
import {
  Users,
  BarChart2,
  UserCheck,
  LogOut,
  Search,
  UserPlus
} from "lucide-react"
import clsx from "clsx"

const navItems = [
  {
    section: "Recruitment",
    links: [
      { name: "Candidates", icon: UserPlus, path: "/candidates" },
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
    <aside className="w-64 h-screen border-r bg-white p-4 space-y-6 text-sm">
      <div className="flex items-center space-x-2 font-bold text-purple-700">
        <div className="w-6 h-6 border-2 border-purple-700 rounded-sm" />
        <span>TECHWIZLALIT</span>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
        <Input
          placeholder="Search"
          className="pl-9 py-2 text-sm rounded-full bg-gray-100"
        />
      </div>

      {navItems.map((section) => (
        <div key={section.section}>
          <div className="text-gray-500 uppercase text-xs font-semibold px-2 mb-2">
            {section.section}
          </div>
          <div className="space-y-1">
            {section.links.map((item) => {
              const isActive = pathname === item.path
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={clsx(
                    "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition",
                    isActive
                      ? "bg-purple-100 text-purple-700"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <item.icon className="mr-2 h-4 w-4" />
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
