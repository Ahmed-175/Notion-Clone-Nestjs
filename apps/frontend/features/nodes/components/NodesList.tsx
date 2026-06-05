import { useNodes } from '../hooks/useNodes'
import Recursion from './Recursion';

const NodesList = () => {
    const { data: nodes } = useNodes();
    return (
        <>
            {Object.values(nodes).map(
                (node) =>
                    node.parentId == null && (
                        <Recursion node={node} key={node._id as any} />
                    ),
            )}
        </>
    )
}

export default NodesList