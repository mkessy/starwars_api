//add list components PlanetList ?
// or just List that can render all of them?

const Planets = ({ data, isFetching, onLoadMore }) => {
  // if(!data) return "no data"

  console.log(data);
  return (
    <div>
      <h2>Planets</h2>
      {data.map((planet, i) => {
        return (
          <div className="card" key={i}>
            <p>{planet.name}</p>
            <p>{planet.climate}</p>
            <hr></hr>
          </div>
        );
      })}

      <div>{onLoadMore && <button onClick={onLoadMore}>Load More</button>}</div>
    </div>
  );
};

export default Planets;
