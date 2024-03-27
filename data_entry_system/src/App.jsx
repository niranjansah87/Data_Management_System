import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './components/data'; // Adjusted the import statement for Main component
import SearchByDate from './components/searchByDate';
import SearchByWord from './components/searchByWords';

function App() {
  return (
    <>
      {/* <Main /> */}

      <BrowserRouter>
        <Routes>
          <Route index element={<Main />} />
          <Route path="/searchByWord" element={<SearchByWord />} />
          <Route path="/searchByDate" element={<SearchByDate />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
