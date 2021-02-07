import {
    InputProperties,
    TextAreaProperties,
    PasswordProperties,
    NumberProperties,
    EditorProperties,
    SelectProperties,
    CascaderProperties,
    RadioProperties,
    CheckboxProperties,
    SwitchProperties,
    SliderProperties,
    TimePickerProperties,
    TimeRangePickerProperties,
    DatePickerProperties,
    DateRangePickerProperties,
    RateProperties,
    UploadProperties,
    RowProperties,
    ButtonProperties,
} from "../properties";
import {
    Input,
    InputNumber,
    Select,
    Cascader,
    Radio,
    Checkbox,
    Switch,
    Slider,
    TimePicker,
    DatePicker,
    Rate,
    Upload,
    Row,
    Button,
} from "antd";

export const key2Component = {
    Input: {
        properties: <InputProperties />,
        component: <Input />
    },
    'Input.TextArea': {
        properties: <TextAreaProperties />,
        component: <Input.TextArea />
    },
    'Input.Password': {
        properties: <PasswordProperties />,
        component: <Input.Password />
    },
    InputNumber: {
        properties: <NumberProperties />,
        component: <InputNumber />
    },
    Editor: {
        properties: <EditorProperties />,
        component: <>editor</>
    },
    Select: {
        properties: <SelectProperties />,
        component: <Select />
    },
    Cascader: {
        properties: <CascaderProperties />,
        component: <Cascader />
    },
    Radio: {
        properties: <RadioProperties />,
        component: <Radio />
    },
    Checkbox: {
        properties: <CheckboxProperties />,
        component: <Checkbox />
    },
    Switch: {
        properties: <SwitchProperties />,
        component: <Switch />
    },
    Slider: {
        properties: <SliderProperties />,
        component: <Slider />
    },
    'TimePicker': {
        properties: <TimePickerProperties />,
        component: <TimePicker />
    },
    'TimePicker.RangePicker': {
        properties: <TimeRangePickerProperties />,
        component: <TimePicker.RangePicker />
    },
    'DatePicker': {
        properties: <DatePickerProperties />,
        component: <DatePicker />
    },
    'DatePicker.RangePicker': {
        properties: <DateRangePickerProperties />,
        component: <DatePicker.RangePicker />
    },
    Rate: {
        properties: <RateProperties />,
        component: <Rate />
    },
    Upload: {
        properties: <UploadProperties />,
        component: <Upload />
    },
    Row: {
        properties: <RowProperties />,
        component: <Row />
    },
    Button: {
        properties: <ButtonProperties />,
        component: <Button />
    },
    '': {
        properties: <></>,
        component: <></>
    },
}