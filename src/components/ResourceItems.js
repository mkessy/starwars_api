
const ResourceItems = {

    PlanetResourceItem: ({ item }) => {
        return (
          <div className="card">
            <p>{item.name}</p>
            <p>{item.climate}</p>
          </div>
        );
      },

      PeopleResourceItem: ({ item }) => {
        return (
          <div className="card">
            <p>{item.name}</p>
            <p>{item.birth_year}</p>
          </div>
        );
      },

      SpeciesResourceItem: ({ item }) => {
        return (
          <div className="card">
            <p>{item.name}</p>
            <p>{item.classification}</p>
          </div>
        );
      }
}

export default ResourceItems;
