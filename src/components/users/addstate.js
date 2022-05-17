import '../../assets/css/events.css';

import React, { useState } from 'react';
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

    const navigate = useNavigate();

    const resolveForm = yup.object().shape({
        categoryName: yup.string().required('Please enter category name')
    })

    const { handleSubmit, control, formState: { errors } } = useForm({
        // resolver: yupResolver(resolveForm)
    });

    const saveState = e => {
        setErrorMessage('');
        setSpinnerStatus(true);
        axios.post('/admin/newstate', {
            stateName: e.state
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