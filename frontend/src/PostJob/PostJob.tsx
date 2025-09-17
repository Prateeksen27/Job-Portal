import React from 'react'
import { SelectInput } from './SelectInput'
import { fields } from '../assets/Data/PostJob'
import { Button, TagsInput } from '@mantine/core'
import { RichTextEditors } from './RichTextEditors'

const PostJob = () => {
    const select = fields
    return (
        <div className="w-full max-w-5xl mx-auto mt-4 px-3 sm:px-6">
            {/* Title */}
            <div className="text-xl sm:text-2xl font-semibold mb-5 text-white">
                Post Job
            </div>

            <div className="flex flex-col gap-5">
                {/* Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <SelectInput {...select[0]} />
                    <SelectInput {...select[1]} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <SelectInput {...select[2]} />
                    <SelectInput {...select[3]} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <SelectInput {...select[4]} />
                    <SelectInput {...select[5]} />
                </div>

                {/* Skills */}
                <TagsInput
                    splitChars={[',', ' ', '|']}
                    acceptValueOnBlur
                    clearable
                    withAsterisk
                    label="Skills"
                    placeholder="Enter required Skills"
                />

                {/* Job Description */}
                <div className='[&_button[data-active="true"]]:!text-bright-sun-400 [&_button[data-active="true"]]:!bg-bright-sun-400/20'>
                    <div className="text-sm font-medium mb-1 text-white">Job Description</div>
                    <RichTextEditors />
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-end mb-10 mt-5">
                    <Button
                        variant="light"
                        className="!text-sm !text-mine-shaft-300 !border-mine-shaft-700 hover:!bg-mine-shaft-800 hover:!border-bright-sun-400 hover:!text-bright-sun-400 transition-colors duration-300"
                    >
                        Publish
                    </Button>
                    <Button
                        variant="outline"
                        className="!text-sm !text-mine-shaft-300 !border-mine-shaft-700 hover:!bg-mine-shaft-800 hover:!border-bright-sun-400 hover:!text-bright-sun-400 transition-colors duration-300"
                    >
                        Save as Draft
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default PostJob
