import React from 'react';

const Layout = ({ children }) => (
  <div className="content">
    { children }
  </div>
);

Layout.propTypes = {
  children: React.PropTypes.object
};

export default Layout;
