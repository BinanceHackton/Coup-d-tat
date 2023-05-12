import logo from './logo.svg';
import './App.css';
import { GlobalStyle } from './GlobalStyle';
import { Route, Routes, BrowserRouter, useLocation } from 'react-router-dom';
import Navigation from './nav/Navigation';
import Footer from './footer/Footer';
import Content from './contents/Content';
import { RecoilRoot } from 'recoil';
import GameView from './game/GameView';

function AppContent() {
  const location = useLocation();
  const isGameRoute = location.pathname.startsWith('/game/');

  return (
    <>
      <GlobalStyle />
      {!isGameRoute && <Navigation />}
      <Routes>
        <Route path='' element={<Content />} />
        <Route path='/game/:door' element={<GameView />} />
      </Routes>
      {!isGameRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
