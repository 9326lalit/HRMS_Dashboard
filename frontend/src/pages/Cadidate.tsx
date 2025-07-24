import { useEffect, useState } from 'react'
import { FaEllipsisV } from 'react-icons/fa'
import './Candidate.css' // Make sure to create this CSS file

type Candidate = {
  id: number
  name: string
  email: string
  phone: string
  position: string
  status: string
  experience: string
}

const API_BASE = 'https://hrmsbackend-27mf.onrender.com/api/candidates'

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
        return 'status-badge new'
      case 'Selected':
        return 'status-badge selected'
      case 'Rejected':
        return 'status-badge rejected'
      default:
        return 'status-badge'
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
    <div className="candidate-container">
      <div className="candidate-header">
        <div className="candidate-filters">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="candidate-select"
          >
            <option value="">All Status</option>
            <option>New</option>
            <option>Selected</option>
            <option>Rejected</option>
          </select>
          <select
            value={filterPosition}
            onChange={(e) => setFilterPosition(e.target.value)}       
            className="candidate-select"
          >
            <option value="">All Positions</option>
            <option>Developer</option>
            <option>Designer</option>
            <option>Human Resource Intern</option>
            <option>Senior Developer</option>
          </select>
        </div>

        <div className="candidate-search-add">
          <input
            type="text"
            placeholder="Search by name/email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="candidate-input"
          />
          <button
            className="candidate-add-btn"
            onClick={() => setShowModal(true)}
          >
            Add Candidate
          </button>
        </div>
      </div>

      <table className="candidate-table">
        <thead>
          <tr>
            <th>Sr no.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Position</th>
            <th>Status</th>
            <th>Experience</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredCandidates.map((c, index) => (
            <tr key={c.id}>
              <td>{String(index + 1).padStart(2, '0')}</td>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>{c.position}</td>
              <td>
                <select
                  value={c.status}
                  onChange={(e) => updateStatus(c.id, e.target.value)}

                  className={statusBadge(c.status)}
                >
                  <option>New</option>
                  <option>Selected</option>
                  <option>Rejected</option>
                </select>
              </td>
              <td>{c.experience}</td>
              <td className="candidate-action-cell">
                <button className="candidate-action-btn" onClick={() => toggleMenu(c.id)}>
                  <FaEllipsisV />
                </button>
                {openMenuId === c.id && (
                  <div className="candidate-action-menu">
                    <button className="candidate-menu-item">
                      Download Resume
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="candidate-menu-item candidate-menu-delete"
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
        <div className="candidate-modal-overlay">
          <div className="candidate-modal">
            <h2>Add New Candidate</h2>
            <input
              type="text"
              placeholder="Name"
              value={newCandidate.name}
              onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
              className="candidate-input"
            />
            <input
              type="email"
              placeholder="Email"
              value={newCandidate.email}
              onChange={(e) => setNewCandidate({ ...newCandidate, email: e.target.value })}
              className="candidate-input"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={newCandidate.phone}
              onChange={(e) => setNewCandidate({ ...newCandidate, phone: e.target.value })}
              className="candidate-input"
            />
            <div className="candidate-modal-actions">
              <button
                className="candidate-cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                onClick={handleAddCandidate}
                className="candidate-save-btn"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )}