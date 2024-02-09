import { Avatar, Box, Grid, Stack, TextField, Typography } from "@mui/material";

const Player = ({
  id,
  name,
  score,
}: {
  id: number;
  name: string;
  score: number;
}) => {
  const firstColor = "#4758d6";
  const secondColor = "#ea3a3a";

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
            backgroundColor: id === 0 ? firstColor : secondColor,
            width: { xs: 80, sm: 100, md: 120 },
            height: { xs: 80, sm: 100, md: 120 },
            cursor: "pointer",
          }}
        />
        <TextField
          value={name}
          onChange={() => {}}
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
        <Box>
          <Typography
            fontWeight="bold"
            fontSize="5rem"
            color={id === 0 ? firstColor : secondColor}
          >
            {score}
          </Typography>
        </Box>
      </Stack>
    </Grid>
  );
};

export default Player;
