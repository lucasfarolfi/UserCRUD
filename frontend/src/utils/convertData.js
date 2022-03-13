export function convertDate(date){
    const newDate = date.split("-")
    return `${newDate[2]}/${newDate[1]}/${newDate[0]}`
}

export function convertNumber(number){
    return `(${number.slice(0,2)}) ${number.slice(2,7)}-${number.slice(7,11)}`
}