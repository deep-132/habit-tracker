import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addHabit, details } from '../Slices/habitSlice.js'
import { Link, useNavigate } from 'react-router-dom';

function AddHabit(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { show, onClose } = props;

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  // handle new habits
  const AddHabitHandler = () => {
    dispatch(addHabit({ title, description, details }));
    onClose();
    navigate('/habits/detail', { replace: true });
  }

  //handle close
  const handleClose = (e) => {
    if (e.target.id === 'wrapper') {
      onClose();
      navigate('/habits/detail', { replace: true });
    }
  }

  //if show==false don't return anything
  if (!show) {
    return null;
  }
  return (
    <div className='fixed inset-0  bg-gray-800 bg-opacity-25 backdrop-blur-sm flex justify-center text-white'
      id='wrapper' onClick={handleClose}>
      <div className='w-2/3 md:w-1/3 h-1/4 md:h-2/4 p-2 rounded flex flex-col'>
        <div className='mt-20 p-2 bg-white rounded  text-gray-900'>
          <div className='p-6 lg:px-8 text-left'>
            <h3 className='mb-2 text-2xl'>Add your new Habit here</h3>
            <hr />
            <form className='mt-2 space-y-6'>
              <div>
                {/* title input*/}
                <label className=' text-xl'> Title</label>
                <input onChange={(e) => setTitle(e.target.value)} type='text' name='title'
                  className='bg-gray-50 border border-gray-300 text-base rounded-lg 
              focus:ring-blue-500 focus:border-blue-500 w-full p-2.5' placeholder='Enter title' required></input>
              </div>
              <div>
                {/* description input */}
                <label className=' text-xl'> Short description</label>
                <input onChange={(e) => setDescription(e.target.value)} type='text' name='title'
                  className='bg-gray-50 border border-gray-300 text-base rounded-lg
              focus:ring-blue-500 focus:border-blue-500 w-full p-2.5' placeholder='shortly describe'></input>
              </div>

              {/* add habit button */}
              <div className='flex justify-between'>
                <button onClick={AddHabitHandler} type='submit' className='text-white text-center  bg-blue-400 hover:bg-blue-900
                 focus:ring-4 focus:outline-none rounded-lg px-5 py-2.5'>Add</button>

                {/* close button */}
                <Link to={'/habits/detail'}>
                  <button onClick={onClose} className='text-white text-center  bg-red-400 hover:bg-red-900
                 focus:ring-4 focus:outline-none rounded-lg px-5 py-2.5'>Close</button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddHabit;