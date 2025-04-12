import Typography from "@mui/material/Typography";
import { ServerType } from "../lib/serverModelAvailability";
import ComputerIcon from "@mui/icons-material/Computer";
import Box from "@mui/material/Box";

type ServerOptionsListProps = {
  options: ServerType[];
};

const ServerOptionsList = ({ options }: ServerOptionsListProps) => {
  if (options.length > 0) {
    return (
      <>
        <Typography variant="h4" gutterBottom>
          Available Server Options
        </Typography>
        {options.map((option) => (
          <Box
            key={option}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              fontSize: "2rem",
              margin: "1rem 0",
            }}
          >
            <ComputerIcon />
            <Typography>{option}</Typography>
          </Box>
        ))}
      </>
    );
  } else {
    return (
      <>
        <Typography variant="h4" gutterBottom>
          No Options Available
        </Typography>
        <Typography>
          There are no server options available that match selected parameters
        </Typography>
      </>
    );
  }
};

export default ServerOptionsList;
