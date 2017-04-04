import React from 'react';

const ListHoc = Component => React.createClass({
  propTypes: {
    fetchProducts: React.PropTypes.func.isRequired
  },

  componentWillMount () {
    this.props.fetchProducts();
  },

  render () {
    return (<Component {...this.props} />);
  }
});

export default ListHoc;
