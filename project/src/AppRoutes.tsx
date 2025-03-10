import { Routes, Route, Link } from 'react-router-dom';
import StudentForm from './StudentForm';
import StudentList from './StudentList';
import StudentDetails from './StudentDetails';

function AppRoutes() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-indigo-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold">Student Information System</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
                Registration Form
              </Link>
              <Link to="/students" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
                Student Records
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<StudentForm />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/students/:rollNo" element={<StudentDetails />} />
      </Routes>
    </div>
  );
}

export default AppRoutes;