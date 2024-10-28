import { Routes, Route } from 'react-router-dom';
import Landing from '../pages/landing/index';
import Home from '../pages/home/index';
// import Notifications from '../pages/notifications/index';
// import LibraryReservations from '../pages/reservations/library/index';
// import ParkingReservations from '../pages/reservations/parking/index';
// import RTLBuilding from '../pages/buildings/rtl/index';
// import GLEBuilding from '../pages/buildings/gle/index';
// import NGEBuilding from '../pages/buildings/nge/index';
// import About from '../pages/about/index';
// import Settings from '../pages/settings/index';
// import Profile from '../pages/profile/index';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      
      <Route path="home" element={<Home />}>
        {/* <Route path="notifications" element={<Notifications />} /> */}
        
        {/* Reservations Routes */}
        {/* <Route path="reservations">
          <Route path="library" element={<LibraryReservations />} /> 
          <Route path="parking" element={<ParkingReservations />} />
        </Route> */}
        
        {/* Buildings Routes */}
        {/* <Route path="buildings">
          <Route path="rtl" element={<RTLBuilding />} />
          <Route path="gle" element={<GLEBuilding />} />
          <Route path="nge" element={<NGEBuilding />} />
        </Route> */}
        
        {/* <Route path="about" element={<About />} />
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<Profile />} /> */}
      </Route>
    </Routes>
  );
}

export default AppRoutes;