import { useEffect, useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import './Candidate.css';

interface Candidate {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  status: string;
  experience: string;
}

const API_BASE = 'https://hrmsbackend-27mf.onrender.com/api/candidates';

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [search, setSearch] = useState('');
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [newCandidate, setNewCandidate] = useState({ name: '', email: '', phone: '' });
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPosition, setFilterPosition] = useState('');

  useEffect(() => {
    fetchCandidates();

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
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
    } catch (error) {
      console.error('Failed to fetch candidates:', error);
    }
  };

  const toggleMenu = (id: number) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const statusBadge = (status: string) => {
    return `status-badge ${status.toLowerCase()}`;
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
      fetchCandidates();
    } catch (error) {
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
    } catch (error) {
      console.error('Failed to add candidate:', error);
    }
  };

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      await fetch(`${API_BASE}/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchCandidates();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(search.toLowerCase()) ||
      candidate.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus ? candidate.status === filterStatus : true;
    const matchesPosition = filterPosition ? candidate.position.includes(filterPosition) : true;
    return matchesSearch && matchesStatus && matchesPosition;
  });

  return (
    <div className="candidate-container">
      <div className="candidate-header">
        <div className="candidate-filters">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="candidate-select">
            <option value="">All Status</option>
            <option value="New">New</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
          </select>

          <select value={filterPosition} onChange={(e) => setFilterPosition(e.target.value)} className="candidate-select">
            <option value="">All Positions</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Human Resource Intern">Human Resource Intern</option>
            <option value="Senior Developer">Senior Developer</option>
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
          <button className="candidate-add-btn" onClick={() => setShowModal(true)}>
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
          {filteredCandidates.map((candidate, index) => (
            <tr key={candidate.id}>
              <td>{String(index + 1).padStart(2, '0')}</td>
              <td>{candidate.name}</td>
              <td>{candidate.email}</td>
              <td>{candidate.phone}</td>
              <td>{candidate.position}</td>
              <td>
                <select
                  value={candidate.status}
                  onChange={(e) => updateStatus(candidate.id, e.target.value)}
                  className={statusBadge(candidate.status)}
                >
                  <option value="New">New</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </td>
              <td>{candidate.experience}</td>
              <td className="candidate-action-cell">
                <button className="candidate-action-btn" onClick={() => toggleMenu(candidate.id)}>
                  <FaEllipsisV />
                </button>
                {openMenuId === candidate.id && (
                  <div className="candidate-action-menu">
                    <button className="candidate-menu-item">Download Resume</button>
                    <button onClick={() => handleDelete(candidate.id)} className="candidate-menu-item candidate-menu-delete">
                      Delete Candidate
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
              <button className="candidate-cancel-btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="candidate-save-btn" onClick={handleAddCandidate}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
