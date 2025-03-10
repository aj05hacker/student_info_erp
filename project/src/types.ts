export interface StudentData {
  // Student Information
  studentRollNo: string;
  institution: string;
  degree: string;
  course: string;
  yearOfAdmission: string;
  batchYear: string;
  regulation: string;
  studentType: string;
  department: string;
  semesterYear: string;
  aadharCardNumber: string;

  // Personal Information
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  citizenship: string;
  community: string;
  motherTongue: string;
  otherLanguagesKnown: string;
  email: string;
  secondaryEmail: string;
  mobileNo: string;
  phoneNo: string;
  permanentAddress: string;

  // Father's Information
  fatherName: string;
  fatherOccupation: string;
  fatherEmployer: string;
  fatherAnnualIncome: string;
  fatherAadharNumber: string;
  fatherAlumniStatus: string;
  fatherAliveStatus: string;

  // Mother's Information
  motherName: string;
  motherMaidenName: string;
  motherOccupation: string;
  motherEmployer: string;
  motherAnnualIncome: string;
  motherAadharNumber: string;
  motherAlumniStatus: string;
  motherAliveStatus: string;

  // Guardian Information
  guardianName: string;
  guardianRelationship: string;
  guardianEmail: string;
  guardianPhone: string;
  guardianMobile: string;
  guardianAadharNumber: string;
  guardianHomeAddress: string;

  // Education Details
  qualifyingExam: string;
  certificateRegistrationNo: string;
  certificateNo: string;
  rollNo: string;
  dateOfJoining: string;
  dateOfPassing: string;
  noOfAttempts: string;
  mediumOfInstruction: string;
  hscMaximumMarks: string;
  hscMarksObtained: string;
  hscPercentage: string;
  sslcMaximumMarks: string;
  sslcMarksObtained: string;
  sslcPercentage: string;
  currentCGPA: string;
  totalMarks: string;

  // Other Information
  bloodGroup: string;
  knownDisability: string;
  hostelAccommodation: string;
  educationalLoanNeeded: string;
  sportsInterest: string;
  admissionCategory: string;

  // Financial Information
  bankAccountNumber: string;
  bankName: string;
  branch: string;
  financialSource: string;

  // Transportation Details
  modeOfTransport: string;
  vehicleNo: string;
  licenseNo: string;
  transportRemarks: string;

  // Counseling & Survey Details
  counselingDate: string;
  nameAsPerSSLC: string;
  howDidYouLearnAboutUs: string;
  referralName: string;
  referralContact: string;
  jobAndProgramExpectations: string;

  // Scholarship & Signatures
  scholarshipStatus: string;
  scholarshipType: string;
  // File fields are not stored directly in the database
}