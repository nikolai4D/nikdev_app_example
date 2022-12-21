export function extractChecklistData(checklistRaw) {
    return {
        checklist: checklistRaw.title,
        tasks: checklistRaw.relationships.map(relationship => relationship.sourceNode.title)
    }
}