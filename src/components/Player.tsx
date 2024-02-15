import { Avatar, Box, Grid, Stack, TextField, Typography } from "@mui/material";
export const FIRST_COLOR = "#4758d6";
export const SECOND_COLOR = "#ea3a3a";
const Player = ({
  id,
  name,
  score,
  hideScore = false,
  hideName = false,
  onNameChange = () => {},
}: // onScoreChange,
{
  id: number;
  name?: string;
  score?: number;
  hideScore?: boolean;
  hideName?: boolean;
  onNameChange?: (value: string) => void;
  // onScoreChange: (value: number) => void;
}) => {
  const boxShadows = [
    {
      id: 1,
      value:
        "rgba(71, 88, 214, 0.4) -5px 5px, rgba(71, 88, 214, 0.3) -10px 10px",
    },
  ];

  const NAME_SX = {
    width: "fit-content",
    "& .MuiInput-root:before, & .MuiInput-root:after": {
      display: "none",
    },
    "& .MuiInput-root:hover:not(.Mui-disabled):before": {
      borderBottom: "none",
    },
  };

  return (
    <Grid item xs={6}>
      <Stack spacing={1} alignItems="center">
        <Avatar
          alt={name}
          sx={{
            backgroundColor: id === 0 ? FIRST_COLOR : SECOND_COLOR,
            width: { xs: 80, sm: 100, md: 120 },
            height: { xs: 80, sm: 100, md: 120 },
            cursor: "pointer",
          }}
        />
        {!hideName ? (
          <TextField
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            variant="standard"
            InputProps={{
              disableUnderline: true,
              sx: {
                fontSize: "2rem",
                fontWeight: "bold",
                "& input": {
                  textAlign: "center",
                },
              },
            }}
            sx={NAME_SX}
          />
        ) : null}
        {!hideScore ? (
          <Box>
            <Typography
              fontWeight="bold"
              fontSize="5rem"
              color={id === 0 ? FIRST_COLOR : SECOND_COLOR}
            >
              {score}
            </Typography>
          </Box>
        ) : null}
      </Stack>
    </Grid>
  );
};

export default Player;
