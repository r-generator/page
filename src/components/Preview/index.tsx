import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
  useCallback,
} from "react";
import { Button, Tabs, Drawer, message } from "antd";
import { PreviewInstanceProps, PreviewProps } from "./typings";
import {
  FileTextOutlined,
  EditOutlined,
  RightOutlined,
  LeftOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import CodeEditor from "../CodeEditor";
import { CodeEditorInstanceProps } from "../CodeEditor/typings";
import { string2Component } from "../../utils/utils";
import "./index.less";

const { TabPane } = Tabs;
const SelectedIcon = () => (
  <EditOutlined style={{ color: "#f1fa8c", marginRight: "5px" }} />
);
const UnSelectedIcon = () => (
  <FileTextOutlined style={{ color: "#a95812", marginRight: "5px" }} />
);
export default forwardRef(function (
  props: PreviewProps,
  ref:
    | ((instance: PreviewInstanceProps) => void)
    | React.MutableRefObject<unknown>
    | null
) {
  const [folded, setFolded] = useState(true);
  const [tsxCode, setTsxCode] = useState<string>("");
  const [scssCode, setScssCode] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const [activeKey, setActiveKey] = useState("tsx");
  const [component, setComponent] = useState(<></>);
  const tsxEditor = useRef<CodeEditorInstanceProps>(null);
  const scssEditor = useRef<CodeEditorInstanceProps>(null);

  const onTsxChangCode = useCallback((newCode) => {
    setTsxCode(newCode);
    // refresh(newCode)
  }, []);

  const onScssChangCode = useCallback((newCode) => {
    setScssCode(newCode);
    run(newCode);
  }, []);

  const run = (code = tsxCode) => {
    const _xmlCode =
      code
        .substring(code.indexOf("export default"), code.indexOf("</Form>"))
        .replace("export default", "") + "</Form>}";
    string2Component(_xmlCode)
      .then((newComponent) => {
        if (typeof newComponent === "function") {
          const Component = newComponent();
          setComponent(<Component />);
        }
      })
      .catch((info) => {
        message.error(info?.message);
      });
  };

  const copy = () => {};

  // const download = () => {};

  const close = () => {
    setActiveKey("tsx");
    setVisible(false);
    setFolded(false);
  };

  const onTabChange = (activeKey: string) => {
    setActiveKey(activeKey);
  };

  useImperativeHandle(
    ref,
    () => ({
      tsEditor: tsxEditor.current,
      scssEditor: scssEditor.current,
      setTsxCode: (newCode: string) => {
        setTsxCode(newCode);
      },
      setScssCode: (newCode: string) => {
        setScssCode(newCode);
      },
      open() {
        setVisible(true);
      },
      close() {
        setVisible(false);
      },
      run(newCode: string) {
        run(newCode)
      }
    }),
    []
  );

  return (
    <Drawer
      width="100%"
      visible={visible}
      destroyOnClose
      closeIcon={<CloseOutlined style={{ color: folded ? "#999" : "white" }} />}
      onClose={() => {
        setTimeout(() => {
          setFolded(true);
          setVisible(false);
        });
      }}
    >
      <div className="preview">
        <Tabs
          tabBarGutter={5}
          activeKey={activeKey}
          className={`code-container ${folded ? "code-folded" : "code-open"}`}
          onChange={onTabChange}
          tabBarStyle={{ height: "35px" }}
          type="card"
        >
          <TabPane
            tab={
              <div>
                {activeKey === "tsx" ? <SelectedIcon /> : <UnSelectedIcon />}
                <span>tsx</span>
              </div>
            }
            key="tsx"
          >
            <CodeEditor
              ref={tsxEditor}
              code={tsxCode}
              options={{ language: "typescript" }}
              onChangeCode={onTsxChangCode}
            />
          </TabPane>
          <TabPane
            tab={
              <div>
                {activeKey === "scss" ? <SelectedIcon /> : <UnSelectedIcon />}
                <span>scss</span>
              </div>
            }
            key="scss"
          >
            <CodeEditor
              ref={scssEditor}
              code={scssCode}
              options={{ language: "scss" }}
              onChangeCode={onScssChangCode}
            />
          </TabPane>
        </Tabs>
        <div className={`form ${folded ? "form-open" : "form-folded"}`}>
          <div className="body">{component}</div>
        </div>
        <Button
          shape="circle"
          className={`affix ${folded ? "affix-left" : "affix-right"}`}
          icon={folded ? <RightOutlined /> : <LeftOutlined />}
          onClick={() => {
            setFolded(!folded);
            if (!folded) run(tsxCode);
          }}
        ></Button>
      </div>
    </Drawer>
  );
});
