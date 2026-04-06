import { useState } from 'react';
import SearchBar, { TalentFilters } from '../find-talent/SearchBar';
import Talents from '../find-talent/Talents';

const FindTalent = () => {
  const [filters, setFilters] = useState<TalentFilters | undefined>(undefined);

  const handleSearch = (newFilters: TalentFilters) => {
    console.log('Search filters:', newFilters);
    setFilters(newFilters);
  };

  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-poppins px-4 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-8">
        <SearchBar onSearch={handleSearch} />

        <div className="my-5">
          <Talents filters={filters} />
        </div>
      </div>
    </div>
  );
};

export default FindTalent;
