import '../../assets/css/events.css';

import React, { useState, useEffect } from 'react';
import SideNav from '../../common_files/sideNav';
import TopNav from '../../common_files/topNav';

import { Input, Spin, message, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from '../../common_files/axiosurl';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// import Options from '../../common_files/questions';

const NewAmbassador = () => {

    const [errorMessage, setErrorMessage] = useState('');
    const [spinnerStatus, setSpinnerStatus] = useState(false);

    const [stateData, setStateData] = useState({});
    const [stillLoading, setStillLoading] = useState(true);

    const navigate = useNavigate();

    const resolveForm = yup.object().shape({
        categoryName: yup.string().required('Please enter category name')
    })

    const { handleSubmit, control, formState: { errors }, setValue } = useForm({
        // resolver: yupResolver(resolveForm)
    });

    useEffect(() => {
        let stateId = window.location.pathname.split('/')[3];
        axios(`/admin/state/${stateId}`)
            .then(eventsData => {
                if (eventsData.data.summary === "success") {
                    setStateData(eventsData.data.message);
                    setStillLoading(false);
                    setSpinnerStatus(false);
                    setValue('state',eventsData.data.message.name)
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

    const updateState = e => {
        setErrorMessage('');
        setSpinnerStatus(true);
        axios.post('/admin/updatestate', {
            stateName: e.state,
            stateId: stateData.id
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
                                            <form onSubmit={handleSubmit(updateState)}>
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
                                                                <Input {...field} id="state"
                                                                    type="text" style={{ height: '3rem' }} />
                                                            )
                                                            } />
                                                        {errors.state && <p className="errorMessage">{errors.state.message}</p>}
                                                    </div>
                                                    <div>
                                                        <div style={{ marginTop: '5%' }}></div>
                                                        <button
                                                            className="bg_red">Save State</button>
                                                    </div>
                                                </div>
                                            </form>
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