'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Shoe } from '@/app/admin/ShoeList';

const SingleShoe: React.FC = () => {
  const [Shoe, setShoe] = useState<Shoe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const fetchShoe = async () => {
      try {
        const response = await fetch('http://localhost:5000/fashion');
        if (!response.ok) {
          throw new Error('Failed to fetch Shoe');
        }
        const data: Shoe[] = await response.json();
        const foundShoe = data.find((Shoe: Shoe) => Shoe.id === id);

        if (foundShoe) {
          setShoe(foundShoe);
        } else {
          setError('Shoe not found');
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchShoe();
  }, [id]);

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  if (loading)
    return (
      <p className='text-center text-gray-500 text-lg font-medium shadow-lg p-6 rounded-lg'>
        Loading...
      </p>
    );
  if (error)
    return (
      <p className='text-center text-red-600 text-lg font-medium shadow-lg p-6 rounded-lg'>
        Error: {error}
      </p>
    );

  return (
    <section
      className='p-4 mt-12 shadow-lg rounded-xl bg-chart-3  
     border my-12'
    >
      {Shoe ? (
        <div className='flex flex-col lg:flex-row gap-12 '>
          {/* Image Section */}
          <div className='flex-shrink-0 w-full lg:w-1/2 flex justify-center items-center'>
            <Image
              className='w-full h-[400px] object-cover rounded-xl shadow-lg hover:scale-[1.024] transition-transform duration-600'
              src={Shoe.image}
              alt={Shoe.name}
              priority
              width={960}
              height={540}
              unoptimized={true}
            />
          </div>

          {/* Content Section */}
          <div className='flex flex-col lg:w-1/2'>
            <h1 className='text-4xl font-extrabold text-white mb-4'>
              {Shoe.name}
            </h1>
            <div className='space-y-6'>
              <h3 className='text-2xl font-semibold text-gray-200 mt-4'>
                Shoes Details
              </h3>
              <ul className='space-y-4 mt-2'>
                <li className='text-lg text-gray-200'>
                  <strong>Color:</strong> {Shoe.color}
                </li>
                <li className='text-lg text-gray-200'>
                  <strong>Price:</strong> PKR {Shoe.price}
                </li>
                <li className='text-lg text-gray-200'>
                  <strong>Description:</strong> PKR {Shoe.description}
                </li>
                <li
                  className={`text-lg font-semibold ${
                    Shoe.availability ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {Shoe.availability ? 'Available' : 'Un Available'}
                </li>
              </ul>

              {/* Size Buttons */}
              <div className='mt-6'>
                <h3 className='text-xl font-semibold text-gray-200 mb-2'>
                  Available Sizes
                </h3>
                <div className='flex gap-4'>
                  {Array.isArray(Shoe.size) &&
                    Shoe.size.map((size, index) => (
                      <button
                        key={index}
                        onClick={() => handleSizeSelect(size)}
                        className={`px-4 py-2 rounded-lg border-2 text-lg font-semibold transition-colors duration-600 ${
                          selectedSize === size
                            ? 'bg-primary text-white'
                            : 'hover:bg-gray-100 hover:text-gray-700  bg-primary text-white'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className='text-center text-gray-500 text-lg font-medium'>
          Shoe not found.
        </p>
      )}
    </section>
  );
};

export default SingleShoe;
