import React from 'react'
import { SelectInput } from './SelectInput'
import { fields } from '../assets/Data/PostJob'
import { Button, TagsInput } from '@mantine/core';
import { RichTextEditors } from './RichTextEditors';
import { IconArrowLeft } from '@tabler/icons-react';

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
                <TagsInput splitChars={[',', ' ', '|']} acceptValueOnBlur clearable withAsterisk label="Skills" placeholder='Enter required Skills' />
                <div className='[&_button[data-active="true"]]:!text-bright-sun-400 [&_button[data-active="true"]]:!bg-bright-sun-400/20'>
                    <div className='text-sm font-medium'>Job Description</div>
                    <RichTextEditors />
                </div>
                <div className='flex gap-5 justify-end mb-10 mt-5'>
                    <Button variant='light' className=' !text-sm  !text-mine-shaft-300 !border-mine-shaft-700 hover:!bg-mine-shaft-800 hover:!border-bright-sun-400 hover:!text-bright-sun-400 transition-colors duration-300'>Publish</Button>
                    <Button variant='outline' className=' !text-sm  !text-mine-shaft-300 !border-mine-shaft-700 hover:!bg-mine-shaft-800 hover:!border-bright-sun-400 hover:!text-bright-sun-400 transition-colors duration-300'>Save as Draft</Button>
                </div>
            </div>
        </div>
    )
}

export default PostJob