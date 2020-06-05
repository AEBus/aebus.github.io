import React, { useContext } from 'react';
import styled from 'styled-components';

import { serverList } from 'Utils/servers';

const Container = styled.div`
    display: flex;
    flex-flow: row;
    align-content: center;
    margin-bottom: 1.125rem;
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

import { DispatchContext, StateContext } from '../../../App';

const ServerSelectA = () => {
    const state = useContext(StateContext);
    const dispatch = useContext(DispatchContext);

    const { formServer } = state;

    const handleServer = e => {
        e.preventDefault();
        const target = e.target;
        const val = target.value;
        dispatch({ type: 'formServer', server: val });
    };

    return (
        <Container>
            <Select onChange={handleServer} name='server' value={formServer} required>
                <Option value={'default'}>World server</Option>
                {serverList.map(server => {
                    const rdmKey = Math.random()
                        .toString(36)
                        .substring(7);
                    return (
                        <Option
                            key={rdmKey}
                            value={server}
                        >
                            {server}
                        </Option>
                    );
                })}
            </Select>
        </Container>
    );
};

export default ServerSelectA;