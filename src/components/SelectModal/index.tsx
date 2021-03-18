import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Button, Divider, Modal, Radio, Space, Typography } from "antd";
import Draggable from "react-draggable";
import { cloneDeep, uniqueId } from "lodash";
import DragableTable, { find, Option } from "./DragableTable";
import "./index.scss";

export interface IRefType {
  showModal: () => void;
  hideModal: () => void;
  setdataSource: (dataSource: any) => void;
}

const _treeData: Option[] = [
  {
    label: "parent 1",
    key: "0-0",
    value: "0-0",
    children: [
      {
        label: "parent 1-0",
        key: "0-0-0",
        value: "0-0-0",
        disabled: true,
        children: [
          {
            label: "leaf",
            key: "0-0-0-0",
            value: "0-0-0-0",
          },
        ],
      },
      {
        label: "parent 1-1",
        key: "0-0-1",
        value: "0-0-1",
        children: [
          {
            label: <span style={{ color: "#1890ff" }}>sss</span>,
            key: "0-0-1-0",
            value: "0-0-1-0",
          },
        ],
      },
    ],
  },
  {
    label: "parent 2",
    key: "1-0",
    value: "1-0",
    children: [
      {
        label: "parent 1-0",
        key: "1-0-0",
        value: "1-0-0",
        disabled: true,
        children: [
          {
            label: "leaf",
            key: "1-0-0-0",
            value: "1-0-0-0",
          },
        ],
      },
      {
        label: "parent 1-1",
        key: "1-0-1",
        value: "1-0-1",
        children: [
          {
            label: <span style={{ color: "#1890ff" }}>sss</span>,
            key: "1-0-1-0",
            value: "1-0-1-0",
          },
        ],
      },
    ],
  },
];

let selectedKeys: number | string = "";
export default forwardRef(
  (
    props: any,
    ref: ((instance: IRefType) => void) | React.MutableRefObject<unknown> | null
  ) => {
    const { onOk } = props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [bounds, setBounds] = useState({
      left: 0,
      top: 0,
      bottom: 0,
      right: 0,
    });
    const [dataSource, setdataSource] = useState<Option[]>(_treeData);
    const draggleRef = useRef(null);

    const showModal = () => {
      setIsModalVisible(true);
    };

    const hideModal = () => {
      setIsModalVisible(false);
    };

    const handleOk = () => {
      setIsModalVisible(false);
      if (typeof onOk === "function") {
        onOk(dataSource);
      }
    };

    const onStart = (event: any, uiData: { x: number; y: number }) => {
      const { clientWidth, clientHeight } = window?.document?.documentElement;
      const { left, right, top, bottom } =
        ((draggleRef?.current as any) as HTMLElement)?.getBoundingClientRect() ||
        {};
      setBounds({
        left: -left + uiData?.x,
        right: clientWidth - (right - uiData?.x),
        top: -top + uiData?.y,
        bottom: clientHeight - (bottom - uiData?.y),
      });
    };

    useImperativeHandle(
      ref,
      () => ({
        showModal,
        hideModal,
        setdataSource,
      }),
      []
    );

    return (
      <Modal
        title={
          <div
            style={{
              cursor: "move",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingRight: 20,
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
            // fix eslintjsx-a11y/mouse-events-have-key-events
            // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
            onFocus={() => {}}
            onBlur={() => {}}
            // end
          >
            <span>配置数据</span>
            <Radio.Group>
              <Radio.Button value="可视化配置">可视化配置</Radio.Button>
              <Radio.Button value="代码配置">代码配置</Radio.Button>
            </Radio.Group>
          </div>
        }
        onCancel={hideModal}
        visible={isModalVisible}
        okText="确定"
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            onStart={(event: any, uiData: any) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
        footer={
          <Button type="primary" size="middle" onClick={handleOk}>
            确定
          </Button>
        }
      >
        <div
          onMouseEnter={() => {
            setDisabled(true);
          }}
        >
          <DragableTable
            dataSource={dataSource}
            onChange={(val, _selectedKeys) => {
              setdataSource(val);
              selectedKeys = _selectedKeys?.[0];
            }}
          />
          <Space
            style={{
              marginTop: 10,
            }}
            split={<Divider type="vertical" />}
          >
            <Typography.Link
              onClick={() => {
                if (!selectedKeys) {
                  setdataSource((state) => {
                    state.push({
                      label: "12141",
                      value: uniqueId(),
                      key: uniqueId(),
                    });
                    return cloneDeep(state);
                  });
                  return;
                }
                const newData = find(
                  selectedKeys,
                  cloneDeep(dataSource),
                  (item, i, target) => {
                    (item.children || (item.children = [])).push({
                      label: "12141",
                      value: uniqueId(),
                      key: uniqueId(),
                    });
                  }
                );
                setdataSource(newData);
              }}
            >
              添加一项
            </Typography.Link>
            {/* <Typography.Link onClick={() => {}}>添加分组</Typography.Link> */}
          </Space>
        </div>
      </Modal>
    );
  }
);
