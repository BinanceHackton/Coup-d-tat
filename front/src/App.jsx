import logo from './logo.svg';
import './App.css';
import { GlobalStyle } from './GlobalStyle';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Navigation from './nav/Navigation';
import Footer from './footer/Footer';
import Content from './contents/Content';
function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Navigation />
      <Routes>
        <Route path='' element={<Content />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
