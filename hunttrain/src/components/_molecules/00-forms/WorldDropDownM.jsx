import React, { useContext } from 'react';
import Axios from 'axios';
import styled from 'styled-components';

import { DispatchContext, StateContext } from '../../../App';

const Container = styled.div`
    display: flex;
    flex-flow: row;
    justify-content: space-evently;

`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin: .313rem;
    flex-flow: column;
    
`;

const Label = styled.label`
    font-family: ${props => props.theme.ff};
    line-spacing: ${props => props.theme.ls};
    color: ${props => props.theme.fntClr};
`;

const Select = styled.select`
    display: flex;
    outline: none;

    &:focus,
    &:clicked,
    &:active {
        outline: none;
    }
`;

const Option = styled.option`

`;

const WorldDropDownM = () => {
    const state = useContext(StateContext);
    const dispatch = useContext(DispatchContext);

    const { allWorlds, allDatacenters, datacenter, world } = state;

    // dispatch after axios call that sets worlds for fetched DC.
    const handleDC = e => {
        e.preventDefault()
        const target = e.target;
        const dc = target.value;
        const lowerCaseDC = dc.toLowerCase();
        if (dc === 'Select a datacenter...') return;
        Axios.get(`/resources/stubs/${lowerCaseDC}_worlds.json`)
            .then(res => {
                const worlds = res.data.worlds;
                dispatch({ type: 'datacenter', worlds: worlds, dc: dc }); // DC will be used in dc manager to select webhook.
            });
    };

    // dispatch that sets value to state that can be used for the discord message. JUST NEED WORLD
    const handleWorld = e => {
        e.preventDefault();
        const target = e.target;
        const world = target.value;
        dispatch({ type: 'world', world: world });
    };
    // dispatch for selected world.

    return (
        <>
            <Container>
                <Wrapper>
                    <Label>data center:</Label>
                    <Select onChange={handleDC} value={datacenter}>
                        <Option value={'select'}>select</Option>
                        {allDatacenters.map(dc => {
                            const rdmKey = Math.random()
                                .toString(36)
                                .substring(7);
                            return (
                                <Option
                                    key={rdmKey}
                                    value={dc}
                                >
                                    {dc}
                                </Option>
                            )
                        })}
                    </Select>
                </Wrapper>
            </Container>
            <Container>
                <Wrapper>
                    <Label>world server:</Label>
                    <Select onChange={handleWorld} value={world}>
                        <Option value={'select'}>select</Option>
                        {allWorlds &&
                            allWorlds.map(world => {
                                const rdmKey = Math.random()
                                    .toString(36)
                                    .substring(7);
                                return (
                                    <Option
                                        key={rdmKey}
                                        value={world}
                                    >
                                        {world}
                                    </Option>
                                )
                            })
                        }
                    </Select>
                </Wrapper>
            </Container>
        </>
    );
};

export default WorldDropDownM;