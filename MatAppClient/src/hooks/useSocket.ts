import { useCallback, useState } from 'react';
import { Socket } from 'socket.io-client';

const useSocket = <T>(socket: Socket, socketString: string, defaultValue: T) => {
  const [data, setData] = useState<T>(defaultValue);

  socket.on(socketString, setData);
  const getData = useCallback(() => socket.emit(`get_${socketString}`), [socketString, socket]);
  const clear = useCallback(() => setData(defaultValue), [setData]);

  return [data, getData, clear] as const;
};

export default useSocket;