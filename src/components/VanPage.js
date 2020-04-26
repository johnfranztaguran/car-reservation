import React, { useState, useEffect } from 'react';
import Request from '../endpoint/request';
import { PageHeader, CRUD } from 'franz-skeleton-design';
import { notification, Spin } from 'antd';
import SpinStyles from './SpinStyle';
import CrudStyle from './crudStyle';
import PagesContent from './PagesContent';

const carRequest = new Request();

const VanPage = () => {
  const [vanItems, setVanItems] = useState([]);
  const [isLoaded, setLoader] = useState(false);
  const [type, setType] = useState('');

  useEffect(() => {
    getRequestVanItems();
  }, []);

  const getRequestVanItems = async () => {
    try {
      const vanItems = await carRequest.getVanItems();
      setVanItems(vanItems);
      setLoader(true);
      setType('van')
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
            <PagesContent category={type} model={vanItems} />
          ) : (
            <Spin size='large' style={SpinStyles} />
          )
        }
      </React.Fragment>
    );
  };

  const renderHeader = () => <PageHeader>Van List Item</PageHeader>;

  return (
    <CrudStyle>
      <CRUD
        headerView={renderHeader}
        listView={renderListView}
      />
    </CrudStyle>
  );
};

export default VanPage;