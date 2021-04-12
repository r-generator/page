import { CodeEditorInstanceProps } from "../CodeEditor/typings";

export interface PreviewInstanceProps {
  open: () => void;
  close: () => void;
  tsEditor: CodeEditorInstanceProps;
  scssEditor: CodeEditorInstanceProps;
  setTsxCode: React.Dispatch<React.SetStateAction<string>>;
  setScssCode: React.Dispatch<React.SetStateAction<string>>;
  run: React.Dispatch<React.SetStateAction<string>>;
}

export interface PreviewProps {

}