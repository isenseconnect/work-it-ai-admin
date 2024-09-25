import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Faq from './components/Faq';
import Tags from './components/Tags';
import Products from './components/Products';
import Reports from './components/Reports';
import Settings from './components/Settings';
import Login from './components/Login';
import FileUpload from './components/FileUpload';
import DataTable from './components/DataTable';
import ScrapImages from './components/ScrapImages';
import Collections from './components/Collections';
import CollectionDetails from './components/CollectionDetails';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Info from './components/Info';
import Tool from './components/Tool';
import Featured from './components/Featured';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  
  return (
    <Router>
      <ToastContainer />
      <div className="app">
      {loggedIn && <Sidebar />}

        <div className="main-content">
          <Switch>
            {!loggedIn && <Route path="/login" component={Login} />}
            {loggedIn ? (
              <>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/tools-csv" component={FileUpload} />
                {/* <Route path="/scrap-images" component={ScrapImages} /> */}
                <Route path="/users" component={Users} />
                <Route path="/featured" component={Featured} />
                <Route path="/reports" component={Reports} />
                <Route path="/faq" component={Faq} />
                <Route path ="/info" component={Info} />
                <Route path="/collectionDetails/:id" component={CollectionDetails} />
                <Route path="/tags" component={Tags} />
                <Route path="/collections" component={Collections} />
                <Route path="/settings" component={Settings} />
                <Route path="/upload-csv" component={FileUpload} />
                <Route path="/tool" component={Tool}/>
                <Route path="/uploaded-data" component={DataTable} />
              </>
             ) : (
               <Redirect to="/login"/>
             )} 
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
