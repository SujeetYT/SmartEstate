import React from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import homeLogo from "../assets/home.svg"
import dashboardLogo from "../assets/bar-chart-2.svg"
// import manageLogo from "../assets/box.svg"
import saleLogo from "../assets/shopping-bag.svg"
import transactionLogo from "../assets/trending-up.svg"
import settingLogo from "../assets/settings.svg"
import supportLogo from "../assets/life-buoy.svg"
import logOutLogo from "../assets/log-out.svg"
import Logo from "../assets/lagos logo 1.png"
import Search from './Search';
import avatar from "../assets/Avatar.svg"
import { BsBox } from 'react-icons/bs';
import { Col, Container, Row } from 'react-bootstrap';

const LeftSidebar = () => {
    return (
        <div>
            <Sidebar style={{ height: "100vh" }}>
                <Menu>
                    <div className='mt-5 mb-3'>
                        <img src={Logo} alt="Logo" className="mx-2 mb-1" /> <span className='fw-bold fs-4'>Logo Name</span>
                    </div>
                    <Search />

                    <div className="middle"> <MenuItem className="mt-5"> <img src={homeLogo} alt="" /> Home </MenuItem>
                        <MenuItem> <img src={dashboardLogo} alt="" /> Dashboard </MenuItem>
                        <MenuItem> <img src={saleLogo} alt="" /> Sales </MenuItem>
                        <SubMenu label="Manage" icon={<BsBox size={20} />}>
                            <MenuItem> All Lands </MenuItem>
                            <MenuItem> Land Registration Request </MenuItem>
                            <MenuItem> Land Ownership Transfer </MenuItem>
                        </SubMenu>
                        <MenuItem> <img src={transactionLogo} alt="" /> Transaction </MenuItem></div>
                    <div className="sidebarBottom"><MenuItem> <img src={supportLogo} alt="" /> Support </MenuItem>
                        <MenuItem> <img src={settingLogo} alt="" /> Settings </MenuItem>
                    </div>
                    <Container className='mt-5'> <Row>
                        <Col xs={2}><img src={avatar} alt="" /></Col>
                        <Col><div className="nameInfo mx-2"><span className='fw-bold'>Wade Warren</span> <span>Land Owner</span></div></Col>
                        <Col xs={2} className='btn'><img src={logOutLogo} alt="" /></Col>
                    </Row></Container>
                </Menu>
            </Sidebar>;
        </div>
    )
}

export default LeftSidebar