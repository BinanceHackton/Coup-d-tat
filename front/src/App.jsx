import logo from './logo.svg';
import './App.css';
import { GlobalStyle } from './GlobalStyle';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Navigation from './nav/Navigation';
import Footer from './footer/Footer';
import Content from './contents/Content';
import { RecoilRoot } from 'recoil';
function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <GlobalStyle />
        <Navigation />
        <Routes>
          <Route path='' element={<Content />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
