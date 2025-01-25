import { useState } from 'react';
import Image from 'next/image';
import UpdateShoePopup from './UpdateShoePopup'; // Updated component name
import DeleteShoe from './DeleteShoe'; // Updated component name

export interface Shoe {
  id: string;
  name: string;
  price: number;
  description: string;
  size: string[];
  color: string;
  availability: boolean;
  image: string;
}

interface ShoeListProps {
  shoes: Shoe[];
  refreshShoes: () => void;
}

const ShoeList = ({ shoes, refreshShoes }: ShoeListProps) => {
  const [selectedShoe, setSelectedShoe] = useState<Shoe | null>(null);

  return (
    <div className='py-6'>
      {shoes.length > 0 ? (
        <div className='overflow-x-auto'>
          <table className='min-w-full table-auto'>
            <thead>
              <tr className='bg-secondary'>
                <th className='px-4 py-2 text-left text-foreground'>Image</th>
                <th className='px-4 py-2 text-left text-foreground'>Shoe</th>
                <th className='px-4 py-2 text-left text-foreground'>Price</th>
                <th className='px-4 py-2 text-left text-foreground'>Size</th>
                <th className='px-4 py-2 text-left text-foreground'>Color</th>
                <th className='px-4 py-2 text-left text-foreground'>
                  Availability
                </th>
                <th className='px-4 py-2 text-left text-foreground'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {shoes.map((shoe) => (
                <tr key={shoe.id} className='border-b border-border'>
                  <td className='px-4 py-2 flex justify-center'>
                    <Image
                      src={shoe.image}
                      alt={shoe.name}
                      width={100}
                      height={100}
                      className='rounded-full'
                      unoptimized
                    />
                  </td>
                  <td className='px-4 py-2'>{shoe.name}</td>
                  <td className='px-4 py-2'>PKR {shoe.price}</td>
                  <td className='px-4 py-2'>{shoe.size.join(', ')}</td>
                  <td className='px-4 py-2'>{shoe.color}</td>
                  <td className='px-4 py-2'>
                    {shoe.availability ? 'Available' : 'Not Available'}
                  </td>
                  <td className='px-4 py-2'>
                    <button
                      onClick={() => setSelectedShoe(shoe)}
                      className='px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary-dark focus:ring-offset-2 transition-all'
                    >
                      Update
                    </button>

                    <DeleteShoe
                      shoeId={shoe.id}
                      refreshShoes={refreshShoes} // Updated to refreshShoes
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className='text-gray-600 text-center'>No Shoes available.</p>
      )}

      {selectedShoe && (
        <UpdateShoePopup
          shoe={selectedShoe}
          onClose={() => setSelectedShoe(null)}
          refreshShoes={refreshShoes} // Updated to refreshShoes
        />
      )}
    </div>
  );
};

export default ShoeList;
