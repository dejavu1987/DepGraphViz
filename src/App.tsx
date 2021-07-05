import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import { Visualizer } from './components/Visualizer';

const queryClient = new QueryClient();

function App() {
  const [endpoint, setEndpoint] = useState(
    localStorage.getItem('depGraphViz.endpoint') || 'http://localhost:4009'
  );
  const [fieldValue, setFieldValue] = useState(
    localStorage.getItem('depGraphViz.endpoint') || 'http://localhost:4009'
  );
  return (
    <QueryClientProvider client={queryClient}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setEndpoint(fieldValue);
          localStorage.setItem('depGraphViz.endpoint', endpoint);
        }}
      >
        <input
          type="text"
          name="endpoint"
          placeholder="Endpoint"
          onChange={(e) => setFieldValue(e.target.value)}
          value={fieldValue}
        />
        <button type="submit">Submit</button>
      </form>
      <Visualizer endpoint={endpoint} />
    </QueryClientProvider>
  );
}

export default App;
