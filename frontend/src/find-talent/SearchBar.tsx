import React, { useState } from 'react';
import { dropdownData } from '../assets/Data/JobsData';
import { Divider, Input, RangeSlider, Button } from '@mantine/core';
import { IconCurrencyRupee, IconUserCircle, IconSearch } from '@tabler/icons-react';
import { MultiInput } from '../find-jobs/MultiInput';
import { searchFields } from '../assets/Data/TalentData';

export interface TalentFilters {
  search: string;
  jobTitle: string;
  location: string;
  skills: string;
  salaryMin: number;
  salaryMax: number;
  sortBy: string;
}

interface SearchBarProps {
  onSearch: (filters: TalentFilters) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [salaryValue, setSalaryValue] = useState<[number, number]>([0, 100]);
  const [search, setSearch] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [skills, setSkills] = useState('');
  const [sortBy, setSortBy] = useState('relevance');

  const handleSearch = () => {
    onSearch({
      search,
      jobTitle,
      location,
      skills,
      salaryMin: salaryValue[0] * 1000,
      salaryMax: salaryValue[1] * 1000,
      sortBy
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 px-5 py-6 items-stretch md:items-center bg-mine-shaft-900/50 rounded-xl shadow-md">
      {/* Talent name */}
      <div className="flex items-center gap-2 w-full sm:w-1/2 md:w-1/5 px-3 py-2 border md:border-none rounded-lg">
        <IconUserCircle
          size={30}
          className="text-bright-sun-400 bg-mine-shaft-950 rounded-full p-1"
        />
        <Input
          placeholder="Talent name"
          variant="unstyled"
          className="[&_input]:placeholder-mine-shaft-300 flex-1"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
      </div>

      {/* Divider responsive */}
      <Divider size="sm" orientation="horizontal" className="block md:hidden" />
      <Divider
        mr="xs"
        size="sm"
        orientation="vertical"
        className="hidden md:block self-stretch"
      />

      {/* Dynamic fields */}
      <div className="w-full sm:w-1/2 md:w-1/5">
        <MultiInput 
          {...searchFields[0]} 
          value={jobTitle}
          onChange={setJobTitle}
        />
      </div>

      <div className="w-full sm:w-1/2 md:w-1/5">
        <MultiInput 
          {...searchFields[1]} 
          value={location}
          onChange={setLocation}
        />
      </div>

      <div className="w-full sm:w-1/2 md:w-1/5">
        <MultiInput 
          {...searchFields[2]} 
          value={skills}
          onChange={setSkills}
        />
      </div>

      {/* Salary filter */}
      <div className="w-full sm:w-1/2 md:w-1/5 flex flex-col gap-3">
        <div className="flex justify-between items-center text-sm font-medium">
          <span>Salary</span>
          <div className="flex items-center gap-1 whitespace-nowrap">
            <IconCurrencyRupee size={16} /> {salaryValue[0]}k –{' '}
            <IconCurrencyRupee size={16} /> {salaryValue[1]}k
          </div>
        </div>
        <RangeSlider 
          size="sm" 
          value={salaryValue} 
          onChange={setSalaryValue}
          min={0}
          max={100}
          step={5}
        />
      </div>

      {/* Search button */}
      <Button 
        onClick={handleSearch}
        className="w-full sm:w-auto md:w-24"
        leftSection={<IconSearch size={16} />}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
