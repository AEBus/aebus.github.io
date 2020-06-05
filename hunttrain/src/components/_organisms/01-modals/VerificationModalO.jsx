import React from 'react';

import ModalContainerA from '@A/00-containers/ModalContainerA';
import VerificationGuideA from '@A/08-guide_items/VerificationGuideA';
import VerificationFormM from '@M/00-forms/VerificationFormM';
import ChangeFormM from '@M/00-forms/ChangeFormM';

const VerificationModalO = () => {
    return (
        <ModalContainerA>
            <VerificationGuideA />
            <VerificationFormM />
            <ChangeFormM />
        </ModalContainerA>
    );
};

export default VerificationModalO;