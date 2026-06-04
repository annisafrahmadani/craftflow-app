import MainLayout from "../layouts/MainLayout";

import "../styles/settings.css";

function Settings(){
    return(
        <MainLayout>
            <div className="settings-page">
                <div className="settings-header">
                    <h1 className="settings-title">
                        Settings
                    </h1>

                    <p className="settings-subtitle">
                        Manage your account and preference
                    </p>
                </div>
                <div className="settings-card">

                    <h2>Profile Information</h2>

                    <div className="settings-form">
                        <input 
                            type="text" 
                            placeholder="Full Name"
                        />

                        <input 
                            type="text" 
                            placeholder="Username"
                        />

                        <input 
                            type="email" 
                            placeholder="Email"
                        />

                        <button>Save Changes</button>
                    </div>
                </div>
                <div className="settings-card">

                    <h2>Appearance</h2>

                    <div className="theme-options">
                        <label>
                            <input type="radio" name="theme"/>
                            Light Mode
                        </label>
                        <label>
                            <input type="radio" name="theme"/>
                            Dark Mode
                        </label>
                    </div>
                </div>
                <div className="settings-card">
                    
                    <h2>Security</h2>

                    <div className="settings-form">
                        <input 
                            type="password"
                            placeholder="Current Password" 
                        />

                        <input 
                            type="password"
                            placeholder="New Password" 
                        />

                        <input 
                            type="password"
                            placeholder="COnfirm Password" 
                        />

                        <button>Update Password</button>
                    </div>
                </div>
                <div>
                    <h2>Account</h2>

                    <button className="logout-button">Logout</button>
                </div>
            </div>
        </MainLayout>
    );
}

export default Settings;