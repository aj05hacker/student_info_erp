import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronDown,
  ChevronUp,
  GraduationCap,
  User,
  Users,
  BookOpen,
  Heart,
  Bus,
  BadgeIndianRupee,
  ClipboardCheck,
  ScrollText,
  Save,
  Send
} from 'lucide-react';
import { database } from './firebase';
import { ref, set } from 'firebase/database';
import { StudentData } from './types';

interface Section {
  id: string;
  title: string;
  icon: React.ReactNode;
}

function StudentForm() {
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState<string | null>('studentInfo');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  
  // Single state object for all form data
  const [formData, setFormData] = useState<Partial<StudentData>>({});

  const sections: Section[] = [
    { id: 'studentInfo', title: 'Student Information', icon: <GraduationCap className="w-5 h-5" /> },
    { id: 'personalInfo', title: 'Personal Information', icon: <User className="w-5 h-5" /> },
    { id: 'parentalInfo', title: 'Parental & Guardian Information', icon: <Users className="w-5 h-5" /> },
    { id: 'educationInfo', title: 'Education Details', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'otherInfo', title: 'Other Information', icon: <Heart className="w-5 h-5" /> },
    { id: 'financialInfo', title: 'Financial Information', icon: <BadgeIndianRupee className="w-5 h-5" /> },
    { id: 'transportInfo', title: 'Transportation Details', icon: <Bus className="w-5 h-5" /> },
    { id: 'counselingInfo', title: 'Counseling & Survey Details', icon: <ClipboardCheck className="w-5 h-5" /> },
    { id: 'scholarshipInfo', title: 'Scholarship & Signatures', icon: <ScrollText className="w-5 h-5" /> }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.studentRollNo?.trim()) {
      setSubmitMessage({
        type: 'error',
        text: 'Student Roll No. is required as it is used as the unique identifier'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      // Use the roll number as the key in Firebase
      await set(ref(database, `students/${formData.studentRollNo}`), formData);
      
      setSubmitMessage({
        type: 'success',
        text: 'Student information saved successfully!'
      });
      
      // Navigate to the student details page after successful submission
      setTimeout(() => {
        navigate(`/students/${formData.studentRollNo}`);
      }, 2000);
    } catch (error) {
      console.error('Error saving student data:', error);
      setSubmitMessage({
        type: 'error',
        text: 'Failed to save student information. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    if (!formData.studentRollNo?.trim()) {
      setSubmitMessage({
        type: 'error',
        text: 'Student Roll No. is required to save a draft'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const draftData = { ...formData, isDraft: 'true' };
      await set(ref(database, `students/${formData.studentRollNo}`), draftData);
      
      setSubmitMessage({
        type: 'success',
        text: 'Draft saved successfully!'
      });
    } catch (error) {
      console.error('Error saving draft:', error);
      setSubmitMessage({
        type: 'error',
        text: 'Failed to save draft. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStudentInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <InputField 
        label="Student Roll No." 
        name="studentRollNo" 
        type="text" 
        value={formData.studentRollNo || ''}
        onChange={handleInputChange}
      />
      <InputField 
        label="Institution" 
        name="institution" 
        type="text" 
        value={formData.institution || ''}
        onChange={handleInputChange}
      />
      <InputField 
        label="Degree" 
        name="degree" 
        type="text" 
        value={formData.degree || ''}
        onChange={handleInputChange}
      />
      <InputField 
        label="Course" 
        name="course" 
        type="text" 
        value={formData.course || ''}
        onChange={handleInputChange}
      />
      <InputField 
        label="Year of Admission" 
        name="yearOfAdmission" 
        type="number" 
        value={formData.yearOfAdmission || ''}
        onChange={handleInputChange}
      />
      <InputField 
        label="Batch Year" 
        name="batchYear" 
        type="number" 
        value={formData.batchYear || ''}
        onChange={handleInputChange}
      />
      <InputField 
        label="Regulation" 
        name="regulation" 
        type="text" 
        value={formData.regulation || ''}
        onChange={handleInputChange}
      />
      <SelectField
        label="Student Type"
        name="studentType"
        options={['Regular', 'Lateral Entry', 'Transfer']}
        value={formData.studentType || ''}
        onChange={handleInputChange}
      />
      <InputField 
        label="Department" 
        name="department" 
        type="text" 
        value={formData.department || ''}
        onChange={handleInputChange}
      />
      <InputField 
        label="Semester/Year" 
        name="semesterYear" 
        type="text" 
        value={formData.semesterYear || ''}
        onChange={handleInputChange}
      />
      <InputField 
        label="Aadhar Card Number" 
        name="aadharCardNumber" 
        type="text" 
        value={formData.aadharCardNumber || ''}
        onChange={handleInputChange}
      />
    </div>
  );

  const renderPersonalInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <SelectField
        label="Title"
        name="title"
        options={['Mr.', 'Ms.', 'Mrs.']}
        value={formData.title || ''}
        onChange={handleInputChange}
      />
      <InputField 
        label="First Name" 
        name="firstName" 
        type="text" 
        value={formData.firstName || ''}
        onChange={handleInputChange}
      />
      <InputField 
        label="Last Name" 
        name="lastName" 
        type="text" 
        value={formData.lastName || ''}
        onChange={handleInputChange}
      />
      <InputField 
        label="Date of Birth" 
        name="dateOfBirth" 
        type="date" 
        value={formData.dateOfBirth || ''}
        onChange={handleInputChange}
      />
      <SelectField
        label="Gender"
        name="gender"
        options={['Male', 'Female', 'Other']}
        value={formData.gender || ''}
        onChange={handleInputChange}
      />
      <SelectField
        label="Citizenship"
        name="citizenship"
        options={['Indian', 'Other']}
        value={formData.citizenship || ''}
        onChange={handleInputChange}
      />
      <InputField 
        label="Community" 
        name="community" 
        type="text" 
        value={formData.community || ''}
        onChange={handleInputChange}
      />
      <InputField 
        label="Mother Tongue" 
        name="motherTongue" 
        type="text" 
        value={formData.motherTongue || ''}
        onChange={handleInputChange}
      />
      <InputField 
        label="Other Languages Known" 
        name="otherLanguagesKnown" 
        type="text" 
        value={formData.otherLanguagesKnown || ''}
        onChange={handleInputChange}
      />
      <InputField 
        label="Email" 
        name="email" 
        type="email" 
        value={formData.email || ''}
        onChange={handleInputChange}
      />
      <InputField 
        label="Secondary Email" 
        name="secondaryEmail" 
        type="email" 
        value={formData.secondaryEmail || ''}
        onChange={handleInputChange}
      />
      <InputField 
        label="Mobile No." 
        name="mobileNo" 
        type="tel" 
        value={formData.mobileNo || ''}
        onChange={handleInputChange}
      />
      <InputField 
        label="Phone No." 
        name="phoneNo" 
        type="tel" 
        value={formData.phoneNo || ''}
        onChange={handleInputChange}
      />
      <TextArea 
        label="Permanent Address" 
        name="permanentAddress" 
        value={formData.permanentAddress || ''}
        onChange={handleInputChange}
      />
    </div>
  );

  const renderParentalInfo = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Father's Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField 
            label="Father's Name" 
            name="fatherName" 
            type="text" 
            value={formData.fatherName || ''}
            onChange={handleInputChange}
          />
          <InputField 
            label="Occupation" 
            name="fatherOccupation" 
            type="text" 
            value={formData.fatherOccupation || ''}
            onChange={handleInputChange}
          />
          <InputField 
            label="Employer" 
            name="fatherEmployer" 
            type="text" 
            value={formData.fatherEmployer || ''}
            onChange={handleInputChange}
          />
          <InputField 
            label="Annual Income" 
            name="fatherAnnualIncome" 
            type="number" 
            value={formData.fatherAnnualIncome || ''}
            onChange={handleInputChange}
          />
          <InputField 
            label="Aadhar Number" 
            name="fatherAadharNumber" 
            type="text" 
            value={formData.fatherAadharNumber || ''}
            onChange={handleInputChange}
          />
          <SelectField
            label="Alumni Status"
            name="fatherAlumniStatus"
            options={['Yes', 'No']}
            value={formData.fatherAlumniStatus || ''}
            onChange={handleInputChange}
          />
          <SelectField
            label="Alive Status"
            name="fatherAliveStatus"
            options={['Yes', 'No']}
            value={formData.fatherAliveStatus || ''}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Mother's Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField 
            label="Mother's Name" 
            name="motherName" 
            type="text" 
            value={formData.motherName || ''}
            onChange={handleInputChange}
          />
          <InputField 
            label="Maiden Name" 
            name="motherMaidenName" 
            type="text" 
            value={formData.motherMaidenName || ''}
            onChange={handleInputChange}
          />
          <InputField 
            label="Occupation" 
            name="motherOccupation" 
            type="text" 
            value={formData.motherOccupation || ''}
            onChange={handleInputChange}
          />
          <InputField 
            label="Employer" 
            name="motherEmployer" 
            type="text" 
            value={formData.motherEmployer || ''}
            onChange={handleInputChange}
          />
          <InputField 
            label="Annual Income" 
            name="motherAnnualIncome" 
            type="number" 
            value={formData.motherAnnualIncome || ''}
            onChange={handleInputChange}
          />
          <InputField 
            label="Aadhar Number" 
            name="motherAadharNumber" 
            type="text" 
            value={formData.motherAadharNumber || ''}
            onChange={handleInputChange}
          />
          <SelectField
            label="Alumni Status"
            name="motherAlumniStatus"
            options={['Yes', 'No']}
            value={formData.motherAlumniStatus || ''}
            onChange={handleInputChange}
          />
          <SelectField
            label="Alive Status"
            name="motherAliveStatus"
            options={['Yes', 'No']}
            value={formData.motherAliveStatus || ''}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Guardian Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField 
            label="Guardian Name" 
            name="guardianName" 
            type="text" 
            value={formData.guardianName || ''}
            onChange={handleInputChange}
          />
          <InputField 
            label="Relationship" 
            name="guardianRelationship" 
            type="text" 
            value={formData.guardianRelationship || ''}
            onChange={handleInputChange}
          />
          <InputField 
            label="Email" 
            name="guardianEmail" 
            type="email" 
            value={formData.guardianEmail || ''}
            onChange={handleInputChange}
          />
          <InputField 
            label="Phone" 
            name="guardianPhone" 
            type="tel" 
            value={formData.guardianPhone || ''}
            onChange={handleInputChange}
          />
          <InputField 
            label="Mobile" 
            name="guardianMobile" 
            type="tel" 
            value={formData.guardianMobile || ''}
            onChange={handleInputChange}
          />
          <InputField 
            label="Aadhar Number" 
            name="guardianAadharNumber" 
            type="text" 
            value={formData.guardianAadharNumber || ''}
            onChange={handleInputChange}
          />
          <TextArea 
            label="Home Address" 
            name="guardianHomeAddress" 
            value={formData.guardianHomeAddress || ''}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );

  const renderEducationInfo = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Qualifying Examination Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField 
            label="Qualifying Exam" 
            name="qualifyingExam" 
            type="text" 
            value={formData.qualifyingExam || ''}
            onChange={handleInputChange}
          />
          <InputField 
            label="Certificate Registration No." 
            name="certificateRegistrationNo" 
            type="text" 
            value={formData.certificateRegistrationNo || ''}
            onChange={handleInputChange}
          />
          <InputField 
            label="Certificate No." 
            name="certificateNo" 
            type="text" 
            value={formData.certificateNo || ''}
            onChange={handleInputChange}
          />
          <InputField 
            label="Roll No." 
            name="rollNo" 
            type="text" 
            value={formData.rollNo || ''}
            onChange={handleInputChange}
          />
          <InputField 
            label="Date of Joining" 
            name="dateOfJoining" 
            type="date" 
            value={formData.dateOfJoining || ''}
            onChange={handleInputChange}
          />
          <InputField 
            label="Date of Passing" 
            name="dateOfPassing" 
            type="date" 
            value={formData.dateOfPassing || ''}
            onChange={handleInputChange}
          />
          <InputField 
            label="No. of Attempts" 
            name="noOfAttempts" 
            type="number" 
            value={formData.noOfAttempts || ''}
            onChange={handleInputChange}
          />
          <SelectField
            label="Medium of Instruction"
            name="mediumOfInstruction"
            options={['English', 'Hindi', 'Other']}
            value={formData.mediumOfInstruction || ''}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Academic Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField 
            label="HSC Maximum Marks" 
            name="hscMaximumMarks" 
            type="number" 
            value={formData.hscMaximumMarks || ''}
            onChange={handleInputChange}
          />
          <InputField 
            label="HSC Marks Obtained" 
            name="hscMarksObtained" 
            type="number" 
            value={formData.hscMarksObtained || ''}
            onChange={handleInputChange}
          />
          <InputField 
            label="HSC Percentage" 
            name="hscPercentage" 
            type="number" 
            value={formData.hscPercentage || ''}
            onChange={handleInputChange}
          />
          <InputField 
            label="SSLC Maximum Marks" 
            name="sslcMaximumMarks" 
            type="number" 
            value={formData.sslcMaximumMarks || ''}
            onChange={handleInputChange}
          />
          <InputField 
            label="SSLC Marks Obtained" 
            name="sslcMarksObtained" 
            type="number" 
            value={formData.sslcMarksObtained || ''}
            onChange={handleInputChange}
          />
          <InputField 
            label="SSLC Percentage" 
            name="sslcPercentage" 
            type="number" 
            value={formData.sslcPercentage || ''}
            onChange={handleInputChange}
          />
          <InputField 
            label="Current CGPA" 
            name="currentCGPA" 
            type="number" 
            step="0.01" 
            value={formData.currentCGPA || ''}
            onChange={handleInputChange}
          />
          <InputField 
            label="Total Marks" 
            name="totalMarks" 
            type="number" 
            value={formData.totalMarks || ''}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );

  const renderOtherInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <SelectField
        label="Blood Group"
        name="bloodGroup"
        options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']}
        value={formData.bloodGroup || ''}
        onChange={handleInputChange}
      />
      <SelectField
        label="Known Disability"
        name="knownDisability"
        options={['None', 'Physical', 'Visual', 'Hearing', 'Other']}
        value={formData.knownDisability || ''}
        onChange={handleInputChange}
      />
      <SelectField
        label="Hostel Accommodation"
        name="hostelAccommodation"
        options={['Yes', 'No']}
        value={formData.hostelAccommodation || ''}
        onChange={handleInputChange}
      />
      <SelectField
        label="Educational Loan Needed"
        name="educationalLoanNeeded"
        options={['Yes', 'No']}
        value={formData.educationalLoanNeeded || ''}
        onChange={handleInputChange}
      />
      <SelectField
        label="Sports Interest"
        name="sportsInterest"
        options={['Yes', 'No']}
        value={formData.sportsInterest || ''}
        onChange={handleInputChange}
      />
      <InputField 
        label="Admission Category" 
        name="admissionCategory" 
        type="text" 
        value={formData.admissionCategory || ''}
        onChange={handleInputChange}
      />
    </div>
  );

  const renderFinancialInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <InputField 
        label="Bank Account Number" 
        name="bankAccountNumber" 
        type="text" 
        value={formData.bankAccountNumber || ''}
        onChange={handleInputChange}
      />
      <InputField 
        label="Bank Name" 
        name="bankName" 
        type="text" 
        value={formData.bankName || ''}
        onChange={handleInputChange}
      />
      <InputField 
        label="Branch" 
        name="branch" 
        type="text" 
        value={formData.branch || ''}
        onChange={handleInputChange}
      />
      <SelectField
        label="Financial Source"
        name="financialSource"
        options={['Self', 'Parents', 'Guardian', 'Scholarship', 'Loan', 'Other']}
        value={formData.financialSource || ''}
        onChange={handleInputChange}
      />
    </div>
  );

  const renderTransportInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <SelectField
        label="Mode of Transport"
        name="modeOfTransport"
        options={['College Bus', 'Public Transport', 'Own Vehicle', 'Walking']}
        value={formData.modeOfTransport || ''}
        onChange={handleInputChange}
      />
      <InputField 
        label="Vehicle No." 
        name="vehicleNo" 
        type="text" 
        value={formData.vehicleNo || ''}
        onChange={handleInputChange}
      />
      <InputField 
        label="License No." 
        name="licenseNo" 
        type="text" 
        value={formData.licenseNo || ''}
        onChange={handleInputChange}
      />
      <TextArea 
        label="Transport Remarks" 
        name="transportRemarks" 
        value={formData.transportRemarks || ''}
        onChange={handleInputChange}
      />
    </div>
  );

  const renderCounselingInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <InputField 
        label="Counseling Date" 
        name="counselingDate" 
        type="date" 
        value={formData.counselingDate || ''}
        onChange={handleInputChange}
      />
      <InputField 
        label="Name as per SSLC" 
        name="nameAsPerSSLC" 
        type="text" 
        value={formData.nameAsPerSSLC || ''}
        onChange={handleInputChange}
      />
      <SelectField
        label="How did you learn about us?"
        name="howDidYouLearnAboutUs"
        options={['Advertisement', 'Friends', 'Internet', 'Social Media', 'Other']}
        value={formData.howDidYouLearnAboutUs || ''}
        onChange={handleInputChange}
      />
      <InputField 
        label="Referral Name" 
        name="referralName" 
        type="text" 
        value={formData.referralName || ''}
        onChange={handleInputChange}
      />
      <InputField 
        label="Referral Contact" 
        name="referralContact" 
        type="tel" 
        value={formData.referralContact || ''}
        onChange={handleInputChange}
      />
      <TextArea 
        label="Job and Program Expectations" 
        name="jobAndProgramExpectations" 
        value={formData.jobAndProgramExpectations || ''}
        onChange={handleInputChange}
      />
    </div>
  );

  const renderScholarshipInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <SelectField
        label="Scholarship Status"
        name="scholarshipStatus"
        options={['Applied', 'Received', 'Not Applied']}
        value={formData.scholarshipStatus || ''}
        onChange={handleInputChange}
      />
      <InputField 
        label="Scholarship Type" 
        name="scholarshipType" 
        type="text" 
        value={formData.scholarshipType || ''}
        onChange={handleInputChange}
      />
      <div className="col-span-full">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Required Signatures</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <InputField label="Student Signature" name="studentSignature" type="file" />
          <InputField label="Father's Signature" name="fatherSignature" type="file" />
          <InputField label="Mother's Signature" name="motherSignature" type="file" />
          <InputField label="Guardian's Signature" name="guardianSignature" type="file" />
        </div>
      </div>
      <InputField label="Transfer Certificate" name="transferCertificate" type="file" />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-xl p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Student Registration Form
        </h1>

        {submitMessage && (
          <div className={`mb-6 p-4 rounded-md ${submitMessage.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            {submitMessage.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {sections.map((section) => (
            <div key={section.id} className="border rounded-lg overflow-hidden shadow-sm">
              <button
                type="button"
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  {section.icon}
                  <span className="font-medium text-gray-900">{section.title}</span>
                </div>
                {expandedSection === section.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              
              {expandedSection === section.id && (
                <div className="p-6 bg-white border-t">
                  {section.id === 'studentInfo' && renderStudentInfo()}
                  {section.id === 'personalInfo' && renderPersonalInfo()}
                  {section.id === 'parentalInfo' && renderParentalInfo()}
                  {section.id === 'educationInfo' && renderEducationInfo()}
                  {section.id === 'otherInfo' && renderOtherInfo()}
                  {section.id === 'financialInfo' && renderFinancialInfo()}
                  {section.id === 'transportInfo' && renderTransportInfo()}
                  {section.id === 'counselingInfo' && renderCounselingInfo()}
                  {section.id === 'scholarshipInfo' && renderScholarshipInfo()}
                </div>
              )}
            </div>
          ))}

          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={isSubmitting}
              className="flex items-center px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              Save as Draft
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center px- 6 py-2 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              <Send className="w-4 h-4 mr-2" />
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  step?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputField({ label, name, type, step, value, onChange }: InputFieldProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        step={step}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  name: string;
  options: string[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function SelectField({ label, name, options, value, onChange }: SelectFieldProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

interface TextAreaProps {
  label: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function TextArea({ label, name, value, onChange }: TextAreaProps) {
  return (
    <div className="col-span-full">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        rows={3}
        className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  );
}

export default StudentForm;