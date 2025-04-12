import Button from "@mui/material/Button";

type SubmitButtonProps = {
  disabled: boolean;
  onClick: () => void;
  testId?: string;
};

const SubmitButton = ({ testId, disabled, onClick }: SubmitButtonProps) => (
  <Button
    data-testid={testId}
    variant="contained"
    color="primary"
    disabled={disabled}
    onClick={onClick}
  >
    Submit
  </Button>
);

export default SubmitButton;
