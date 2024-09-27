import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';

export const CustomContext = createContext();

function CustomProvider({ children }) {
  const [formData, setFormData] = useState([]);
  const [isFormActive, setIsFormActive] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [filteredData, setFilteredData] = useState([]);

 
  function handleDateChange(event) {
    setSelectedDate(event.target.value);
  }
  return (
    <CustomContext.Provider
      value={{
        formData,
        setFormData,
        setTotalCalories,
        // submitFormData,
        setSelectedDate,
        setFilteredData,
        setIsFormActive,
        isFormActive,
        selectedDate,
        totalCalories,
        handleDateChange,
        filteredData
      }}
    >
      {children}
    </CustomContext.Provider>
  );
}

export default CustomProvider;
