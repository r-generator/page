import React from 'react'
import { Form } from 'antd'
import { FORM_PROPERTIES_OPTIONS } from '../constants'

export default function () {
  const onValuesChange = (_: any, _allValues: any) => {}
  return (
    <Form {...FORM_PROPERTIES_OPTIONS} onValuesChange={onValuesChange}></Form>
  )
}
