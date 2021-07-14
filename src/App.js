import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { Router, Link, Redirect, navigate } from "@reach/router";
import { useEffect, useState, useReducer, useCallback } from "react";

import People from "./views/People";
import Planets from "./views/Planets";
import Species from "./views/Species";
import NotFound from "./views/NotFound";

/*
ROUTES

ROOT ##########################################
https://swapi.dev/api/

PEOPLE ##########################################

/people/ -- get all the people resources
/people/:id/ -- get a specific people resource

PLANETS ##########################################
/planets/ -- get all the planets resources
/planets/:id/ -- get a specific planets resource

SPECIES ##########################################
/species/ -- get all the species resources
/species/:id/ -- get a specific species resource

SEARCH ##########################################
https://swapi.dev/api/people/?search=

*/

function App() {
  //STATE

  /* state = {
    filteredList: "",
    resource: "people" OR "planets" OR "species",
    resourceLists: {
      planetList: [],
      speciesList: [],
      peopleList: [],

    }

    actions
    CHANGE_RESOURCE: --change resouce on the dropdown menu selection(eg. planets->species)
    SEARCH_RESOURCE: --search button pressed

  } */
  //ROUTES

  const resourceReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_RESOURCE":
        return {
          ...state,
          resource: action.payload,
        };
      case "LOAD_RESOURCE":
        return {
          ...state,
          next: action.payload.next,
          resourceCount: action.payload.count,
          fetching: false,
          resourceList: {
            ...state.resourceList,
            [state.resource]: action.payload.results,
          },
        };
      case "LOAD_MORE_RESOURCE":
        return {
          ...state,
          next: action.payload.next,
          resourceCount: state.count,
          fetching: false,
          resourceList: {
            ...state.resourceList,
            [state.resource]: state.resourceList[state.resource].concat(
              action.payload.results
            ),
          },
        };
      case "FETCHING_RESOURCE":
        return {
          fetching: true,
          ...state,
        };
      case "ERROR_FETCHING_RESOURCE":
        console.log("ERROR!");
        return {
          ...state,
        };
      default:
        throw new Error();
    }
  };

  const initialResourceState = {
    fetching: false,
    next: null,
    resource: "people",
    resourceList: {
      people: [],
      planets: [],
      species: [],
    },
    resourceCount: 0,
  };
  const [resourceState, dispatchResource] = useReducer(
    resourceReducer,
    initialResourceState
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [searchUrl, setSearchUrl] = useState("");

  const handleFetchResource = useCallback(() => {
    axios
      .get(searchUrl)
      .then((res) => {
        console.log(res);
        dispatchResource({
          type: "LOAD_RESOURCE",
          payload: res.data,
        });
      })
      .catch((err) =>
        dispatchResource({ type: "ERROR_FETCHING_RESOURCE", payload: err })
      );
  }, [searchUrl]);

  const handleLoadMore = (nextUrl) => {
    return () => {
      axios
        .get(nextUrl)
        .then((res) => {
          console.log(res);
          dispatchResource({
            type: "LOAD_MORE_RESOURCE",
            payload: res.data,
          });
        })
        .catch((err) =>
          dispatchResource({ type: "ERROR_FETCHING_RESOURCE", payload: err })
        );
    };
  };

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
    console.log(searchTerm);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (!searchTerm) return;

    console.log(searchTerm);
    console.log(e);
    dispatchResource({ type: "FETCHING_RESOURCE" });

    const url = `https://swapi.dev/api/${resourceState.resource}/?search=${searchTerm}`;
    console.log(url);
    setSearchUrl(url);

    //console.log(`${e.target}: Submitted!`)
  };
  const handleChangeResource = (e) => {
    //dispatch changeResource -->
    //navigate to the new resource page
    const resourceOption = e.target.value;
    navigate(`/${resourceOption}`);
    dispatchResource({ type: "CHANGE_RESOURCE", payload: resourceOption });
  };

  useEffect(() => {
    handleFetchResource();
  }, [handleFetchResource]);

  return (
    <div className="App">
      <div className="container">
        <header>
          <nav>
            <div className="row">
              <div className="col-3">
                <form onSubmit={handleSearchSubmit}>
                  <label htmlFor="resource">Search for:</label>
                  <select
                    onChange={handleChangeResource}
                    name="resource"
                    id="resource"
                  >
                    <option value="people">People</option>
                    <option value="planets">Planets</option>
                    <option value="species">Species</option>
                  </select>

                  <label htmlFor="search">Search:</label>
                  <input
                    onChange={handleSearchInput}
                    type="text"
                    name="search"
                    id="search"
                  />

                  <input type="submit" value="submit" />
                </form>
              </div>
            </div>
          </nav>
        </header>

        <div className="row">
          <div className="col-6">
            <Router>
              <People
                onLoadMore={
                  resourceState.next && handleLoadMore(resourceState.next)
                }
                isFetching={resourceState.fetching}
                data={resourceState.resourceList.people}
                path="/people/"
              />
              <Planets
                onLoadMore={
                  resourceState.next && handleLoadMore(resourceState.next)
                }
                isFetching={resourceState.fetching}
                data={resourceState.resourceList.planets}
                path="/planets/"
              />
              <Species
                onLoadMore={
                  resourceState.next && handleLoadMore(resourceState.next)
                }
                isFetching={resourceState.fetching}
                data={resourceState.resourceList.species}
                path="/species/"
              />
              {/*  <Redirect from="/" to="/people/" noThrow="true" /> */}
              <NotFound default />
            </Router>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
