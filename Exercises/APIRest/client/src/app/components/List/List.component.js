import React from 'react';
import ProductComponent from './components/Product.component';

const ListComponent = ({
  products,
  fetchingProducts,
  fetchProductsFulfilled,
  productsHasBeenFetched
}) => {
  if (fetchingProducts || !productsHasBeenFetched) {
    return (<h1>Loading...</h1>);

  } else if (fetchProductsFulfilled) {
    return (
      <div>
        <h1>Product List</h1>
        {
          products.map(product => {
            return (<ProductComponent key={product._id} product={product} />);
          })
        }
    </div>
    );

  } else {
    // fetchProductsRejected
    return (<h1>Error loading data...</h1>);
  }
};

ListComponent.propTypes = {
  products: React.PropTypes.arrayOf(React.PropTypes.object),
  fetchingProducts: React.PropTypes.bool,
  fetchProductsFulfilled: React.PropTypes.bool.isRequired,
  fetchProductsRejected: React.PropTypes.bool.isRequired,
  productsHasBeenFetched: React.PropTypes.bool.isRequired
};

export default ListComponent;
