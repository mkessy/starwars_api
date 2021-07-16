const ResourceList = ({ ResourceListItem, data }) => {
  console.log('RENDERING RESOURCE LIST CONTAINER');

  return (
    <div className="resourceList">
      {data.map((item, i) => {
        return <ResourceListItem key={i} item={item} />;
      })}
    </div>
  );
};

export default ResourceList;

