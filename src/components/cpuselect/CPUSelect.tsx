import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { CPUType } from "./CPUSelectTypes";

type CPUSelectProps = {
  value: CPUType | "";
  onChange: (event: SelectChangeEvent<CPUType>) => void;
  testId?: string;
};

const CPUSelect = ({ testId, value, onChange }: CPUSelectProps) => (
  <FormControl fullWidth>
    <InputLabel>CPU</InputLabel>
    <Select
      labelId="cpu-select-label"
      id="cpu-select"
      value={value}
      label="CPU"
      onChange={onChange}
      inputProps={{ "data-testid": testId }}
    >
      <MenuItem value={CPUType.X86}>{CPUType.X86}</MenuItem>
      <MenuItem value={CPUType.Power}>{CPUType.Power}</MenuItem>
      <MenuItem value={CPUType.ARM}>{CPUType.ARM}</MenuItem>
    </Select>
  </FormControl>
);

export default CPUSelect;
