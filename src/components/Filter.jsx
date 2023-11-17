import React from 'react'
import { Button, Container } from 'react-bootstrap'
import Search from './Search'
import { GoChevronDown, GoLocation, GoXCircle } from 'react-icons/go'
import {BsFilter} from 'react-icons/bs'
const Filter = () => {  
  return (
    <Container className='d-flex justify-content-start align-items-center border-bottom'>
      <Search/>
      <div className='filterStyle d-flex justify-content-between my-3'>
      {/* <p className='rounded p-1 greyBg'>Max $300K <span><GoXCircle/></span></p> */}
      <p>Land Size <GoChevronDown/></p>
      {/* <p>Location <GoChevronDown/></p>
      <p>Filter <BsFilter /></p> */}
      </div>
      {/* <Button className='ms-auto' ><GoLocation/> Map</Button> */}
      
    </Container>
  )
}

export default Filter