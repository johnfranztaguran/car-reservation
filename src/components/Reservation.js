import React, { useState } from 'react';
import Request from '../endpoint/request';
import { PageHeader, CRUD } from 'franz-skeleton-design';
import { Card, Select, Form, Input, Button, notification } from 'antd';
import CrudStyle from './crudStyle';

const carRequest = new Request();

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};

const optionCategoryItem = {
  small: ['Opel Corsa', 'Toyota Yaris', 'Smart for Two'],
  premium: ['Audi S8', 'Jaguar XJR', 'BMW 750iL'],
  van: ['Volkswagen Touran', 'Renault Espace', 'Flat Talento']
};
const optionCategory = ['small', 'premium', 'van'];

const Reservation = () => {
  const [personName, setPersonName] = useState('');
  const [personEmail, setPersonEmail] = useState('');
  const [personPhone, setPersonPhone] = useState('');
  // const [inputvalue, setValue] = useState({ pname: '', pemail: '', pphone: '' });
  const [optionValue, setOptionvalue] = useState(optionCategoryItem[optionCategory[0]]);
  const [carmodel, setCarModel] = useState(optionCategoryItem[optionCategory[0]][0]);
  const [category, setCategory] = useState('');

  const addRequestReservationItem = () => {
    try {
      carRequest.addReservationItem(category, personName, carmodel, personEmail, personPhone);
    } catch (err) {
      console.error('Error', err);
      notification.open({
        message: 'Something went wrong',
        description: `Error while fetching: ${err}`
      });
    }
  };

  const handleSubmit = () => {
    addRequestReservationItem();
    notification.open({
      message: 'Reservation Added Successfully',
      description: `success`
    });
    setPersonName('');
    setPersonEmail('');
    setPersonPhone('');
  }

  const onChangeCategory = value => {
    console.log(`onChangeCategory ${value}`);
    setOptionvalue(optionCategoryItem[value]);
    setCarModel(optionCategoryItem[value][0]);
    setCategory(value)
  };
  const onChangeModel = value => {
    console.log(`onChangeModel ${value}`);
    setCarModel(value);
  };
  // const onChangeInput = useCallback(event => {
  //   const { name, value } = event.target;
  //   setValue({ ...inputvalue, [name]: value });
  // });

  const renderListView = () => {
    return (
      <React.Fragment>
        <div style={{ background: '#ECECEC', padding: '30px', margin: '10px' }}>
          <Card title='Car Reservation Form' bordered={false} style={{ width: '95%' }}>
            <Form {...layout} name="register">
              <Form.Item name='pname' label="Name" rules={[{ required: true, message: 'Please input your name!' }]}>
                <Input onChange={e => setPersonName(e.target.value)} value={personName} />
              </Form.Item>
              <Form.Item name='pemail' label="E-mail" rules={[{ type: 'email', required: true, message: 'The input is not valid E-mail!' }]}>
                <Input onChange={e => setPersonEmail(e.target.value)} value={personEmail} />
              </Form.Item>
              <Form.Item
                name="pphone"
                label="Phone Number"
                rules={[{ required: true, message: 'Please input your phone number!', type: 'number' }]}
              >
                <Input onChange={e => setPersonPhone(e.target.value)} value={personPhone} />
              </Form.Item>
              <Form.Item label="Car Category">
                <Select onChange={onChangeCategory} defaultValue={optionCategory[0]}>
                  {optionCategory.map(type => (
                    <Option key={type} value={type}>
                      {type}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Car Model">
                <Select onChange={onChangeModel} value={carmodel}>
                  {optionValue.map(type => (
                    <Option key={type} value={type}>
                      {type}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button
                  onClick={() => handleSubmit()}
                  style={{ width: '100%' }}
                  type="primary"
                  htmlType="submit"
                  disabled={!personName || !personEmail || !personPhone || !carmodel || !category}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </React.Fragment>
    );
  };

  const renderHeader = () => <PageHeader>Reservation</PageHeader>;

  return (
    <CrudStyle>
      <CRUD
        headerView={renderHeader}
        listView={renderListView}
      />
    </CrudStyle>
  );
};

export default Reservation;