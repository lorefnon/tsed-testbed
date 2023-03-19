export const ensureId = (entity: { id?: any }) => {
    if (!entity.id) {
        throw new Error(`Expected id to be present in entity: ${entity}`)
    }
    return entity.id
}


export const ensureNotNil = (entity: any) => {
    if (entity == null) {
        throw new Error(`Unexpected ${entity} value encountered`)
    }
    return entity
}
