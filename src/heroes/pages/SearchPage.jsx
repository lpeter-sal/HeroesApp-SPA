import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm"
import { HeroCard } from "../components/HeroCard"

import queryString from 'query-string'
import { getHeroesByName } from "../helpers";

export const SearchPage = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { q = '' } = queryString.parse(location.search);

  const heroes = getHeroesByName(q);

  const showSearch = (q.length === 0);
  const showError = (q.length > 0) && heroes.length === 0;

  const { searchText, onInputChange } = useForm({
    searchText: q
  });



  const onSearchSumit = (event) => {
    event.preventDefault();

    navigate(`?q=${ searchText }`);
  }

  return (
    <>
      <h1>Search</h1>
      <hr />

      <div className="row">

        <div className="col-4"> 
          <h4>Searching</h4>
          <hr />

          <form onSubmit={ onSearchSumit } aria-label="form">
            <input 
                type="text"
                placeholder="Search a hero" 
                className="form-control"
                name="searchText"
                autoComplete="off"
                value={ searchText }
                onChange={ onInputChange }
            />

            <button className="btn btn-outline-primary mt-3">
              Search
            </button>
          </form>
        </div>

        <div className="col-8">

          <h4>Results</h4>
          <hr />

          <div className="alert alert-primary animate__animated animate__fadeIn" 
               aria-label="alert-primary"
               style={{ display: showSearch ? '' : 'none'}}>
            Search a hero
          </div>

          <div className="alert alert-danger animate__animated animate__fadeIn" 
               aria-label="alert-danger"
               style={{ display: showError ? '' : 'none'}}>
            No hero with <b>{ q }</b>
          </div>

          {
            heroes.map( hero => (
              <HeroCard key={ hero.id } { ...hero } />  
            ))
          }


        </div>

      </div>


    </>
  )
}
