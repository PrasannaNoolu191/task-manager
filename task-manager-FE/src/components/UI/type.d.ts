interface IFormInputPasswordField {
  name: string;
  label: string;
  value: string;
  error?: { message: string };
  onChange?: () => void;
  helperText?: string;
}
interface IFormInputFields {
  name: string;
  label: string;
  options?: Option[];
  control: any;
  placeholder?: string;
  errors: any;
  defaultValue?: any;
  rows?: number;
  size?: TextFieldPropsSizeOverrides;
  borderRadius?: string;
  slotProps?: any;
  limitTags?: number;
  props?: any;
  inputStyles?: SxProps;
  sx?: SxProps;
  renderOption?: any;
  getOptionLabel?: any;
  isRenderSingle?: boolean;
  renderOptionValue?: any;
  disableCheckBox?: boolean;
  filterSelectedOptions?: any;
  format?: string;
  id?: string;
  disabled?: any;
  value?: string;
  required?: boolean;
  placeholder?: string;
  allowMultiple?: boolean;
}
interface ICustomChip {
  status: string;
}
type CustomChartCardProps = {
  chartData: { value: number; name: string }[];
  colors?: string[];
};
