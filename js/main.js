// global variables
let houses = document.getElementById("got");
const container = document.querySelector("#container");
const body = document.getElementById("main");
let boxes = [container, body];
const newColorsBtn = document.getElementById("new");
const storeColorsBtn = document.getElementById("store");

// initializing page
document.addEventListener("DOMContentLoaded", init);

function init() {
    //inputHouses();
    getColors();

    newColorsBtn.addEventListener("click", getColors);
    storeColorsBtn.addEventListener("click", storeColors);
};

// get GoT data
async function getHouses() {
    try {
        let response = await fetch("houses.json");
        let data = await response.json();
        return data;
    } catch(err) {
        console.log("Retrieve Houses Err", err)
    };
};

// apply GoT data to HTML
async function inputHouses() {
    try {
        let housesData = await getHouses();

        //create a temp holder to append all the html generated inside the forEach iterator
        let allHouses = new DocumentFragment;

        // iterate through house data to create a house list
        housesData.forEach(house => {
            // create elements
            let houseList = document.createElement("dl");
            let listTitle = document.createElement("dt");
            // edit title content
            listTitle.classList.add("house");
            listTitle.innerHTML = house.name;
            
            // connect title to list
            houseList.appendChild(listTitle);

            // identify family members
            let family = house.members;

            //loop through family members
            for (let member of family) {
                // create list item (li)
                let memberLI = document.createElement("dd");
                // edit li content
                memberLI.classList.add("member");
                memberLI.innerHTML = member;
                // add li to list
                houseList.appendChild(memberLI);
            };

            // add house to list
            allHouses.appendChild(houseList);
        });

        // reset section content
        houses.innerHTML = "";
        // add houses lists to section
        houses.appendChild(allHouses);

    } catch(err) {
        console.log("Input Error", err);
    };
};

async function getColors() {
    try {
        let response = await fetch("storedvals.json"); //fetch("https://x-colors.herokuapp.com/api/random?number=2");
        let data = await response.json();
        // put one color on each box background
        for (let i = 0; i < boxes.length; i++) {
            let color = data[i].rgb;
            let box = boxes[i];
            box.style.backgroundColor = color;
        };
        return data;
    } catch(err) {
        console.log("Color Error", err);
    };
};

async function storeColors() {
    try {
        let data = await getColors();
        console.log(data);
        // check property and set value accordingly
        if (typeof Storage !== "undefined") {
            if (!currentColors) {
                let currentColors = window.localStorage.setItem("currentColors", `bg${data[0].rgb}fg${data[1].rgb}`);
            } else {
                let previousColors = currentColors;
                let currentColors = window.localStorage.setItem("currentColors", `bg${data[0].rgb}fg${data[1].rgb}`);
            }
            
            
            // render results to the DOM
            document.getElementById("result").innerHTML =
            `You have clicked the button ${sessionStorage.getItem('clickcount')} time(s).`;
        } else {
            alert("Sorry, your browser does not support web storage and so this button does not work");
        };

        let date = new Date();
        let time = date.getTime();
        console.log(time);

    } catch(err) {
        console.log("Storage Error", err);
    }
};

(async function () {
    "use strict";
    // DOM elements
    
    // new indexDB database
    var gotDb = new Dexie("GoTDatabase");

    // database schema/structure
    gotDb.version(1).stores({
        houses: `code, name, members`
    });

    await gotDb.houses.bulkPut([
        { id: 1, code: "ST", name: "Stark", members: ["Eddard", "Catelyn", "Robb", "Sansa", "Arya", "Jon Snow"] },
        { id: 2, code: "LA", name: "Lannister", members: ["Tywin", "Cersei", "Jaime", "Tyrion"]},
        { id: 3, code: "BA", name: "Baratheon", members: ["Robert", "Stannis", "Renly"] },
        { id: 4, code: "TA", name: "Targaryen", members: ["Aerys", "Daenerys", "Viserys"] }
    ]);

    await gotDb
        .transaction("readwrite", gotDb.houses, async (tx) => {
            let info = [];

            info[0] = await gotDb.houses.toArray();
            info[1] = await gotDb.houses.where("code").startsWithAnyOf("S", "B").toArray();
            return info;
    })
    .then((results) => {
        //temp holder for all the html generated inside the forEach iterator
        let allHouses = new DocumentFragment;

        // iterate through house data to create a house list
        results[0].forEach((house) => {
            // create elements
            let houseList = document.createElement("dl");
            let listTitle = document.createElement("dt");
            // edit title content
            listTitle.classList.add("house");
            listTitle.innerHTML = house.name;
            
            // connect title to list
            houseList.appendChild(listTitle);

            // identify family members
            let family = house.members;

            //loop through family members
            for (let member of family) {
                // create list item (li)
                let memberLI = document.createElement("dd");
                // edit li content
                memberLI.classList.add("member");
                memberLI.innerHTML = member;
                // add li to list
                houseList.appendChild(memberLI);
            };

            // add house to list
            allHouses.appendChild(houseList);
        });

        // reset section content
        houses.innerHTML = "";
        // add houses lists to section
        houses.appendChild(allHouses);
    })
    .catch((err) => {
        console.log("IIFE err" + err);
    })
} ());



    /*function consoleLogger(h) {
        for (let i = 0; i < h.length; i++) {
            let house = h[i];
            if (i != h.length -1) {
                return `{ id: ${Number(i) + 1}, code: "${house.code}", name: "${house.name}", members: "${house.members}" }, `;
            } else {
                return `{ id: ${Number(i) + 1}, code: "${house.code}", name: "${house.name}", members: "${house.members}" }`;
            };
        };
    };
    console.log(data, consoleLogger(data));*/
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