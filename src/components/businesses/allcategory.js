import '../../assets/css/events.css';

import React, { useState, useEffect } from 'react';
import SideNav from '../../common_files/sideNav';
import TopNav from '../../common_files/topNav';

import { Spin } from 'antd';
import axios from '../../common_files/axiosurl';


// import Options from '../../common_files/questions';

const NewCategory = () => {

    const [categoryData, setCategoryData] = useState([]);

    const [errorMessage, setErrorMessage] = useState('');
    const [spinnerStatus, setSpinnerStatus] = useState(true);

    useEffect(() => {
        axios('/admin/get_all_business_categories')
            .then(categoryData => {
                if (categoryData.data.summary === "success") {
                    setCategoryData(categoryData.data.message);
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
    }, [])

    const EditCategory = e => {
        setSpinnerStatus(true);
        let url = e.action ? '/admin/hideBusinessCategories' : '/admin/showBusinessCategories';
        axios.post(url, {
            businessCategoryId: e.categoryId
        })
            .then(categoryData => {
                if (categoryData.data.summary === "success") {
                    setCategoryData(categoryData.data.message);
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
                        <TopNav currentPage={"All Events Category"}
                            buttonTitle={"Add category under Events"}
                            buttonLink={"/events"}
                            currentPageInfo={"All Categories under Events"} />
                        <div>
                            <div className="main_compartment">
                                <div className="main_compartment_content_display">
                                    <div className="main_compartment_content">
                                        <div className="contain">
                                            {
                                                !errorMessage ?
                                                    <div className="category_display grid_4">
                                                        {categoryData.map((category, index) => {
                                                            return (
                                                                <div key={index}>
                                                                    <img src={category.categoryImage} alt={category.categoryName} />
                                                                    <h5>{category.categoryName}</h5>
                                                                    <p>{category.BusinessRecords.length} businesses present</p>
                                                                    <button
                                                                        onClick={(() => EditCategory({
                                                                            categoryId: category.id,
                                                                            action: category.displayStatus
                                                                        }))}
                                                                        className="bg_border_red">
                                                                        {category.displayStatus ?
                                                                            'Hide Category'
                                                                            :
                                                                            'Show Category'
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

export default NewCategory;