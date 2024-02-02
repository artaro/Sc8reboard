"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
export default function Home() {
  const [firstPlayerData, setFirstPlayerData] = useState<any>({
    name: "Player 1",
    score: 0,
  });

  const [firstPlayerHistory, setFirstPlayerHistory] = useState<any>([]);

  const [secondPlayerData, setSecondPlayerData] = useState<any>({
    name: "Player 2",
    score: 0,
  });

  const [secondPlayerHistory, setSecondPlayerHistory] = useState<any>([]);

  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);

  const [isEditingFirstPlayer, setIsEditingFirstPlayer] = useState(false);
  const [isEditingSecondPlayer, setIsEditingSecondPlayer] = useState(false);

  const [openEndFrameDialog, setOpenEndFrameDialog] = useState(false);
  const [isClient, setIsClient] = useState(false);

  let pressTimer = useRef<NodeJS.Timeout | null>(null);

  const longPressTriggeredRef = useRef(false);
  const firstPlayerInputRef = useRef<HTMLInputElement>(null);
  const secondPlayerInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // This effect runs once on component mount, i.e., on the client side
    setIsClient(true); // Set isClient to true to indicate client-side rendering

    const firstPlayerDataSaved = localStorage.getItem("firstPlayerData");

    if (firstPlayerDataSaved) {
      setFirstPlayerData(JSON.parse(firstPlayerDataSaved));
    }

    const secondPlayerDataSaved = localStorage.getItem("secondPlayerData");
    if (secondPlayerDataSaved) {
      setSecondPlayerData(JSON.parse(secondPlayerDataSaved));
    }

    // Retrieving player histories
    const firstPlayerHistorySaved = localStorage.getItem("firstPlayerHistory");
    if (firstPlayerHistorySaved) {
      setFirstPlayerHistory(JSON.parse(firstPlayerHistorySaved));
    }

    const secondPlayerHistorySaved = localStorage.getItem(
      "secondPlayerHistory"
    );
    if (secondPlayerHistorySaved) {
      setSecondPlayerHistory(JSON.parse(secondPlayerHistorySaved));
    }
  }, []);

  useEffect(() => {
    // When component unmounts, clear the timeout to prevent memory leaks
    return () => {
      if (pressTimer.current) {
        clearTimeout(pressTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isEditingFirstPlayer) {
      firstPlayerInputRef.current?.focus();
    } else if (isEditingSecondPlayer) {
      secondPlayerInputRef.current?.focus();
    }
  }, [isEditingFirstPlayer, isEditingSecondPlayer]);

  if (!isClient) {
    // Optionally, return null or a loading state until client-side updates complete
    return null; // or loading component
  }
  //functions

  function getBallColor(value: number) {
    const colors: { [key: number]: string } = {
      1: "#ea3a3a", // Red
      2: "#d0b13e", // Yellow
      3: "#196f3d", // Green
      4: "#994D1C", // Brown
      5: "#4758d6", // Blue
      6: "#db9ca9", // Pink
      7: "#292a2a", // Black
    };

    return colors[value] || "#ffffff";
  }

  const handleLongPressStart = (playerName: string) => {
    longPressTriggeredRef.current = false;
    pressTimer.current = setTimeout(() => {
      longPressTriggeredRef.current = true;
      if (playerName === firstPlayerData.name) {
        setIsEditingFirstPlayer(true);
      } else {
        setIsEditingSecondPlayer(true);
      }
    }, 1000); // 1 second delay
  };

  const handleLongPressEnd = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
    }
  };

  function handlePlayerSelection(player: string) {
    
      if(selectedPlayer){
        setSelectedPlayer(null)
      }
setSelectedPlayer(player);
    
  }

  function handleScoreChange(value: number) {
    if (selectedPlayer) {
      if (selectedPlayer === firstPlayerData.name) {
        const updatedScore = firstPlayerData.score + value;
        const updatedHistory = [...firstPlayerHistory, `+${value}`];

        setFirstPlayerData((prev: any) => ({ ...prev, score: updatedScore }));
        setFirstPlayerHistory(updatedHistory);

        // Save to localStorage
        localStorage.setItem(
          "firstPlayerData",
          JSON.stringify({ ...firstPlayerData, score: updatedScore })
        );
        localStorage.setItem(
          "firstPlayerHistory",
          JSON.stringify(updatedHistory)
        );
      } else {
        const updatedScore = secondPlayerData.score + value;
        const updatedHistory = [...secondPlayerHistory, `+${value}`];

        setSecondPlayerData((prev: any) => ({ ...prev, score: updatedScore }));
        setSecondPlayerHistory(updatedHistory);

        // Save to localStorage
        localStorage.setItem(
          "secondPlayerData",
          JSON.stringify({ ...secondPlayerData, score: updatedScore })
        );
        localStorage.setItem(
          "secondPlayerHistory",
          JSON.stringify(updatedHistory)
        );
      }
    }
    setSelectedPlayer(null);
  }

  function handleFoul() {
    if (selectedPlayer) {
      if (selectedPlayer === firstPlayerData.name) {
        const updatedScore = firstPlayerData.score - 4;
        const updatedHistory = [...firstPlayerHistory, `-4`];

        setFirstPlayerData((prev: any) => ({ ...prev, score: updatedScore }));
        setFirstPlayerHistory(updatedHistory);

        // Save to localStorage
        localStorage.setItem(
          "firstPlayerData",
          JSON.stringify({ ...firstPlayerData, score: updatedScore })
        );
        localStorage.setItem(
          "firstPlayerHistory",
          JSON.stringify(updatedHistory)
        );
      } else {
        const updatedScore = secondPlayerData.score - 4;
        const updatedHistory = [...secondPlayerHistory, `-4`];

        setSecondPlayerData((prev: any) => ({ ...prev, score: updatedScore }));
        setSecondPlayerHistory(updatedHistory);

        // Save to localStorage
        localStorage.setItem(
          "secondPlayerData",
          JSON.stringify({ ...secondPlayerData, score: updatedScore })
        );
        localStorage.setItem(
          "secondPlayerHistory",
          JSON.stringify(updatedHistory)
        );
      }
    }
    setSelectedPlayer(null);
  }

  const handleOpenEndFrameDialog = () => {
    setOpenEndFrameDialog(true);
  };

  const handleConfirmEndFrame = () => {
    // Resetting all the states

    // reset local storage
    localStorage.setItem(
      "firstPlayerData",
      JSON.stringify({ ...firstPlayerData, score: 0 })
    );
    localStorage.setItem(
      "secondPlayerData",
      JSON.stringify({ ...secondPlayerData, score: 0 })
    );
    localStorage.setItem("firstPlayerHistory", JSON.stringify([]));
    localStorage.setItem("secondPlayerHistory", JSON.stringify([]));

    setFirstPlayerData({ name: firstPlayerData.name, score: 0 });
    setSecondPlayerData({ name: secondPlayerData.name, score: 0 });
    setFirstPlayerHistory([]);
    setSecondPlayerHistory([]);
    setSelectedPlayer(null);
    setOpenEndFrameDialog(false);
  };

  return (
    <Stack
      direction="column"
      spacing={2}
      alignItems="center"
      sx={{
        width: "100vw",
        height: "100vh",
        overflow: "auto",
        padding: 3,
        boxSizing: "border-box",
      }}
    >
      <Grid
        container
        sx={{
          height: "auto",
          flexGrow: 1,
          padding: 2,
        }}
      >
        {/* Player 1 Section */}
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            boxShadow:
              selectedPlayer === firstPlayerData.name
                ? "rgba(71, 88, 214, 0.4) -5px 5px, rgba(71, 88, 214, 0.3) -10px 10px, rgba(71, 88, 214, 0.2) -15px 15px, rgba(71, 88, 214, 0.1) -20px 20px, rgba(71, 88, 214, 0.05) -25px 25px"
                : "none",
            cursor: "pointer",
            borderRight: "1px solid gray",
          }}
          onClick={() => handlePlayerSelection(firstPlayerData.name)}
        >
          <Stack alignItems="center" spacing={1}>
            <Avatar
              alt={firstPlayerData.name}
              sx={{
                backgroundColor: "#4758d6",
                width: { xs: 80, sm: 100, md: 120 },
                height: { xs: 80, sm: 100, md: 120 },
                boxShadow:
                  selectedPlayer === firstPlayerData.name
                    ? "rgba(71, 88, 214, 0.4) -5px 5px, rgba(71, 88, 214, 0.3) -10px 10px"
                    : "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
                cursor: "pointer",
              }}
            />
            <Box
