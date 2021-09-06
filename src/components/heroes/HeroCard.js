import React from 'react';
import { Link } from 'react-router-dom';

const heroImages = require.context('../../assets/heroes', true);

export const HeroCard = ({ id, superhero, alter_ego, characters }) => {
    return (
        <div className="card mb-3" style={{ maxWidth: '400px' }}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={ heroImages(`./${ id }.jpg`).default } className="img-fluid rounded-start" alt={ superhero } />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{ superhero }</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{ alter_ego }</h6>
                        {
                            (alter_ego !== characters) &&
                            <p className="card-text"><small className="text-muted">{ characters }</small></p>
                        }
                        <div className="d-grid gap-2 mt-5">
                            <Link to={ `/hero/${ id }` } className="btn btn-outline-secondary">
                                More ...
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
