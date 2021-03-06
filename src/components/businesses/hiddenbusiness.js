import '../../assets/css/events.css';

import React, { useState, useEffect } from 'react';
import SideNav from '../../common_files/sideNav';
import TopNav from '../../common_files/topNav';

import { Spin, notification } from 'antd';
import { Link } from 'react-router-dom';
import axios from '../../common_files/axiosurl';

const AllEvents = () => {

    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: '',
            description:
                message,
        });
    };

    const [errorMessage, setErrorMessage] = useState('');
    const [eventsData, setEventsData] = useState([]);
    const [spinnerStatus, setSpinnerStatus] = useState(true);


    useEffect(() => {
        axios('/admin/get_all_hidden_businesses')
            .then(eventsData => {
                if (eventsData.data.summary === "success") {
                    setEventsData(eventsData.data.message);
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

    const EditCategory = e => {
        setSpinnerStatus(true);
        let url = e.action ? '/admin/hideBusiness' : '/admin/showBusiness';
        axios.post(url, {
            businessId: e.categoryId
        })
            .then(categoryData => {
                if (categoryData.data.summary === "success") {
                    setEventsData(categoryData.data.message);
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
                                                    <div className="category_display grid_4">
                                                        {eventsData.map((events, index) => {
                                                            return (
                                                                <div key={index}>
                                                                    <Link to={`/businesses/${events.businessName}/${events.id}`}>
                                                                        <img src={events.displayImage} alt={events.displayImage} />
                                                                        <h5>{events.businessName}</h5>
                                                                        <p style={{ color: '#0a0a0a' }}>{events.BusinessesCategoriesDatum.categoryName}</p>
                                                                    </Link>
                                                                    <button
                                                                        onClick={(() => EditCategory({
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