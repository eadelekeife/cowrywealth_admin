import '../../assets/css/events.css';

import React, { useState, useEffect } from 'react';
import SideNav from '../../common_files/sideNav';
import TopNav from '../../common_files/topNav';

import { Link, useNavigate } from 'react-router-dom';

import {
    Input, Spin, Radio, message, Upload, Divider, Checkbox,
    DatePicker, TimePicker,
    Row, Col, Select, notification
} from 'antd';
import { LoadingOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import axios from '../../common_files/axiosurl';
import axiosUrl from 'axios';
import NumberFormat from 'react-number-format';
import moment from "moment";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// import Options from '../../common_files/questions';

const NewEvent = () => {

    const { Option } = Select;
    const navigate = useNavigate();
    const { RangePicker } = TimePicker;

    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: '',
            description:
                message,
        });
    };

    const { handleSubmit, control, setValue } = useForm({});
    const { handleSubmit: submitExtraInfo, control: controlExtraInfo,
        formState: { errors }, register: registerExtraInfo } = useForm({
            // resolver: yupResolver(authorValidator)
        });
    const { fields: sectionFields, append: sectionAppend, remove: sectionRemove } = useFieldArray({
        control,
        name: 'faqs'
    });

    const { handleSubmit: submitPricingInfo, control: controlPricingInfo,
        formState: { errors: pricingError }, register: registerPricingInfo } = useForm({
        });
    const { fields: pricingFields, append: pricingAppend, remove: removePricing } = useFieldArray({
        control,
        name: 'pricingData'
    });

    const [currentDisplay, setCurrentDisplay] = useState('basic');

    const [imageUrl, setImageUrl] = useState('');
    const [displayImageUpdated, setDisplayImageUpdated] = useState(false);
    const [loading, setLoading] = useState(false);

    const [mainImageUrl, setMainImageUrl] = useState('');
    const [mainImageUpdated, setMainImageUpdated] = useState(false);
    const [loadingMain, setMainLoading] = useState(false);

    const [categoryData, setCategoryData] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [bodyText, setBodyText] = useState('');

    const [eventsData, setEventsData] = useState([]);
    const [spinnerStatus, setSpinnerStatus] = useState(true);

    const [wheelchair, setWheelChair] = useState(true);
    const [infant, setInfant] = useState(false);
    const [transport, setTransport] = useState(false);
    const [traveller, setTraveller] = useState(false);
    const [backProblems, setBackProblems] = useState(false);
    const [pregnant, setPregnant] = useState(false);
    const [recommended, setRecommended] = useState(false);
    const [physicalFitness, setPhysicalFitness] = useState(false);
    const [infantSeat, setInfantSeat] = useState(false);
    const [pickup, setPickup] = useState(false);

    const [eventTitle, setEventTitle] = useState('');
    const [eventOrganizer, setEventOrganizer] = useState('');
    const [eventCategory, setEventCategory] = useState('');
    const [eventState, setEventState] = useState('');
    const [eventLGA, setEventLGA] = useState('');
    const [eventAddress, setEventAddress] = useState('');
    const [eventURL, setEventURL] = useState('');
    const [eventStarts, setEventStarts] = useState('');
    const [startTime, setStartTime] = useState('');
    const [eventEnds, setEventEnds] = useState('');
    const [endTime, setEndTime] = useState('');
    const [CKEditorContent, setCKEditorContent] = useState('');
    const [pricingPlans, setPricingPlans] = useState([]);
    const [faqTabs, setFaqTabs] = useState([]);
    const [pricingPlanOption, setPricingPlanOption] = useState('free');

    const [eventType, setEventType] = useState('physical');
    const [pricingType, setPricingType] = useState('paid');

    const [dataLoaded, setDataLoaded] = useState(false);

    const [statesData, setStatesData] = useState([]);
    const [lgData, setLgData] = useState([]);

    const [eventStateValue, setEventStateValue] = useState('');
    const [eventLgValue, setEventLgValue] = useState('');



    const [monday, setMonday] = useState({
        open: false,
        timeRange: ''
    });
    const [tuesday, setTuesday] = useState({
        open: false,
        timeRange: ''
    });
    const [wednesday, setWednesday] = useState({
        open: false,
        timeRange: ''
    });
    const [thursday, setThursday] = useState({
        open: false,
        timeRange: ''
    });
    const [friday, setFriday] = useState({
        open: false,
        timeRange: ''
    });
    const [saturday, setSaturday] = useState({
        open: false,
        timeRange: ''
    });
    const [sunday, setSunday] = useState({
        open: false,
        timeRange: ''
    });



    useEffect(() => {
        let eventId = window.location.pathname.split('/')[4];
        axios(`/allbusinesses/${eventId}`)
            .then(async eventData => {
                console.log(eventData.data.message)
                if (eventData.data.summary === "success") {
                    if (eventData.data.message) {
                        setValue('businessName', eventData.data.message.businessName);
                        setValue('businessCategory', eventData.data.message.businessCategory);
                        setValue('businessOwner', eventData.data.message.businessOwner);
                        setValue('businessState', eventData.data.message.state);
                        setValue('businessLGA', eventData.data.message.localGovernment);
                        setValue('businessAddress', eventData.data.message.address);
                        setValue('staffCount', eventData.data.message.staffCount);
                        setValue('phoneNumber', eventData.data.message.phoneNumber);
                        // setValue('openingTime', eventData.data.message.openingTime);
                        // setValue('closingTime', eventData.data.message.closingTime);
                        setValue('companyEmail', eventData.data.message.emailAddress);
                        setValue('companyWebsite', eventData.data.message.website);
                        setValue('monday', eventData.data.message.monday);
                        setValue('tuesday', eventData.data.message.tuesday);
                        setValue('wednesday', eventData.data.message.wednesday);
                        setValue('thursday', eventData.data.message.thursday);
                        setValue('friday', eventData.data.message.friday);
                        setValue('saturday', eventData.data.message.saturday);
                        setValue('sunday', eventData.data.message.sunday);
                        setValue('communityFacebook', eventData.data.message.businessFacebook);
                        setValue('communityInstagram', eventData.data.message.businessInstagram);
                        setValue('communityTwitter', eventData.data.message.businessTwitter);

                        // setValue('eventStarts', moment(eventData.data.message.eventStarts.split('T')[0]));
                        // setValue('eventEnds', moment(eventData.data.message.eventEnds.split('T')[0]));


                        // setEventStateValue(eventData.data.message.StateId);
                        // axios(`/admin/state/${eventData.data.message.StateId}`)
                        //     .then(eventsData => {
                        //         if (eventsData.data.summary === "success") {
                        //             setLgData(eventsData.data.message.LocalGovernments)
                        //         }
                        //     })
                        //     .catch(err => {
                        //     })
                        // setEventLgValue(eventData.data.message.localGovernment);
                        // setEventTitle(eventData.data.message.eventTitle);
                        // setEventOrganizer(eventData.data.message.eventOrganizer);
                        // setEventCategory(eventData.data.message.EventCategoriesDatum.id);
                        // setEventStarts(eventData.data.message.eventStarts);
                        // // setEventState(eventData.data.message.state);
                        // // setEventLGA(eventData.data.message.localGovernment);
                        // setEventEnds(eventData.data.message.eventEnds);
                        // setEventAddress(eventData.data.message.address);
                        // setEventURL(eventData.data.message.eventURL);
                        // setEndTime(eventData.data.message.endTime);
                        // setStartTime(eventData.data.message.startTime);
                        // setEventType(eventData.data.message.type);

                        // // getBase64(eventData.data.message.mainImage, imageUrl =>
                        // setMainImageUrl(eventData.data.message.mainImage)
                        // setImageUrl(eventData.data.message.displayImage)

                        // // var readerData  = new FileReader();

                        // // readerData.onloadend = function () {
                        // //   console.log(readerData.result);
                        // // }
                        // // readerData.readAsArrayBuffer(eventData.data.message.mainImage);
                        // // );

                        // // getBase64(eventData.data.message.displayImage, imageUrl =>
                        // //     setImageUrl(imageUrl),
                        // // );

                        // // setStartTime(eventData.data.message.startTime);
                        // // setStartTime("12:00");

                        // setValue('startTime', moment(eventData.data.message.startTime, 'HH:mm'));
                        // setValue('endTime', moment(eventData.data.message.endTime, 'HH:mm'));

                        setCKEditorContent(eventData.data.message.businessDescription);
                        console.log(eventData.data.message.monday)
                        // setMonday({
                        //     // open: eventData.data.message.monday ? true : false,
                        //     open: true,
                        //     timeRange: eventData.data.message.monday
                        // });

                        // setTraveller(eventData.data.message.traveller);
                        // setPhysicalFitness(eventData.data.message.physicalFitness);
                        // setBackProblems(eventData.data.message.backProblems);
                        // setInfantSeat(eventData.data.message.infantSeat);
                        // setRecommended(eventData.data.message.recommended);
                        // setPickup(eventData.data.message.pickup);
                        // setWheelChair(eventData.data.message.wheelchair);
                        // setTransport(eventData.data.message.transport);
                        // setInfant(eventData.data.message.infant);
                        // setPregnant(eventData.data.message.pregnant);
                        // setPricingPlans(eventData.data.message.EventPricingPlans);
                        // setFaqTabs(eventData.data.message.EventsFAQs);
                        // setPricingPlanOption(eventData.data.message.eventPricing);


                        // setEventsData(eventData.data.message);
                        // setSpinnerStatus(false);
                        setDataLoaded(true);
                    } else {
                        setErrorMessage(eventData.data.statusMessage);
                        setSpinnerStatus(false);
                    }
                } else {
                    setErrorMessage(eventData.data.statusMessage)
                    setSpinnerStatus(false);
                }
            })
            .catch(err => {
                console.log(err)
                setErrorMessage('An error occurred while fetching event categories. Please reload page to try again');
                setSpinnerStatus(false);
            })
        axios(`/get_all_visible_event_categories`)
            .then(eventsCategory => {
                if (eventsCategory.data.summary === "success") {
                    setCategoryData(eventsCategory.data.message);
                } else {
                    setErrorMessage(eventsCategory.data.statusMessage)
                }
            })
            .catch(err => {
                setErrorMessage('An error occurred while fetching event categories. Please reload page to try again');
            })
        axios('/admin/allstates')
            .then(eventsCategory => {
                if (eventsCategory.data.summary === "success") {
                    // axios(`/admin/state/${eventsCategory.data.message.id}`)
                    //     .then(eventsData => {
                    //         if (eventsData.data.summary === "success") {
                    //             setLgData(eventsData.data.message.LocalGovernments)
                    //         }
                    //     })
                    //     .catch(err => {
                    //     })
                    setStatesData(eventsCategory.data.message);
                    setSpinnerStatus(false);
                }
            })
            .catch(err => {
                // setErrorMessage('An error occurred while fetching event categories. Please reload page to try again');
                // setSpinnerStatus(false);
            })
    }, [])

    const updateBusinessDayTimeRange = (e, controlOption, day) => {
        let objectClone = day;
        console.log(e)
        let firstTime = e[0] ? String(e[0]._d) : '';
        let secondTime = e[1] ? String(e[1]._d) : '';
        let currentYear = new Date().getFullYear();

        let newObject = {
            open: objectClone.open,
            timeRange: firstTime.split(currentYear)[1].split('GMT')[0] + '-' + secondTime.split(currentYear)[1].split('GMT')[0],
        }
        controlOption(newObject);
    }


    // image upload

    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    const watchFileChange = info => {
        // if (info.file.status === 'uploading') {
        //     setLoading(true)
        //     // this.setState({ loading: true });
        //     return;
        // }
        // if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl =>
            setImageUrl(imageUrl),
            setLoading(false),
            setDisplayImageUpdated(true)
            // this.setState({
            //     imageUrl,
            //     loading: false,
            // }),
        );
        // }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    function getMainBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    function beforeMainUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    const watchMainFileChange = info => {
        // if (info.file.status === 'uploading') {
        //     setLoading(true)
        //     // this.setState({ loading: true });
        //     return;
        // }
        // if (info.file.status === 'done') {
        // Get this url from response in real world.
        getMainBase64(info.file.originFileObj, imageUrl =>
            setMainImageUrl(imageUrl),
            setMainLoading(false),
            setMainImageUpdated(true)
            // this.setState({
            //     imageUrl,
            //     loading: false,
            // }),
        );
        // }
    };

    const uploadMainButton = (
        <div>
            {loadingMain ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    // description upload
    const handleChange = e => {
        setBodyText(e);
    }
    function uploadAdapter(loader) {
        return {
            upload: () => {
                return new Promise((resolve, reject) => {

                    const newFile = new FileReader();
                    loader.file.then(file => {
                        newFile.readAsDataURL(file);
                        newFile.addEventListener('load', () => {
                            axios.post('/saveblogcontentimage', {
                                img: newFile.result
                            })
                                .then(data => {
                                    console.log(data);
                                    resolve({
                                        default: data.data.message
                                    })
                                })
                                .catch(err => {
                                    setErrorMessage('An error occurred while uploading image.');
                                    reject(err);
                                })
                        })
                    })

                    // const body = new FormData();
                    // loader.file.then((file) => {
                    //     body.append("files", file);
                    //     // let headers = new Headers();
                    //     // headers.append("Origin", "http://localhost:3000");
                    //     fetch(`${API_URL}/${UPLOAD_ENDPOINT}`, {
                    //         method: "post",
                    //         body: body
                    //         // mode: "no-cors"
                    //     })
                    //         .then((res) => res.json())
                    //         .then((res) => {
                    //             resolve({
                    //                 default: `${API_URL}/${res.filename}`
                    //             });
                    //         })
                    //         .catch((err) => {
                    //             reject(err);
                    //         });
                    // });
                });
            }
        };
    }
    function uploadPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return uploadAdapter(loader);
        };
    }

    // accessibility details
    // function onChange(checkedValues) {
    //     console.log('checked = ', checkedValues);
    // }

    function onChangeEventType(checkedValues) {
        setEventType(checkedValues.target.value);
    }

    function onChangePricingPlan(checkedValues) {
        setPricingType(checkedValues.target.value);
    }

    const saveBasicInfo = e => {

        setEventTitle(e.eventTitle);
        setEventOrganizer(e.eventOrganizer);
        setEventCategory(e.eventCategory);
        setEventStarts(e.eventStarts);
        setEventState(e.eventState);
        setEventLGA(e.eventLGA);
        setEventEnds(e.eventEnds);
        setEventAddress(e.eventAddress);
        setEventURL(e.eventURL);
        setEndTime(e.endTime);
        setStartTime(e.startTime);

        setCurrentDisplay('extra');
    }

    const updateAccessibilityInfo = e => {
        setCurrentDisplay('pricing')
    }

    const savePricingInfo = e => {
        setCurrentDisplay('pricing')
    }

    const updateAccessibilityOptions = (e, controlOption) => {
        controlOption(e.target.checked);
    }

    const saveNewEvent = e => {
        setSpinnerStatus(true);
        axios.post('/uploadevent', {
            imageUrl, mainImageUrl, eventTitle, eventOrganizer, eventCategory, eventType, eventState, eventLGA,
            eventAddress, eventURL, eventStarts, startTime, eventEnds, endTime, bodyText,
            wheelchair, infant, transport, traveller, backProblems, pregnant, recommended, physicalFitness,
            infantSeat, pickup, pricingType, e
        })
            .then(newEventData => {
                if (newEventData.data.summary === "success") {
                    navigate('/');
                } else {
                    // setErrorMessage(newEventData.data.statusMessage)
                    openNotificationWithIcon('error', newEventData.data.statusMessage);
                    setSpinnerStatus(false);
                }
            })
            .catch(err => {
                openNotificationWithIcon('error', 'An error occurred while saving data. Please try again');
                setSpinnerStatus(false);
            })
    }

    // editEventBasicInfo
    const updateBasicInfo = e => {
        let currYear = new Date().getFullYear();
        let { eventTitle, eventOrganizer, eventCategory, eventState, eventLGA, eventAddress,
            eventURL, eventStarts, startTime, eventEnds, endTime } = e;

        startTime = String(e.startTime._d).split(currYear)[1].split('GMT')[0].split(' ')[1];
        endTime = String(e.endTime._d).split(currYear)[1].split('GMT')[0].split(' ')[1];

        setSpinnerStatus(true);
        axios.post('/admin/editEventBasicInfo', {
            mainImageUpdated, displayImageUpdated, imageUrl, mainImageUrl, eventTitle, eventOrganizer,
            eventCategory, eventType, eventState: eventStateValue, eventLGA: eventLgValue, eventAddress, eventURL, eventStarts, startTime,
            eventEnds, endTime, eventsId: eventsData.id
        })
            .then(newEventData => {
                if (newEventData.data.summary === "success") {
                    navigate('/');
                } else {
                    openNotificationWithIcon('error', newEventData.data.statusMessage);
                    setSpinnerStatus(false);
                }
            })
            .catch(err => {
                openNotificationWithIcon('error', 'An error occurred while saving data. Please try again');
                setSpinnerStatus(false);
            })
    }

    // editEventAccessibilityInfo
    const updateEventAccessibilityInfo = e => {

        setSpinnerStatus(true);
        axios.post('/admin/editEventAccessibilityInfo', {
            bodyText, wheelchair, infant, transport, traveller, backProblems, pregnant, recommended,
            physicalFitness, infantSeat, pickup, eventsId: eventsData.id
        })
            .then(newEventData => {
                if (newEventData.data.summary === "success") {
                    navigate('/');
                } else {
                    openNotificationWithIcon('error', newEventData.data.statusMessage);
                    setSpinnerStatus(false);
                }
            })
            .catch(err => {
                openNotificationWithIcon('error', 'An error occurred while saving data. Please try again');
                setSpinnerStatus(false);
            })
    }

    const updateBusinessDayCheckBox = (e, controlOption, day) => {
        let objectClone = day;
        let newObject = {
            open: e.target.checked,
            timeRange: objectClone.timeRange,
        }
        controlOption(newObject);
        console.log(newObject)
    }

    const deleteEvent = e => {
        setSpinnerStatus(true);
        axios.post('/deleteEvent', {
            eventId: e
        })
            .then(newEventData => {
                if (newEventData.data.summary === "success") {
                    navigate('/');
                } else {
                    // setErrorMessage(newEventData.data.statusMessage)
                    openNotificationWithIcon('error', newEventData.data.statusMessage);
                    setSpinnerStatus(false);
                }
            })
            .catch(err => {
                openNotificationWithIcon('error', 'An error occurred while saving data. Please try again');
                setSpinnerStatus(false);
            })
    }
    const editEventVisibility = e => {
        setSpinnerStatus(true);
        let url = e.action ? '/admin/hideEvent' : '/admin/showEvent';
        axios.post(url, {
            eventId: e.eventId
        })
            .then(newEventData => {
                if (newEventData.data.summary === "success") {
                    navigate('/events/all');
                } else {
                    // setErrorMessage(newEventData.data.statusMessage)
                    openNotificationWithIcon('error', newEventData.data.statusMessage);
                    setSpinnerStatus(false);
                }
            })
            .catch(err => {
                openNotificationWithIcon('error', 'An error occurred while editing data. Please try again');
                setSpinnerStatus(false);
            })
    }

    function handleStateChange(value) {
        setEventStateValue(value);
        axios(`/admin/state/${value}`)
            .then(eventsData => {
                if (eventsData.data.summary === "success") {
                    setLgData(eventsData.data.message.LocalGovernments)
                }
            })
            .catch(err => {
            })
    }
    function handleLGChange(value) {
        setEventLgValue(value);
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
                                    {dataLoaded ?
                                        <div>
                                            <div className="main_compartment_content" style={{ marginBottom: '5%' }}>
                                                <div className="form_display">
                                                    {/* {
                                                currentDisplay === 'basic' ? */}
                                                    <form onSubmit={handleSubmit(saveBasicInfo)}>
                                                        <div>
                                                            <div className="form_heading_text">
                                                                <h3 className="big_site_text">Event Basic Info</h3>
                                                                <p>Help people in the area discover your event and let attendees know
                                                                    where to show up. Name your event and tell event-goers why they
                                                                    should come. Add details that highlight what makes it unique.</p>
                                                            </div>
                                                            <div className="form_flex_2">
                                                                <div className="form-group">
                                                                    <label htmlFor="coverImage" style={{ width: '100%' }}>Cover Image</label>
                                                                    <Controller control={control} defaultValue="" name="coverImage"
                                                                        render={({ field }) => (
                                                                            <Upload
                                                                                name="avatar"
                                                                                listType="picture-card"
                                                                                className="avatar-uploader"
                                                                                showUploadList={false}
                                                                                beforeUpload={beforeUpload}
                                                                                onChange={e => watchFileChange(e)}
                                                                            >
                                                                                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                                                            </Upload>
                                                                        )
                                                                        } />
                                                                    {/* {errors.coverImage && <p className="form-error">{errors.coverImage.message}</p>} */}
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="mainImage" style={{ width: '100%' }}>Main Image</label>
                                                                    <Controller control={control} defaultValue="" name="mainImage"
                                                                        render={({ field }) => (
                                                                            <Upload
                                                                                name="avatar"
                                                                                listType="picture-card"
                                                                                className="avatar-uploader"
                                                                                showUploadList={false}
                                                                                beforeUpload={beforeMainUpload}
                                                                                onChange={e => watchMainFileChange(e)}
                                                                            >
                                                                                {mainImageUrl ? <img src={mainImageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadMainButton}
                                                                            </Upload>
                                                                        )
                                                                        } />
                                                                    {/* {errors.mainImage && <p className="form-error">{errors.mainImage.message}</p>} */}
                                                                </div>
                                                            </div>
                                                            <div className="">
                                                                <div className="form-group">
                                                                    <label htmlFor="businessName">Business Name</label>
                                                                    <Controller control={control} defaultValue="" name="businessName"
                                                                        render={({ field }) => (
                                                                            <Input {...field} id="businessName"
                                                                                type="text" style={{ height: '3rem' }} />
                                                                        )
                                                                        } />
                                                                </div>
                                                            </div>
                                                            <div className="form_flex_2">
                                                                <div className="form-group">
                                                                    <label htmlFor="businessOwner">Business Owner</label>
                                                                    <Controller control={control} defaultValue="" name="businessOwner"
                                                                        render={({ field }) => (
                                                                            <Input {...field} id="businessOwner"
                                                                                type="text" style={{ height: '3rem' }} />
                                                                        )
                                                                        } />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="businessCategory">Business Category</label>
                                                                    <Controller control={control} defaultValue="" name="businessCategory"
                                                                        render={({ field }) => (
                                                                            <Select
                                                                                style={{ width: '100%', height: '3rem' }}
                                                                                placeholder="" id="businessCategory"
                                                                                optionFilterProp="children" {...field}
                                                                            >
                                                                                {categoryData.map((category, index) => (
                                                                                    <Option key={index}
                                                                                        value={`${category.id}`}>{category.categoryName}</Option>
                                                                                ))}
                                                                            </Select>
                                                                        )
                                                                        } />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="form_heading_text">
                                                                <h3>Location</h3>
                                                                <p>Help people in the area discover your event and let attendees know
                                                                    where to show up. Name your event and tell event-goers why they
                                                                    should come. Add details that highlight what makes it unique.</p>
                                                            </div>

                                                            <div style={{ marginBottom: '5%' }}>
                                                            </div>
                                                            <div>
                                                                <div className="form_flex_2">
                                                                    <div className="form-group">
                                                                        <label htmlFor="businessState">State</label>
                                                                        <Controller control={control} defaultValue="" name="businessState"
                                                                            render={({ field }) => (
                                                                                <Input {...field} id="businessState"
                                                                                    type="text" style={{ height: '3rem' }} />
                                                                            )
                                                                            } />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label htmlFor="businessLGA">Local Government</label>
                                                                        <Controller control={control} defaultValue="" name="businessLGA"
                                                                            render={({ field }) => (
                                                                                <Input {...field} id="businessLGA"
                                                                                    type="text" style={{ height: '3rem' }} />
                                                                            )
                                                                            } />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="businessAddress">Business address</label>
                                                                    <Controller control={control} defaultValue="" name="businessAddress"
                                                                        render={({ field }) => (
                                                                            <Input.TextArea {...field} id="businessAddress" />
                                                                            // <Input {...field} id="businessAddress"
                                                                            //     type="text" style={{ height: '3rem' }} />
                                                                        )
                                                                        } />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="form_heading_text">
                                                                <h3>Date and Time</h3>
                                                                <p>Help people in the area discover your event and let attendees know
                                                                    where to show up. Name your event and tell event-goers why they
                                                                    should come. Add details that highlight what makes it unique.</p>
                                                            </div>
                                                            <div className="form_flex_2">
                                                                <div className="form-group">
                                                                    <label style={{ width: '100%' }} htmlFor="staffCount">Staff Count</label>
                                                                    <Controller control={control} defaultValue="" name="staffCount"
                                                                        render={({ field }) => (
                                                                            <Select
                                                                                style={{ width: '100%', height: '3rem' }}
                                                                                placeholder="" id="staffCount"
                                                                                optionFilterProp="children" {...field}
                                                                            >
                                                                                <Option key="1" value="1-10"> 1 - 10 </Option>
                                                                                <Option key="11" value="11-50"> 11 - 50 </Option>
                                                                                <Option key="51" value="51-100"> 51 - 100 </Option>
                                                                                <Option key="101" value="101-1000"> 101 - 1000 </Option>
                                                                                <Option key="1000" value="1000-~"> 1000 - ~ </Option>
                                                                            </Select>
                                                                        )
                                                                        } />
                                                                </div>

                                                                <div className="form-group">
                                                                    <label style={{ width: '100%' }} htmlFor="phoneNumber">Phone number</label>
                                                                    <Controller control={control} defaultValue="" name="phoneNumber"
                                                                        render={({ field }) => (
                                                                            <Input {...field} id="phoneNumber"
                                                                                type="text" style={{ height: '3rem' }} />
                                                                        )
                                                                        } />
                                                                </div>
                                                            </div>
                                                            <div className="form_flex_2">
                                                                <div className="form-group">
                                                                    <label style={{ width: '100%' }} htmlFor="openingTime">Opening Time</label>
                                                                    <Controller control={control} defaultValue="" name="openingTime"
                                                                        render={({ field }) => (
                                                                            <TimePicker
                                                                                {...field} id="openingTime"
                                                                                style={{ height: '3rem', width: '100%', display: 'block' }} />
                                                                        )
                                                                        } />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label style={{ width: '100%' }} htmlFor="closingTime">Closing Time</label>
                                                                    <Controller control={control} defaultValue="" name="closingTime"
                                                                        render={({ field }) => (
                                                                            <TimePicker
                                                                                {...field} id="closingTime"
                                                                                style={{ height: '3rem', width: '100%', display: 'block' }} />
                                                                        )
                                                                        } />
                                                                </div>
                                                            </div>
                                                            <div className="form_flex_2">
                                                                <div className="form-group">
                                                                    <label htmlFor="companyEmail">Company Email</label>
                                                                    <Controller control={control} defaultValue="" name="companyEmail"
                                                                        render={({ field }) => (
                                                                            <Input {...field} id="companyEmail"
                                                                                type="text" style={{ height: '3rem' }} />
                                                                        )
                                                                        } />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="companyWebsite">Company Website</label>
                                                                    <Controller control={control} defaultValue="" name="companyWebsite"
                                                                        render={({ field }) => (
                                                                            <Input {...field} id="companyWebsite"
                                                                                type="text" style={{ height: '3rem' }} />
                                                                        )
                                                                        } />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div style={{ marginTop: '5%' }}></div>
                                                            <button className="bg_red">Save and Continue</button>
                                                        </div>
                                                    </form>
                                                    {/* : ''
                                            } */}
                                                </div>
                                            </div>
                                            <div className="main_compartment_content" style={{ marginBottom: '5%' }}>
                                                <div className="form_display">
                                                    {/* {
                                                currentDisplay === 'extra' ? */}
                                                    <form onSubmit={submitExtraInfo(() => console.log('hello'))}>
                                                        <div className="form_heading_text">
                                                            <h3 className="big_site_text">Event Extra Info</h3>
                                                            <p>Help people in the area discover your event and let attendees know
                                                                where to show up. Name your event and tell event-goers why they
                                                                should come. Add details that highlight what makes it unique.</p>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="description" style={{ width: '100%' }}>Event description</label>
                                                            <CKEditor
                                                                config={{
                                                                    extraPlugins: [uploadPlugin]
                                                                }}
                                                                onReady={(editor) => {
                                                                    editor.setData(CKEditorContent);
                                                                }}
                                                                editor={ClassicEditor}
                                                                onBlur={(event, editor) => { }}
                                                                onFocus={(event, editor) => { }}
                                                                onChange={(event, editor) => {
                                                                    handleChange(editor.getData());
                                                                }}
                                                            />
                                                        </div>
                                                        <Divider />
                                                        <div>
                                                            <div className="form_heading_text">
                                                                <h3>Event accessibility details</h3>
                                                                <p>Help people in the area discover your event and let attendees know
                                                                    where to show up. Name your event and tell event-goers why they
                                                                    should come. Add details that highlight what makes it unique.</p>
                                                            </div>
                                                            <div className="form-group">
                                                            <Row>
                                                                    <Col span={12}>
                                                                        <Checkbox
                                                                            defaultChecked={false}
                                                                            onChange={e => console.log('hello')}
                                                                        >Wheelchair accessible</Checkbox>
                                                                    </Col>
                                                                    </Row>
                                                                <Checkbox.Group style={{ width: '100%' }}
                                                                // onChange={onChange}
                                                                >
                                                                    <div className="form_flex_2">
                                                                        <div>
                                                                            <Checkbox.Group
                                                                                style={{ width: "100%" }}
                                                                                onChange={() => console.log('he')}
                                                                                defaultValue="mondayya"
                                                                            >
                                                                                <Row>
                                                                                    <Col span={12}>
                                                                                        <Checkbox
                                                                                            // monday.open
                                                                                            value="monday"
                                                                                            defaultChecked={false}
                                                                                            onChange={e => updateBusinessDayCheckBox(e, setMonday, monday)}
                                                                                        >Monday</Checkbox>
                                                                                    </Col>
                                                                                </Row>
                                                                            </Checkbox.Group>
                                                                            <div>
                                                                                <div className="form-group">
                                                                                    <Controller control={control} defaultValue="" name=""
                                                                                        render={({ field }) => (
                                                                                            <RangePicker
                                                                                                defaultValue={moment(monday.timeRange)}
                                                                                                onChange={e => updateBusinessDayTimeRange(e, setMonday, monday)}
                                                                                                showTime={{ format: 'HH:mm' }}
                                                                                                style={{ height: '3rem', width: '100%' }}
                                                                                            // onOk={e => updateBusinessDayTimeRange(e, setMonday, monday)}
                                                                                            />
                                                                                        )
                                                                                        } />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <Checkbox
                                                                                onChange={e => updateBusinessDayCheckBox(e, setTuesday, tuesday)}
                                                                                value="tuesday">Tuesday</Checkbox>
                                                                            <div>
                                                                                <div className="form-group">
                                                                                    <Controller control={control} defaultValue="" name=""
                                                                                        render={({ field }) => (
                                                                                            <RangePicker
                                                                                                onChange={e => updateBusinessDayTimeRange(e, setTuesday, tuesday)}
                                                                                                showTime={{ format: 'HH:mm' }}
                                                                                                style={{ height: '3rem', width: '100%' }}
                                                                                            // onOk={e => updateBusinessDayTimeRange(e, setTuesday, tuesday)}
                                                                                            />
                                                                                        )
                                                                                        } />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form_flex_2">
                                                                        <div>
                                                                            <Checkbox
                                                                                onChange={e => updateBusinessDayCheckBox(e, setWednesday, wednesday)}
                                                                                value="wednesday">Wednesday</Checkbox>
                                                                            <div>
                                                                                <div className="form-group">
                                                                                    <Controller control={control} defaultValue="" name=""
                                                                                        render={({ field }) => (
                                                                                            <RangePicker
                                                                                                onChange={e => updateBusinessDayTimeRange(e, setWednesday, wednesday)}
                                                                                                showTime={{ format: 'HH:mm' }}
                                                                                                style={{ height: '3rem', width: '100%' }}
                                                                                            // onOk={e => updateBusinessDayTimeRange(e, setWednesday, wednesday)}
                                                                                            />
                                                                                        )
                                                                                        } />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <Checkbox
                                                                                onChange={e => updateBusinessDayCheckBox(e, setThursday, thursday)}
                                                                                value="thursday">Thursday</Checkbox>
                                                                            <div>
                                                                                <div className="form-group">
                                                                                    <Controller control={control} defaultValue="" name=""
                                                                                        render={({ field }) => (
                                                                                            <RangePicker
                                                                                                onChange={e => updateBusinessDayTimeRange(e, setThursday, thursday)}
                                                                                                showTime={{ format: 'HH:mm' }}
                                                                                                style={{ height: '3rem', width: '100%' }}
                                                                                            // onOk={e => updateBusinessDayTimeRange(e, setThursday, thursday)}
                                                                                            />
                                                                                        )
                                                                                        } />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form_flex_2">
                                                                        <div>
                                                                            <Checkbox
                                                                                onChange={e => updateBusinessDayCheckBox(e, setFriday, friday)}
                                                                                value="friday">Friday</Checkbox>
                                                                            <div>
                                                                                <div className="form-group">
                                                                                    <Controller control={control} defaultValue="" name=""
                                                                                        render={({ field }) => (
                                                                                            <RangePicker
                                                                                                onChange={e => updateBusinessDayTimeRange(e, setFriday, friday)}
                                                                                                showTime={{ format: 'HH:mm' }}
                                                                                                style={{ height: '3rem', width: '100%' }}
                                                                                            // onOk={e => updateBusinessDayTimeRange(e, setFriday, friday)}
                                                                                            />
                                                                                        )
                                                                                        } />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <Checkbox
                                                                                onChange={e => updateBusinessDayCheckBox(e, setSaturday, saturday)}
                                                                                value="saturday">Saturday</Checkbox>
                                                                            <div>
                                                                                <div className="form-group">
                                                                                    <Controller control={control} defaultValue="" name=""
                                                                                        render={({ field }) => (
                                                                                            <RangePicker
                                                                                                onChange={e => updateBusinessDayTimeRange(e, setSaturday, saturday)}
                                                                                                showTime={{ format: 'HH:mm' }}
                                                                                                style={{ height: '3rem', width: '100%' }}
                                                                                            // onOk={e => updateBusinessDayTimeRange(e, setSaturday, saturday)}
                                                                                            />
                                                                                        )
                                                                                        } />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form_flex_2">
                                                                        <div>
                                                                            <Checkbox
                                                                                onChange={e => updateBusinessDayCheckBox(e, setSunday, sunday)}
                                                                                value="sunday">Sunday</Checkbox>
                                                                            <div>
                                                                                <div className="form-group">
                                                                                    <Controller control={control} defaultValue="" name=""
                                                                                        render={({ field }) => (
                                                                                            <RangePicker
                                                                                                onChange={e => updateBusinessDayTimeRange(e, setSunday, sunday)}
                                                                                                showTime={{ format: 'HH:mm' }}
                                                                                                style={{ height: '3rem', width: '100%' }}
                                                                                            // onOk={e => updateBusinessDayTimeRange(e, setSunday, sunday)}
                                                                                            />
                                                                                        )
                                                                                        } />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Checkbox.Group>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div style={{ marginTop: '5%' }}></div>
                                                            <div className="flex_buttons_2">
                                                                <button
                                                                    onClick={() => setCurrentDisplay('basic')}
                                                                    className="bg_border_red">Go Back</button>
                                                                <button className="bg_red">Save and Continue</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                    {/* : ''
                                            } */}
                                                </div>
                                            </div>
                                        </div>
                                        : <div></div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Spin>
        </div>
    )
}

export default NewEvent;