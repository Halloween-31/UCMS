import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CMSLayout from './components/uCMSLayout';
import Login from './pages/login/Login';
import About from './pages/about/About';
import React from 'react';
import Sites from './pages/sites/Sites';
import Register from './pages/login/Register';
import Site from './pages/sites/site/Site';

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<CMSLayout />}>
              <Route index element={<Login />} />
              <Route path='register' element={<Register />} />
          </Route>
          <Route path='sites' element={<Sites />} />
          <Route path='site' element={<Site />} />
          <Route path="about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  )
}

export default App










/*
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
*/






/*
      
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
 











      <Router>
        <Routes>
          <Route path="/" element={<CMSLayout />}>
            <Route index element={<Login />} />
            <Route path="content" element={<Content />}>
              <Route path="" element={<ContentMain />}></Route>
            </Route>
            <Route path="media" element={<Media />}>
              <Route path="" element={<MediaContent />}></Route>
            </Route>
            <Route path="settings" element={<Settings />}>
              <Route path="" element={<SettingsContent />}></Route>
            </Route>
          </Route>
        </Routes>
      </Router>



*/