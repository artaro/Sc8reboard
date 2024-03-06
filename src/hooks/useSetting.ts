import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash'

export interface IHistory {
    id: string;
    type: string;
    value: number;
}

export interface IFrame {
    id: string;
    isWinner: boolean;
}
export interface IPlayer {
    id: string;
    name: string;
    score: number;
    history: IHistory[];
    frame?: IFrame[];
    frameWins: number
}

export const defaultPlayerValue = [
    {
        id: '3a277084-c90b-422f-aebb-d13fe11c0e21',
        name: 'Player 1',
        score: 0,
        history: [],
        frameWins: 0
    },
    {
        id: '233978c8-fb30-4340-b7c4-f594d8e332ca',
        name: 'Player 2',
        score: 0,
        history: [],
        frameWins: 0
    }
]

type settingProps = {
    player: IPlayer[];
    setPlayer: React.Dispatch<React.SetStateAction<IPlayer[]>>;
    selectedPlayer: string | null;
    setSelectedPlayer: React.Dispatch<React.SetStateAction<string | null>>;
}

export const useSetting = (props?: settingProps) => {

    const [player, setPlayer] = useState<IPlayer[]>(props?.player || []);
    const [selectedPlayer, setSelectedPlayer] = useState<string | null>(props?.selectedPlayer || null);

    useEffect(() => {
        const storedPlayer = localStorage.getItem("player");

        if (storedPlayer) {
            setPlayer(JSON.parse(storedPlayer));
        } else {
            setPlayer(defaultPlayerValue);
        }
    }, [])

    useEffect(() => {
        if (!isEmpty(player)) {
            localStorage.setItem("player", JSON.stringify(player));
        }
    }, [player]);

    const getLeadingScore = (): { id: string | null; name: string | null; lead_score: number } => {
        if (isEmpty(player)) return { id: null, name: null, lead_score: 0 };

        let leadingPlayerIndex = 0;
        let lowestPlayerIndex = 0;

        for (let i = 1; i < player.length; i++) {
            if (player[i].score > player[leadingPlayerIndex].score) {
                leadingPlayerIndex = i;
            } else if (player[i].score < player[lowestPlayerIndex].score) {
                lowestPlayerIndex = i;
            }
        }

        const leadScore = player[leadingPlayerIndex].score - player[lowestPlayerIndex].score;

        if (leadScore === 0) return { id: null, name: null, lead_score: 0 };

        return { id: player[leadingPlayerIndex].id, name: player[leadingPlayerIndex].name, lead_score: leadScore };
    };



    const getLeadingFrameWon = (): { id: string | null; name: string | null; lead_frame: number } => {

        if (isEmpty(player)) return { id: null, name: null, lead_frame: 0 };

        let leadingPlayerIndex = 0;
        let lowestPlayerIndex = 0;

        for (let i = 1; i < player.length; i++) {
            if (player[i].frameWins > player[leadingPlayerIndex].frameWins) {
                leadingPlayerIndex = i;
            } else if (player[i].frameWins < player[lowestPlayerIndex].frameWins) {
                lowestPlayerIndex = i;
            }
        }

        const leadFrame = player[leadingPlayerIndex].frameWins - player[lowestPlayerIndex].frameWins;

        if (leadFrame === 0) return { id: null, name: null, lead_frame: 0 };

        return { id: player[leadingPlayerIndex].id, name: player[leadingPlayerIndex].name, lead_frame: leadFrame };
    };

    const { id: leadId, name: leadName, lead_score: leadScore } = getLeadingScore();

    const { id: leadFrameId, name: leadFrameName, lead_frame: leadFrame } = getLeadingFrameWon();



    return {
        player,
        setPlayer,
        selectedPlayer,
        setSelectedPlayer,
        leadId,
        leadName,
        leadScore,
        leadFrameId,
        leadFrameName,
        leadFrame,
    }
}