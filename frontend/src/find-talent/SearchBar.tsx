import React, { useState } from 'react';
import { dropdownData } from '../assets/Data/JobsData';
import { Divider, Input, RangeSlider } from '@mantine/core';
import { IconCurrencyRupee, IconUserCircle } from '@tabler/icons-react';
import { MultiInput } from '../find-jobs/MultiInput';
import { searchFields } from '../assets/Data/TalentData';

const SearchBar = () => {
  const [value, setValue] = useState<[number, number]>([20, 80]);

  return (
    <div className="flex gap-1 px-5 py-8 items-center">
        <div className='flex items-center gap-2 w-1/5 px-3 py-1'>
            <div>
                <IconUserCircle size={30} className='text-bright-sun-400 bg-mine-shaft-900 rounded-full p-1 mr-2' />
            </div>
            <Input placeholder='Talent name' variant='unstyled' className='[&_input]:placeholder-mine-shaft-300'/>
        </div>
        <Divider
              mr="xs"
              size="sm"
              orientation="vertical"
              className="self-stretch"
            />
      {searchFields.map((item, index) => (
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
