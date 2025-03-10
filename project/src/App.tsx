import React, { useState } from 'react';
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
  ScrollText
} from 'lucide-react';

interface Section {
  id: string;
  title: string;
  icon: React.ReactNode;
}

function App() {
  const [expandedSection, setExpandedSection] = useState<string | null>('studentInfo');

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

  const renderStudentInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <InputField label="Student Roll No." type="text" />
      <InputField label="Institution" type="text" />
      <InputField label="Degree" type="text" />
      <InputField label="Course" type="text" />
      <InputField label="Year of Admission" type="number" />
      <InputField label="Batch Year" type="number" />
      <InputField label="Regulation" type="text" />
      <SelectField
        label="Student Type"
        options={['Regular', 'Lateral Entry', 'Transfer']}
      />
      <InputField label="Department" type="text" />
      <InputField label="Semester/Year" type="text" />
      <InputField label="Aadhar Card Number" type="text" />
    </div>
  );

  const renderPersonalInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <SelectField
        label="Title"
        options={['Mr.', 'Ms.', 'Mrs.']}
      />
      <InputField label="First Name" type="text" />
      <InputField label="Last Name" type="text" />
      <InputField label="Date of Birth" type="date" />
      <SelectField
        label="Gender"
        options={['Male', 'Female', 'Other']}
      />
      <SelectField
        label="Citizenship"
        options={['Indian', 'Other']}
      />
      <InputField label="Community" type="text" />
      <InputField label="Mother Tongue" type="text" />
      <InputField label="Other Languages Known" type="text" />
      <InputField label="Email" type="email" />
      <InputField label="Secondary Email" type="email" />
      <InputField label="Mobile No." type="tel" />
      <InputField label="Phone No." type="tel" />
      <TextArea label="Permanent Address" />
    </div>
  );

  const renderParentalInfo = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Father's Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField label="Father's Name" type="text" />
          <InputField label="Occupation" type="text" />
          <InputField label="Employer" type="text" />
          <InputField label="Annual Income" type="number" />
          <InputField label="Aadhar Number" type="text" />
          <SelectField
            label="Alumni Status"
            options={['Yes', 'No']}
          />
          <SelectField
            label="Alive Status"
            options={['Yes', 'No']}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Mother's Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField label="Mother's Name" type="text" />
          <InputField label="Maiden Name" type="text" />
          <InputField label="Occupation" type="text" />
          <InputField label="Employer" type="text" />
          <InputField label="Annual Income" type="number" />
          <InputField label="Aadhar Number" type="text" />
          <SelectField
            label="Alumni Status"
            options={['Yes', 'No']}
          />
          <SelectField
            label="Alive Status"
            options={['Yes', 'No']}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Guardian Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField label="Guardian Name" type="text" />
          <InputField label="Relationship" type="text" />
          <InputField label="Email" type="email" />
          <InputField label="Phone" type="tel" />
          <InputField label="Mobile" type="tel" />
          <InputField label="Aadhar Number" type="text" />
          <TextArea label="Home Address" />
        </div>
      </div>
    </div>
  );

  const renderEducationInfo = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Qualifying Examination Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField label="Qualifying Exam" type="text" />
          <InputField label="Certificate Registration No." type="text" />
          <InputField label="Certificate No." type="text" />
          <InputField label="Roll No." type="text" />
          <InputField label="Date of Joining" type="date" />
          <InputField label="Date of Passing" type="date" />
          <InputField label="No. of Attempts" type="number" />
          <SelectField
            label="Medium of Instruction"
            options={['English', 'Hindi', 'Other']}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Academic Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField label="HSC Maximum Marks" type="number" />
          <InputField label="HSC Marks Obtained" type="number" />
          <InputField label="HSC Percentage" type="number" />
          <InputField label="SSLC Maximum Marks" type="number" />
          <InputField label="SSLC Marks Obtained" type="number" />
          <InputField label="SSLC Percentage" type="number" />
          <InputField label="Current CGPA" type="number" step="0.01" />
          <InputField label="Total Marks" type="number" />
        </div>
      </div>
    </div>
  );

  const renderOtherInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <SelectField
        label="Blood Group"
        options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']}
      />
      <SelectField
        label="Known Disability"
        options={['None', 'Physical', 'Visual', 'Hearing', 'Other']}
      />
      <SelectField
        label="Hostel Accommodation"
        options={['Yes', 'No']}
      />
      <SelectField
        label="Educational Loan Needed"
        options={['Yes', 'No']}
      />
      <SelectField
        label="Sports Interest"
        options={['Yes', 'No']}
      />
      <InputField label="Admission Category" type="text" />
    </div>
  );

  const renderFinancialInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <InputField label="Bank Account Number" type="text" />
      <InputField label="Bank Name" type="text" />
      <InputField label="Branch" type="text" />
      <SelectField
        label="Financial Source"
        options={['Self', 'Parents', 'Guardian', 'Scholarship', 'Loan', 'Other']}
      />
    </div>
  );

  const renderTransportInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <SelectField
        label="Mode of Transport"
        options={['College Bus', 'Public Transport', 'Own Vehicle', 'Walking']}
      />
      <InputField label="Vehicle No." type="text" />
      <InputField label="License No." type="text" />
      <TextArea label="Transport Remarks" />
    </div>
  );

  const renderCounselingInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <InputField label="Counseling Date" type="date" />
      <InputField label="Name as per SSLC" type="text" />
      <SelectField
        label="How did you learn about us?"
        options={['Advertisement', 'Friends', 'Internet', 'Social Media', 'Other']}
      />
      <InputField label="Referral Name" type="text" />
      <InputField label="Referral Contact" type="tel" />
      <TextArea label="Job and Program Expectations" />
    </div>
  );

  const renderScholarshipInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <SelectField
        label="Scholarship Status"
        options={['Applied', 'Received', 'Not Applied']}
      />
      <InputField label="Scholarship Type" type="text" />
      <div className="col-span-full">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Required Signatures</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <InputField label="Student Signature" type="file" />
          <InputField label="Father's Signature" type="file" />
          <InputField label="Mother's Signature" type="file" />
          <InputField label="Guardian's Signature" type="file" />
        </div>
      </div>
      <InputField label="Transfer Certificate" type="file" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Student Information System
          </h1>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
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
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm"
              >
                Save as Draft
              </button>
              <button
                type="submit"
                className="px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

interface InputFieldProps {
  label: string;
  type: string;
  required?: boolean;
  step?: string;
}

function InputField({ label, type, required, step }: InputFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        step={step}
        className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  options: string[];
  required?: boolean;
}

function SelectField({ label, options, required }: SelectFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
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
  required?: boolean;
}

function TextArea({ label, required }: TextAreaProps) {
  return (
    <div className="col-span-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        rows={3}
        className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  );
}

export default App;