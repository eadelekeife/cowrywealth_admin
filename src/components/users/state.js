import '../../assets/css/events.css';

import React, { useState, useEffect } from 'react';
import SideNav from '../../common_files/sideNav';
import TopNav from '../../common_files/topNav';

import { Spin, notification, Tabs, Table } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import axios from '../../common_files/axiosurl';
import { Link, useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon';

const AllEvents = () => {

    const { TabPane } = Tabs;

    const navigate = useNavigate();

    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: '',
            description:
                message,
        });
    };

    const [errorMessage, setErrorMessage] = useState('');
    const [stateData, setStateData] = useState({});
    const [stillLoading, setStillLoading] = useState(true);
    const [spinnerStatus, setSpinnerStatus] = useState(true);
    const [current, setCurrent] = useState(1);
    const [lgData, setLgData] = useState([]);


    useEffect(() => {
        let stateId = window.location.pathname.split('/')[3];
        axios(`/admin/state/${stateId}`)
            .then(eventsData => {
                if (eventsData.data.summary === "success") {
                    setStateData(eventsData.data.message);
                    setStillLoading(false);
                    setSpinnerStatus(false);
                    let data = eventsData.data.message.LocalGovernments.map((state, index) => {
                        return {
                            sn: index + 1,
                            key: index,
                            name: state.name,
                            created: DateTime.fromISO(state.createdAt).toLocaleString(DateTime.DATE_HUGE),
                            edit: <Link to={`/editlg/${state.name}/${state.id}`}>Edit</Link>,
                            delete: <button 
                            onClick={() => deleteLG(state.id)}
                            className="bg_red">Delete</button>,
                        }
                    })
                    setLgData(data)
                } else {
                    setErrorMessage(eventsData.data.statusMessage)
                    setSpinnerStatus(false);
                }
            })
            .catch(err => {
                setErrorMessage('An error occurred while fetching category data. Please reload page to try again');
                setSpinnerStatus(false);
            })
    }, [])

    const columns = [
        {
            title: 'S/N',
            dataIndex: 'sn',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Name',
            className: 'column-money',
            dataIndex: 'name',
        },
        {
            title: 'Date created',
            className: 'column-money',
            dataIndex: 'created',
        },
        {
            title: '',
            className: 'column-money',
            dataIndex: 'edit',
        },
        {
            title: '',
            className: 'column-money',
            dataIndex: 'delete',
        }
    ];

    // const lgData = [];

    // const data = stateData.LocalGovernments ? stateData.LocalGovernments.map((state, index) => {
    //     return {
    //         sn: index + 1,
    //         key: index,
    //         name: state.name,
    //         created: DateTime.fromISO(state.createdAt).toLocaleString(DateTime.DATE_HUGE),
    //         action: <Link to={`/states/${state.name}/${state.id}`}>View</Link>
    //     }
    // }) : []

    const pageSize = 10;

    const getData = (current, pageSize) => {
        // Normally you should get the data from the server
        return lgData.slice((current - 1) * pageSize, current * pageSize);
    };

    const deleteLG = e => {
        let stateId = window.location.pathname.split('/')[3];
        setSpinnerStatus(true);
        axios.post('/admin/deleteLG', {
            lgId: e,
            stateId
        })
            .then(categoryData => {
                if (categoryData.data.summary === "success") {
                    setStateData(categoryData.data.message);
                    setStillLoading(false);
                    setSpinnerStatus(false);
                    let data = categoryData.data.message.LocalGovernments.map((state, index) => {
                        return {
                            sn: index + 1,
                            key: index,
                            name: state.name,
                            created: DateTime.fromISO(state.createdAt).toLocaleString(DateTime.DATE_HUGE),
                            edit: <Link to={`/editlg/${state.name}/${state.id}`}>Edit</Link>,
                            delete: <button className="bg_red">Delete</button>,
                        }
                    })
                    setLgData(data)
                } else {
                    setErrorMessage(categoryData.data.statusMessage)
                    setSpinnerStatus(false);
                }
            })
            .catch(err => {
                setErrorMessage('An error occurred while fetching category data. Please reload page to try again');
                setSpinnerStatus(false);
            })
    }
    
    const deleteState = e => {
        setSpinnerStatus(true);
        axios.post('/admin/deleteState', {
            stateId: stateData.id
        })
            .then(categoryData => {
                if (categoryData.data.summary === "success") {
                    navigate('/');
                } else {
                    setErrorMessage(categoryData.data.statusMessage)
                    setSpinnerStatus(false);
                }
            })
                .catch(err => {
                    console.log(err)
                    setErrorMessage('An error occurred while saving category data. Please try again')
                    setSpinnerStatus(false);
                })
    }

    return (
        <div>
            <Spin spinning={spinnerStatus}>
                <div className="portal_page">
                    <div>
                        <SideNav />
                    </div>
                    <div className="main_content">
                        <TopNav currentPage={"Create Event"}
                            buttonTitle={"See all events"}
                            buttonLink={"/events"}
                            currentPageInfo={"Create a New Event"} />
                        <div>
                            <div className="main_compartment">
                                <div className="main_compartment_content_display">
                                    <div className="main_compartment_content">
                                        <div className="contain">
                                            {
                                                !stillLoading ?
                                                    <Tabs type="card">
                                                        <TabPane tab="Local government" key="1">
                                                            <div>
                                                                <Table
                                                                    columns={columns}
                                                                    dataSource={getData(current, pageSize)}
                                                                    bordered
                                                                />
                                                                <Link 
                                                                className="bg_green"
                                                                style={{marginRight: '10px'}}
                                                                to={`/editstate/${stateData.name}/${stateData.id}`}>Edit State</Link>
                                                                <button 
                                                                onClick={() => deleteState()}
                                                                className="bg_red">Delete State</button>
                                                            </div>
                                                        </TabPane>
                                                        <TabPane tab="Events" key="2">
                                                            <div className="category_display grid_4">
                                                                {stateData.EventsRecords.map((events, index) => {
                                                                    return (
                                                                        <div key={index}>
                                                                            <Link to={`/event/${events.eventTitle}/${events.id}`}>
                                                                                <img src={events.displayImage} alt={events.displayImage} />
                                                                                <h5>{events.eventTitle}</h5>
                                                                            </Link>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </TabPane>
                                                        <TabPane tab="Communities" key="3">
                                                            <div className="category_display grid_4">
                                                                {stateData.CommunityRecords.map((community, index) => {
                                                                    return (
                                                                        <div key={index}>
                                                                            <img src={community.displayImage} alt={community.displayImage} />
                                                                            <h5>{community.communityName}</h5>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </TabPane>
                                                        <TabPane tab="Businesses" key="4">
                                                            <div className="category_display grid_4">
                                                                {stateData.BusinessRecords.map((events, index) => {
                                                                    return (
                                                                        <div key={index}>
                                                                            <Link to={`/businesses/${events.businessName}/${events.id}`}>
                                                                                <img src={events.displayImage} alt={events.displayImage} />
                                                                                <h5>{events.businessName}</h5>
                                                                            </Link>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </TabPane>
                                                    </Tabs>
                                                    :
                                                    <div>
                                                    </div>
                                            }
                                            {/* {
                                                !errorMessage ?
                                                    <div className="category_display grid_4">
                                                        {stateData.map((events, index) => {
                                                            return (
                                                                <div key={index}>
                                                                    <Link to={`/event/${events.eventTitle}/${events.id}`}>
                                                                        <img src={events.displayImage} alt={events.displayImage} />
                                                                        <h5>{events.eventTitle}</h5>
                                                                        <p style={{ color: '#0a0a0a' }}>{events.EventCategoriesDatum.categoryName}</p>
                                                                    </Link>
                                                                    <button
                                                                        onClick={(() => EditAmbassador(false)({
                                                                            categoryId: events.id,
                                                                            action: events.displayStatus
                                                                        }))}
                                                                        className="bg_border_red">
                                                                        {events.displayStatus ?
                                                                            'Hide Event'
                                                                            :
                                                                            'Show Event'
                                                                        }
                                                                    </button>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                    :
                                                    <div className="bigErrorData">
                                                        <div>{errorMessage}</div>
                                                    </div>
                                            } */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Spin>
        </div>
    )
}

export default AllEvents;