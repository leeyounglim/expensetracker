'use client';

import { generateMonthOptions } from "./utils/Date";

const MonthFilter = ({ selectedMonth, onMonthChange }) => {
  const monthOptions = generateMonthOptions(12);      
  return (
    <nav className="navMonth">
      <div className="months">
        {monthOptions.map(({label,value}) => (
          <button
            key={value}
            className={selectedMonth === value ? "active" : ""}
            onClick={() => {
                onMonthChange(prev => prev === value ? null : value)
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default MonthFilter;