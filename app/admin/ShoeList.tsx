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
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {shoes.map((shoe) => (
            <div
              key={shoe.id}
              className='bg-card text-foreground rounded-2xl shadow-lg p-4 border-primary border'
            >
              <div className='flex justify-center mb-4 h-44 w-[80%] mx-auto'>
                <Image
                  src={shoe.image}
                  alt={shoe.name}
                  width={200}
                  height={200}
                  className='rounded-lg object-cover w-full h-full'
                  unoptimized
                />
              </div>
              <h3 className='text-2xl font-semibold text-center mb-2'>
                {shoe.name}
              </h3>

              <div className='flex justify-between mt-4'>
                {shoe.size.length > 0 && (
                  <span className='font-semibold'>
                    Size: {shoe.size.join(', ')}
                  </span>
                )}
                <span className='font-semibold'>PKR {shoe.price}</span>
              </div>
              <div className='flex justify-between mt-2'>
                <span className='font-semibold'>Color: {shoe.color}</span>
                <span
                  className={`font-semibold ${
                    shoe.availability ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {shoe.availability ? 'Available' : 'Not Available'}
                </span>
              </div>
              <div className='mt-4 flex justify-between'>
                <button
                  onClick={() => setSelectedShoe(shoe)}
                  className='px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary-dark transition-all'
                >
                  Update
                </button>
                <DeleteShoe
                  shoeId={shoe.id}
                  refreshShoes={refreshShoes} // Updated to refreshShoes
                />
              </div>
            </div>
          ))}
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
