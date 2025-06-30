import { useState, useEffect } from "react";
import api from "../../utils/api";
import { Button, Table, Container, Alert, Spinner } from 'react-bootstrap';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('https://blogtech-application.onrender.com/admin-api/dashboard');
      setUsers(response.data.users);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setErrorMsg('Failed to fetch users.');
      setLoading(false);
    }
  };

  const toggleBlock = async (email, isCurrentlyActive) => {
    const shouldBlock = !isCurrentlyActive;

    try {
      await api.put('https://blogtech-application.onrender.com/admin-api/block-user', {
        email,
        block: !isCurrentlyActive, // true = block, false = unblock
        message: shouldBlock
          ? 'Your account has been blocked due to suspicious activity.'
          : '',
      });

      setSuccessMsg(shouldBlock ? 'User blocked successfully.' : 'User unblocked successfully.');

      setTimeout(() => setSuccessMsg(''), 2000);

      // Update UI
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.email === email
            ? {
                ...user,
                isActive: !shouldBlock,
                blockMessage: shouldBlock
                  ? 'Your account has been blocked due to suspicious activity.'
                  : '',
              }
            : user
        )
      );
    } catch (err) {
      console.error(err);
      alert('Failed to update user status.');
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Admin Dashboard</h2>

      {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
      {successMsg && <Alert variant="success">{successMsg}</Alert>}

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Status</th>
            <th>Block Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.email}</td>
              <td className={user.isActive ? 'text-success' : 'text-danger'}>
                {user.isActive ? 'Active' : 'Blocked'}
              </td>
              <td>{!user.isActive ? user.blockMessage : '-'}</td>
              <td>
                <Button
                  variant={user.isActive ? 'danger' : 'success'}
                  onClick={() => toggleBlock(user.email, user.isActive)}
                >
                  {user.isActive ? 'Block' : 'Unblock'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminDashboard;
