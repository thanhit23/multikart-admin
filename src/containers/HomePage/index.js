import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Navigate } from 'react-router-dom';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducers';
import saga from './saga';
import { checkAuth } from './actions';
import injectSaga from '../../utils/injectSaga';
import Header from '../Header';
import Dashboard from '../SideBar';
import HomePageComponent from '../../components/HomePage';

function HomePage({ isSidebar, auth, checkAuthenticate }) {
  useEffect(() => {
    checkAuthenticate();
    if (!auth) <Navigate to="/login" replace />;
  }, []);

  return (
    <>
      <Helmet>
        <title>Admin</title>
        <meta name="description" />
      </Helmet>
      <section className="container bg-[#f7f9fc]">
        <div className="grid grid-cols-6">
          <Dashboard />
          <div
            className={classNames(
              {
                'ml-[260px]': isSidebar,
                'ml-[64px]': !isSidebar,
              },
              'duration-300',
              'col-span-6',
            )}
          >
            <Header />
            <HomePageComponent />
          </div>
        </div>
      </section>
    </>
  );
}

HomePage.prototype = {
  isSidebar: PropTypes.bool,
  auth: PropTypes.object,
  checkAuth: PropTypes.func,
};

const mapStateToProps = state => {
  const {
    home: { isSidebar },
    global: { auth },
  } = state;
  return {
    auth,
    isSidebar,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkAuthenticate: bindActionCreators(checkAuth, dispatch),
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer, withSaga, withConnect)(HomePage);
