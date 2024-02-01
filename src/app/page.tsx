"use client";
import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
export default function Home() {
  const [firstPlayerData, setFirstPlayerData] = useState({
    name: "Player 1",
    score: 12,
  });
  const [firstPlayerHistory, setFirstPlayerHistory] = useState<string[]>([]);

  const [secondPlayerData, setSecondPlayerData] = useState({
    name: "Player 2",
    score: 5,
  });
  const [secondPlayerHistory, setSecondPlayerHistory] = useState<string[]>([]);

  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);

  const [openEndFrameDialog, setOpenEndFrameDialog] = useState(false);

  //functions
  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  function getBallColor(value: number) {
    const colors: { [key: number]: string } = {
      1: "#ff0000", // Red
      2: "#ffff00", // Yellow
      3: "#008000", // Green
      4: "#a52a2a", // Brown
      5: "#0000ff", // Blue
      6: "#ffc0cb", // Pink
      7: "#000000", // Black
    };

    return colors[value] || "#ffffff";
  }

  function handlePlayerSelection(player: string) {
    if (selectedPlayer === player) {
      // If the same player is clicked again, clear the selection
      setSelectedPlayer(null);
    } else {
      setSelectedPlayer(player);
    }
  }

  function handleScoreChange(value: number) {
    // if (selectedPlayer === "player1") {
    //   setFirstPlayerData({
    //     ...firstPlayerData,
    //     score: firstPlayerData.score + value,
    //   });
    //   setFirstPlayerHistory([...firstPlayerHistory, `+${value}`]);
    // } else if (selectedPlayer === "player2") {
    //   setSecondPlayerData({
    //     ...secondPlayerData,
    //     score: secondPlayerData.score + value,
    //   });
    //   setSecondPlayerHistory([...secondPlayerHistory, `+${value}`]);
    // }
    if (selectedPlayer) {
      if (selectedPlayer === firstPlayerData.name) {
        setFirstPlayerData({
          ...firstPlayerData,
          score: firstPlayerData.score + value,
        });
        setFirstPlayerHistory([...firstPlayerHistory, `+${value}`]);
      } else {
        setSecondPlayerData({
          ...secondPlayerData,
          score: secondPlayerData.score + value,
        });
        setSecondPlayerHistory([...secondPlayerHistory, `+${value}`]);
      }
    }
    setSelectedPlayer(null);
  }

  function handleFoul() {
    if (selectedPlayer) {
      if (selectedPlayer === firstPlayerData.name) {
        setFirstPlayerData({
          ...firstPlayerData,
          score: firstPlayerData.score - 4,
        });
        setFirstPlayerHistory([...firstPlayerHistory, `-4`]);
      } else {
        setSecondPlayerData({
          ...secondPlayerData,
          score: secondPlayerData.score - 4,
        });
        setSecondPlayerHistory([...secondPlayerHistory, `-4`]);
      }
    }
    setSelectedPlayer(null);
  }

  const handleOpenEndFrameDialog = () => {
    setOpenEndFrameDialog(true);
  };

  const handleConfirmEndFrame = () => {
    // Resetting all the states
    setFirstPlayerData({ name: firstPlayerData.name, score: 0 });
    setSecondPlayerData({ name: secondPlayerData.name, score: 0 });
    setFirstPlayerHistory([]);
    setSecondPlayerHistory([]);
    setSelectedPlayer(null);
    setOpenEndFrameDialog(false);
  };

  return (
    <Stack direction="column" spacing={2} p={5}>
      <Grid container spacing={2}>
        {/* Player 1 Section */}
        <Grid
          item
          xs={6}
          sx={{
            border: "1px solid #000",
            borderRadius: "10px",
            borderTopRightRadius: "0",
            borderBottomRightRadius: "0",
            padding: "1rem",
            backgroundColor:
              selectedPlayer === firstPlayerData.name ? "gray" : "white",
            cursor: "pointer",
          }}
          onClick={() => handlePlayerSelection(firstPlayerData.name)}
        >
          <Stack alignItems="center" spacing={1}>
            <Avatar
              {...stringAvatar(firstPlayerData.name)}
              sx={{
                width: 100,
                height: 100,
                border:
                  selectedPlayer === firstPlayerData.name
                    ? "4px solid #000"
                    : "",
              }}
            />
            <Typography variant="h5" fontWeight="bold">
              {firstPlayerData.name}
            </Typography>
            <Typography fontWeight="bold" sx={{ fontSize: "6rem" }}>
              {firstPlayerData.score}
            </Typography>
            <Typography variant="h6">{firstPlayerData.name} History</Typography>
            <Grid
              container
              spacing={1}
              sx={{
                minWidth: "4rem",
                minHeight: "6rem",
                border: "1px solid #000",
                borderRadius: "10px",
              }}
            >
              {firstPlayerHistory.map((action, index) => (
                <Grid item xs={3} key={index}>
                  <Box
                    sx={{
                      width: 30,
                      height: 30,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor:
                        action.charAt(0) === "+"
                          ? getBallColor(parseInt(action.charAt(1)))
                          : "orange",
                      color: "#fff",
                      textAlign: "center",
                      borderRadius: "50%",
                    }}
                  >
                    <Typography>{action}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Grid>

        {/* Player 2 Section */}
        <Grid
          item
          xs={6}
          sx={{
            border: "1px solid #000",
            borderRadius: "10px",
            borderTopLeftRadius: "0",
            borderBottomLeftRadius: "0",
            padding: "1rem",
            backgroundColor:
              selectedPlayer === secondPlayerData.name ? "gray" : "white",
            cursor: "pointer",
          }}
          onClick={() => handlePlayerSelection(secondPlayerData.name)}
        >
          <Stack alignItems="center" spacing={1}>
            <Avatar
              {...stringAvatar(secondPlayerData.name)}
              sx={{
                width: 100,
                height: 100,
                border:
                  selectedPlayer === secondPlayerData.name
                    ? "4px solid #000"
                    : "",
              }}
            />
            <Typography variant="h5" fontWeight="bold">
              {secondPlayerData.name}
            </Typography>
            <Typography fontWeight="bold" sx={{ fontSize: "6rem" }}>
              {secondPlayerData.score}
            </Typography>
            <Typography variant="h6">
              {secondPlayerData.name} History
            </Typography>
            <Grid
              container
              spacing={1}
              sx={{
                minWidth: "4rem",
                minHeight: "6rem",
                border: "1px solid #000",
                borderRadius: "10px",
              }}
            >
              {secondPlayerHistory.map((action, index) => (
                <Grid item xs={3} key={index}>
                  <Box
                    sx={{
                      width: 30,
                      height: 30,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor:
                        action.charAt(0) === "+"
                          ? getBallColor(parseInt(action.charAt(1)))
                          : "orange",
                      color: "#fff",
                      textAlign: "center",
                      borderRadius: "50%",
                    }}
                  >
                    <Typography>{action}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {[1, 2, 3, 4, 5, 6, 7].map((value) => (
          <Grid item xs={3} key={value}>
            <Avatar
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                backgroundColor: getBallColor(value),
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
                margin: "0 auto",
                cursor: "pointer",
              }}
              onClick={() => handleScoreChange(value)}
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  backgroundColor: "white",
                  color: "black",
                }}
              >
                <Typography fontWeight="bold" sx={{ fontSize: "1.5rem" }}>
                  {value}
                </Typography>
              </Box>
            </Avatar>
          </Grid>
        ))}
        {/* Foul Ball */}
        <Grid item xs={3}>
          <Avatar
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              backgroundColor: "orange",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
              margin: "0 auto",
              cursor: "pointer",
            }}
            onClick={handleFoul}
          >
            <Typography
              fontWeight="bold"
              sx={{ fontSize: "1.5rem", color: "white" }}
            >
              Foul
            </Typography>
          </Avatar>
        </Grid>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={handleOpenEndFrameDialog}
          sx={{ marginTop: "2rem" }}
        >
          End Frame
        </Button>
      </Grid>
      <Dialog
        open={openEndFrameDialog}
        onClose={() => setOpenEndFrameDialog(false)}
        aria-labelledby="end-frame-dialog-title"
      >
        <DialogTitle id="end-frame-dialog-title">Confirm End Frame</DialogTitle>
        <DialogContent>
          <DialogContentText>
            เมื่อกดปุ่ม ตกลง จะสิ้นสุด frame นี้ และรีเซ็ตค่าทั้งหมด
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEndFrameDialog(false)}>ยกเลิก</Button>
          <Button onClick={handleConfirmEndFrame} autoFocus>
            ตกลง
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
