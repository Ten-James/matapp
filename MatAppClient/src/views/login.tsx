import { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import LogoSVG from '../components/common/logo';
import { useAppContext } from '../context/appContext';
import { Button, Panel } from '../components/common/panel';

interface Props {
  children: React.ReactNode;
}

const LoginPage = (props: Props) => {
  const { user, setUser, setLoading, socket } = useAppContext();
  const [status, setStatus] = useState('');
  const nameRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const waiting = useRef(null);
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
      setStatus('Wrong password or username');
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
              <h2>Please Log in:</h2>
              <input
                ref={nameRef}
                type="text"
                placeholder="Username"
              />
              <input
                ref={passRef}
                type="password"
                placeholder="Password"
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
                Log In
              </Button>
              <p>Ask manager if you lost your access</p>
            </div>
            <p>All rights reserved</p>
          </Panel>
        </div>
      ) : (
        props.children
      )}
    </>
  );
};
export default LoginPage;
