import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { deleteHabit } from '../Slices/habitSlice';

function HabitCard(props) {

    const dispatch = useDispatch();
    const { title, description, details } = props.habit;
    const [doneCount, setDoneCount] = useState(0);
    const [percentage, setPercentage] = useState('');
    const [failCount, setFailCount] = useState(0);
    const [noActionCount, setNoActionCount] = useState(0);

    // deleteHabit Handler
    const deleteHandler = (name) => {
        dispatch(deleteHabit(name))
    }

    useEffect(() => {
        // calculate fail,done and noAction taken days
        let totalDone = 0, totalFail = 0, noActionTotal = 0;
        details.forEach(element => {
            switch (element.status) {
                case 'none':
                    totalDone++; break;
                case 'done':
                    totalFail++; break;
                case 'fail':
                    noActionTotal++; break;
                default:
                    break;
            }
        });
        setNoActionCount(totalDone);
        setDoneCount(totalFail);
        setFailCount(noActionTotal);
        switch (doneCount) {
            case 1:
                setPercentage('14%'); break;
            case 2:
                setPercentage('28%'); break;
            case 3:
                setPercentage('43%'); break;
            case 4:
                setPercentage('57%'); break;
            case 5:
                setPercentage('71%'); break;
            case 6:
                setPercentage('86%'); break;
            case 7:
                setPercentage("100%"); break;
            default:
                setPercentage('0%'); break;
        }
    }, [details, doneCount, failCount, noActionCount]);

    return (
        <div className="m-2 border text-white border-slate-200 rounded-lg hover:shadow-md hover:border-opacity-0 hover:scale-105">
            <div className="my-2 flex flex-col justify-between">
                <h2 className="mx-2 text-left text-2xl mb-2">{title}
                    {/* delete button */}
                    <button onClick={() => deleteHandler(title)} className=" text-red-700 text-lg px-2 align-top float-right">
                        <FaTrashAlt />
                    </button>
                </h2>
                <div className='p-2 italic'>{description}</div>
                <hr className='my-1 mx-2' />
                {/* status */}
                <div className="p-2 flex justify-between text-xs">
                    <span>Done: {doneCount} days</span>
                    <span>No Action Taken: {noActionCount}days</span>
                    <span>Fail: {failCount} days</span>
                </div>
                {/* progress bar */}
                <div className=" my-1 mx-2 h-2 bg-blue-200 rounded-full">
                    <div style={{ width: percentage }}
                        className={`h-full text-center text-sm text-black bg-blue-600 rounded-full`}>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HabitCard