import React, { useState } from 'react';
import { MultiInput } from './MultiInput';
import { dropdownData } from '../assets/Data/JobsData';
import { Divider, RangeSlider } from '@mantine/core';
import { IconCurrencyRupee } from '@tabler/icons-react';

const SearchBar = () => {
  const [value, setValue] = useState<[number, number]>([20, 80]);

  return (
    <div className="flex gap-1 px-5 py-8 items-center">
      {dropdownData.map((item, index) => (
        <React.Fragment key={index}>
          <div className="w-1/5">
            <MultiInput {...item} />
          </div>

          {/* Divider only between items */}
          {index < dropdownData.length - 1 && (
            <Divider
              mr="xs"
              size="sm"
              orientation="vertical"
              className="self-stretch"
            />
          )}
        </React.Fragment>
      ))}

      {/* Salary Column */}
       <Divider
              mr="xs"
              size="sm"
              orientation="vertical"
              className="self-stretch"
            />
      <div className="w-1/5 flex flex-col">
      <div className='flex justify-between'>
        <div className="text-sm font-medium to-bright-sun-400">Salary</div>
        <div className="flex items-center gap-1 text-sm">
          <IconCurrencyRupee size={16} /> {value[0]}k –{" "}
          <IconCurrencyRupee size={16} /> {value[1]}k
        </div>
        </div>
        <RangeSlider size="sm" value={value} onChange={setValue} />
      </div>
    </div>
  );
};

export default SearchBar;
