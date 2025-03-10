import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { database } from './firebase';
import { ref, onValue, remove } from 'firebase/database';
import { ArrowLeft, Edit, Trash2, Loader, AlertTriangle } from 'lucide-react';
import { StudentData } from './types';

function StudentDetails() {
  const { rollNo } = useParams<{ rollNo: string }>();
  const navigate = useNavigate();
  const [student, setStudent] = useState<Partial<StudentData> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);

  useEffect(() => {
    if (!rollNo) {
      setError('Student Roll No. is required');
      setLoading(false);
      return;
    }

    const studentRef = ref(database, `students/${rollNo}`);
    
    const unsubscribe = onValue(studentRef, (snapshot) => {
      setLoading(true);
      try {
        const data = snapshot.val();
        if (data) {
          setStudent(data);
        } else {
          setStudent(null);
          setError(`No student found with Roll No. ${rollNo}`);
        }
      } catch (err) {
        console.error('Error fetching student:', err);
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
  }, [rollNo]);

  const handleDelete = async () => {
    if (!rollNo) return;
    
    try {
      await remove(ref(database, `students/${rollNo}`));
      navigate('/students');
    } catch (err) {
      console.error('Error deleting student:', err);
      setError('Failed to delete student. Please try again later.');
    }
  };

  const renderSection = (title: string, data: Record<string, string | undefined>) => {
    const filteredData = Object.entries(data).filter(([_, value]) => value !== undefined && value !== '');
    
    if (filteredData.length === 0) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
          {filteredData.map(([key, value]) => (
            <div key={key} className="py-1">
              <dt className="text-sm font-medium text-gray-500">{formatFieldName(key)}</dt>
              <dd className="mt-1 text-sm text-gray-900">{value}</dd>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const formatFieldName = (key: string): string => {
    // Convert camelCase to Title Case with spaces
    const formatted = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
    
    // Handle special cases
    return formatted
      .replace('Hsc', 'HSC')
      .replace('Sslc', 'SSLC')
      .replace('Cgpa', 'CGPA');
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl p-6 flex justify-center items-center py-12">
          <Loader className="w-8 h-8 text-indigo-600 animate-spin" />
          <span className="ml-2 text-gray-600">Loading student details...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="bg-red-50 text-red-800 p-4 rounded-md mb-6 flex items-start">
            <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
          <div className="flex justify-center">
            <Link 
              to="/students"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Student List
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Student Not Found</h2>
            <p className="text-gray-500 mb-6">The student with Roll No. {rollNo} does not exist.</p>
            <Link 
              to="/students"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Student List
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Group student data by sections
  const studentInfo = {
    studentRollNo: student.studentRollNo,
    institution: student.institution,
    degree: student.degree,
    course: student.course,
    yearOfAdmission: student.yearOfAdmission,
    batchYear: student.batchYear,
    regulation: student.regulation,
    studentType: student.studentType,
    department: student.department,
    semesterYear: student.semesterYear,
    aadharCardNumber: student.aadharCardNumber
  };

  const personalInfo = {
    title: student.title,
    firstName: student.firstName,
    lastName: student.lastName,
    dateOfBirth: student.dateOfBirth,
    gender: student.gender,
    citizenship: student.citizenship,
    community: student.community,
    motherTongue: student.motherTongue,
    otherLanguagesKnown: student.otherLanguagesKnown,
    email: student.email,
    secondaryEmail: student.secondaryEmail,
    mobileNo: student.mobileNo,
    phoneNo: student.phoneNo,
    permanentAddress: student.permanentAddress
  };

  const fatherInfo = {
    fatherName: student.fatherName,
    fatherOccupation: student.fatherOccupation,
    fatherEmployer: student.fatherEmployer,
    fatherAnnualIncome: student.fatherAnnualIncome,
    fatherAadharNumber: student.fatherAadharNumber,
    fatherAlumniStatus: student.fatherAlumniStatus,
    fatherAliveStatus: student.fatherAliveStatus
  };

  const motherInfo = {
    motherName: student.motherName,
    motherMaidenName: student.motherMaidenName,
    motherOccupation: student.motherOccupation,
    motherEmployer: student.motherEmployer,
    motherAnnualIncome: student.motherAnnualIncome,
    motherAadharNumber: student.motherAadharNumber,
    motherAlumniStatus: student.motherAlumniStatus,
    motherAliveStatus: student.motherAliveStatus
  };

  const guardianInfo = {
    guardianName: student.guardianName,
    guardianRelationship: student.guardianRelationship,
    guardianEmail: student.guardianEmail,
    guardianPhone: student.guardianPhone,
    guardianMobile: student.guardianMobile,
    guardianAadharNumber: student.guardianAadharNumber,
    guardianHomeAddress: student.guardianHomeAddress
  };

  const educationInfo = {
    qualifyingExam: student.qualifyingExam,
    certificateRegistrationNo: student.certificateRegistrationNo,
    certificateNo: student.certificateNo,
    rollNo: student.rollNo,
    dateOfJoining: student.dateOfJoining,
    dateOfPassing: student.dateOfPassing,
    noOfAttempts: student.noOfAttempts,
    mediumOfInstruction: student.mediumOfInstruction
  };

  const academicPerformance = {
    hscMaximumMarks: student.hscMaximumMarks,
    hscMarksObtained: student.hscMarksObtained,
    hscPercentage: student.hscPercentage,
    sslcMaximumMarks: student.sslcMaximumMarks,
    sslcMarksObtained: student.sslcMarksObtained,
    sslcPercentage: student.sslcPercentage,
    currentCGPA: student.currentCGPA,
    totalMarks: student.totalMarks
  };

  const otherInfo = {
    bloodGroup: student.bloodGroup,
    knownDisability: student.knownDisability,
    hostelAccommodation: student.hostelAccommodation,
    educationalLoanNeeded: student.educationalLoanNeeded,
    sportsInterest: student.sportsInterest,
    admissionCategory: student.admissionCategory
  };

  const financialInfo = {
    bankAccountNumber: student.bankAccountNumber,
    bankName: student.bankName,
    branch: student.branch,
    financialSource: student.financialSource
  };

  const transportInfo = {
    modeOfTransport: student.modeOfTransport,
    vehicleNo: student.vehicleNo,
    licenseNo: student.licenseNo,
    transportRemarks: student.transportRemarks
  };

  const counselingInfo = {
    counselingDate: student.counselingDate,
    nameAsPerSSLC: student.nameAsPerSSLC,
    howDidYouLearnAboutUs: student.howDidYouLearnAboutUs,
    referralName: student.referralName,
    referralContact: student.referralContact,
    jobAndProgramExpectations: student.jobAndProgramExpectations
  };

  const scholarshipInfo = {
    scholarshipStatus: student.scholarshipStatus,
    scholarshipType: student.scholarshipType
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 border-b pb-4">
          <div>
            <div className="flex items-center mb-2">
              <Link to="/students" className="text-indigo-600 hover:text-indigo-900 mr-2">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">
                Student Details
              </h1>
            </div>
            <p className="text-gray-500">
              {student.firstName && student.lastName 
                ? `${student.title || ''} ${student.firstName} ${student.lastName}`
                : 'N/A'} 
              {student.studentRollNo && ` • ${student.studentRollNo}`}
            </p>
          </div>
          
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Link 
              to={`/`}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Link>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </button>
          </div>
        </div>

        {student.isDraft === 'true' && (
          <div className="bg-yellow-50 text-yellow-800 p-4 rounded-md mb-6">
            This is a draft record and may be incomplete.
          </div>
        )}

        <div className="space-y-6">
          {renderSection('Student Information', studentInfo)}
          {renderSection('Personal Information', personalInfo)}
          {renderSection('Father\'s Information', fatherInfo)}
          {renderSection('Mother\'s Information', motherInfo)}
          {renderSection('Guardian Information', guardianInfo)}
          {renderSection('Education Details', educationInfo)}
          {renderSection('Academic Performance', academicPerformance)}
          {renderSection('Other Information', otherInfo)}
          {renderSection('Financial Information', financialInfo)}
          {renderSection('Transportation Details', transportInfo)}
          {renderSection('Counseling & Survey Details', counselingInfo)}
          {renderSection('Scholarship Information', scholarshipInfo)}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Deletion</h3>
            <p className="text-gray-500 mb-6">
              Are you sure you want to delete this student record? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentDetails;