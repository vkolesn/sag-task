import { Box, Grid, SelectChangeEvent, Typography } from "@mui/material";
import CPUSelect from "./components/cpuselect/CPUSelect";
import MemorySizeEdit from "./components/memorysizeedit/MemorySizeEdit";
import GPUCheckbox from "./components/gpucheckbox/GPUCheckbox";
import SubmitButton from "./components/SubmitButton";
import ServerOptionsList from "./components/ServerOptionsList";
import MemoryIcon from "@mui/icons-material/Memory";
import { useMemo, useState } from "react";
import { ServerAvailability, ServerType } from "./lib/serverModelAvailability";
import {
  cpuSelectTestId,
  gpuCheckboxTestId,
  memorySizeEditTestId,
  submitButtonTestId,
} from "./testHelpers";
import { CPUType } from "./components/cpuselect/CPUSelectTypes";
import { validateMemorySizeValue } from "./components/memorysizeedit/MemorySizeEditHelpers";

const App = () => {
  const [cpu, setCPU] = useState<CPUType | "">("");
  const [memorySizeValue, setMemorySizeValue] = useState("");
  const [useGPU, setUseGPU] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // check if all inputs are valid for submission
  const inputsValid = useMemo(() => {
    if (cpu === "") {
      return false;
    }
    const [_memSize, memSizeValid] = validateMemorySizeValue(memorySizeValue);
    if (!memSizeValid) {
      return false;
    }
    return true;
  }, [cpu, memorySizeValue]);

  // filter available server options
  const availableOptions = useMemo((): ServerType[] => {
    const [memSize, memSizeValid] = validateMemorySizeValue(memorySizeValue);
    if (!memSizeValid) {
      return [];
    }
    return Object.values(ServerType).filter((serverType) =>
      ServerAvailability[serverType](cpu as CPUType, memSize, useGPU)
    );
  }, [cpu, memorySizeValue, useGPU]);

  // present options to the user only after they click "submit"
  const showOptions = useMemo(
    (): boolean => inputsValid && submitted,
    [inputsValid, submitted]
  );

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: 2,
        maxWidth: {
          lg: "70vw",
        },
      }}
    >
      <Typography variant="h3" sx={{ marginBottom: "2rem" }}>
        <MemoryIcon sx={{ fontSize: "2rem", marginRight: "1rem" }} />
        Server Composer
      </Typography>
      <Grid container spacing={4}>
        {/* selection controls */}
        <Grid size={{ xs: 12, sm: 4 }}>
          <Box display="flex" flexDirection="column" gap={2}>
            <CPUSelect
              testId={cpuSelectTestId}
              value={cpu}
              onChange={(ev: SelectChangeEvent<CPUType>) => {
                setCPU(ev.target.value as CPUType);
                setSubmitted(false);
              }}
            />
            <MemorySizeEdit
              testId={memorySizeEditTestId}
              value={memorySizeValue}
              onChange={(newValue: string) => {
                setMemorySizeValue(newValue);
                setSubmitted(false);
              }}
            />
            <GPUCheckbox
              testId={gpuCheckboxTestId}
              checked={useGPU}
              onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                setUseGPU(ev.target.checked);
                setSubmitted(false);
              }}
            />
            <SubmitButton
              testId={submitButtonTestId}
              disabled={!inputsValid || showOptions}
              onClick={() => setSubmitted(true)}
            />
          </Box>
        </Grid>
        {/* available servers list */}
        <Grid size={{ xs: 12, sm: 8 }}>
          {showOptions && <ServerOptionsList options={availableOptions} />}
          {!showOptions && (
            <>
              <Typography variant="h4" gutterBottom>
                Select server options
              </Typography>
              <Typography>
                To see available servers, please select CPU, memory size, and
                GPU, then click Submit button
              </Typography>
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default App;
