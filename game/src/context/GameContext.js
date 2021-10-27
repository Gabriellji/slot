import React, { createContext, useState } from "react";

import { postRoute, putRoute } from "../helpers/apiFetcher";

const initialState = {
    username: '',
    credits: 0,
    ip: '',
    indexes: [],
    isFinish: false
}

export const GameContext = createContext();

const GameContextProvider = (props) => {
    const [state, setState] = useState(initialState);

    const submitForm = (data) => {
        const newUser = {
            username: data,
        };

        postRoute("http://localhost:4000/game/", newUser)
            .then(({ username, ip, credits }) => {
                setState({ ...state, username, ip, credits });
            })
            .catch((err) =>
                console.error(err)
            );
    };

    const startGame = () => {
        putRoute(`http://localhost:4000/game/${state.ip}`, {})
            .then(({ username, ip, credits, indexes }) => {
                setState({
                    ...state,
                    username,
                    ip,
                    credits,
                    indexes
                });
            })
            .catch((err) => {
                console.error(err)
                setState({
                    ...state,
                    isFinish: true
                });
            });
    };

    return (
        <GameContext.Provider
            value={{
                state,
                setState,
                submitForm,
                startGame
            }}
        >
            {props.children}
        </GameContext.Provider>
    );
};

export default GameContextProvider;