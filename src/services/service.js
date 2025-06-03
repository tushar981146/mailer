 export const getAllData = async () => {
    const dataObj = await fetch('http://localhost:3000/form');
    if (!dataObj.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await dataObj.json();
    return data;
}

 export const uniqueId = async () => {
    const dataObj = await fetch('http://localhost:3000/uniqueId');
    if (!dataObj.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await dataObj.json();
    const dataArray = [...data];
    return dataArray;
}
