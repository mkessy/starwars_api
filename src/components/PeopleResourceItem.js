const PeopleResourceItem = ({ item }) => {
  return (
    <div className="card">
      <p>{item.name}</p>
      <p>{item.birth_year}</p>
    </div>
  );
};

export default PeopleResourceItem;
