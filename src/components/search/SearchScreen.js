import React, { useMemo } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { HeroCard } from '../heroes/HeroCard';
import { useForm } from '../hooks/useForm';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({ history }) => {

    const { search } = useLocation();
    const { q = '' } = useMemo(() => queryString.parse(search), [search]);

    const [ formValues, handleInputChange ] = useForm({
        searchText: q,
    });

    const { searchText } = formValues;

    
    const handleSearch = (e) => {
        e.preventDefault();
        history.push(`?q=${ searchText }`);
    }

    const heroesFiltered = getHeroesByName(q);

    return (
        <>
            <h1>Search you hero !</h1>
            <hr />
            <div className="row">
                <div className="col-4">
                    <h4>Seach Form</h4>
                    <hr />
                    <form onSubmit={ handleSearch }>
                        <input 
                            type="text"
                            placeholder="Find your hero"
                            className="form-control"
                            name="searchText"
                            autoComplete="off"
                            value={ searchText }
                            onChange={ handleInputChange } 
                        />
                        <div className="d-grid gap-2 mt-2">
                            <button
                                type="submit"
                                className="btn btn-outline-secondary"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <h4>Results</h4>
                    <hr />
                    <div className="d-flex justify-content-around align-content-between flex-wrap animate__animated animate__fadeIn">
                        { 
                            (q ==='') && 
                                <div className="alert alert-primary container-fluid" role="alert">
                                    Search a hero
                                </div>
                        }
                        { 
                            (q !=='' && heroesFiltered.length === 0 ) && 
                                <div className="alert alert-danger container-fluid" role="alert">
                                    There is no a hero with { q }
                                </div>
                        }
                        {
                            heroesFiltered.map(hero => (
                                <HeroCard key={ hero.id } { ...hero } />
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
