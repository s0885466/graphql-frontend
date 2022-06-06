import React from 'react';
import style from './App.module.scss';

const App = ({ num }: { num: number }) => {
  return <div className={style.color}>Hello App {num}</div>;
};

export default App;
