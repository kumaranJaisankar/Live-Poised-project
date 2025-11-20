import React from "react";

const Avatar = ({ name, className }) => {
  const getInitials = (name) => {
    if (!name) return "?";
    const words = name.split(" ");
    if (words.length > 1) {
      return words[0][0] + words[1][0];
    }
    return name[0];
  };

  const getBackgroundColor = (name) => {
    if (!name) return "#CCCCCC"; // Default gray
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = hash % 360;
    return `hsl(${h}, 60%, 70%)`;
  };

  const initials = getInitials(name).toUpperCase();
  const backgroundColor = getBackgroundColor(name);

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-cover bg-center text-white font-bold ${className}`}
      style={{ backgroundColor }}
    >
      {initials}
    </div>
  );
};

export default Avatar;
