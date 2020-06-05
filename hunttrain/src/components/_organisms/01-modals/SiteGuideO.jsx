import React, { useEffect, useContext } from 'react';
import Axios from 'axios';
import Carousel from 'nuka-carousel';

import GuideSlideM from '@M/01-card_items/GuideSlideM';
import ModalContainerA from '@A/00-containers/ModalContainerA';

import { StateContext, DispatchContext } from '../../../App';

const SiteGuideO = () => {
    const dispatch = useContext(DispatchContext);
    const state = useContext(StateContext);
    const { guideData, slideIndex } = state;

    useEffect(() => {
        Axios.get('/resources/stubs/site_guide.json')
            .then(res => {
                const data = res.data;
                const guideKeys = Object.keys(data);
                let guideSections = [];
                guideKeys.map(key => {
                    guideSections.push(data[key]);
                });
                dispatch({ type: 'guideData', guideData: guideSections });
            })
    }, []);

    if (!guideData) return null;

    return (
        <ModalContainerA carousel={true}>
            <Carousel
                heightMode='current'
                slideIndex={slideIndex}
                afterSlide={slideIndex => dispatch({ type: 'slide', slideIndex: slideIndex })}
            >
                {guideData.map(section => {
                    const rdmKey = Math.random()
                        .toString(36)
                        .substring(7);
                    return <GuideSlideM guide={section} key={rdmKey} />
                })}
            </Carousel>
        </ModalContainerA>
    );
};

export default SiteGuideO;

