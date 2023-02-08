import { useCallback, useState } from 'react';
import { Socket } from 'socket.io-client';
import { ISession } from '../types';

const useSession = (socket: Socket, branchId: number) => {
  const [data, setData] = useState<ISession | null>(null);

  socket.on('session', (data: ISession) => {
    if (data.branchId === branchId) setData(data);
  });
  const getData = useCallback(() => socket.emit(`get_session`, branchId), [socket, branchId]);
  const sendData = useCallback((data: ISession) => socket.emit(`set_session`, data), [socket]);

  return [data, getData, sendData] as const;
};

export default useSession;
