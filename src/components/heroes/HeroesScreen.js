import React, { useMemo } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { getHeroesById } from '../../selectors/getHeroesById';

const heroImages = require.context('../../assets/heroes', true );

export const HeroesScreen = ({ history }) => {

    const { heroeId } = useParams();
    const hero = useMemo(() => getHeroesById(heroeId), [heroeId]);

    if (!hero) {
        return <Redirect to="/" />
    }

    const {
        superhero,
        publisher,
        alter_ego,
        first_appearance,
        characters
    } = hero;


    const handleReturn = () => {
        if(history.length <= 2) {
            history.push('/');
        } else {
            history.goBack();
        }
    }

    return (
        <div className="row mt-5">
            <div className="col-md-4 d-flex justify-content-center">
                <img src={ heroImages(`./${ heroeId }.jpg`).default } className="img-fluid rounded animate__animated animate__fadeInLeftBig" alt={ superhero } />
            </div>
            <div className="col-md-8">
                <h3 className="card-title">{ superhero }</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <small className="text-muted"><b>Alter ego: </b></small>
                        <h5 className="card-subtitle mb-2">{ alter_ego }</h5>
                    </li>
                    <li className="list-group-item">
                        <small className="text-muted"><b>Publisher: </b></small>
                        <h6 className="card-subtitle mb-2">{ publisher }</h6>
                    </li>
                    <li className="list-group-item">
                        <small className="text-muted"><b>First appearance: </b></small>
                        <h6 className="card-subtitle mb-2">{ first_appearance }</h6>
                    </li>
                    {
                        (alter_ego !== characters) &&
                        <li className="list-group-item">
                            <small className="text-muted"><b>Characters: </b></small>
                            <h6 className="card-subtitle mb-2">{ characters }</h6>
                        </li>
                    }
                </ul>
                <div className="d-grid gap-2 mt-5">
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={ handleReturn }
                    >
                        Return
                    </button>
                </div>
            </div>
        </div>
    )
}
