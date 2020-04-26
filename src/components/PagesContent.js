import React, { Fragment, useState, useEffect } from 'react';
import { Collapse, Row, Col, Icon, Tag, Avatar, Card } from 'antd';
import PropTypes from 'prop-types';
import _get from 'lodash.get';
import HeaderStyle from './styledComponents/collapseHeaderStyle';

const { Panel } = Collapse;

const PageContent = ({ model, category }) => {
  const [activePanel, setactivePanel] = useState('');

  useEffect(() => {
  }, [model]);

  console.log('PageContent', category);

  const renderCollapseHeader = item => {
    return (
      <React.Fragment>
        <Row>
          <Col span={3} lg={4}>
            <h4>{item.brandname}</h4>
            <h4>{item.name}</h4>
            <div className='bottom-header'>
              <a
                className='icon-setting'
              >
                <Icon type='edit'/>
              </a>
              <Tag color="#4CAF50">{category}</Tag>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  };

  const childPanelAvatar = item => {
    return (
      <div>
        <Avatar size={128} src={_get(item, 'full')} />
      </div>
    );
  };

  const collapseChange = key => {
    setactivePanel(key);
  }

  const renderCollapseContent = item => {
    return (
      <Fragment>
        <div style={{ background: '#ECECEC', padding: '30px', margin: '10px' }}>
          <Card title={item.brandname} bordered={false} style={{ width: '95%' }}>
            <p><strong>Name: </strong>{item.name}</p>
            <p><strong>Email: </strong>{item.email}</p>
            <p><strong>Phone: </strong>{item.phone}</p>
            <p><strong>Description: </strong>{item.description}</p>
          </Card>
        </div>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <HeaderStyle>
        <Collapse
          expandIcon={({ isActive }) => <Icon style={{ color: 'gray'}} type="caret-right" rotate={isActive ? 90 : 0} />}
          onChange={collapseChange}
          style={{ backgroundColor: '#fcf4e8'}}
          expandIconPosition='right'
          activeKey={activePanel}
        >
          {
            model.map(items => {
              return (
                <Panel
                  className='isoPanel'
                  header={renderCollapseHeader(items)}
                  key={items.uuid}
                >
                  <Col span={10} lg={4}>
                    {childPanelAvatar(items.images)}
                  </Col>
                  <Col span={20}>
                    {renderCollapseContent(items)}
                  </Col>
                </Panel>
              )
            })
          }
        </Collapse>
      </HeaderStyle>
    </Fragment>
  );
};

PageContent.propTypes = {
  recipeItems: PropTypes.array
};

export default PageContent;
