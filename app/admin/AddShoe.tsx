'use client';

import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useShowToast } from '@/components/Toast';

// Define validation schema for the shoe form using Zod
const shoeSchema = z.object({
  name: z.string().min(1, 'Shoe Name is required'),
  price: z.number().min(1, 'Price must be greater than 0'),
  description: z.string().min(1, 'Description is required'),
  size: z.array(z.string()).min(1, 'At least one size is required'),
  color: z.string().min(1, 'Color is required'),
  image: z.string().url('Invalid image URL').min(1, 'Image URL is required'),
  availability: z.boolean(),
});

type ShoeFormValues = z.infer<typeof shoeSchema>;

interface AddShoePopupProps {
  onClose: () => void;
  refreshShoes: () => void;
}

const AddShoePopup: React.FC<AddShoePopupProps> = ({
  onClose,
  refreshShoes,
}) => {
  const showToast = useShowToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ShoeFormValues>({
    resolver: zodResolver(shoeSchema),
  });

  const handleAddShoe = async (data: ShoeFormValues) => {
    try {
      const response = await fetch('http://localhost:5000/fashion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: new Date().getTime().toString(), // Generate unique id for the new shoe
          ...data,
        }),
      });

      if (response.ok) {
        showToast({
          title: 'Shoe Added Successfully!',
          description: 'The shoe has been added.',
        });
        refreshShoes();
        onClose();
        reset(); // Reset form after successful submission
      } else {
        showToast({
          title: 'Error Adding Shoe',
          description: 'There was an issue adding the shoe.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      showToast({
        title: 'Error',
        description: `An error occurred while adding the shoe. ${error}`,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-muted border rounded-3xl shadow-md sm:w-[400px] p-6'>
        <h2 className='text-2xl font-semibold text-black mb-4'>Add New Shoe</h2>
        <form onSubmit={handleSubmit(handleAddShoe)} className='space-y-4'>
          <div>
            <Input
              placeholder='Enter Shoe name'
              {...register('name')}
              className='bg-transparent text-gray-600 border border-gray-500'
            />
            {errors.name && (
              <p className='text-red-500 text-sm'>{errors.name.message}</p>
            )}
          </div>

          <div>
            <Input
              placeholder='Enter price'
              {...register('price', { valueAsNumber: true })}
              className='bg-transparent text-gray-600 border border-gray-500'
              type='number'
              min={1}
            />
            {errors.price && (
              <p className='text-red-500 text-sm'>{errors.price.message}</p>
            )}
          </div>
          <div>
            <Input
              placeholder='Enter description'
              {...register('description')}
              className='bg-transparent text-gray-600 border border-gray-500'
            />
            <div>
              <label className='block text-gray-600 mt-2'>Availability</label>
              <input
                type='checkbox'
                {...register('availability')}
                className='mt-2'
              />
            </div>
            {errors.description && (
              <p className='text-red-500 text-sm'>
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            <label className='block text-gray-600'>Sizes</label>
            <div className='flex gap-4'>
              {['S', 'M', 'L', 'XL'].map((size) => (
                <div key={size}>
                  <input
                    type='checkbox'
                    value={size}
                    {...register('size')}
                    className='mt-2'
                  />
                  <label className='ml-2'>{size}</label>
                </div>
              ))}
            </div>
            {errors.size && (
              <p className='text-red-500 text-sm'>{errors.size.message}</p>
            )}
          </div>
          <div>
            <Input
              placeholder='Enter color'
              {...register('color')}
              className='bg-transparent text-gray-600 border border-gray-500'
            />
            {errors.color && (
              <p className='text-red-500 text-sm'>{errors.color.message}</p>
            )}
          </div>
          <div>
            <Input
              placeholder='Enter image URL'
              {...register('image')}
              className='bg-transparent text-gray-600 border border-gray-500'
            />
            {errors.image && (
              <p className='text-red-500 text-sm'>{errors.image.message}</p>
            )}
          </div>
          <div className='flex justify-end space-x-4'>
            <Button
              type='button'
              className='bg-gray-300 text-gray-700 hover:bg-gray-400 hover:text-gray-950'
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type='submit' className='bg-primary hover:bg-primary/80'>
              Add Shoe
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddShoePopup;
