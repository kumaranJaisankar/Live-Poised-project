import React, { useState } from "react";
import { X } from "lucide-react";
import { updateUser } from "../services/userServices";

const EditProfileDialog = ({ user, onClose }) => {
  const [activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState({
    userProfile: {
      mobileNumber: user?.userProfile?.mobileNumber || "",
      phone1: user?.userProfile?.phoneNumber1 || "",
      phone2: user?.userProfile?.phoneNumber2 || "",
      firstName: user?.userProfile?.firstName || "",
      middleName: user?.userProfile?.middleName || "",
      lastName: user?.userProfile?.lastName || "",
      suffix: user?.userProfile?.suffix || "",
      prefix: user?.userProfile?.prefix || "",
      gender: user?.userProfile?.gender || "",
      dateOfBirth: user?.userProfile?.dateOfBirth || "",
      aboutMe: user?.userProfile?.aboutMe || "",
    },
    address: {
      addressLine1: user?.address?.addressLine1 || "",
      addressLine2: user?.address?.addressLine2 || "",
      city: user?.address?.city || "",
      state: user?.address?.state || "",
      country: user?.address?.country || "",
      postalCode: user?.address?.postalCode || "",
    },
    personalDetails: {
      injuryType: user?.personalDetails?.injuryType || "",
      injuryDetails: user?.personalDetails?.injuryDetails || "",
      yearsSinceInjury: user?.personalDetails?.yearsSinceInjury || "",
      recoveryMilestones: user?.personalDetails?.recoveryMilestones || "",
      personalStory: user?.personalDetails?.personalStory || "",
      conditionDetails: user?.personalDetails?.conditionDetails || "",
      stageOfRecovery: user?.personalDetails?.stageOfRecovery || "",
      mentorshipGoals: user?.personalDetails?.mentorshipGoals || "",
      fitnessLevel: user?.personalDetails?.fitnessLevel || "",
      availabilityHoursPerWeek:
        user?.personalDetails?.availabilityHoursPerWeek || "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // names should be like "userProfile.firstName", "address.city", "personalDetails.injuryType"
    const keys = name.split(".");
    setFormData((prev) => {
      let updated = { ...prev };
      let current = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const username = user?.userProfile?.email;
      const updatedData = await updateUser(username, formData);
      // Optionally update state or show a success message here
      onClose(); // Close the form/modal if needed
    } catch (error) {
      console.error("Update failed:", error);
      // Optionally show an error message to the user
    }
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
          classProps={"cursor-not-allowed"}
        />
        <InputField
          label="Username"
          name="username"
          value={user?.userProfile?.username}
          readOnly
          isDisables={true}
          classProps={"cursor-not-allowed"}
        />
      </div>
      {/* Editable fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="First Name"
          name="userProfile.firstName"
          value={formData.userProfile.firstName}
          onChange={handleChange}
        />
        <InputField
          label="Last Name"
          name="userProfile.lastName"
          value={formData.userProfile.lastName}
          onChange={handleChange}
        />
        <InputField
          label="Middle Name"
          name="userProfile.middleName"
          value={formData.userProfile.middleName}
          onChange={handleChange}
        />
        <InputField
          label="Prefix"
          name="userProfile.prefix"
          value={formData.userProfile.prefix}
          onChange={handleChange}
        />
        <InputField
          label="Suffix"
          name="userProfile.suffix"
          value={formData.userProfile.suffix}
          onChange={handleChange}
        />
        <InputField
          label="Gender"
          name="userProfile.gender"
          value={formData.userProfile.gender}
          onChange={handleChange}
        />
        <InputField
          label="Date of Birth"
          name="userProfile.dateOfBirth"
          type="date"
          value={formData.userProfile.dateOfBirth}
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
          name="userProfile.email"
          value={user?.userProfile.email}
          readOnly
          isDisables={true}
          classProps={"cursor-not-allowed"}
        />
        <InputField
          label="Mobile Number"
          name="userProfile.mobileNumber"
          value={user?.userProfile.mobileNumber}
          readOnly
          isDisables={true}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Phone Number 1"
          name="userProfile.phone1"
          value={formData.userProfile.phone1}
          onChange={handleChange}
        />
        <InputField
          label="Phone Number 2"
          name="userProfile.phone2"
          value={formData.userProfile.phone2}
          onChange={handleChange}
        />
      </div>
      <InputField
        label="Address Line 1"
        name="address.addressLine1"
        value={formData.address.addressLine1}
        onChange={handleChange}
      />
      <InputField
        label="Address Line 2"
        name="address.addressLine2"
        value={formData.address.addressLine2}
        onChange={handleChange}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="City"
          name="address.city"
          value={formData.address.city}
          onChange={handleChange}
        />
        <InputField
          label="State"
          name="address.state"
          value={formData.address.state}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Country"
          name="address.country"
          value={formData.address.country}
          onChange={handleChange}
        />
        <InputField
          label="Postal Code"
          name="address.postalCode"
          value={formData.address.postalCode}
          onChange={handleChange}
        />
      </div>
    </div>
  );

  const renderHealthTab = () => (
    <div className="space-y-4">
      <InputField
        label="About Me"
        name="userProfile.aboutMe"
        value={formData.userProfile.aboutMe}
        onChange={handleChange}
      />
      <InputField
        label="Injury Type"
        name="personalDetails.injuryType"
        value={formData.personalDetails.injuryType}
        onChange={handleChange}
      />
      <InputField
        label="Injury Details"
        name="personalDetails.injuryDetails"
        value={formData.personalDetails.injuryDetails}
        onChange={handleChange}
      />
      <InputField
        label="Years Since Injury"
        name="personalDetails.yearsSinceInjury"
        value={formData.personalDetails.yearsSinceInjury}
        onChange={handleChange}
      />
      <InputField
        label="Recovery Milestones"
        name="personalDetails.recoveryMilestones"
        value={formData.personalDetails.recoveryMilestones}
        onChange={handleChange}
      />
      <InputField
        label="Personal Story"
        name="personalDetails.personalStory"
        value={formData.personalDetails.personalStory}
        onChange={handleChange}
      />
      <InputField
        label="Condition Details"
        name="personalDetails.conditionDetails"
        value={formData.personalDetails.conditionDetails}
        onChange={handleChange}
      />
      <InputField
        label="Stage of Recovery"
        name="personalDetails.stageOfRecovery"
        value={formData.personalDetails.stageOfRecovery}
        onChange={handleChange}
      />
    </div>
  );

  const renderMentorshipTab = () => (
    <div className="space-y-4">
      <InputField
        label="Mentorship Goals"
        name="personalDetails.mentorshipGoals"
        value={formData.personalDetails.mentorshipGoals}
        onChange={handleChange}
      />
      <InputField
        label="Fitness Level"
        name="personalDetails.fitnessLevel"
        value={formData.personalDetails.fitnessLevel}
        onChange={handleChange}
      />
      <InputField
        label="Availability (hours per week)"
        name="personalDetails.availabilityHoursPerWeek"
        value={formData.personalDetails.availabilityHoursPerWeek}
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
  classProps,
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
      className={`${classProps} mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm`}
    />
  </div>
);

export default EditProfileDialog;
