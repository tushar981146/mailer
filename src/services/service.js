 export const getAllData = async () => {
    const dataObj = await fetch('https://potfolio-backend-je57.onrender.com//form');
    if (!dataObj.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await dataObj.json();
    return data;
}

 export const uniqueId = async () => {
    const dataObj = await fetch('https://potfolio-backend-je57.onrender.com/uniqueId');
    if (!dataObj.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await dataObj.json();
    const dataArray = [...data];
    return dataArray;
}
