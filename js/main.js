// global variables
const houses = document.getElementById("got");
const container = document.querySelector("#container");
const body = document.getElementById("main");
let boxes = [container, body]

// initializing page
document.addEventListener("DOMContentLoaded", init);

function init() {
    getHouses();
    getColors();
}

async function getHouses() {
    try {
        let response = await fetch("houses.json");
        let data = await response.json();

        //create a temp holder to append all the html generated inside the forEach iterator
        let html = "";

        //the argument "house" passed to the arrow function
        //holds each item in the array in turn.fetch("houses.json")
        data.forEach(house => {
            let family = house.members.join(", ");

            // generate the html snippet for one array item
            //to be added to the "html" temp holder.
            let objInfo =
            `<dl>
                <dt class="house">${house.name}</dt>
                <dd class="people">${family}</dd>
            </dl>`;
            html += objInfo;
        });
        
        houses.innerHTML = html;
    } catch(err) {
        console.log("Houses Err", err)
    };
};



async function getColors() {
    try {
        let response = await fetch("https://x-colors.herokuapp.com/api/random?number=2");
        let data = await response.json();
        // put one color on each box background
        for (let i=0; i < boxes.length; i++) {
            let color = data[i].rgb;
            let box = boxes[i];
            box.style.backgroundColor = color;
        };
    } catch(err) {
        console.log("Color Error", err);
    };
};


/*
fetch("colors.json")
    .then((response) => response.json())
    .then(data => {
        data.forEach(color => {
            let codes = color.join(", ");
        });
    })
    .catch(err => console.log("Color error!", err)); */
    /*color => {
        let bgColor = color[0].rgb.value;
        const bg = document.querySelector("#main");
        console.log(bg, bgColor);*/

/*
fetch("houses.json")
    .then((response) => response.json())
    .then((data) => {
        //create a temp holder to append all the html generated inside the forEach iterator
        let html = "";

        //the argument "house" passed to the arrow function
        //holds each item in the array in turn.fetch("houses.json")
        data.forEach(house => {
            let family = house.members.join(", ");

            // generate the html snippet for one array item
            //to be added to the "html" temp holder.
            let objInfo =
            `<dl>
                <dt class="house">${house.name}</dt>
                <dd class="people">${family}</dd>
            </dl>`;
            html += objInfo;
        });

        //make a reference to the html container where
        //the info will be displayed.
        const container = document.querySelector("#container");
        container.innerHTML = html;
    })
    .catch(err => console.log("GoT error!", err));
    //this only runs if there is an error during the above process
 fetch("houses.json")
    .then((response) => response.json())
    .then((data) => {
        //create a temp holder to append all the html generated inside the forEach iterator
        let html = "";

        //the argument "house" passed to the arrow function
        //holds each item in the array in turn.fetch("houses.json")
        data.forEach(house => {
            let family = house.members.join(", ");

            // generate the html snippet for one array item
            //to be added to the "html" temp holder.
            let objInfo =
            `<dl>
                <dt class="house">${house.name}</dt>
                <dd class="people">${family}</dd>
            </dl>`;
            html += objInfo;
        });

        //make a reference to the html container where
        //the info will be displayed.
        const container = document.querySelector("#container");
        container.innerHTML = html;
    })
    .catch(err => console.log("GoT error!", err));
    //this only runs if there is an error during the above process */