import { useEffect, useState } from 'react';

export const updateUrl = (path: string, title?: string) => {
  window.history.pushState(null, title ?? "Bartender's View", path);
  console.log('URL UPDATE');
  const popStateEvent = new PopStateEvent('popstate', { state: null });
  dispatchEvent(popStateEvent);
  console.log('EVENT DISPATCH');
};

export const useReactPath = () => {
  const [path, setPath] = useState(window.location.pathname);

  const listenToPopstate = () => {
    const winPath = window.location.pathname;
    setPath(winPath);
  };
  useEffect(() => {
    window.addEventListener('popstate', listenToPopstate);
    return () => {
      window.removeEventListener('popstate', listenToPopstate);
    };
  }, []);
  return path;
};
