import { useState } from 'react';
import {  Combobox, useCombobox } from '@mantine/core';
import { IconAdjustments } from '@tabler/icons-react';

const opt = ['Relevance','Most Recent', 'Salary (Low to High)','Salary (High to Low)'];

interface SortProps {
  value?: string;
  onChange?: (value: string) => void;
}

export const Sort: React.FC<SortProps> = ({ value: externalValue, onChange }) => {
  const [internalValue, setInternalValue] = useState<string | null>('Relevance');
  
  const selectedItem = externalValue !== undefined ? externalValue : internalValue;
  
  const handleChange = (val: string) => {
    setInternalValue(val);
    if (onChange) {
      const sortValue = val === 'Relevance' ? 'relevance' : 
                        val === 'Most Recent' ? 'recent' :
                        val === 'Salary (Low to High)' ? 'salary_asc' :
                        val === 'Salary (High to Low)' ? 'salary_desc' : 'relevance';
      onChange(sortValue);
    }
  };

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = opt.map((item) => (
    
    <Combobox.Option className='text-xs' value={item} key={item}>
      {item}
    </Combobox.Option>

  ));

  return (
    <div className='flex sm:flex-col'>
      <Combobox
        store={combobox}
        width={150}
        position="bottom-start"
        onOptionSubmit={(val) => {
          handleChange(val);
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <div onClick={()=>combobox.toggleDropdown()} className='border border-bright-sun-400 flex items-center px-2 py-1 rounded-xl cursor-pointer gap-2'>
            {
                selectedItem
            }<IconAdjustments className='text-bright-sun-400 h-5 w-5' />
          </div>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>{options}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  );
}