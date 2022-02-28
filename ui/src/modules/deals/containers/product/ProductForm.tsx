import { AppConsumer } from 'appContext';
import { IProduct } from 'modules/settings/productService/types';
import React from 'react';
import ProductForm from '../../components/product/ProductForm';
import { IPaymentsData, IProductData } from '../../types';
import { IProductTemplate } from '../../../settings/templates/types';

type Props = {
  onChangeProductsData: (productsData: IProductData[]) => void;
  saveProductsData: () => void;
  onChangePaymentsData: (paymentsData: IPaymentsData) => void;
  productsData: IProductData[];
  products: IProduct[];
  paymentsData?: IPaymentsData;
  currentProduct?: string;
  productTemplates: IProductTemplate[];
  closeModal: () => void;
};

export default class ProductFormContainer extends React.Component<Props> {
  render() {
    return (
      <AppConsumer>
        {({ currentUser }) => {
          if (!currentUser) {
            return;
          }

          const configs = currentUser.configs || {};

          const extendedProps = {
            ...this.props,
            uom: configs.dealUOM || [],
            currencies: configs.dealCurrency || []
          };

          return <ProductForm {...extendedProps} />;
        }}
      </AppConsumer>
    );
  }
}