onMouseDown={() => handleLongPressStart(firstPlayerData.name)}
          onMouseUp={handleLongPressEnd}
          onMouseLeave={handleLongPressEnd} // To handle cases where the mouse leaves the element before releasing
          onTouchStart={() => handleLongPressStart(firstPlayerData.name)}
          onTouchEnd={handleLongPressEnd}
>
            <TextField
              inputRef={firstPlayerInputRef}
              disabled={!isEditingFirstPlayer}
              onFocus={()=>setSelectedPlayer(null)}
              onBlur={() => {
                setIsEditingFirstPlayer(false);
                // save to local storage
                localStorage.setItem(
                  "firstPlayerData",
                  JSON.stringify(firstPlayerData)
                );
              }}
              value={firstPlayerData.name}
              onChange={(e) =>
                setFirstPlayerData({ ...firstPlayerData, name: e.target.value })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setIsEditingFirstPlayer(false);
                  // save to local storage
                  localStorage.setItem(
                    "firstPlayerData",
                    JSON.stringify(firstPlayerData)
                  );
                }
              }}
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
              sx={{
                width: "fit-content",
                "& .MuiInput-root:before, & .MuiInput-root:after": {
                  display: "none",
                },
                "& .MuiInput-root:hover:not(.Mui-disabled):before": {
                  borderBottom: "none",
                },
              }}
            />
            </Box>
            <Typography
              fontWeight="bold"
              sx={{ fontSize: "5rem", color: "#4758d6" }}
            >
              {firstPlayerData.score}
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              History
            </Typography>
            {/* first player history */}
            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "center",
                padding: 1.5,
              }}
            >
              {firstPlayerHistory.map((action: any, index: number) => (
                <Box
                  key={index}
                  sx={{
                    width: 30,
                    height: 30,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor:
                      action.charAt(0) === "+"
                        ? getBallColor(parseInt(action.charAt(1)))
                        : "#ffffff",
                    color: action.charAt(0) === "+" ? "#ffffff" : "red",
                    border:
                      action.charAt(0) === "+" ? "none" : "2px dashed red",
                    textAlign: "center",
                    borderRadius: "50%",
                    margin: 0.25,
                    boxShadow:
                      "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
                  }}
                >
                  <Typography
                    fontSize={12}
                    fontStyle="italic"
                    fontWeight="bold"
                  >
                    {action}
                  </Typography>
                </Box>
              ))}
            </Grid>
          </Stack>
        </Grid>
        {/* Player 2 Section */}
        <Grid
          item
          xs={6}
          onMouseDown={() => handleLongPressStart(secondPlayerData.name)}
          onMouseUp={handleLongPressEnd}
          onMouseLeave={handleLongPressEnd} // To handle cases where the mouse leaves the element before releasing
          onTouchStart={() => handleLongPressStart(secondPlayerData.name)}
          onTouchEnd={handleLongPressEnd}
          sx={{
            display: "flex",
            flexDirection: "column",
            boxShadow:
              selectedPlayer === secondPlayerData.name
                ? "rgba(234, 58, 58, 0.4) 5px 5px, rgba(234, 58, 58, 0.3) 10px 10px, rgba(234, 58, 58, 0.2) 15px 15px, rgba(234, 58, 58, 0.1) 20px 20px, rgba(234, 58, 58, 0.05) 25px 25px"
                : "none",
            cursor: "pointer",
          }}
          onClick={() => handlePlayerSelection(secondPlayerData.name)}
        >
          <Stack alignItems="center" spacing={1}>
            <Avatar
              alt={secondPlayerData.name}
              sx={{
                backgroundColor: "#ea3a3a",
                width: { xs: 80, sm: 100, md: 120 },
                height: { xs: 80, sm: 100, md: 120 },
                boxShadow:
                  selectedPlayer === secondPlayerData.name
                    ? "rgba(234, 58, 58, 0.4) 5px 5px, rgba(234, 58, 58, 0.3) 10px 10px"
                    : "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
                cursor: "pointer",
              }}
            />
