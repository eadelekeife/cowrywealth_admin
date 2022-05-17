import '../../assets/css/events.css';

import React, { useState, useEffect } from 'react';
import SideNav from '../../common_files/sideNav';
import TopNav from '../../common_files/topNav';

import { Table, Spin, notification, Pagination } from 'antd';
// import { Table, Spin, Pagination, Empty, Modal, notification, Input, Radio, Collapse, Select } from 'antd';

import axios from '../../common_files/axiosurl';
import { Link } from 'react-router-dom';

const AllEvents = () => {

    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: '',
            description:
                message,
        });
    };

    const [errorMessage, setErrorMessage] = useState('');
    const [ambassadorsData, setAmbassadorsData] = useState([]);
    const [spinnerStatus, setSpinnerStatus] = useState(true);
    const [current, setCurrent] = useState(1);


    useEffect(() => {
        axios('/admin/get_all_ambassadors')
            .then(eventsData => {
                console.log(eventsData)
                if (eventsData.data.summary === "success") {
                    setAmbassadorsData(eventsData.data.message);
                    setSpinnerStatus(false);
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
        // {
        //     title: 'Date',
        //     dataIndex: 'date',
        //     render: text => <a>{text}</a>,
        // },
        {
            title: 'Full name',
            className: 'column-money',
            dataIndex: 'fullName',
        },
        {
            title: 'Email address',
            className: 'column-money',
            dataIndex: 'emailAddress',
        },
        {
            title: 'Phone number',
            className: 'column-money',
            dataIndex: 'phoneNumber',
        },
        {
            title: 'Events',
            className: 'column-money',
            dataIndex: 'eventsAdded',
        },
        {
            title: 'Businesses',
            className: 'column-money',
            dataIndex: 'businessesAdded',
        },
        {
            title: 'Communities',
            className: 'column-money',
            dataIndex: 'communitiesAdded',
        },
        {
            title: '',
            className: 'column-money',
            dataIndex: 'action',
        }
    ];
    const data = ambassadorsData.map((ambassador, index) => {
        return {
            sn: index + 1,
            key: index,
            fullName: `${ambassador.lastName} ${ambassador.firstName}`,
            emailAddress: ambassador.emailAddress,
            phoneNumber: ambassador.phoneNumber,
            eventsAdded: ambassador.EventsRecords.length,
            communitiesAdded: ambassador.CommunityRecords.length,
            businessesAdded: ambassador.BusinessRecords.length,
            action: <Link to={`/ambassadors/${ambassador.lastName}_${ambassador.firstName}/${ambassador.id}`}>View</Link>
        }
    })

    const pageSize = 10;

    const getData = (current, pageSize) => {
        // Normally you should get the data from the server
        return data.slice((current - 1) * pageSize, current * pageSize);
    };

    // Custom pagination component
    const MyPagination = ({ total, onChange, current }) => {
        return (
            <Pagination
                onChange={onChange}
                total={total}
                current={current}
                pageSize={pageSize}
            />
        );
    };

    const EditCategory = e => {
        setSpinnerStatus(true);
        let url = e.action ? '/admin/hideEvent' : '/admin/showEvent';
        axios.post(url, {
            eventId: e.categoryId
        })
            .then(categoryData => {
                if (categoryData.data.summary === "success") {
                    setAmbassadorsData(categoryData.data.message);
                    setSpinnerStatus(false);
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
                                                !errorMessage ?
                                                    <div className="category_display">
                                                        <Table
                                                            columns={columns}
                                                            dataSource={getData(current, pageSize)}
                                                            bordered
                                                        />
                                                        <div style={{ marginTop: '3%' }}></div>
                                                        {/* <MyPagination
                                                            total={data.length}
                                                            current={current}
                                                            onChange={setCurrent}
                                                        /> */}
                                                    </div>
                                                    :
                                                    <div className="bigErrorData">
                                                        <div>{errorMessage}</div>
                                                    </div>
                                            }
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