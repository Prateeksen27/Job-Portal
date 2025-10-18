import { Menu, Text, Avatar, Switch } from '@mantine/core';
import boy from '../assets/avatar.png';
import {
    IconSettings,
    IconSearch,
    IconPhoto,
    IconMessageCircle,
    IconTrash,
    IconArrowsLeftRight,
    IconUserCircle,
    IconFile,
    IconMoon,
    IconSun,
} from '@tabler/icons-react';
import { useAuthStore } from '../store/useAuthStore';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const MenuComponent = () => {
    const { user } = useAuthStore();
    const [open, setOpen] = useState(false);

    return (
        <Menu shadow="md" onChange={()=>setOpen(!open)} opened={open} width={200}>
            <Menu.Target>
                <div
                    className="flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-1.5 
                     rounded-xl bg-mine-shaft-900/50 border border-mine-shaft-700 
                     cursor-pointer hover:border-bright-sun-400 transition-all duration-300 
                     max-w-full sm:max-w-[200px]"
                >
                    <Avatar
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden flex-shrink-0"
                        src={boy}
                        alt="User avatar"
                    />
                    <span
                        className="text-sm sm:text-base text-mine-shaft-300 hover:text-white 
                       transition font-medium truncate max-w-[100px] sm:max-w-[140px]"
                    >
                        {user?.username || 'Guest'}
                    </span>
                </div>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Account</Menu.Label>
                <Link to='/profile'>
                <Menu.Item leftSection={<IconUserCircle size={14} />}>Profile</Menu.Item>
                </Link>
                <Menu.Item leftSection={<IconFile size={14} />}>Resume</Menu.Item>
                <Menu.Item leftSection={<IconMessageCircle size={14} />}>Messages</Menu.Item>

                <Menu.Item
                    leftSection={<IconMoon size={14} />}
                    rightSection={<Switch size='md' color='' onLabel={<IconSun size={12} />} offLabel={<IconMoon size={12} />} />}
                >
                    Dark Mode
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};
