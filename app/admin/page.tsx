'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ShoeList, { Shoe } from './ShoeList'; // Updated to use ShoeList
import AddShoe from './AddShoe'; // Updated to use AddShoe
import { Button } from '@/components/ui/button';
import SearchInput from '../../components/SearchInput'; // Updated to use SearchInput

const AdminPage = () => {
  const router = useRouter();

  const [shoes, setShoes] = useState<Shoe[]>([]); // Updated state name
  const [filteredShoes, setFilteredShoes] = useState<Shoe[]>([]); // Updated state name
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAddPopup, setShowAddPopup] = useState<boolean>(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      router.push('/');
      return;
    }

    const user = JSON.parse(loggedInUser);
    if (user.email !== 'admin@gmail.com') {
      router.push('/');
    } else {
      fetchShoes(); // Changed to fetchShoes
    }
  }, [router]);

  const fetchShoes = async () => {
    try {
      const response = await fetch('http://localhost:5000/fashion'); // Ensure the endpoint is correct
      const data: Shoe[] = await response.json();
      setShoes(data);
      setFilteredShoes(data);
    } catch (error) {
      console.error('Error fetching shoes:', error);
    }
  };

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();

    setFilteredShoes(
      shoes.filter(
        (shoe) =>
          shoe.name.toLowerCase().includes(lowercasedQuery) ||
          shoe.description.toLowerCase().includes(lowercasedQuery) ||
          (lowercasedQuery === 'available' && shoe.availability) ||
          (lowercasedQuery === 'unavailable' && !shoe.availability)
      )
    );
  }, [searchQuery, shoes]);

  return (
    <div className='min-h-screen'>
      {/* Header Section */}
      <div className='flex items-center justify-between p-6 border-b-2 border-gray-200'>
        <h2 className='text-2xl font-bold text-foreground'>Manage Shoes</h2>
        <Button
          onClick={() => setShowAddPopup(true)}
          size='lg'
          className='hover:bg-primary/90 transition-all duration-300 hover:scale-105 text-2xl rounded-md text-white'
        >
          + Add Shoes
        </Button>
      </div>

      {/* Search Section */}
      <div className='p-6'>
        <SearchInput value={searchQuery} onChange={setSearchQuery} />
      </div>

      {/* Shoe List Section */}
      <div className='p-6'>
        <ShoeList shoes={filteredShoes} refreshShoes={fetchShoes} />{' '}
        {/* Changed to ShoeList */}
      </div>

      {/* Add Shoe Popup */}
      {showAddPopup && (
        <AddShoe
          onClose={() => setShowAddPopup(false)}
          refreshShoes={fetchShoes} // Changed to refreshShoes
        />
      )}
    </div>
  );
};

export default AdminPage;
