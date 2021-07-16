const ResourceList = ({ ResourceListItem, data }) => {
  return (
    <div className="resourceList">
      {data.map((item, i) => {
        return <ResourceListItem key={i} item={item} />;
      })}
    </div>
  );
};

export default ResourceList;

