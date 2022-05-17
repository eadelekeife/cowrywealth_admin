import 'antd/dist/antd.css';
import './assets/css/index.css';

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// user management
import Dashboard from './components/users/dashboard';
import AllUsers from './components/users/allusers';

import AddAmbassador from './components/users/addambassador';
import AllAmbassadors from './components/users/allambassadors';
import AmbassadorData from './components/users/ambassador';

import AddAdministrator from './components/users/addadministrator';
// import AmbassadorData from './components/users/ambassador';
import AllAdministrators from './components/users/alladministrators';
import AddState from './components/users/addstate';
import AllStates from './components/users/allstates';
import CheckState from './components/users/state';
import AddLocalGovernment from './components/users/addlga';
import AllLocalGovernments from './components/users/alllga';
import EditLocalGovernment from './components/users/editlg';
import EditState from './components/users/editstate';

// events
import NewEvent from './components/events/newEvents';
import NewEventCategory from './components/events/addcategory.js';
import AllEventCategories from './components/events/allcategories.js';
import AllEvents from './components/events/allEvents';
import VisibleEvents from './components/events/visibleEvents';
import HiddenEvents from './components/events/hiddenEvents';
import EditEvents from './components/events/editEvents';
import EditEvent from './components/events/edit';
import SingleEvent from './components/events/singleEvent';

// communities
import AllCommunity from './components/communities/allCommunities';
import NewCommunity from './components/communities/newCommunities';
import NewCommunityCategories from './components/communities/addcategory';
import AllCommunityCategories from './components/communities/allcategory';
import VisibleCommunities from './components/communities/visibleCommunities';
import HiddenCommunities from './components/communities/hiddenCommunities';
import EditCommunities from './components/communities/editCommunities';

// businesses
import AllBusiness from './components/businesses/allBusinesses';
import NewBusiness from './components/businesses/newBusiness';
import NewBusinessesCategories from './components/businesses/addcategory';
import AllBusinessesCategories from './components/businesses/allcategory';
import VisibleBusinesses from './components/businesses/visibleBusiness';
import HiddenBusinesses from './components/businesses/hiddenbusiness';
import EditBusinesses from './components/businesses/editBusiness';


// auth
import SignIn from './components/authorization/signin';
import SetPassword from './components/authorization/setPassword';
import SignOut from './components/authorization/signout';


const App = () => {
    return (
        <BrowserRouter>
            <Routes>


                <Route path="/" exact element={<Dashboard />} />
                <Route path="/signin" exact element={<SignIn />} />
                <Route path="/signout" exact element={<SignOut />} />

                <Route path="/allusers" exact element={<AllUsers />} />

                <Route path="/addambassador" exact element={<AddAmbassador />} />
                <Route path="/allambassadors" exact element={<AllAmbassadors />} />
                <Route path="/ambassadors/:name/:id" exact element={<AmbassadorData />} />

                <Route path="/alladministrators" exact element={<AllAdministrators />} />
                <Route path="/administrators/:name/:id" exact element={<AmbassadorData />} />
                <Route path="/addadministrator" exact element={<AddAdministrator />} />
                <Route path="/addstate" exact element={<AddState />} />
                <Route path="/states/:stateName/:stateId" exact element={<CheckState />} />
                <Route path="/allstates" exact element={<AllStates />} />
                <Route path="/addlga" exact element={<AddLocalGovernment />} />
                <Route path="/alllga" exact element={<AllLocalGovernments />} />
                <Route path="/editlg/:lgName/:lgId" exact element={<EditLocalGovernment />} />
                <Route path="/editstate/:stateName/:stateId" exact element={<EditState />} />
                

                <Route path="/event/categories/new" element={<NewEventCategory />} />
                <Route path="/event/categories/all" element={<AllEventCategories />} />
                <Route path="/events/all" exact element={<AllEvents />} />
                <Route path="/events/new" exact element={<NewEvent />} />
                <Route path="/events/hidden" exact element={<HiddenEvents />} />
                <Route path="/events/visible" exact element={<VisibleEvents />} />
                <Route path="/events/edit" exact element={<EditEvents />} />
                <Route path="/events/edit/:eventTitle/:eventId" exact element={<EditEvent />} />
                <Route path="/event/:eventTitle/:eventId" exact element={<SingleEvent />} />

                <Route path="/communities/categories/new" element={<NewCommunityCategories />} />
                <Route path="/communities/categories/all" element={<AllCommunityCategories />} />
                <Route path="/communities/all" exact element={<AllCommunity />} />
                <Route path="/communities/new" exact element={<NewCommunity />} />
                <Route path="/communities/hidden" exact element={<HiddenCommunities />} />
                <Route path="/communities/visible" exact element={<VisibleCommunities />} />
                <Route path="/communities/edit" exact element={<EditCommunities />} />

                <Route path="/businesses/categories/new" element={<NewBusinessesCategories />} />
                <Route path="/businesses/categories/all" element={<AllBusinessesCategories />} />
                <Route path="/businesses/all" exact element={<AllBusiness />} />
                <Route path="/businesses/new" exact element={<NewBusiness />} />
                <Route path="/businesses/hidden" exact element={<HiddenBusinesses />} />
                <Route path="/businesses/visible" exact element={<VisibleBusinesses />} />
                <Route path="/businesses/edit" exact element={<EditBusinesses />} />

                <Route path="/login" exact element={<SignIn />} />
                <Route path="/set_password/:id" exact element={<SetPassword />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;

// ReactDOM.render(<App />, document.querySelector('#root'));