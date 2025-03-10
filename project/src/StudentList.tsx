import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { database } from './firebase';
import { ref, onValue } from 'firebase/database';
import { Search, Loader, User } from 'lucide-react';
import { StudentData } from './types';

function StudentList() {
  const [students, setStudents] = useState<Record<string, Partial<StudentData>>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const studentsRef = ref(database, 'students');
    
    const unsubscribe = onValue(studentsRef, (snapshot) => {
      setLoading(true);
      try {
        const data = snapshot.val();
        if (data) {
          setStudents(data);
        } else {
          setStudents({});
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching students:', err);
        setError('Failed to load student data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }, (err) => {
      console.error('Database error:', err);
      setError('Failed to connect to the database. Please check your connection and try again.');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredStudents = Object.entries(students).filter(([rollNo]) => 
    rollNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
            Student Records
          </h1>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by Roll No."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-800 p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader className="w-8 h-8 text-indigo-600 animate-spin" />
            <span className="ml-2 text-gray-600">Loading student records...</span>
          </div>
        ) : filteredStudents.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Roll No.
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map(([rollNo, student]) => (
                  <tr key={rollNo} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {rollNo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.firstName && student.lastName 
                        ? `${student.title || ''} ${student.firstName} ${student.lastName}`
                        : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.department || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.course || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {student.isDraft === 'true' ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Draft
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Submitted
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Link 
                        to={`/students/${rollNo}`}
                        className="text-indigo-600 hover:text-indigo-900 font-medium"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <User className="w-16 h-16 text-gray-300 mb-4" />
            {searchQuery ? (
              <p>No students found matching "{searchQuery}"</p>
            ) : (
              <p>No student records found. Add a new student to get started.</p>
            )}
            <Link 
              to="/"
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add New Student
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentList;