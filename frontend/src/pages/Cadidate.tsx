import { useEffect, useState } from 'react'
import { FaEllipsisV } from 'react-icons/fa'

type Candidate = {
  id: number
  name: string
  email: string
  phone: string
  position: string
  status: string
  experience: string
}

const API_BASE = 'http://localhost:5000/api/candidates'

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [search, setSearch] = useState('')
  const [openMenuId, setOpenMenuId] = useState<number | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [newCandidate, setNewCandidate] = useState({ name: '', email: '', phone: '' })
  const [filterStatus, setFilterStatus] = useState('')
  const [filterPosition, setFilterPosition] = useState('')

  useEffect(() => {
    fetchCandidates()
  }, [])

  const fetchCandidates = async () => {
    const res = await fetch(`${API_BASE}/getall`)
    const data = await res.json()
    setCandidates(data)
  }

  const toggleMenu = (id: number) => {
    setOpenMenuId(openMenuId === id ? null : id)
  }

  const statusBadge = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-gray-200 text-gray-800'
      case 'Selected':
        return 'bg-blue-100 text-blue-600'
      case 'Rejected':
        return 'bg-red-100 text-red-600'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  const handleDelete = async (id: number) => {
    await fetch(`${API_BASE}/${id}`, { method: 'DELETE' })
    fetchCandidates()
  }

  const handleAddCandidate = async () => {
    await fetch(`${API_BASE}/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newCandidate,
        position: 'Not Assigned',
        status: 'New',
        experience: '0',
      }),
    })
    setShowModal(false)
    setNewCandidate({ name: '', email: '', phone: '' })
    fetchCandidates()
  }

  const updateStatus = async (id: number, newStatus: string) => {
    await fetch(`${API_BASE}/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
    fetchCandidates()
  }

  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = filterStatus ? c.status === filterStatus : true
    const matchesPosition = filterPosition ? c.position.includes(filterPosition) : true
    return matchesSearch && matchesStatus && matchesPosition
  })

  return (
    <div className="p-4 w-full">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
        <div className="flex gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="">All Status</option>
            <option>New</option>
            <option>Selected</option>
            <option>Rejected</option>
          </select>
          <select
            value={filterPosition}
            onChange={(e) => setFilterPosition(e.target.value)}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="">All Positions</option>
            <option>Developer</option>
            <option>Designer</option>
            <option>Human Resource Intern</option>
            <option>Senior Developer</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search by name/email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-3 py-2 text-sm"
          />
          <button
            className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
            onClick={() => setShowModal(true)}
          >
            Add Candidate
          </button>
        </div>
      </div>

      <table className="w-full text-sm shadow rounded overflow-hidden border">
        <thead className="bg-purple-700 text-white text-left">
          <tr>
            <th className="p-3">Sr no.</th>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Position</th>
            <th className="p-3">Status</th>
            <th className="p-3">Experience</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredCandidates.map((c, index) => (
            <tr key={c.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{String(index + 1).padStart(2, '0')}</td>
              <td className="p-3">{c.name}</td>
              <td className="p-3">{c.email}</td>
              <td className="p-3">{c.phone}</td>
              <td className="p-3">{c.position}</td>
              <td className="p-3">
                <select
                  value={c.status}
                  onChange={(e) => updateStatus(c.id, e.target.value)}
                  className={`px-2 py-1 rounded text-xs font-medium ${statusBadge(c.status)}`}
                >
                  <option>New</option>
                  <option>Selected</option>
                  <option>Rejected</option>
                </select>
              </td>
              <td className="p-3">{c.experience}</td>
              <td className="p-3 relative">
                <button onClick={() => toggleMenu(c.id)}>
                  <FaEllipsisV />
                </button>
                {openMenuId === c.id && (
                  <div className="absolute z-10 bg-white border shadow-md right-0 mt-2 w-40 rounded text-sm">
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                      Download Resume
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                    >
                      Delete Candidate
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-blue bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[400px]">
            <h2 className="text-xl font-semibold mb-4">Add New Candidate</h2>
            <input
              type="text"
              placeholder="Name"
              value={newCandidate.name}
              onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
              className="w-full border rounded px-3 py-2 mb-3"
            />
            <input
              type="email"
              placeholder="Email"
              value={newCandidate.email}
              onChange={(e) => setNewCandidate({ ...newCandidate, email: e.target.value })}
              className="w-full border rounded px-3 py-2 mb-3"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={newCandidate.phone}
              onChange={(e) => setNewCandidate({ ...newCandidate, phone: e.target.value })}
              className="w-full border rounded px-3 py-2 mb-3"
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                onClick={handleAddCandidate}
                className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
