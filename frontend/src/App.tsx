import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ManifestationPage from './features/manifestation/pages/ManifestationPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 1000 * 60 * 5 },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ManifestationPage />
    </QueryClientProvider>
  );
}
