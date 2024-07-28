export function storeObjectInLocalStorage(key, object) {
    const jsonString = JSON.stringify(object);
    localStorage.setItem(key, jsonString);
}

export function loadObjectFromLocalStorage(key) {
    let jsonString = localStorage.getItem(key);
    
    if (!jsonString) {
        return null;
    }
    
    const object = JSON.parse(jsonString);
    
    return object;
}