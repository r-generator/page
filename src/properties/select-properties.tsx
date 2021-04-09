import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Form, Input } from 'antd'
import { FORM_PROPERTIES_OPTIONS } from '../constants/constants'
import { CustomCollapse, IRefType, OptionSet } from '../components'
import {
  SET_TARGET,
  UPDATE_COMPONENT_LIST_BY_TARGET,
} from '../stores/action-type'
import { Context } from '../stores/context'

export default function () {
  const { target: currentDragComponent, commonDispatch } = useContext(Context)
  const modalRef = useRef<IRefType>(null)
  const [form] = Form.useForm()
  const { id, componentProps = {} } = currentDragComponent || {}

  const showModal = () => {
    const options = form.getFieldValue('options')
    if (options) {
      modalRef.current?.setdataSource(options)
    }
    modalRef.current?.showModal()
  }

  useEffect(() => {
    form.setFieldsValue({ options: componentProps.options })
    
  }, [componentProps.id])

  
  return (
    <Form {...FORM_PROPERTIES_OPTIONS} form={form}>
      <CustomCollapse defaultActiveKey={['下拉列表']}>
        <CustomCollapse.Panel header="下拉列表" key="下拉列表">
          <Form.Item label="列表内选项" name="options" shouldUpdate>
            <Button type="dashed" block onClick={showModal}>
              {form.getFieldValue('options')?.length ? `已配置` : '配置数据'}
            </Button>
          </Form.Item>
        </CustomCollapse.Panel>
      </CustomCollapse>

      <OptionSet
        ref={modalRef}
        onOk={(options: any) => {
          form.setFieldsValue({
            options,
          })
          commonDispatch({
            type: SET_TARGET,
            payload: {
              id,
              componentProps: { options },
            },
          })
          commonDispatch({
            type: UPDATE_COMPONENT_LIST_BY_TARGET,
            payload: {
              id,
              data: {
                componentProps: { options },
              },
            },
          })
        }}
      />
    </Form>
  )
}
