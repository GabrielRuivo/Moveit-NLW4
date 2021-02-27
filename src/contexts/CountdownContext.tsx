import React, { createContext } from 'react';
import { ChallengesContext } from './ChallengesContext';

let countdownTimeout: NodeJS.Timeout;

interface CountdownProviderProps {
    children: React.ReactNode;
}

interface CountdownContextData {
    minutes: number,
    seconds: number,
    hasFinished: boolean,
    isActive: boolean,
    startCountdown: () => void,
    resetCountdown: () => void,
}

export const CountdownContext = createContext({} as CountdownContextData)

export function CountdownProvider({ children }: CountdownProviderProps) {

    const { startNewChallenge } = React.useContext(ChallengesContext);

    const [ time, setTime ] = React.useState(0.05 * 60);
    const [ isActive, setIsActive ] = React.useState(false);
    const [ hasFinished, setHasFinished ] = React.useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdown() {
        setIsActive(true)
    }
    
    function resetCountdown() {
        clearTimeout(countdownTimeout)
        setIsActive(false);
        setHasFinished(false);
        setTime(0.05 * 60);
    }

    React.useEffect(() => {
        if(isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        }
        if(isActive && time === 0 ) {
            setHasFinished(true)
            setIsActive(false)
            startNewChallenge();
        }
    }, [isActive, time])

    return (
        <CountdownContext.Provider 
            value={{
                minutes,
                seconds,
                hasFinished,
                isActive,
                startCountdown,
                resetCountdown
            }} 
        >
            {children}
        </CountdownContext.Provider>
    );
}