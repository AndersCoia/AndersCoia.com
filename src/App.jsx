import { Routes, Route, Navigate } from 'react-router-dom';
import ProjectIndex from './routes/ProjectIndex.jsx';
import ProjectPage from './routes/ProjectPage.jsx';

export default function App() {
  return (
	<Routes>
  	<Route path="/" element={<ProjectIndex />} />
  	<Route path="/work/:slug" element={<ProjectPage />} />
  	<Route path="*" element={<Navigate to="/" replace />} />
	</Routes>
  );
}

