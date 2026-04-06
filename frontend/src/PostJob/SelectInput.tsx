import { Combobox, InputBase, ScrollArea, useCombobox } from '@mantine/core';
import { useEffect, useState } from 'react';

interface SelectInputProps {
    label: string;
    placeholder: string;
    options: string[];
    value?: string | null;
    onChange?: (value: string) => void;
}

export const SelectInput = (props: SelectInputProps) => {
    useEffect(() => {
        setData(props.options)
    }, [props.options])
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const [data, setData] = useState<string[]>([]);
    const [value, setValue] = useState<string | null>(props.value || null);
    const [search, setSearch] = useState(props.value || '');

    const exactOptionMatch = data.some((item) => item === search);
    const filteredOptions = exactOptionMatch
        ? data
        : data.filter((item) => item.toLowerCase().includes(search.toLowerCase().trim()));

    const options = filteredOptions.map((item) => (
        <Combobox.Option value={item} key={item}>
            {item}
        </Combobox.Option>
    ));

    const handleOptionSubmit = (val: string) => {
        if (val === '$create') {
            setData((current) => [...current, search]);
            setValue(search);
            props.onChange?.(search);
        } else {
            setValue(val);
            setSearch(val);
            props.onChange?.(val);
        }
        combobox.closeDropdown();
    }

    return (
        <Combobox
            store={combobox}
            withinPortal={false}
            onOptionSubmit={handleOptionSubmit}
        >
            <Combobox.Target>
                <InputBase
                    className='[&_input]:font-medium'
                    withAsterisk
                    label={props.label}
                    rightSection={<Combobox.Chevron />}
                    value={search}
                    onChange={(event) => {
                        combobox.openDropdown();
                        combobox.updateSelectedOptionIndex();
                        setSearch(event.currentTarget.value);
                    }}
                    onClick={() => combobox.openDropdown()}
                    onFocus={() => combobox.openDropdown()}
                    onBlur={() => {
                        combobox.closeDropdown();
                        setSearch(value || '');
                    }}
                    placeholder={props.placeholder}
                    rightSectionPointerEvents="none"
                />
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Options>
                    <ScrollArea.Autosize mah={200} type="scroll">
                        {options}
                        {!exactOptionMatch && search.trim().length > 0 && (
                            <Combobox.Option value="$create">+ Create {search}</Combobox.Option>
                        )}
                    </ScrollArea.Autosize>
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}