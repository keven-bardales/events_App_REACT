import User from './User';
import { useEvents } from '../../context/EventsContext';
import { useEffect } from 'react';

function UserList() {
  const { users, loadUsers } = useEvents();

  useEffect(() => {
    loadUsers();
  }, []);

  const renderUserList = () => {
    if (users.length == 0) {
      return <h1>No Users In System</h1>;
    }

    return users.map((user) => {
      return <User key={user.id} user={user}></User>;
    });
  };

  return (
    <section className='List'>
      <h2 className='list_title'>Users</h2>
      {renderUserList()}
    </section>
  );
}

export default UserList;
