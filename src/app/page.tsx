"use client";
import React, { useEffect, useRef, useState } from "react";
import Player, { FIRST_COLOR, SECOND_COLOR } from "@/components/Player";
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
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { IHistory, IPlayer, useSetting } from "@/hooks/useSetting";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const setting = useSetting();

  const [selectedScore, setSelectedScore] = useState<number | null>(null);

  const [openScoreDialog, setOpenScoreDialog] = useState<boolean>(false);
  const [openFoulDialog, setOpenFoulDialog] = useState<boolean>(false);
  const [openEndFrameDialog, setOpenEndFrameDialog] = useState<boolean>(false);

  function getBallColor(value: number | null) {
    if (!value) {
      return;
    }

    const colors: { [key: number]: string } = {
      1: "#ea3a3a", // Red
      2: "#d0b13e", // Yellow
      3: "#196f3d", // Green
      4: "#994D1C", // Brown
      5: "#4758d6", // Blue
      6: "#db9ca9", // Pink
      7: "#292a2a", // Black
    };

    return colors[value];
  }

  const handleChangeName = (value: string, index: number) => {
    const newPlayerName = [...setting.player];
    newPlayerName[index].name = value;

    setting.setPlayer(newPlayerName);
  };

  const handleOpenScoreDialog = (value: number) => {
    setSelectedScore(value);
    setOpenScoreDialog(true);
  };

  const handleCloseScoreDialog = () => {
    setOpenScoreDialog(false);
    setSelectedScore(null);
  };

  const handleCloseFoulDialog = () => {
    setOpenFoulDialog(false);
  };

  const handleOpenFoulDialog = () => {
    setOpenFoulDialog(true);
  };

  const handleCloseEndFrameDialog = () => {
    setOpenEndFrameDialog(false);
  };
  const handleOpenEndFrameDialog = () => {
    setOpenEndFrameDialog(true);
  };

  const handleConfirmScore = (playerId: string) => {
    if (!selectedScore) return;

    const player = setting.player.find((player) => player.id === playerId);

    if (!player) return;

    const newHistory: IHistory = {
      id: uuidv4(),
      type: "score",
      value: selectedScore,
    };

    player.score = player.score + selectedScore;
    player.history.push(newHistory);
    handleCloseScoreDialog();
  };

  const handleConfirmFoul = (playerId: string) => {
    const player = setting.player.find((player) => player.id === playerId);

    if (!player) return;

    const newHistory: IHistory = {
      id: uuidv4(),
      type: "foul",
      value: 4,
    };

    player.score = player.score - 4;
    player.history.push(newHistory);
    handleCloseFoulDialog();
  };

  const handleConfirmEndFrame = () => {
    //collect each player score
    let winner: string = "";
    const playerScores = setting.player.map((player) => {
      return player.score;
    }) as number[];

    const highestScoreIndex: number = Math.max(...playerScores);

    winner = setting.player[playerScores.indexOf(highestScoreIndex)].id;

    setting.setPlayer(
      setting.player.map((player) => {
        player.score = 0;
        player.history = [];
        player.frame = player.history.map((history) => {
          return {
            id: uuidv4(),
            history: history,
            isWinner: winner === player.id,
          };
        });
        player.frameWon =
          winner === player.id ? player.frameWon + 1 : player.frameWon;

        return player;
      })
    );

    handleCloseEndFrameDialog();
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
      <Stack
        direction="row"
        sx={{
          height: "auto",
          flexGrow: 1,
          padding: 2,
        }}
      >
        {setting.player.map((player: IPlayer, index: number) => (
          <Box key={index}>
            <Player
              id={index}
              name={player.name}
              score={player.score}
              onNameChange={(value) => {
                handleChangeName(value, index);
              }}
            />
            <Stack justifyContent="center" alignItems="center">
              <Typography fontStyle="italic" fontWeight="bold">
                History
              </Typography>
            </Stack>
            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "center",
                padding: 1.5,
              }}
            >
              {player.history.map((item: IHistory) => (
                <Grid
                  key={item.id}
                  sx={{
                    width: 30,
                    height: 30,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: getBallColor(
                      item.type === "score" ? item.value : null
                    ),
                    color: item.type === "score" ? "white" : "red",
                    border: item.type === "score" ? "none" : "2px dashed red",
                    textAlign: "center",
                    borderRadius: "50%",
                    margin: 0.25,
                    boxShadow:
                      "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px",
                  }}
                >
                  <Typography
                    fontSize={12}
                    fontStyle="italic"
                    fontWeight="bold"
                  >
                    {item.type === "score" ? "+" : "-"}
                    {item.value}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Stack>

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
                cursor: "pointer",
              }}
              onClick={() => handleOpenScoreDialog(value)}
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
            sx={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              backgroundColor: "#ffffff",
              border: "3px dashed red",
              cursor: "pointer",
            }}
            onClick={handleOpenFoulDialog}
          >
            <Typography fontSize="1rem" fontWeight="bold" color="red">
              Foul
            </Typography>
          </Box>
        </Grid>
        <Grid container marginTop={2}>
          <Button
            fullWidth
            onClick={handleOpenEndFrameDialog}
            sx={{
              mt: 2,
              py: { xs: 1, sm: 2 },
              boxShadow:
                "rgba(0, 0, 0, 0.12) 0px 10px 20px, rgba(0, 0, 0, 0.1) 0px 3px 3px",
              ":hover": {
                boxShadow: "none",
              },
            }}
          >
            <Typography fontWeight="bold" color={SECOND_COLOR}>
              End Frame
            </Typography>
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={openScoreDialog}
        onClose={handleCloseScoreDialog}
        aria-labelledby="score-dialog"
        sx={{
          "& .MuiDialog-paper": {
            width: "100%",
            maxWidth: { xs: 300, sm: 400 },
          },
        }}
      >
        <DialogContent>
          <Stack spacing={2} alignItems="center">
            <Typography fontWeight="bold">Which player scored?</Typography>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                backgroundColor: getBallColor(selectedScore),
                cursor: "pointer",
              }}
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
                  {selectedScore}
                </Typography>
              </Box>
            </Box>
            <Stack direction="row" spacing={6}>
              {setting.player.map((player: IPlayer, index: number) => (
                <Box key={index} onClick={() => handleConfirmScore(player.id)}>
                  <Player id={index} hideName hideScore />
                </Box>
              ))}
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openFoulDialog}
        onClose={handleCloseFoulDialog}
        aria-labelledby="foul-dialog"
        sx={{
          "& .MuiDialog-paper": {
            width: "100%",
            maxWidth: { xs: 300, sm: 400 },
          },
        }}
      >
        <DialogContent>
          <Stack spacing={2} alignItems="center">
            <Typography fontWeight="bold">Which player foul?</Typography>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              textAlign="center"
              sx={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                backgroundColor: "#ffffff",
                border: "3px dashed red",
                cursor: "pointer",
              }}
              onClick={handleOpenFoulDialog}
            >
              <Typography fontSize="1.rem" fontWeight="bold" color="red">
                Foul
              </Typography>
            </Box>
            <Stack direction="row" spacing={6}>
              {setting.player.map((player: IPlayer, index: number) => (
                <Box key={index} onClick={() => handleConfirmFoul(player.id)}>
                  <Player id={index} hideName hideScore />
                </Box>
              ))}
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openEndFrameDialog}
        onClose={handleCloseEndFrameDialog}
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
          <Button onClick={handleCloseEndFrameDialog}>ยกเลิก</Button>
          <Button onClick={handleConfirmEndFrame} autoFocus>
            ตกลง
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
