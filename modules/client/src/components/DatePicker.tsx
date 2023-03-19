import dateFnsGenerateConfig from "rc-picker/lib/generate/dateFns";
import generatePicker from "antd/es/date-picker/generatePicker";
import "antd/es/date-picker/style/index";

/**
 * AntD Datepicker configured to use the date-fns library
 */
const DatePicker = generatePicker<Date>(dateFnsGenerateConfig);

export default DatePicker;
