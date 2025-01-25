'use client';

import { useShowToast } from '@/components/Toast';
import { useState } from 'react';

interface DeleteShoeButtonProps {
  shoeId: string;
  refreshShoes: () => void;
}

const DeleteShoeButton: React.FC<DeleteShoeButtonProps> = ({
  shoeId,
  refreshShoes,
}) => {
  const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false);

  const handleOpenDeletePopup = () => {
    setIsDeletePopupVisible(true);
  };

  const handleCloseDeletePopup = () => {
    setIsDeletePopupVisible(false);
  };

  return (
    <>
      <button
        onClick={handleOpenDeletePopup}
        className='px-4 py-2 bg-orange-700 text-white rounded-lg hover:bg-orange-800 transition duration-200'
      >
        Delete
      </button>

      {isDeletePopupVisible && (
        <DeleteShoePopup
          shoeId={shoeId}
          onClose={handleCloseDeletePopup}
          refreshShoes={refreshShoes}
        />
      )}
    </>
  );
};

interface DeleteShoePopupProps {
  shoeId: string;
  onClose: () => void;
  refreshShoes: () => void;
}

const DeleteShoePopup: React.FC<DeleteShoePopupProps> = ({
  shoeId,
  onClose,
  refreshShoes,
}) => {
  const showToast = useShowToast();

  const handleDeleteShoe = async () => {
    console.log(String(shoeId));
    try {
      const response = await fetch(
        `http://localhost:5000/fashion/${String(shoeId)}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        showToast({
          title: 'Shoe Deleted Successfully!',
          description: 'The shoe has been removed.',
        });
        refreshShoes();
        onClose(); // Close the popup after deleting
      } else {
        showToast({
          title: 'Error Deleting Shoe',
          description: 'There was an issue deleting the shoe.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.log(error);
      showToast({
        title: 'Error',
        description: `An error occurred while deleting the shoe. ${error}`,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white rounded-lg shadow-md sm:w-[400px] p-6'>
        <h2 className='text-xl font-bold text-primary mb-4'>Are you sure?</h2>
        <p className='text-gray-600 mb-6'>
          Do you really want to delete this shoe? This action cannot be undone.
        </p>
        <div className='flex justify-end space-x-4'>
          <button
            onClick={onClose}
            className='px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 text-black transition duration-200'
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteShoe}
            className='px-4 py-2 bg-orange-700 text-white rounded-lg hover:bg-orange-800 transition duration-200'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteShoeButton;
