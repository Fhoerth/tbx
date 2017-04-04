import './Product.component.scss';
import React from 'react';

const ProductComponent = ({ product }) => {
  const { _id, stock } = product;
  return (
    <div className='product'>
      <span>_id: { _id }</span>
      <span>stock: { stock }</span>
    </div>
  );
};

ProductComponent.propTypes = {
  product: React.PropTypes.object.isRequired
};

export default ProductComponent;
