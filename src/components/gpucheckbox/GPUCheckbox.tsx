import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";

type GPUCheckboxProps = {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  testId?: string;
};

const GPUCheckbox = ({ testId, checked, onChange }: GPUCheckboxProps) => (
  <Box display="flex" alignItems="center">
    <Checkbox
      slotProps={{
        input: { "data-testid": testId },
      }}
      checked={checked}
      onChange={onChange}
    />
    <Typography>GPU Accelerator Card</Typography>
  </Box>
);

export default GPUCheckbox;
