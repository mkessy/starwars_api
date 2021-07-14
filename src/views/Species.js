const Species = ({ data, isFetching, onLoadMore }) => {
  //if(!data) return "no data"

  return (
    <div>
      <h2>Species</h2>

      {data.map((specie, i) => {
        return (
          <div className="card" key={i}>
            <p>{specie.name}</p>
            <p>{specie.classification}</p>
            <hr></hr>
          </div>
        );
      })}

      <div>{onLoadMore && <button onClick={onLoadMore}>Load More</button>}</div>
    </div>
  );
};
export default Species;
