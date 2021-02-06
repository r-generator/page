import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Modal, message } from 'antd'
import {
  PlayCircleOutlined,
  EyeOutlined,
  VerticalAlignBottomOutlined,
  CopyOutlined,
  DeleteOutlined,
  LayoutTwoTone,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import { Context } from '../stores/context'
import { DELETE_ALL_COMPONENT_LIST } from '../stores/action-type'
import { Preview } from '../components'
import { PreviewInstanceProps } from '../components/Preview/typings'
import { generate } from '../utils/genrate'

export default function () {
  const { componentList, commonDispatch } = useContext(Context)
  const preview = useRef<PreviewInstanceProps>(null)
  const [tsxCode, setTsxCode] = useState('')
  const [scssCode] = useState('.code-editor { width: 100%;height: 100%;}')

  const clean = () => {
    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '确定要清空所有组件吗？',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        commonDispatch({ type: DELETE_ALL_COMPONENT_LIST })
      },
    })
  }

  const run = () => {
    setTsxCode(generate(componentList))
    preview.current?.open()
  }

  const handlePreview = () => {
    message.info('敬请期待')
  }

  const download = () => {}

  const copy = () => {}

  useEffect(() => {}, [])

  return (
    <>
      <div className="title">
        <LayoutTwoTone />
        <span style={{ marginLeft: '10px' }}>Form Generator</span>
      </div>
      <div className="actions">
        <Button
          icon={<PlayCircleOutlined />}
          type="link"
          size="middle"
          onClick={run}
        >
          运行
        </Button>
        <Button
          icon={<EyeOutlined />}
          type="link"
          size="middle"
          onClick={handlePreview}
        >
          查看JSON
        </Button>
        <Button
          icon={<VerticalAlignBottomOutlined />}
          type="link"
          size="middle"
          onClick={download}
        >
          导出TSX文件
        </Button>
        <Button
          icon={<CopyOutlined />}
          type="link"
          size="middle"
          onClick={copy}
        >
          复制代码
        </Button>
        <Button
          icon={<DeleteOutlined />}
          type="link"
          danger
          size="middle"
          onClick={clean}
        >
          清空
        </Button>
      </div>
      <Preview ref={preview} tsxCode={tsxCode} scssCode={scssCode} />
    </>
  )
}