<Box
onMouseDown={() => handleLongPressStart(secondPlayerData.name)}
          onMouseUp={handleLongPressEnd}
          onMouseLeave={handleLongPressEnd} // To handle cases where the mouse leaves the element before releasing
          onTouchStart={() => handleLongPressStart(secondPlayerData.name)}
          onTouchEnd={handleLongPressEnd}
>
            <TextField
              inputRef={secondPlayerInputRef}
              disabled={!isEditingSecondPlayer}
onFocus={()=> setSelectedPlayer(null)}
              onBlur={() => {
                setIsEditingSecondPlayer(false);
                localStorage.setItem(
                  "secondPlayerData",
                  JSON.stringify(secondPlayerData)
                );
              }}
              value={secondPlayerData.name}
              onChange={(e) =>
                setSecondPlayerData({
                  ...secondPlayerData,
                  name: e.target.value,
                })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setIsEditingSecondPlayer(false);
                  localStorage.setItem(
                    "secondPlayerData",
                    JSON.stringify(secondPlayerData)
                  );
                }
              }}
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
              sx={{
                width: "fit-content",
                "& .MuiInput-root:before, & .MuiInput-root:after": {
                  display: "none",
                },
                "& .MuiInput-root:hover:not(.Mui-disabled):before": {
                  borderBottom: "none",
                },
              }}
            /></Box>
            <Typography
              fontWeight="bold"
              sx={{ fontSize: "5rem", color: "#ea3a3a" }}
            >
              {secondPlayerData.score}
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              History
            </Typography>
            {/* sec player history */}
            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "center",
                padding: 1.5,
              }}
            >
              {secondPlayerHistory.map((action: any, index: number) => (
                <Box
                  key={index}
                  sx={{
                    width: 30,
                    height: 30,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor:
                      action.charAt(0) === "+"
                        ? getBallColor(parseInt(action.charAt(1)))
                        : "#ffffff",
                    color: action.charAt(0) === "+" ? "#ffffff" : "red",
                    border:
                      action.charAt(0) === "+" ? "none" : "2px dashed red",
                    textAlign: "center",
                    borderRadius: "50%",
                    margin: 0.25,
                    boxShadow:
                      "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
                  }}
                >
                  <Typography
                    fontSize={12}
                    fontStyle="italic"
                    fontWeight="bold"
                  >
                    {action}
                  </Typography>
                </Box>
              ))}
            </Grid>
          </Stack>
        </Grid>
      </Grid>
      {/* score balls */}
      <Grid container spacing={2} display="flex" justifyContent="center">
        {[1, 2, 3, 4, 5, 6, 7].map((value) => (
          <Grid item xs={3} key={value}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                backgroundColor: getBallColor(value),
                boxShadow:
                  selectedPlayer === firstPlayerData.name
                    ? "rgba(71, 88, 214, 0.4) -5px 5px, rgba(71, 88, 214, 0.3) -10px 10px"
                    : selectedPlayer === secondPlayerData.name
                    ? "rgba(234, 58, 58, 0.4) 5px 5px, rgba(234, 58, 58, 0.3) 10px 10px"
                    : "rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.01) 0px 4px 2px, rgba(0, 0, 0, 0.15) 0px 8px 4px, rgba(0, 0, 0, 0.01) 0px 16px 8px, rgba(0, 0, 0, 0.01) 0px 32px 16px",
                cursor: "pointer",
              }}
              onClick={() => handleScoreChange(value)}
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: "white",
                  color: "black",
                }}
              >
                <Typography fontWeight="bold" sx={{ fontSize: "1.25rem" }}>
                  {value}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
        {/* Foul Ball */}
        <Grid item xs={3}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              backgroundColor: "#ffffff",
              border: "3px dashed red",
              boxShadow:
                selectedPlayer === firstPlayerData.name
                  ? "rgba(71, 88, 214, 0.4) -5px 5px, rgba(71, 88, 214, 0.3) -10px 10px"
                  : selectedPlayer === secondPlayerData.name
                  ? "rgba(234, 58, 58, 0.4) 5px 5px, rgba(234, 58, 58, 0.3) 10px 10px"
                  : "rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.01) 0px 4px 2px, rgba(0, 0, 0, 0.2) 0px 8px 4px, rgba(0, 0, 0, 0.01) 0px 16px 8px, rgba(0, 0, 0, 0.08) 0px 32px 16px",
              cursor: "pointer",
            }}
            onClick={handleFoul}
          >
            <Typography
              fontWeight="bold"
              sx={{ fontSize: "1rem", color: "red" }}
            >
              Foul
            </Typography>
          </Box>
        </Grid>
        <Grid xs={12} sm={6} marginTop={2}>
          <Button
            fullWidth
            onClick={handleOpenEndFrameDialog}
            sx={{
              mt: 2, // Margin top for spacing above the button
              py: { xs: 1, sm: 2 }, // Padding vertical, more touch-friendly on smaller screens
              boxShadow:
                "rgba(0, 0, 0, 0.12) 0px 10px 20px, rgba(0, 0, 0, 0.1) 0px 3px 3px",
              ":hover": {
                boxShadow: "none",
              },
            }}
          >
            <Typography fontWeight="bold" color="#303333">
              End Frame
            </Typography>
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={openEndFrameDialog}
        onClose={() => setOpenEndFrameDialog(false)}
        aria-labelledby="end-frame-dialog-title"
        sx={{
          "& .MuiDialog-paper": {
            width: "100%",
            maxWidth: { xs: 300, sm: 400 },
          },
        }}
      >
        <DialogTitle id="end-frame-dialog-title">Confirm End Frame</DialogTitle>
        <DialogContent>
          <DialogContentText>
            เมื่อกดปุ่มตกลงจะสิ้นสุด frame นี้ และรีเซ็ตค่าทั้งหมด
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
