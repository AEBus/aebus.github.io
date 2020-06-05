import React, { useContext, useEffect } from 'react';
import Axios from 'axios';
import styled from 'styled-components';

import { StateContext, DispatchContext } from '../../../App';
import discordSwitch from 'Utils/discordSwitch';

import { discordConfig } from 'Utils/discordConfig';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faDiscord);

const Button = styled.button`
    display: inline-flex;
    align-self: center;
    justify-content: center;
    color: #7289DA;
    background-color: #FFFFFF;
    background-position: center;
    border: none;
    border-radius: 10%;
    padding: 0;
    outline: none;
    width: 1.763rem;
    height: 1.975rem;
    margin: 0 .313rem;
    background-size: 30%;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};

    &:active {
        color: #6E87D8;
    }
`;

const DiscordButtonA = () => {
    const state = useContext(StateContext);
    const dispatch = useContext(DispatchContext);
    const { userData, currentStop, datacenter, dataCenterURL, routeData, world } = state;
    let verified;

    if (userData) {
        verified = userData.verified;
    };

    useEffect(() => {
        const discordUrl = discordSwitch(datacenter);
        dispatch({ type: 'dataCenterURL', url: discordUrl })
    }, [datacenter]);

    const handlePing = () => {
        if (routeData[currentStop] === undefined) return;
        if (!dataCenterURL) return;
        if (world === '') return;

        const { zone, instance, coords } = routeData[currentStop];

        const data = `${world} train @ ${zone} ${coords} i${instance}`
        const centurio = {
            method: 'POST',
            url: `${dataCenterURL}`,
            data: {
                username: 'hunt-conductor',
                content: `${data}`,
                avatar_url: ''
            },
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const coeurl = {
            method: 'POST',
            url: `${discordConfig.coeurlURL}`,
            data: {
                username: 'hunt-conductor',
                content: `${data}`,
                avatar_url: ''
            },
            headers: {
                'Content-Type': 'application/json',
            }
        };

        Axios(centurio);

        if (datacenter === 'Primal') {
            Axios(coeurl);
        };
    }

    // disabled={!verified}
    return (
        <Button disabled={!verified} onClick={handlePing}>
            <FontAwesomeIcon icon={faDiscord} size='3x' />
        </Button>
    );
};

export default DiscordButtonA;