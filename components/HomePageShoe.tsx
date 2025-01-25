'use client';

import React, { useEffect, useState } from 'react';
import ShoeCard from './ShoeCard'; // Assume this is the card component for shoe
import SearchInput from './SearchInput'; // Reuse the SearchInput component
import { Shoe } from '@/app/admin/ShoeList';

const HomePageshoe: React.FC = () => {
  const [shoe, setshoe] = useState<Shoe[]>([]);
  const [filteredshoe, setFilteredshoe] = useState<Shoe[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchshoe = async () => {
      try {
        const response = await fetch('http://localhost:5000/fashion');
        if (!response.ok) {
          throw new Error('Failed to fetch products.');
        }
        const data: Shoe[] = await response.json();
        setshoe(data);
        setFilteredshoe(data); // Initialize filtered shoe
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchshoe();
  }, []);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();

    setFilteredshoe(
      shoe.filter(
        (dress) =>
          dress.name.toLowerCase().includes(lowercasedQuery) ||
          dress.description.toLowerCase().includes(lowercasedQuery) ||
          (lowercasedQuery === 'available' && dress.availability) ||
          (lowercasedQuery === 'unavailable' && !dress.availability)
      )
    );
  }, [searchQuery, shoe]);

  if (loading) {
    return (
      <p className='text-center text-xl text-secondary-foreground'>
        Loading styles...
      </p>
    );
  }

  if (error) {
    return <p className='text-center text-xl text-red-600'>{error}</p>;
  }

  return (
    <section className='text-secondary-foreground py-12'>
      <div>
        <h2 className='text-4xl font-bold text-center mb-12'>
          Discover the Latest in{' '}
          <span className='text-primary'>StepInStyle</span>
        </h2>

        {/* Search Section */}
        <div className='mb-8'>
          <SearchInput value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Dress List Section */}
        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {filteredshoe.length > 0 ? (
            filteredshoe.map((shoe) => <ShoeCard key={shoe.id} Shoe={shoe} />) // from here this waring comes
          ) : (
            <p className='text-center text-gray-700 col-span-full'>
              No styles match the selected criteria.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomePageshoe;
