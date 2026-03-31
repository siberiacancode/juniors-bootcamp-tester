import { createRoot } from 'react-dom/client';

import { App } from './app.tsx';

const init = async () => {
  const root = createRoot(document.getElementById('root')!);

  return root.render(<App />);
};

init();
