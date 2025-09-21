import React, { useState } from 'react';
import { MultiInput } from './MultiInput';
import { dropdownData } from '../assets/Data/JobsData';
import { Divider, RangeSlider } from '@mantine/core';
import { IconCurrencyRupee } from '@tabler/icons-react';

const SearchBar = () => {
  const [value, setValue] = useState<[number, number]>([20, 80]);

  return (
    <div className="flex flex-col md:flex-row gap-4 px-5 py-8 items-stretch md:items-center">
      {dropdownData.map((item, index) => (
        <React.Fragment key={index}>
          <div className="w-full md:w-1/5">
            <MultiInput {...item} />
          </div>

          {/* Divider responsive */}
          {index < dropdownData.length - 1 && (
            <>
              {/* Horizontal on mobile */}
              <Divider size="sm" orientation="horizontal" className="block md:hidden" />
              {/* Vertical on desktop */}
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

      {/* Salary Column */}
      <Divider
        size="sm"
        orientation="horizontal"
        className="block md:hidden"
      />
      <Divider
        mr="xs"
        size="sm"
        orientation="vertical"
        className="hidden md:block self-stretch"
      />

      <div className="w-full md:w-1/5 flex flex-col gap-2">
        <div className="flex justify-between text-sm font-medium">
          <span>Salary</span>
          <div className="flex items-center gap-1">
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
