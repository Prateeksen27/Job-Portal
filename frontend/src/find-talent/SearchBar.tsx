import React, { useState } from 'react';
import { dropdownData } from '../assets/Data/JobsData';
import { Divider, Input, RangeSlider } from '@mantine/core';
import { IconCurrencyRupee, IconUserCircle } from '@tabler/icons-react';
import { MultiInput } from '../find-jobs/MultiInput';
import { searchFields } from '../assets/Data/TalentData';

const SearchBar = () => {
  const [value, setValue] = useState<[number, number]>([20, 80]);

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
      {searchFields.map((item, index) => (
        <React.Fragment key={index}>
          <div className="w-full sm:w-1/2 md:w-1/5">
            <MultiInput {...item} />
          </div>

          {index < dropdownData.length - 1 && (
            <>
              <Divider size="sm" orientation="horizontal" className="block md:hidden" />
              <Divider
                mr="xs"
                size="sm"
                orientation="vertical"
                className="hidden md:block self-stretch"
              />
            </>
          )}
        </React.Fragment>
      ))}

      {/* Salary filter */}
      <div className="w-full sm:w-1/2 md:w-1/5 flex flex-col gap-3">
        <div className="flex justify-between items-center text-sm font-medium">
          <span>Salary</span>
          <div className="flex items-center gap-1 whitespace-nowrap">
            <IconCurrencyRupee size={16} /> {value[0]}k –{' '}
            <IconCurrencyRupee size={16} /> {value[1]}k
          </div>
        </div>
        <RangeSlider size="sm" value={value} onChange={setValue} />
      </div>
    </div>
  );
};

export default SearchBar;
