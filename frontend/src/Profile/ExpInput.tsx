import React, { useState } from 'react'
import fields from '../assets/Data/Profile'
import { SelectInput } from './SelectInput'
import { Textarea, Button, Title } from '@mantine/core'

const ExpInput = () => {
  const select = fields
  const [desc, setDesc] = useState('')

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
        onChange={(e) => setDesc(e.currentTarget.value)}
        placeholder="Enter your work responsibilities..."
        autosize
        minRows={4}
        className="mb-6"
      />

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
