import { useCallback, useState } from 'react';
import { Socket } from 'socket.io-client';

const useSocket = <T>(socket: Socket, socketString: string, defaultValue: T) => {
  const [data, setData] = useState<T>(defaultValue);
  const [lastFetchTime, setLastFetchTime] = useState<number>(0);

  socket.on(socketString, setData);
  const getData = useCallback(
    (...data: any) => {
      if (lastFetchTime + 500 < Date.now()) {
        socket.emit(`get_${socketString}`, data);
        setLastFetchTime(Date.now());
      }
    },
    [socketString, socket, lastFetchTime],
  );
  const clear = useCallback(() => setData(defaultValue), [setData]);

  return [data, getData, clear] as const;
};

export default useSocket;
