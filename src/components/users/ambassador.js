import '../../assets/css/events.css';

import React, { useState, useEffect } from 'react';
import SideNav from '../../common_files/sideNav';
import TopNav from '../../common_files/topNav';

import { Spin, notification, Tabs, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import axios from '../../common_files/axiosurl';
import { Link } from 'react-router-dom';

const AllEvents = () => {

    const { TabPane } = Tabs;

    const { handleSubmit, control, formState: { errors }, setValue } = useForm({
        // resolver: yupResolver(resolveForm)
    });

    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: '',
            description:
                message,
        });
    };

    const [errorMessage, setErrorMessage] = useState('');
    const [ambassadorData, setAmbassadorData] = useState({});
    const [stillLoading, setStillLoading] = useState(true);
    const [spinnerStatus, setSpinnerStatus] = useState(true);


    useEffect(() => {
        let ambassadorId = window.location.pathname.split('/')[3];
        axios(`/admin/ambassador/${ambassadorId}`)
            .then(eventsData => {
                if (eventsData.data.summary === "success") {
                    setAmbassadorData(eventsData.data.message);
                    setValue('firstName', eventsData.data.message.firstName);
                    setValue('lastName', eventsData.data.message.lastName);
                    setValue('emailAddress', eventsData.data.message.emailAddress);
                    setValue('phoneNumber', eventsData.data.message.phoneNumber);
                    setValue('dateCreated', eventsData.data.message.createdAt.split('T')[0]);
                    setStillLoading(false);
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

    const EditAmbassador = e => {
        setSpinnerStatus(true);
        let url = e ? '/admin/authorizeambassador' : '/admin/deauthorizeambassador';
        axios.post(url, {
            ambassadorID: ambassadorData.id
        })
            .then(categoryData => {
                if (categoryData.data.summary === "success") {
                    setAmbassadorData(categoryData.data.message);
                    setValue('firstName', categoryData.data.message.firstName);
                    setValue('lastName', categoryData.data.message.lastName);
                    setValue('emailAddress', categoryData.data.message.emailAddress);
                    setValue('phoneNumber', categoryData.data.message.phoneNumber);
                    setValue('dateCreated', categoryData.data.message.createdAt.split('T')[0]);
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
                                                !stillLoading ?
                                                    <Tabs type="card">
                                                        <TabPane tab="Basic Profile Info" key="1">
                                                            <div>
                                                                <div className="form_flex_2">
                                                                    <div className="form-group">
                                                                        <label htmlFor="firstName">FIrst name</label>
                                                                        <Controller control={control} defaultValue="" name="firstName"
                                                                            render={({ field }) => (
                                                                                <Input disabled {...field} id="firstName"
                                                                                    type="text" style={{ height: '3rem' }} />
                                                                            )
                                                                            } />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label htmlFor="lastName">Last name</label>
                                                                        <Controller control={control} defaultValue="" name="lastName"
                                                                            render={({ field }) => (
                                                                                <Input disabled {...field} id="lastName"
                                                                                    type="text" style={{ height: '3rem' }} />
                                                                            )
                                                                            } />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="emailAddress">Email address</label>
                                                                    <Controller control={control} defaultValue="" name="emailAddress"
                                                                        render={({ field }) => (
                                                                            <Input disabled {...field} id="emailAddress"
                                                                                type="email" style={{ height: '3rem' }} />
                                                                        )
                                                                        } />
                                                                </div>
                                                                <div className="form_flex_2">
                                                                    <div className="form-group">
                                                                        <label htmlFor="dateCreated">Date added</label>
                                                                        <Controller control={control} defaultValue="" name="dateCreated"
                                                                            render={({ field }) => (
                                                                                <Input disabled {...field} id="dateCreated"
                                                                                    type="tel" style={{ height: '3rem' }} />
                                                                            )
                                                                            } />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label htmlFor="phoneNumber">Phone number</label>
                                                                        <Controller control={control} defaultValue="" name="phoneNumber"
                                                                            render={({ field }) => (
                                                                                <Input disabled {...field} id="phoneNumber"
                                                                                    type="tel" style={{ height: '3rem' }} />
                                                                            )
                                                                            } />
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div style={{ marginTop: '5%' }}></div>
                                                                    {
                                                                        ambassadorData.authorized
                                                                            ?
                                                                            <button
                                                                                onClick={() => EditAmbassador(false)}
                                                                                className="bg_red">
                                                                                Deauthorize Ambassador
                                                                            </button>
                                                                            :
                                                                            <button
                                                                                onClick={() => EditAmbassador(true)}
                                                                                className="bg_green">
                                                                                Authorize Ambassador
                                                                            </button>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </TabPane>
                                                        <TabPane tab="Events Created" key="2">
                                                            <div className="category_display grid_4">
                                                                {ambassadorData.EventsRecords.map((events, index) => {
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
                                                        <TabPane tab="Communities Created" key="3">
                                                            <div className="category_display grid_4">
                                                                {ambassadorData.CommunityRecords.map((community, index) => {
                                                                    return (
                                                                        <div key={index}>
                                                                            <img src={community.displayImage} alt={community.displayImage} />
                                                                            <h5>{community.communityName}</h5>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </TabPane>
                                                        <TabPane tab="Businesses Created" key="4">
                                                            <div className="category_display grid_4">
                                                                {ambassadorData.BusinessRecords.map((events, index) => {
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
                                                        {ambassadorData.map((events, index) => {
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