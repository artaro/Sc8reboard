import { useEffect, useState } from 'react';

export interface IHistory {
    id: string;
    type: string;
    value: number;
}

export interface IFrame {
    id: string;
    history: IHistory;
    isWinner: boolean;
}
export interface IPlayer {
    id: string;
    name: string;
    score: number;
    history: IHistory[];
    frame?: IFrame[];
    frameWon: number
}

export const defaultPlayerValue = [
    {
        id: '3a277084-c90b-422f-aebb-d13fe11c0e21',
        name: 'Player 1',
        score: 0,
        history: [],
        frameWon: 0
    },
    {
        id: '233978c8-fb30-4340-b7c4-f594d8e332ca',
        name: 'Player 2',
        score: 0,
        history: [],
        frameWon: 0
    }
]

type settingProps = {
    player: IPlayer[];
    setPlayer: React.Dispatch<React.SetStateAction<IPlayer[]>>;
    selectedPlayer: string | null;
    setSelectedPlayer: React.Dispatch<React.SetStateAction<string | null>>;
}

export const useSetting = (props?: settingProps) => {
    const [player, setPlayer] = useState<IPlayer[]>(props?.player || defaultPlayerValue);
    const [selectedPlayer, setSelectedPlayer] = useState<string | null>(props?.selectedPlayer || null);


    return {
        player,
        setPlayer,
        selectedPlayer,
        setSelectedPlayer,
    }
}