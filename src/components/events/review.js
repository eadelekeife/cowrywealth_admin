import '../../assets/css/events.css';

import React, { useState, useEffect } from 'react';
import SideNav from '../../common_files/sideNav';
import TopNav from '../../common_files/topNav';

import { Spin, notification, Rate } from 'antd';
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
    const [reviewsBox, setreviewsBox] = useState([]);
    const [spinnerStatus, setSpinnerStatus] = useState(true);
    const [eventId, setEventId] = useState('');


    useEffect(() => {
        let eventId = window.location.pathname.split('/')[3];
        setEventId(window.location.pathname.split('/')[3]);
        axios(`/singleeventreviews/${eventId}`)
            .then(reviewsBox => {
                if (reviewsBox.data.statusMessage === "success") {
                    setreviewsBox(reviewsBox.data.message);
                    setSpinnerStatus(false);
                } else {
                    setErrorMessage(reviewsBox.data.statusMessage);
                    setSpinnerStatus(false);
                }
            })
            .catch(err => {
                setErrorMessage('An error occurred while fetching reviews. Please reload page to try again');
                setSpinnerStatus(false);
            })
    }, [])

    const deleteEventReview = e => {
        setErrorMessage('');
        setSpinnerStatus(true);
        axios.post('/admin/deleteEventReview', {
            reviewId: e,
            eventId
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(categorySaved => {
            if (categorySaved.data.statusMessage === "success") {
                setreviewsBox(categorySaved.data.message);
                setSpinnerStatus(false);
                openNotificationWithIcon('success', "Review deleted")
            } else {
                openNotificationWithIcon('error', categorySaved.data.summary)
                setSpinnerStatus(false);
            }
        })
            .catch(err => {
                openNotificationWithIcon('error', 'An error occurred while deleting reviews. Please try again')
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
                                                    <div className="category_display grid_3">
                                                        {reviewsBox.map((reviews, index) => {
                                                            return (
                                                                <div key={index}>
                                                                    <Rate disabled allowHalf value={+reviews.star} />
                                                                    <p
                                                                        style={{ marginBottom: '15px', lineHeight: '1.7' }}
                                                                    >{reviews.message}</p>
                                                                    <p
                                                                        style={{ marginBottom: '0px' }}
                                                                    >{reviews.User.firstName} {reviews.User.lastName}</p>
                                                                    <p
                                                                        style={{ marginBottom: '5px' }}
                                                                    >{reviews.createdAt.split('T')[0]}</p>
                                                                    <button
                                                                        onClick={() => deleteEventReview(reviews.id)}
                                                                        style={{ padding: '10px' }}
                                                                        className="bg_border_red">
                                                                        Delete Review
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