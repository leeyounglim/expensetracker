export const getMonthTotal = (month, year, data) =>{
    let total = 0;
    if (data){for (const receipt of data){
        const itemDate = new Date(receipt.date);
        if (itemDate.getMonth() === month && itemDate.getFullYear() === year){
            total += Number(receipt.price)
        };
    };}
    return total.toFixed(2);
}

export const calcMonthChange = (curr, prev) =>{
    return parseFloat(((curr-prev)/prev)*100).toFixed(2);
}