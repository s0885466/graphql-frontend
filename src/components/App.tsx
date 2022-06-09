import React, { useEffect } from 'react';
import style from './App.module.scss';
import { useQuery } from '@apollo/client';
import allUsersQuery from './query.graphql';
import { useMyHook } from './useMyHook';
import photoSrc from '../assets/photo.jpeg';

type User = {
  name: string;
  id: string;
};

type AllUsersData = {
  allUsers: User[];
};

const App = () => {
  useEffect(() => {
    async function hello() {
      return 'hello';
    }

    hello().then((res) => {
      console.log(res);
    });

    import('./Lazy').then((lazy) => {
      console.log(lazy.default);
    });
  }, []);
  const { loading, error, data } = useQuery<AllUsersData>(allUsersQuery);
  const [count, handleCount] = useMyHook(0);
  if (loading) return <div>Loading...</div>;

  if (error)
    return (
      <div>
        <img src={photoSrc} alt="same photo" width="200" height="100" />
        <div className={style.container}>
          <div className={style.error}>Error :( eeedddddd</div>
          <button onClick={() => handleCount()}>count++</button>
          <div>count: {count}</div>
        </div>
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
