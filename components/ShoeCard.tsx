import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Shoe } from '@/app/admin/ShoeList';

interface ShoeCardProps {
  Shoe: Shoe;
}

const ShoeCard: React.FC<ShoeCardProps> = ({ Shoe }) => {
  return (
    <Link href={`/shop/${Shoe.id}`} passHref>
      <div className='bg-white shadow-lg overflow-hidden rounded-lg transform transition-transform hover:scale-105 hover:shadow-xl duration-300 cursor-pointer border border-gray-200'>
        {/* Image Section */}
        <div className='relative'>
          <Image
            src={Shoe.image || '/default-Shoe-image.jpg'} // Fallback image if Shoe.image is not available
            alt={Shoe.name}
            className='w-full h-64 object-cover rounded-t-lg'
            width={500}
            height={300}
            unoptimized={true}
            loading='lazy'
          />
          {/* Badge */}
          <span
            className={`absolute top-4 right-4 px-3 py-1 rounded-lg text-sm font-semibold ${
              Shoe.availability
                ? 'bg-blue-300 text-blue-800'
                : 'bg-red-300 text-red-800'
            }`}
          >
            {Shoe.availability ? 'Available' : 'Unavailable'}
          </span>
        </div>

        {/* Details Section */}
        <div className='p-6'>
          <h3 className='text-lg font-semibold text-gray-900 line-clamp-2'>
            {Shoe.name}
          </h3>
          <p className='text-sm text-gray-600 mt-1'>
            <span className='font-medium text-gray-800'>Color:</span>{' '}
            {Shoe.color}
          </p>
          <p className='text-sm text-gray-600 mt-1'>
            <span className='font-medium text-gray-800'>Description:</span>{' '}
            {Shoe.description}
          </p>
          <p className='text-sm text-gray-600 mt-1'>
            <span className='font-medium text-gray-800'>Price:</span> PKR{' '}
            {Shoe.price}
          </p>

          {/* Size Buttons */}
          <div className='flex gap-3 pt-4 flex-wrap'>
            {Array.isArray(Shoe.size) &&
              Shoe.size.map((size, index) => (
                <button
                  key={index}
                  className='px-4 py-2 rounded-full border-2 text-lg font-semibold transition-colors duration-300 bg-primary text-white hover:bg-gray-100 hover:text-gray-800'
                >
                  {size}
                </button>
              ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ShoeCard;
