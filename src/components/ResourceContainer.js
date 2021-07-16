import axios from "axios";
import { useEffect, useReducer } from "react";
import ResourceList from "./ResourceList";
//controls logic and api calls for searching the Star Wars API
//ResourceContainer is a general wrapper for handling each 'resource' as shown in the SWAPI
//Resources are: Planets, People, Species, Films, Starships etc..

const actionTypes = {
  LOAD: "LOAD",
  LOAD_MORE: "LOAD_MORE",
  FETCH: "FETCH",
  ERROR: "ERROR",
};

const resourceReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOAD:
      return {
        ...state,
        next: action.payload.next,
        resourceCount: action.payload.count,
        fetching: false,
        resourceList: action.payload.results,
      };
    case actionTypes.LOAD_MORE:
      return {
        ...state,
        next: action.payload.next,
        resourceCount: action.payload.count,
        fetching: false,
        resourceList: state.resourceList.concat(action.payload.results),
      };
    case actionTypes.FETCH:
      return {
        fetching: true,
        ...state,
      };
    case actionTypes.ERROR:
      console.log("ERROR!");
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
};

const ResourceContainer = ({ resource, ResourceListItem, searchTerm }) => {
  console.log('RENDERING RESOURCE CONTAINER');

  const initialResourceState = {
    fetching: false,
    resource: resource,
    resourceList: [],
    next: null,
    resourceCount: 0,
  };

  const [resourceState, dispatchResource] = useReducer(
    resourceReducer,
    initialResourceState
  );

  useEffect(() => {

    const handleFetchResource = () => {
        const searchUrl = `https://swapi.dev/api/${resource}/?search=${searchTerm}`;
    
        axios
          .get(searchUrl)
          .then((res) => {
            console.log(res);
            dispatchResource({
              type: actionTypes.LOAD,
              payload: res.data,
            });
          })
          .catch((err) =>
            dispatchResource({ type: "ERROR_FETCHING_RESOURCE", payload: err })
          );
      };

    if (searchTerm) {
      handleFetchResource();
    }
  }, [resource, searchTerm]);

  return (
    <ResourceList
      ResourceListItem={ResourceListItem}
      data={resourceState.resourceList}
    />
  );
};

export default ResourceContainer;

/* const handleLoadMore = (nextUrl) => {
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
  }; */
