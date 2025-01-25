'use client';

import React from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <input
      type='text'
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder='Search Shoes ...'
      className='max-w-96 px-6 py-3 text-lg border border-primary/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ease-in-out'
    />
  );
};

export default SearchInput;
