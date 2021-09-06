import React, { useMemo } from 'react';
import { getHeroesByPublisher } from '../../selectors/getHeroesByPublisher';
import { HeroCard } from './HeroCard';

export const HeroList = ({ publisher }) => {

    const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher]);

    return (
        <div className="d-flex justify-content-around align-content-between flex-wrap animate__animated animate__fadeIn">
            {
                heroes.map(hero => (
                    <HeroCard key={ hero.id } { ...hero } />
                ))
            }
        </div>
    )
}
