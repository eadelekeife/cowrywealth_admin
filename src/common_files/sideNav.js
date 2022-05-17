import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../assets/images/logo.svg';

const SideNav = () => {
    return (
        <div className="side_nav">
            <div className="nav_compartment bigger">
                <img src={Logo} alt="logo" />
            </div>
            <div className="nav_compartment bigger">
                <h3>Hi there, Ifeoluwase</h3>
            </div>
            <div className="nav_compartment">
                <h4>User Management</h4>
                <ul>
                    <li><Link to="/"><i className="uil uil-create-dashboard"></i> Dashboard</Link></li>
                    <li><Link to="/allusers"><i className="uil uil-create-dashboard"></i> All Users</Link></li>
                    <li><Link to="/allambassadors"><i className="uil uil-create-dashboard"></i> All Ambassadors</Link></li>
                    <li><Link to="/addambassador"><i className="uil uil-create-dashboard"></i> Add Ambassador</Link></li>
                    <li><Link to="/alladministrators"><i className="uil uil-create-dashboard"></i> All Administrators</Link></li>
                    <li><Link to="/addadministrator"><i className="uil uil-create-dashboard"></i> Add Administrator</Link></li>
                    <li><Link to="/addstate"><i className="uil uil-create-dashboard"></i> Add State</Link></li>
                    <li><Link to="/addlga"><i className="uil uil-create-dashboard"></i> Add Local Government</Link></li>
                    {/* <li><Link to="/businesses"><i className="uil uil-create-dashboard"></i> Deauthorize Administrator</Link></li>
                    <li><Link to="/businesses/new"><i className="uil uil-plus-circle"></i> Deauthorize Ambassador</Link></li> */}
                </ul>
            </div>
            <div className="nav_compartment">
                <h4>Events</h4>
                <ul>
                    <li><Link to="/event/categories/new"><i className="uil uil-create-dashboard"></i> Add Event Category</Link></li>
                    <li><Link to="/event/categories/all"><i className="uil uil-create-dashboard"></i> All Event Categories</Link></li>
                    <li><Link to="/events/all"><i className="uil uil-create-dashboard"></i> All Events</Link></li>
                    <li><Link to="/events/new"><i className="uil uil-plus-circle"></i> Create Event</Link></li>
                    <li><Link to="/events/hidden"><i className="uil uil-archive-alt"></i> Hidden Events</Link></li>
                    <li><Link to="/events/visible"><i className="uil uil-history-alt"></i> Visible Events</Link></li>
                    <li className="last_nav"><Link to="/events/edit"><i className="uil uil-create-dashboard"></i> Edit Events</Link></li>
                </ul>
            </div>
            <div className="nav_compartment">
                <h4>Communities</h4>
                <ul>
                    <li><Link to="/communities/categories/new"><i className="uil uil-create-dashboard"></i> Add Community Category</Link></li>
                    <li><Link to="/communities/categories/all"><i className="uil uil-create-dashboard"></i> All Community Categories</Link></li>
                    <li><Link to="/communities/all"><i className="uil uil-create-dashboard"></i> All Communities</Link></li>
                    <li><Link to="/communities/new"><i className="uil uil-plus-circle"></i> Create Community</Link></li>
                    <li><Link to="/communities/hidden"><i className="uil uil-archive-alt"></i> Hidden Communities</Link></li>
                    <li><Link to="/communities/visible"><i className="uil uil-history-alt"></i> Visible Communities</Link></li>
                    <li className="last_nav"><Link to="/communities/edit"><i className="uil uil-create-dashboard"></i> Edit Communities</Link></li>
                </ul>
            </div>
            <div className="nav_compartment">
                <h4>Businesses</h4>
                <ul>
                    <li><Link to="/businesses/categories/new"><i className="uil uil-create-dashboard"></i> Add Business Category</Link></li>
                    <li><Link to="/businesses/categories/all"><i className="uil uil-create-dashboard"></i> All Business Categories</Link></li>
                    <li><Link to="/businesses/all"><i className="uil uil-create-dashboard"></i> All Businesses</Link></li>
                    <li><Link to="/businesses/new"><i className="uil uil-plus-circle"></i> Create Business</Link></li>
                    <li><Link to="/businesses/visible"><i className="uil uil-archive-alt"></i> Visible Businesses</Link></li>
                    <li><Link to="/businesses/hidden"><i className="uil uil-history-alt"></i> Hidden Businesses</Link></li>
                    <li><Link to="/businesses/edit"><i className="uil uil-create-dashboard"></i> Edit Businesses</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default SideNav;