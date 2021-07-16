import { Router, Link, Redirect, navigate } from "@reach/router";
import { useState, } from "react";
import NotFound from "./views/NotFound";

import ResourceContainer from "./components/ResourceContainer";

import ResourceItems from "./components/ResourceItems";

const {PlanetResourceItem, PeopleResourceItem, SpeciesResourceItem} = ResourceItems;


const resourceOptions = {
  people: "people",
  species: "species",
  planets: "planets",
};

function App() {
  //STATE
  const [searchTerm, setSearchTerm] = useState("");
  const [resource, setResource] = useState(resourceOptions.people);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchText = new FormData(e.target).get("search");
    console.log(searchText);
    console.log(resource === resourceOptions.people && searchTerm);
    if (!searchText) return;
    setSearchTerm(searchText);
    //console.log(`${e.target}: Submitted!`)
  };

  const handleChangeResource = (e) => {
    //dispatch changeResource -->
    //navigate to the new resource page
    const option = resourceOptions[e.target.value];
    setSearchTerm('');
    setResource(option);
    navigate(`/${option}`);

    console.log(resource === resourceOptions.people && searchTerm);
  };

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
              <ResourceContainer
                resource={resource}
                searchTerm={resource === resourceOptions.people && searchTerm}
                ResourceListItem = {PeopleResourceItem}
                path="/people"
              />
              <ResourceContainer
                resource={resource}
                searchTerm={resource === resourceOptions.planets && searchTerm}
                ResourceListItem = {PlanetResourceItem}
                path="/planets"
              />
              <ResourceContainer
                resource={resource}
                searchTerm={resource === resourceOptions.species && searchTerm}
                ResourceListItem = {SpeciesResourceItem}
                path="/species"
              />

              <NotFound default />
            </Router>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
