import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import DashboardModal from '../components/DashboardModal';
import AddUserForm from '../components/AddUserForm';
import axiosInstance from '../../api/axios';

function UsersPage() {
    const [customers, setCustomers] = useState([]);
    const [search, setSearch] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCustomers();
    }, []);



    const fetchCustomers = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get('/customers');
            setCustomers(res.data.map(c => ({
                id: c._id,
                name: c.name,
                email: c.email,
                role: c.role || 'Customer',
                status: c.status ? c.status.toLowerCase() : 'active',
                joined: c.joined || new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            })));
        } catch (error) { 
            console.error(error); 
        } finally { 
            setLoading(false); 
        }
    }

    const filtered = customers.filter(
        (u) =>
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase()) ||
            u.role.toLowerCase().includes(search.toLowerCase())
    );

    const handleAddUser = async (data) => {
        const joined = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        try {
            const payload = {
                name: data.name,
                email: data.email,
                role: 'Customer',
                status: data.status.charAt(0).toUpperCase() + data.status.slice(1),
                joined
            };
            const res = await axiosInstance.post('/customers', payload);
            setCustomers((prev) => [...prev, {
                id: res.data._id,
                name: res.data.name,
                email: res.data.email,
                role: res.data.role,
                status: res.data.status ? res.data.status.toLowerCase() : 'active',
                joined: res.data.joined
            }]);
            setShowAddModal(false);
        } catch (err) {
            console.error(err);
            alert("Could not add customer. Ensure the email is unique.");
        }
    };

    return (
        <>
            <div className="dashboard-card">
                <div className="users-toolbar">
                    <input
                        type="text"
                        className="users-search"
                        placeholder="Search customers..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button type="button" className="users-add-btn" onClick={() => setShowAddModal(true)}>
                        + Add Customer
                    </button>
                </div>

                {loading ? (
                    <p style={{ padding: '20px', color: '#666' }}>Loading customers...</p>
                ) : (
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>CUSTOMER</th>
                                <th>EMAIL</th>
                                <th>ROLE</th>
                                <th>STATUS</th>
                                <th>JOINED</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                                        No customers found.
                                    </td>
                                </tr>
                            ) : filtered.map((user) => (
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
                )}
            </div>

            <DashboardModal open={showAddModal} onClose={() => setShowAddModal(false)} title="Add Customer">
                <AddUserForm
                    onSubmit={handleAddUser}
                    onCancel={() => setShowAddModal(false)}
                />
            </DashboardModal>
        </>
    );
}

export default UsersPage;
