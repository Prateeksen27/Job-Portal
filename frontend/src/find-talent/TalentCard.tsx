import React, { useRef, useState } from 'react'
import {
  IconCurrencyRupee,
  IconClock,
  IconHeart,
  IconLocation,
  IconLocationBolt,
  IconMapPin,
  IconCalendar,
  IconCalendarWeek
} from '@tabler/icons-react'
import { Avatar, Button, Divider, Modal, Text } from '@mantine/core'
import { Link } from 'react-router-dom'
import { useDisclosure } from '@mantine/hooks'
import { DateInput, PickerControl, TimeInput } from '@mantine/dates'
import dayjs from 'dayjs'

const TalentCard = ({ data, cardKey, posted,invited }: any) => {
  const t = data
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null)
  return (
    <div className="bg-mine-shaft-900 p-4 w-80 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-3 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-full">
            {/* Placeholder avatar (you can replace with your assets) */}
            <Avatar
              src={t.image}
              className="h-8 w-8 object-contain rounded-full"
              alt="Talent avatar"
            />
          </div>
          <div>
            <div className="font-semibold text-sm">{t.name}</div>
            <div className="text-xs text-mine-shaft-300">
              {t.role} • {t.company}
            </div>
          </div>
        </div>
        <button className="p-1 hover:text-red-500 hover:cursor-pointer transition-colors">
          <IconHeart size={18} />
        </button>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3 text-xs">
        {t.topSkills.map((skill: string, idx: number) => (
          <span
            key={idx}
            className="py-1 px-3 bg-mine-shaft-800 text-bright-sun-400 rounded-lg"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* About */}
      <Text lineClamp={2} className="!text-sm !text-mine-shaft-300 mb-3">
        {t.about}
      </Text>

      <Divider size="xs" color="mine-shaft.7" />
        {
          invited?<div className='flex gap-1 mt-3 text-mine-shaft-200 text-sm items-center'>
            <IconCalendar />Interview: August 27,2025 10:00 AM
          </div>:<>
        
      {/* Footer */}
      <div className="flex justify-between items-center mt-3 mb-3 text-xs text-mine-shaft-300">
        <div className="flex items-center gap-1">
          <IconCurrencyRupee size={16} />
          <span className="font-medium text-white">{t.expectedCtc}</span>
        </div>
        <div className="flex items-center gap-1">
          <IconMapPin size={16} />
          <span>{t.location}</span>
        </div>
      </div>
      <Divider size="xs" color='mine-shaft.7' className="self-stretch" />
      <div className='flex gap-3 mt-1'>
        <Link to={`/talent-profile/${cardKey}`}>
          <Button fullWidth variant='outline' className=' !text-sm !text-mine-shaft-300 !border-mine-shaft-700 hover:!bg-mine-shaft-800 hover:!border-bright-sun-400 hover:!text-bright-sun-400 transition-colors duration-300'>View Profile</Button>
        </Link>
        {
          posted ?
            <Button fullWidth onClick={open} leftSection={<IconCalendarWeek className='w-5 h-5' />} variant='light' className=' !text-sm !text-mine-shaft-300 !border-mine-shaft-700 hover:!bg-mine-shaft-800 hover:!border-bright-sun-400 hover:!text-bright-sun-400 transition-colors duration-300'>Schedule</Button> :
            <Button fullWidth variant='light' className=' !text-sm !text-mine-shaft-300 !border-mine-shaft-700 hover:!bg-mine-shaft-800 hover:!border-bright-sun-400 hover:!text-bright-sun-400 transition-colors duration-300'>Message</Button>
        }
      </div>
      </>
}
      <Modal opened={opened} onClose={close} title="Schedule Interview" centered>
        <div className='flex flex-col gap-3 '>
          <DateInput minDate={new Date()} maxDate={dayjs(new Date()).add(1, 'month').toDate()} value={value} onChange={setValue} label="Date Input" placeholder='Select your interview date' />
          <TimeInput label="Select Time slot" ref={ref} onClick={() => ref.current?.showPicker()} />

          <Button fullWidth variant='light' className=' !text-sm !text-mine-shaft-300 !border-mine-shaft-700 hover:!bg-mine-shaft-800 hover:!border-bright-sun-400 hover:!text-bright-sun-400 transition-colors duration-300'>Schedule</Button>

        </div>
      </Modal>
    </div>
  )
}

export default TalentCard
