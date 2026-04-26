/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './lib/AuthContext';
import Layout from './components/layout/Layout';
import Guide from './pages/Guide';
import Process from './pages/Process';
import Timeline from './pages/Timeline';
import Elections from './pages/Elections';
import Login from './pages/Login';
import AiAssistant from './pages/AiAssistant';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Guide />} />
            <Route path="/process" element={<Process />} />
            <Route path="/elections" element={<Elections />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/login" element={<Login />} />
            <Route path="/ai-assistant" element={<AiAssistant />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}
