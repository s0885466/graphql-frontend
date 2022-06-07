import React, { useState } from 'react';
import style from './App.module.scss';
import Dropdown from './Dropdown';

const App = () => {
  const [scrollTop, setScrollTop] = useState(0);

  const scrollHandler = (e: React.UIEvent<HTMLElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <div className={style.container}>
      <div className={style.form} onScroll={scrollHandler}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque error
        eum eveniet ex hic incidunt, reprehenderit. Assumenda delectus id
        impedit iste nesciunt, porro totam voluptatibus. Cumque, libero,
        suscipit? Officia, quos!
        <Dropdown scrollTop={scrollTop}>
          <div className={style.dropdownContent}>
            <ul>
              <li>
                <button
                  onClick={() => {
                    alert('fsdfsd');
                  }}
                >
                  click me
                </button>
              </li>
            </ul>
          </div>
        </Dropdown>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores
        cumque ducimus impedit laborum maiores modi provident quis tenetur
        veniam veritatis! Aspernatur dicta dignissimos dolor eum exercitationem
        ipsa rerum, veritatis voluptas. Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Asperiores cumque ducimus impedit laborum maiores modi
        provident quis tenetur veniam veritatis! Aspernatur dicta dignissimos
        dolor eum exercitationem ipsa rerum, veritatis voluptas.
      </div>
    </div>
  );
};

export default App;
