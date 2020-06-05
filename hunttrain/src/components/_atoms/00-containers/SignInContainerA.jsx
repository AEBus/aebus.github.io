import React from 'react';
import firebase from 'firebase/app';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import 'firebase/auth';

import ClipSpinnerA from '@A/06-spinners/ClipSpinnerA';

const SignInContainerA = props => {
    const { isLoading, config } = props;
    return (
        <>
            {config || isLoading ?
                <StyledFirebaseAuth
                    uiConfig={config}
                    firebaseAuth={firebase.auth()}
                />
                :
                <ClipSpinnerA />
            }
        </>
    );
};

export default SignInContainerA;