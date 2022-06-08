import React from 'react';
import style from './App.module.scss';
import { useQuery } from '@apollo/client';
import allUsersQuery from './query.graphql';
import { useMyHook } from './useMyHook';

type User = {
  name: string;
  id: string;
};

type AllUsersData = {
  allUsers: User[];
};

const App = () => {
  const { loading, error, data } = useQuery<AllUsersData>(allUsersQuery);
  const [count, handleCount] = useMyHook(0);

  if (loading) return <div>Loading...</div>;

  if (error)
    return (
      <div>
        <div className={style.error}>Error :( eeedddddd</div>
        <button onClick={() => handleCount()}>count++</button>
        <div>count: {count}</div>
      </div>
    );

  return (
    <div className={style.color}>
      {data.allUsers.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};

export default App;
