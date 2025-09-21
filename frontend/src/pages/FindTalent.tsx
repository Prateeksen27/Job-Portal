import { Divider } from '@mantine/core';
import React from 'react';
import SearchBar from '../find-talent/SearchBar';
import Talents from '../find-talent/Talents';

const FindTalent = () => {
  return (
    <div className="w-full min-h-screen bg-mine-shaft-950 font-[Poppins]">
      {/* Divider on top */}
      <Divider size="sm" orientation="horizontal" className="self-stretch" />

      {/* Content container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-8">
        {/* Search Filters */}
        <SearchBar />

        {/* Talent List */}
        <Talents />
      </div>
    </div>
  );
};

export default FindTalent;
