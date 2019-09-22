
export class ObjectsManager {
    public static objectsById: Map<string, any> = new Map();;

    public static setId(object: any): string {
        const id = Math.random().toString(36).substring(7);
        if (ObjectsManager.objectsById.get(id)) {
            return ObjectsManager.setId(object);
        }

        object.id = id;
        ObjectsManager.objectsById.set(id, object);
        return id;
    }
}
