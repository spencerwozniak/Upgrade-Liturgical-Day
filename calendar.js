let fetchDate = async (todaysDate) => {
    try{
        // Switched to HTTPS to avoid mixed-content issues
        let response = await fetch(`https://calapi.inadiutorium.cz/api/v0/en/calendars/default/${todaysDate}`);

        if(!response || !response.ok){
            let message = `Error: ${response?.status}, ${response?.statusText}`;
            let err = new Error(message);
            throw err;
        }

        const currentDate = await response.json();
        return currentDate;

    } catch (err){
        console.error(`Error: ${err}`);
    }
}

let todaysDate = document.getElementById("date");
let weekday = document.getElementById("weekday");
let week = document.getElementById("week");
let season = document.getElementById("season");
let celebrationsLi = document.getElementById("celebrations");

// TODO: Implement another api that searches the listed saint celebration upon click
let getCelebrations = (celebrations) =>{
    celebrations.forEach(celebration => {
        let saint = document.createElement("li");
        saint.innerHTML = `${celebration.rank}: ${celebration.title}`;
        celebrationsLi.append(saint);
    });
}

let renderDate = () => {
    let currentDate = new Date();
    let cDay = currentDate.getDate();
    let cMonth = currentDate.getMonth() + 1;
    let cYear = currentDate.getFullYear();
    let dateToday = `${cYear}/${cMonth}/${cDay}`;

    fetchDate(dateToday).then((dateObject) =>{
        if(!dateObject) return;
        todaysDate.innerHTML = `Date: <i>${dateObject.date}</i>`;
        weekday.innerHTML = ` Today is <i>${dateObject.weekday}</i>`;
        week.innerHTML = `Week <i>${dateObject.season_week}</i> of the`;
        season.innerHTML = `<i>${dateObject.season}</i> season`;
        getCelebrations(dateObject.celebrations || []);
    });
}

renderDate();
