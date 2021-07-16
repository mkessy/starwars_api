
const ResourceRoute = (Component) => props => (
    <Component {...props, resource={p}} />
)