const PlanetResourceItem = ({ item }) => {
  return (
    <div className="card">
      <p>{item.name}</p>
      <p>{item.climate}</p>
      <hr></hr>
    </div>
  );
};

export default PlanetResourceItem;
