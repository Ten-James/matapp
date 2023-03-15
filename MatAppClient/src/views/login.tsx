import React, { useEffect, useRef, useState } from 'react';
import LogoSVG from '../components/common/logo';
import { useAppContext } from '../context/appContext';
import { Button, Panel } from '../components/common/panel';

interface Props {
  children: React.ReactNode;
}

const LoginPage = (props: Props) => {
  const { user, setUser, setLoading, socket, translate } = useAppContext();
  const [status, setStatus] = useState('');
  const nameRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setLoading(false);
    //testing
    socket.emit('login', {
      name: 'admin',
      pass: 'admin',
    });
  }, []);
  socket.on('login', (data) => {
    if (data.status) {
      setUser(data.user);
    } else {
      setStatus(translate('login_failed'));
    }
  });
  return (
    <>
      {!user ? (
        <div className="App">
          <Panel
            class="center center-child"
            style={{ width: 'max(40vw,400px)', height: '80vh' }}
          >
            <LogoSVG class="upper" />
            <div className="login-container">
              <h2>{translate('log_in')}:</h2>
              <input
                ref={nameRef}
                type="text"
                placeholder="Username"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!nameRef.current || !passRef.current) return;
                  socket.emit('login', {
                    name: nameRef.current.value,
                    pass: passRef.current.value,
                  });
                }}
              />
              <input
                ref={passRef}
                type="password"
                placeholder="Password"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!nameRef.current || !passRef.current) return;
                  socket.emit('login', {
                    name: nameRef.current.value,
                    pass: passRef.current.value,
                  });
                }}
              />
              <div>{status}</div>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  if (!nameRef.current || !passRef.current) return;
                  socket.emit('login', {
                    name: nameRef.current.value,
                    pass: passRef.current.value,
                  });
                }}
              >
                {translate('log_in')}
              </Button>
              <p>{translate('lost_access')}</p>
            </div>
            <p>{translate('arr')}</p>
          </Panel>
        </div>
      ) : (
        props.children
      )}
    </>
  );
};
export default LoginPage;
