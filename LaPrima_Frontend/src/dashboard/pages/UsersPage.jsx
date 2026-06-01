import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import DashboardModal from '../components/DashboardModal';
import AddUserForm from '../components/AddUserForm';

const INITIAL_USERS = [
    { id: 1, name: 'Sofia Mendez', email: 'sofia@lumiere.coffee', role: 'Owner', status: 'active', joined: 'Jan 12, 2026' },
    { id: 2, name: 'James Mwangi', email: 'james@lumiere.coffee', role: 'Barista', status: 'active', joined: 'Feb 3, 2026' },
    { id: 3, name: 'Sarah Kimani', email: 'sarah@lumiere.coffee', role: 'Manager', status: 'active', joined: 'Feb 18, 2026' },
    { id: 4, name: 'Tom Richards', email: 'tom@lumiere.coffee', role: 'Barista', status: 'inactive', joined: 'Mar 1, 2026' },
    { id: 5, name: 'Lisa Park', email: 'lisa@lumiere.coffee', role: 'Cashier', status: 'active', joined: 'Mar 15, 2026' },
    { id: 6, name: 'David Osei', email: 'david@lumiere.coffee', role: 'Barista', status: 'active', joined: 'Apr 2, 2026' },
];

function UsersPage() {
    const [users, setUsers] = useState(INITIAL_USERS);
    const [search, setSearch] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);

    const filtered = users.filter(
        (u) =>
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase()) ||
            u.role.toLowerCase().includes(search.toLowerCase())
    );

    const handleAddUser = (data) => {
        const joined = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        setUsers((prev) => [
            ...prev,
            {
                id: prev.length + 1,
                name: data.name,
                email: data.email,
                role: data.role,
                status: data.status,
                joined,
            },
        ]);
        setShowAddModal(false);
    };

    return (
        <>
            <div className="dashboard-card">
                <div className="users-toolbar">
                    <input
                        type="text"
                        className="users-search"
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button type="button" className="users-add-btn" onClick={() => setShowAddModal(true)}>
                        + Add User
                    </button>
                </div>

                <table className="users-table">
                    <thead>
                        <tr>
                            <th>USER</th>
                            <th>EMAIL</th>
                            <th>ROLE</th>
                            <th>STATUS</th>
                            <th>JOINED</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((user) => (
                            <tr key={user.id}>
                                <td>
                                    <div className="user-cell">
                                        <span className="user-cell-avatar">
                                            <FaUserCircle aria-hidden />
                                        </span>
                                        {user.name}
                                    </div>
                                </td>
                                <td>{user.email}</td>
                                <td><span className="user-role-badge">{user.role}</span></td>
                                <td>
                                    <span className={`user-status ${user.status}`}>
                                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                    </span>
                                </td>
                                <td>{user.joined}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <DashboardModal open={showAddModal} onClose={() => setShowAddModal(false)} title="Add User">
                <AddUserForm
                    onSubmit={handleAddUser}
                    onCancel={() => setShowAddModal(false)}
                />
            </DashboardModal>
        </>
    );
}

export default UsersPage;
