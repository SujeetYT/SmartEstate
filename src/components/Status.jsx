import React from 'react'
import { GoDotFill } from 'react-icons/go'

const Status = ({status}) => {
  return (
    <>
        {status === 0 && <Invalid />}
        {status === 1 && <Pending />}
        {status === 2 && <Approved />}
        {status === 3 && <Declined />}
    </>
  )
}

const Invalid = () => {
    return (
        <div
            style={{backgroundColor: '#f8caca', color: '#b50808', cursor: 'default'}}
            className='p-1 rounded-pill d-flex align-items-center justify-content-center fw-medium'
        >
            <GoDotFill color={"#b50808"} /> Invalid
        </div>
    )
}
const Pending = () => {
    return (
        <div
            style={{backgroundColor: '#FFFAEB', color: '#B54708', cursor: 'default'}}
            className='p-1 rounded-pill d-flex align-items-center justify-content-center fw-medium'
        >
            <GoDotFill color={"#B54708"} /> Pending
        </div>
    )
}
const Approved = () => {
    return (
        <div
            style={{backgroundColor: '#ECFDF3', color: '#12B76A', cursor: 'default'}}
            className='p-1 rounded-pill d-flex align-items-center justify-content-center fw-medium'
        >
            <GoDotFill color={"#12B76A"} /> Approved
        </div>
    )
}
const Declined = () => {
    return (
        <div
            style={{backgroundColor: '#FEF3F2', color: '#F04438', cursor: 'default'}}
            className='p-1 rounded-pill d-flex align-items-center justify-content-center fw-medium'
        >
            <GoDotFill color={"#F04438"} /> Declined
        </div>
    )
}

export default Status