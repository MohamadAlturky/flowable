export function removeNodeAndChildren(nodes, id) {
    // First, find all nodes that need to be removed
    const toRemove = new Set();
    
    // Helper function to find and mark all children nodes recursively
    function markChildrenToRemove(parentId) {
        nodes.forEach(node => {
            if (node.parentId === parentId) {
                toRemove.add(node.id);
                markChildrenToRemove(node.id);
            }
        });
    }

    // Mark the specified node and all its children for removal
    markChildrenToRemove(id);
    
    // Add the node with the given id itself to the removal set
    toRemove.add(id);

    // Filter out all nodes that are in the removal set
    return nodes.filter(node => !toRemove.has(node.id));
}
