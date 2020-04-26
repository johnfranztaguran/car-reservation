import React, { useState, useEffect } from 'react';
import Request from '../endpoint/request';
import { PageHeader, CRUD } from 'franz-skeleton-design';
import { notification, Spin } from 'antd';
import SpinStyles from './SpinStyle';
import CrudStyle from './crudStyle';
import PagesContent from './PagesContent';

const carRequest = new Request();

const PremiumPage = () => {
  const [premiumItems, setPremiumItems] = useState([]);
  const [isLoaded, setLoader] = useState(false);
  const [type, setType] = useState('');

  useEffect(() => {
    getRequestPremiumItems();
  }, []);

  const getRequestPremiumItems = async () => {
    try {
      const premiumItems = await carRequest.getPremiumItems();
      setPremiumItems(premiumItems);
      setLoader(true);
      setType('premium')
    } catch (err) {
      console.error('Error', err);
      notification.open({
        message: 'Something went wrong',
        description: `Error while fetching: ${err}`
      });
    }
  }

  const renderListView = () => {
    return (
      <React.Fragment>
        {
          isLoaded ? (
            <PagesContent category={type} model={premiumItems} />
          ) : (
            <Spin size='large' style={SpinStyles} />
          )
        }
      </React.Fragment>
    );
  };

  const renderHeader = () => <PageHeader>Premium List Item</PageHeader>;

  return (
    <CrudStyle>
      <CRUD
        headerView={renderHeader}
        listView={renderListView}
      />
    </CrudStyle>
  );
};

export default PremiumPage;