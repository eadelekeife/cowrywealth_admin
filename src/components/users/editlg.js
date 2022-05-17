import '../../assets/css/events.css';

import React, { useState, useEffect } from 'react';
import SideNav from '../../common_files/sideNav';
import TopNav from '../../common_files/topNav';

import { Input, Spin, Select } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from '../../common_files/axiosurl';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// import Options from '../../common_files/questions';

const NewAmbassador = () => {

    const [errorMessage, setErrorMessage] = useState('');
    const [spinnerStatus, setSpinnerStatus] = useState(false);
    const [statesData, setStatesData] = useState([]);
    const [lgData, setLGData] = useState({});
    const [lgState, setlgState] = useState(0);
    const [loadingData, setLoadingData] = useState(true);

    const { Option } = Select;

    const navigate = useNavigate();

    useEffect(() => {
        let stateId = window.location.pathname.split('/')[3];
        axios('/admin/allstates')
            .then(eventsData => {
                if (eventsData.data.summary === "success") {
                    setStatesData(eventsData.data.message);
                } else {
                    setErrorMessage(eventsData.data.statusMessage)
                }
            })
            .catch(err => {
                setErrorMessage('An error occurred while fetching category data. Please reload page to try again');
            })

        axios(`/admin/lg/${stateId}`)
            .then(eventsData => {
                if (eventsData.data.summary === "success") {
                    setValue('lgName', eventsData.data.message.name);
                    setlgState(eventsData.data.message.StateId);
                    setLGData(eventsData.data.message);
                    setSpinnerStatus(false);
                    setLoadingData(false);
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

    const resolveForm = yup.object().shape({
        categoryName: yup.string().required('Please enter category name')
    })

    const { handleSubmit, control, formState: { errors }, setValue } = useForm({
        // resolver: yupResolver(resolveForm)
    });

    const saveState = e => {
        setErrorMessage('');
        setSpinnerStatus(true);
        axios.post('/admin/updatelg', {
            StateId: lgState,
            lgName: e.lgName,
            lgaID: lgData.id
        }).then(categorySaved => {
            if (categorySaved.data.summary === "success") {
                navigate('/');
            } else {
                setErrorMessage(categorySaved.data.statusMessage)
                setSpinnerStatus(false);
            }
        })
            .catch(err => {
                setErrorMessage('An error occurred while saving category data. Please try again')
                setSpinnerStatus(false);
            })
    }

    function handleChange(value) {
        setlgState(value);
    }

    return (
        <div>
            <Spin spinning={spinnerStatus}>
                <div className="portal_page">
                    <div>
                        <SideNav />
                    </div>
                    <div className="main_content">
                        <TopNav currentPage={"Save State"}
                            buttonTitle={"See all states"}
                            buttonLink={"/allstates"}
                            currentPageInfo={"Save State"} />
                        <div>
                            <div className="main_compartment">
                                <div className="main_compartment_content_display">
                                    <div className="main_compartment_content">
                                        <div className="form_display">
                                            {
                                                !loadingData ?
                                                    <form onSubmit={handleSubmit(saveState)}>
                                                        <div>
                                                            <div className="form_heading_text">
                                                                <h3 className="big_site_text">Businesses Basic Info</h3>
                                                                <p>Help people in the area discover your event and let attendees know
                                                                    where to show up. Name your event and tell event-goers why they
                                                                    should come. Add details that highlight what makes it unique.</p>
                                                            </div>
                                                            <div>
                                                                {
                                                                    errorMessage ?
                                                                        <p className="errorMessage">{errorMessage}</p> : ''
                                                                }
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="state">State</label>
                                                                <Controller control={control} defaultValue="" name="state"
                                                                    render={({ field }) => (
                                                                        <Select
                                                                            onChange={handleChange}
                                                                            style={{ width: '100%', height: '3rem' }}
                                                                            placeholder="" id="eventCategory"
                                                                            defaultValue={+lgState}
                                                                            optionFilterProp="children"
                                                                        >
                                                                            {statesData.map((state, index) => (
                                                                                <Option key={index}
                                                                                    value={+state.id}>{state.name}</Option>
                                                                            ))}
                                                                        </Select>
                                                                    )
                                                                    } />
                                                                {errors.state && <p className="errorMessage">{errors.state.message}</p>}
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="lgName">Local government name</label>
                                                                <Controller control={control} defaultValue="" name="lgName"
                                                                    render={({ field }) => (
                                                                        <Input {...field} id="lgName"
                                                                            type="text" style={{ height: '3rem' }} />
                                                                    )
                                                                    } />
                                                                {errors.lgName && <p className="errorMessage">{errors.lgName.message}</p>}
                                                            </div>
                                                            <div>
                                                                <div style={{ marginTop: '5%' }}></div>
                                                                <button
                                                                    className="bg_red">Save State</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                    : ''}
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

export default NewAmbassador;