import { createRoot, hydrateRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 2,
    },
  },
});

const container = document.getElementById('root')!;
const tree = (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

const isPrerendered = container.hasChildNodes();

if (isPrerendered) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
