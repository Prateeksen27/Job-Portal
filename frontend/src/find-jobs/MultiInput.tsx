import { useEffect, useState } from 'react';
import {
  Checkbox,
  Combobox,
  Group,
  Input,
  Pill,
  PillsInput,
  useCombobox,
  rem,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

// const groceries = ['🍎 Apples', '🍌 Bananas', '🥦 Broccoli', '🥕 Carrots', '🍫 Chocolate'];

export const MultiInput = (props: any) => {
  useEffect(() => {
    setData(props.options)
  }, [])
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const [search, setSearch] = useState('');
  const [data, setData] = useState<string[]>([]);
  const [value, setValue] = useState<string[]>([]);

  const exactOptionMatch = data.some((item) => item === search);

  const handleValueSelect = (val: string) => {
    setSearch('');
    if (val === '$create') {
      setData((current) => [...current, search]);
      setValue((current) => [...current, search]);
    } else {
      setValue((current) =>
        current.includes(val) ? current.filter((v) => v !== val) : [...current, val]
      );
    }
  };

  const handleValueRemove = (val: string) =>
    setValue((current) => current.filter((v) => v !== val));

  const values = value.slice(0, 2).map((item) => (
    <Pill
      key={item}
      withRemoveButton
      onRemove={() => handleValueRemove(item)}
      radius="xl"
      className="bg-bright-sun-500/10 border border-bright-sun-400 text-bright-sun-300"
    >
      {item}
    </Pill>
  ));

  const options = data
    .filter((item) => item.toLowerCase().includes(search.trim().toLowerCase()))
    .map((item) => (
      <Combobox.Option
        value={item}
        key={item}
        active={value.includes(item)}
        className="hover:bg-mine-shaft-800/60 rounded-lg px-2 py-1"
      >
        <Group gap="sm">
          <Checkbox
            size="xs"
            color="bright-sun.4"
            checked={value.includes(item)}
            onChange={() => { }}
            aria-hidden
            tabIndex={-1}
            style={{ pointerEvents: 'none' }}
          />
          <span className="text-mine-shaft-100">{item}</span>
        </Group>
      </Combobox.Option>
    ));

  return (
    <Combobox store={combobox} onOptionSubmit={handleValueSelect} withinPortal={false}>
      {/* Input */}
      <Combobox.DropdownTarget>
        <PillsInput
          variant="unstyled"
          radius="xl"
          className="border border-mine-shaft-700 bg-mine-shaft-900/60 hover:border-bright-sun-400 transition-all duration-200"
          rightSection={<Combobox.Chevron />}
          leftSection={
            <div className="text-bright-sun-400 p-1 bg-mine-shaft-800 rounded-full mr-2">
              <props.icon size={16} />
            </div>
          }
          onClick={() => combobox.toggleDropdown()}
        >
          <Pill.Group>
            {value.length > 0 ? (
              <>
                {values}
                {value.length > 2 && (
                  <Pill
                    radius="xl"
                    className="bg-mine-shaft-800 text-mine-shaft-300 border border-mine-shaft-700"
                  >
                    +{value.length - 2} more
                  </Pill>
                )}
              </>
            ) : (
              <Input.Placeholder className="!text-mine-shaft-400">
               {props.title}
              </Input.Placeholder>
            )}
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      {/* Dropdown */}
      <Combobox.Dropdown className="bg-mine-shaft-900 border border-mine-shaft-700 rounded-xl shadow-xl">
        <Combobox.Search
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
          placeholder={`Search ${props.title}`}
          className="bg-mine-shaft-800 text-mine-shaft-100 placeholder-mine-shaft-400 rounded-lg mb-2"
        />
        <Combobox.Options className="max-h-60 overflow-y-auto">
          {options}

          {!exactOptionMatch && search.trim().length > 0 && (
            <Combobox.Option
              value="$create"
              className="text-bright-sun-400 hover:bg-bright-sun-500/10 rounded-lg px-2 py-1"
            >
              + Create {search}
            </Combobox.Option>
          )}

          {exactOptionMatch && search.trim().length > 0 && options.length === 0 && (
            <Combobox.Empty className="text-mine-shaft-500">Nothing found</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
