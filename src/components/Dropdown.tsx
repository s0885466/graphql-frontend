import React, { useEffect, useRef, useState } from 'react';
import style from './Dropdown.module.scss';

type DropdownProps = {
  children: React.ReactNode;
  scrollTop: number;
};

const Dropdown = ({ children, scrollTop }: DropdownProps) => {
  const [isShownContent, setIsShownContent] = useState(false);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
  });

  const toggleContentShow = () => {
    setIsShownContent((prev) => !prev);
  };

  useEffect(() => {
    const { bottom, left } = dropdownButtonRef.current.getBoundingClientRect();

    setPosition({ top: bottom, left });
  }, [scrollTop]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (e.target !== dropdownButtonRef.current) {
        setIsShownContent(false);
      }
    };
    document.addEventListener('click', handler);

    return () => {
      document.removeEventListener('click', handler);
    };
  }, []);

  return (
    <div className={style.container}>
      <button ref={dropdownButtonRef} onClick={toggleContentShow}>
        dropdown button
      </button>
      {isShownContent && (
        <div style={{ ...position }} className={style.content}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
