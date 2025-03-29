import React, { createContext, useState, useContext } from "react";

// Context type
interface DescriptionContextType {
  description: string;
  setDescription: (desc: string) => void;
  predictedCategory: string;
  setPredictedCategory: (category: string) => void;
}

// Create context
const DescriptionContext = createContext<DescriptionContextType | undefined>(undefined);

// Provider component
export const DescriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [description, setDescription] = useState<string>("");
  const [predictedCategory, setPredictedCategory] = useState<string>("");

  return (
    <DescriptionContext.Provider value={{ description, setDescription, predictedCategory, setPredictedCategory }}>
      {children}
    </DescriptionContext.Provider>
  );
};

// Custom hook
export const useDescription = (): DescriptionContextType => {
  const context = useContext(DescriptionContext);
  if (!context) {
    throw new Error("useDescription must be used within a DescriptionProvider");
  }
  return context;
};
