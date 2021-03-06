import React from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {

    const { level } = React.useContext(ChallengesContext)

    return (
        <div className={styles.profileContainer} >
            <img src="https://github.com/GabrielRuivo.png" alt="Gabriel Ruivo" />
            <div>
                <strong>Gabriel Ruivo</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level {level}
                </p>
            </div>
        </div>
    );
}