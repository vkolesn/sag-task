import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useMemo } from "react";
import {
  isPowerOf2,
  maxValidMemorySizeValue,
  nextPowerOf2,
  validateMemorySizeValue,
} from "./MemorySizeEditHelpers";

type MemorySizeEditProps = {
  value: string;
  onChange: (newValue: string) => void;
  testId?: string;
};

const MemorySizeEdit = ({ testId, value, onChange }: MemorySizeEditProps) => {
  const [stepDown, stepUp] = useMemo((): [string, string] => {
    const [n, valid] = validateMemorySizeValue(value);
    if (valid) {
      return [
        String(Math.max(Math.round(n / 2), 0)),
        String(Math.min(n * 2, maxValidMemorySizeValue)),
      ];
    } else {
      if (n === 0) {
        return ["1", "1"];
      } else {
        const np = nextPowerOf2(n);
        return [
          String(Math.max(Math.round(np / 4), 0)),
          String(Math.min(np, maxValidMemorySizeValue)),
        ];
      }
    }
  }, [value]);

  let helperText = "";
  const nValue = Number(value);

  // make sure users see a meaningful error
  if (!isPowerOf2(nValue)) {
    helperText = "Value must be a power of 2";
  }
  if (nValue < 2048 || nValue > 8388608) {
    if (helperText.length > 0) {
      helperText += " and ";
    } else {
      helperText = "Value must ";
    }
    helperText += "be between 2048 and 8388608";
  }

  return (
    <TextField
      label="Memory Size"
      id="memory-size-select"
      type="text"
      error={!validateMemorySizeValue(value)[1] && value !== ""}
      fullWidth
      slotProps={{
        htmlInput: {
          "data-testid": testId,
        },
        input: {
          endAdornment: (
            <InputAdornment position="end">
              MB&nbsp;
              <Stack direction="column" spacing={0}>
                <ArrowDropUpIcon
                  sx={{ cursor: "pointer" }}
                  onClick={() => onChange(stepUp)}
                />
                <ArrowDropDownIcon
                  sx={{ cursor: "pointer" }}
                  onClick={() => onChange(stepDown)}
                />
              </Stack>{" "}
            </InputAdornment>
          ),
        },
      }}
      onChange={(ev) => onChange(ev.target.value)}
      value={value}
      helperText={
        // use a block element with a fixed height to ensure UI stays stable regardless of
        // length/presence of the helper text
        <span style={{ display: "block", height: "3rem" }}>{helperText}</span>
      }
    />
  );
};

export default MemorySizeEdit;
