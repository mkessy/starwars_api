const SpeciesResourceItem = ({ item }) => {
  return (
    <div className="card">
      <p>{item.name}</p>
      <p>{item.classification}</p>
      <hr></hr>
    </div>
  );
};

export default SpeciesResourceItem;
