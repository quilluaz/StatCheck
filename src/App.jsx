import React from 'react';
import NotificationForm from './components/NotificationForm';
import AnalyticsForm from './components/AnalyticsForm';
import './index.css';

const App = () => {
    return (
        <div className="app-container">
            <h1>Notification & Analytics System</h1>
            <div className="form-columns">
                <div className="column">
                    <NotificationForm />
                </div>
                <div className="column">
                    <AnalyticsForm />
                </div>
            </div>
        </div>
    );
};

export default App;
