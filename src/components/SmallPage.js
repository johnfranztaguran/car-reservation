import React, { useState, useEffect } from 'react';
import Request from '../endpoint/request';
import { PageHeader, CRUD } from 'franz-skeleton-design';
import { notification, Spin } from 'antd';
import SpinStyles from './SpinStyle';
import CrudStyle from './crudStyle';
import PagesContent from './PagesContent';

const carRequest = new Request();

const SmallPage = () => {
  const [smallItems, setSmallItems] = useState([]);
  const [isLoaded, setLoader] = useState(false);
  const [type, setType] = useState('');

  useEffect(() => {
    getRequestSmallItems();
  }, []);

  const getRequestSmallItems = async () => {
    try {
      const smallItems = await carRequest.getSmallItems();
      setSmallItems(smallItems);
      setLoader(true);
      setType('small')
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
            <PagesContent category={type} model={smallItems} />
          ) : (
            <Spin size='large' style={SpinStyles} />
          )
        }
      </React.Fragment>
    );
  };

  const renderHeader = () => <PageHeader>Small List Item</PageHeader>;

  return (
    <CrudStyle>
      <CRUD
        headerView={renderHeader}
        listView={renderListView}
      />
    </CrudStyle>
  );
};

export default SmallPage;