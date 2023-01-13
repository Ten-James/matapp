import { useEffect, useMemo, useState } from 'react';

const useStatus = () => {
  const [status, setStatus] = useState('');
  const [statusTranslate, setStatusTranslate] = useState('-5em');
  const statusStyle = useMemo<React.CSSProperties>(() => {
    return { transform: `translate(-50%, ${statusTranslate})` };
  }, [statusTranslate]);
  useEffect(() => {
    const id = setTimeout(() => {
      setStatusTranslate('-5em');
    }, 10000);
    return () => clearTimeout(id);
  }, [statusTranslate]);

  const setStatusHandler = (status: string) => {
    setStatus(status);
    setStatusTranslate('1em');
  };
  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setStatusTranslate('-5em');
  };
  return { status, statusStyle, setStatusHandler, onClick };
};

export default useStatus;
