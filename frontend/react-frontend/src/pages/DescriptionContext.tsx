import React, { createContext, useState, useContext } from "react";

// Context type
interface DescriptionContextType {
  description: string;
  setDescription: (desc: string) => void;
}

// Create context
const DescriptionContext = createContext<any>(null);

// Provider component
export const DescriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [description, setDescription] = useState("");

  return (
    <DescriptionContext.Provider value={{ description, setDescription }}>
      {children}
    </DescriptionContext.Provider>
  );
};

// Custom hook
export const useDescription = () => {
  const context = useContext(DescriptionContext);
  if (!context) {
    throw new Error("useDescription must be used within a DescriptionProvider");
  }
  return context;
};
