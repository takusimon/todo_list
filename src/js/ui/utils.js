export const makeContainer = (id) => {
    const container = document.createElement('div');
    container.id = id;

    return container;
}

export function makeElement (type) {
    const element = document.createElement(type);


    return element
}