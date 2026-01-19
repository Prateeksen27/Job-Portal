import React, { useState } from 'react'
import fields from '../assets/Data/Profile'
import { SelectInput } from './SelectInput'
import { Textarea, Button, Title } from '@mantine/core'
import { MonthPickerInput } from '@mantine/dates'

const ExpInput = () => {
  const select = fields
  const [desc, setDesc] = useState('')
  const [startValue, setStartValue] = useState<Date | null>(null);
  const [endValue, setEndValue] = useState<Date | null>(null);


  return (
    <div className="w-full">
      {/* Header */}
      <Title order={4} className="text-white mb-6">
        Edit Experience
      </Title>

      {/* Select Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
        <SelectInput className='w-1/2' {...select[0]} />
        <SelectInput {...select[1]} />
        <SelectInput {...select[2]} />
      </div>

      {/* Description */}
      <Textarea
        value={desc}
        label="Description"
        onChange={(e) => setDesc(e.currentTarget.value)}
        placeholder="Enter your work responsibilities..."
        autosize
        minRows={4}
        className="mb-6"
      />
      <div className="flex flex-col md:flex-row gap-10 [&>*]:w-full mb-6">
      <MonthPickerInput 
        label="Start Date" 
        maxDate={new Date()}
        placeholder="Select month and year"
        value={startValue}
        onChange={() => {
          setStartValue(startValue);
        }}
      />
      <MonthPickerInput 
        label="End Date" 
        placeholder="Select month and year"
        maxDate={new Date()}
        value={endValue}
        onChange={() => {
          setEndValue(endValue);
        }}
      />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" color="gray">
          Cancel
        </Button>
        <Button variant="filled" color="blue">
          Save Changes
        </Button>
      </div>
    </div>
  )
}

export default ExpInput
