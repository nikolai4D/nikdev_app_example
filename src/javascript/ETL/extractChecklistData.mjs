/**
 * flatten, trim and filter the checklist data obtained from the graphql request.
 * @param checklistRaw
 * @returns {{checklist, tasks: *}}
 */
export function extractChecklistData(checklistRaw) {
    return {
        checklist: checklistRaw.title,
        tasks: checklistRaw.relationships.map(relationship => relationship.sourceNode.title)
    }
}