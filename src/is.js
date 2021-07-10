export const array = Array.isArray;
export const object = s => s && typeof s === 'object';
export const func = s => s && typeof s === 'function';
export const primitive = s => typeof s === 'string' || typeof s === 'number';