// Filters.js

import { useState, useEffect } from "react";
import "../styles/Filters.css";

const Filters = ({ onFilter, availableDomains }) => {
  // console.log(availableDomains);
  const [selectedFilters, setSelectedFilters] = useState({
    domain: "",
    gender: "",
    available: "",
  });

  useEffect(() => {
    // Update the domain options when availableDomains changes
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      domain: "", // Set the first domain as the default value
    }));
  }, [availableDomains]);

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters({
      ...selectedFilters,
      [filterType]: value,
    });
  };

  const applyFilters = () => {
    onFilter(selectedFilters);
  };

  return (
    <div className="filters">
      <select
        value={selectedFilters.domain}
        onChange={(e) => handleFilterChange("domain", e.target.value)}
      >
        <option value="">Select Domain</option>
        {availableDomains.map((domain) => (
          <option key={domain} value={domain}>
            {domain}
          </option>
        ))}
      </select>
      <select
        value={selectedFilters.gender}
        onChange={(e) => handleFilterChange("gender", e.target.value)}
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="agender">Agender</option>
      </select>
      <select
        value={selectedFilters.availability}
        onChange={(e) => handleFilterChange("available", e.target.value)}
      >
        <option value="">Select Availability</option>
        <option value="true">Available</option>
        <option value="false">Not Available</option>
      </select>
      <button onClick={applyFilters}>Apply Filters</button>
    </div>
  );
};

export default Filters;
