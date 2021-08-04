import React, { CSSProperties } from 'react'
import { Tabs } from 'antd'
import Component from './component'
import Layout from './layout'
import Page from './page'

const { TabPane } = Tabs
export default function () {
  const style: CSSProperties = {
    position: 'relative',
    overflowX: 'hidden',
    overflowY: 'auto',
    height: 'calc(100vh - 46px)',
  }
  return (
    <Tabs defaultActiveKey="1" centered>
      <TabPane tab="属性设置" key="1">
        <div style={style}>
          <Component />
        </div>
      </TabPane>
      <TabPane tab="布局设置" key="2">
        <div style={style}>
          <Layout />
        </div>
      </TabPane>
      <TabPane tab="画布设置" key="3">
        <div style={style}>
          <Page />
        </div>
      </TabPane>
    </Tabs>
  )
}