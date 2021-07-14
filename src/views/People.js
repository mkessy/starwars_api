//add list components PeopleList ?

const People = ({ data, isFetching, onLoadMore }) => {
  console.log(data);
  //if(!data) return "no data"

  return (
    <div>
      <h2>People</h2>
      {data.map((person, i) => {
        return (
          <div className="card" key={i}>
            <p>{person.name}</p>
            <p>{person.birth_year}</p>
          </div>
        );
      })}

      <div>{onLoadMore && <button onClick={onLoadMore}>Load More</button>}</div>
    </div>
  );
};

export default People;
