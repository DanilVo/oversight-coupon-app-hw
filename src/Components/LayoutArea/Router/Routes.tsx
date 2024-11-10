import { Navigate, Route, Routes } from 'react-router-dom';
import AllReports from '../../DashboardArea/AllReports/AllReports';
import Add from '../../DataArea/Add/Add';
import List from '../../DataArea/List/List';
import Home from '../../HomeArea/Home/Home';
import PageNotFound from '../PageNotFound/PageNotFound';
import { authStore } from '../../../Redux/AuthState';

function Routing(): JSX.Element {
  return (
    <div className="Routing">
      <Routes>
        {/* Home Route */}
        <Route path="/home" element={<Home />} />

        <Route path="/list" element={<List />} />

        <Route path="/add" element={<Add />} />

        <Route path="/home/login" element={<Home />} />

        <Route
          path="/dashboard"
          element={
            authStore.getState().user ? <AllReports /> : <PageNotFound />
          }
        />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Page not found Route*/}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default Routing;
