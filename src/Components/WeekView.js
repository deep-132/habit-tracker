import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaCheckCircle, FaTasks } from "react-icons/fa";
import { HiXCircle } from "react-icons/hi2";
import { changeStatus } from '../Slices/habitSlice';

function WeekView() {
  const { habits } = useSelector((state) => state.allHabits);
  const dispatch = useDispatch()

  // change no action to done
  const checkStatusHandler = (info) => {
    dispatch(
      changeStatus({
        title: info[0],
        details: [
          {
            day: info[1],
            status: 'done',
          },
        ],
      })
    )
  }

  // change done to fail
  const doneStatusHandler = (info) => {
    dispatch(
      changeStatus({
        title: info[0],
        details: [
          {
            day: info[1],
            status: 'fail',
          },
        ],
      })
    )
  }

  // change fail to no action
  const failStatusHandler = (info) => {
    dispatch(
      changeStatus({
        title: info[0],
        details: [
          {
            day: info[1],
            status: 'none',
          },
        ],
      })
    )
  }
  return (
    <div className="container mt-4">
      <div className="flex flex-col gap-5 items-center xl:items-start">
        {
          // Iterate over habits map
          habits.map(({ title, description, details }) => (
            <div className='text-white w-4/5 border border-slate-200 rounded-lg p-4'>
              <div className='text-amber-800'>
                <span><FaTasks className='inline md:text-2xl text-xl' /></span>
                <span className='font-bold mx-2 md:text-2xl text-xl'>{title}: </span>
                <span className='text-xl'>{description}</span>
              </div>
              <hr className='my-2 ' />
              <div className='flex flex-wrap justify-between'>
                {/* iterate over each day status */}
                {details.map(({ day, status }) => (
                  <div className='flex flex-col items-center md:mx-5 mx-2'>
                    <p>{day}</p>
                    {status === 'none' &&
                      <FaCheckCircle onClick={() => checkStatusHandler([title, day])} className='text-white' />
                    }
                    {status === 'done' &&
                      <FaCheckCircle onClick={() => doneStatusHandler([title, day])} className='text-green-700' />
                    }
                    {status === 'fail' &&
                      <HiXCircle onClick={() => failStatusHandler([title, day])} className='text-red-600' />
                    }
                  </div>
                ))}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default WeekView