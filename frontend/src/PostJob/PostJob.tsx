import React from 'react'
import { SelectInput } from './SelectInput'
import { fields } from '../assets/Data/PostJob'
import { TagsInput } from '@mantine/core';
import { RichTextEditors } from './RichTextEditors';

const PostJob = () => {
    const select = fields;
  return (
    <div className='w-4/5 mx-auto mt-2'>
        <div className='text-2xl font-semibold mb-5 '>
            Post Job
        </div>
        <div className='flex flex-col gap-5'>
            <div className='flex gap-10 [&>*]:w-1/2 '>
                <SelectInput {...select[0]} />
                <SelectInput {...select[1]} />
            </div>
            <div className='flex gap-10 [&>*]:w-1/2'>
                <SelectInput {...select[2]} />
                <SelectInput {...select[3]} />
            </div>
            <div className='flex gap-10 [&>*]:w-1/2'>
                <SelectInput {...select[4]} />
                <SelectInput {...select[5]} />
            </div> 
            <TagsInput splitChars={[',',' ','|']} acceptValueOnBlur clearable withAsterisk label="Skills" placeholder='Enter required Skills' />
            <div>
                <div className='text-sm font-medium'>Job Description</div>
                {/* <RichTextEditors /> */}
            </div>
        </div>
    </div>
  )
}

export default PostJob