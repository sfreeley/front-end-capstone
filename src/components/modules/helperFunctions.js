export function firstLetterCase(str) {
    return (str.charAt(0).toUpperCase() + str.slice(1));
}

export function currentDateTime(currentDate) {
    let generateCurrentDateTime;
    //gets current date and time
    
    //get current time in user location based on locale date format
    let currentTime = new Date(currentDate).toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit"
    })

    //get today's date
    let date = new Date(currentDate).getDate();
    //get current month
    let month = new Date(currentDate).getMonth();
    //get current year
    let year = new Date(currentDate).getFullYear();

    //list of months
    const months = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]
    
    //this will generate string of the current month, date, year @ and current time in format specified
    generateCurrentDateTime = months[month] + " " + date + "," + " " + year + " @ " + currentTime;

    return generateCurrentDateTime
}

export function currentDate(currentDate) {
    let generateCurrentDate;
    //gets current date and time
    
    // //get current time in user location based on locale date format
    // let currentTime = new Date(currentDate).toLocaleTimeString(undefined, {
    //     hour: "2-digit",
    //     minute: "2-digit"
    // })

    //get today's date
    let date = new Date(currentDate).getDate();
    //get current month
    let month = new Date(currentDate).getMonth();
    //get current year
    let year = new Date(currentDate).getFullYear();

    //list of months
    const months = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]
    
    //this will generate string of the current month, date, year @ and current time in format specified
    generateCurrentDate = months[month] + " " + date + "," + " " + year 

    return generateCurrentDate
}

export function calculateNextRefill(date, days) {
    let result = new Date(date);
    result += result.setDate(result.getDate() + days);
    return currentDate(result);
}

export function calculateBetweenDates(date1, today) {
 let dt1 = new Date(date1);
 let dt2 = today;
 let dt2Date = Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate())
 let dt1Date = Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())

 let differenceInDates = Math.floor((dt1Date - dt2Date) / (1000 * 60 * 60 * 24));
 if (differenceInDates <= 7) {
     alert(`This medication has a refill or renewal date ${Math.abs(differenceInDates)} day(s) from today`)
 }

 return differenceInDates
}

