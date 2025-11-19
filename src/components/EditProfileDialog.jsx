import React, { useState } from "react";
import { X } from "lucide-react";

const EditProfileDialog = ({ user, onClose }) => {
  const [activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState({
    phone1: user?.phone1 || "",
    phone2: user?.phone2 || "",
    firstName: user?.firstName || "",
    middleName: user?.middleName || "",
    lastName: user?.lastName || "",
    suffix: user?.suffix || "",
    prefix: user?.prefix || "",
    gender: user?.gender || "",
    dateOfBirth: user?.dateOfBirth || "",
    addressLine1: user?.addressLine1 || "",
    addressLine2: user?.addressLine2 || "",
    city: user?.city || "",
    state: user?.state || "",
    country: user?.country || "",
    postalCode: user?.postalCode || "",
    aboutMe: user?.aboutMe || "",
    injuryType: user?.injuryType || "",
    injuryDetails: user?.injuryDetails || "",
    yearsSinceInjury: user?.yearsSinceInjury || "",
    recoveryMilestones: user?.recoveryMilestones || "",
    personalStory: user?.personalStory || "",
    conditionDetails: user?.conditionDetails || "",
    stageOfRecovery: user?.stageOfRecovery || "",
    mentorshipGoals: user?.mentorshipGoals || "",
    fitnessLevel: user?.fitnessLevel || "",
    availabilityHoursPerWeek: user?.availabilityHoursPerWeek || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Updated data:", formData);
    onClose();
  };

  const renderPersonalTab = () => (
    <div className="space-y-4">
      {/* Read-only fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="User Type"
          name="userType"
          value={user?.userProfile?.userType}
          readOnly
          isDisables={true}
        />
        <InputField
          label="Username"
          name="username"
          value={user?.username}
          readOnly
          isDisables={true}
        />
      </div>
      {/* Editable fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <InputField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <InputField
          label="Middle Name"
          name="middleName"
          value={formData.middleName}
          onChange={handleChange}
        />
        <InputField
          label="Prefix"
          name="prefix"
          value={formData.prefix}
          onChange={handleChange}
        />
        <InputField
          label="Suffix"
          name="suffix"
          value={formData.suffix}
          onChange={handleChange}
        />
        <InputField
          label="Gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        />
        <InputField
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
      </div>
    </div>
  );

  const renderContactTab = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Email"
          name="email"
          value={user?.email}
          readOnly
          isDisables={true}
        />
        <InputField
          label="Mobile Number"
          name="mobileNumber"
          value={user?.mobileNumber}
          readOnly
          isDisables={true}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Phone Number 1"
          name="phone1"
          value={formData.phone1}
          onChange={handleChange}
        />
        <InputField
          label="Phone Number 2"
          name="phone2"
          value={formData.phone2}
          onChange={handleChange}
        />
      </div>
      <InputField
        label="Address Line 1"
        name="addressLine1"
        value={formData.addressLine1}
        onChange={handleChange}
      />
      <InputField
        label="Address Line 2"
        name="addressLine2"
        value={formData.addressLine2}
        onChange={handleChange}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
        <InputField
          label="State"
          name="state"
          value={formData.state}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Country"
          name="country"
          value={formData.country}
          onChange={handleChange}
        />
        <InputField
          label="Postal Code"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
        />
      </div>
    </div>
  );

  const renderHealthTab = () => (
    <div className="space-y-4">
      <InputField
        label="About Me"
        name="aboutMe"
        value={formData.aboutMe}
        onChange={handleChange}
      />
      <InputField
        label="Injury Type"
        name="injuryType"
        value={formData.injuryType}
        onChange={handleChange}
      />
      <InputField
        label="Injury Details"
        name="injuryDetails"
        value={formData.injuryDetails}
        onChange={handleChange}
      />
      <InputField
        label="Years Since Injury"
        name="yearsSinceInjury"
        value={formData.yearsSinceInjury}
        onChange={handleChange}
      />
      <InputField
        label="Recovery Milestones"
        name="recoveryMilestones"
        value={formData.recoveryMilestones}
        onChange={handleChange}
      />
      <InputField
        label="Personal Story"
        name="personalStory"
        value={formData.personalStory}
        onChange={handleChange}
      />
      <InputField
        label="Condition Details"
        name="conditionDetails"
        value={formData.conditionDetails}
        onChange={handleChange}
      />
      <InputField
        label="Stage of Recovery"
        name="stageOfRecovery"
        value={formData.stageOfRecovery}
        onChange={handleChange}
      />
    </div>
  );

  const renderMentorshipTab = () => (
    <div className="space-y-4">
      <InputField
        label="Mentorship Goals"
        name="mentorshipGoals"
        value={formData.mentorshipGoals}
        onChange={handleChange}
      />
      <InputField
        label="Fitness Level"
        name="fitnessLevel"
        value={formData.fitnessLevel}
        onChange={handleChange}
      />
      <InputField
        label="Availability (hours per week)"
        name="availabilityHoursPerWeek"
        value={formData.availabilityHoursPerWeek}
        onChange={handleChange}
      />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-4 px-4">
              <TabButton
                name="personal"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              >
                Personal
              </TabButton>
              <TabButton
                name="contact"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              >
                Contact
              </TabButton>
              <TabButton
                name="health"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              >
                Health & Recovery
              </TabButton>
              <TabButton
                name="mentorship"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              >
                Mentorship
              </TabButton>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "personal" && renderPersonalTab()}
            {activeTab === "contact" && renderContactTab()}
            {activeTab === "health" && renderHealthTab()}
            {activeTab === "mentorship" && renderMentorshipTab()}
          </div>
        </div>

        <div className="p-4 border-t dark:border-gray-700 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md text-white bg-teal-600 hover:bg-teal-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

const TabButton = ({ name, activeTab, setActiveTab, children }) => (
  <button
    onClick={() => setActiveTab(name)}
    className={`px-3 py-2 font-medium text-sm rounded-t-lg ${
      activeTab === name
        ? "border-b-2 border-teal-500 text-teal-600 dark:text-teal-400"
        : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
    }`}
  >
    {children}
  </button>
);

const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  isDisables = false,
}) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      {label}
    </label>
    <input
      disabled={isDisables}
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
    />
  </div>
);

export default EditProfileDialog;
