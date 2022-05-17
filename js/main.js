// global variables
let houses = document.getElementById("got");
const container = document.querySelector("#container");
const body = document.getElementById("main");
let boxes = [container, body];

// color buttons
const newColorsBtn = document.getElementById("new");
const storeColorsBtn = document.getElementById("store");

// initializing page
document.addEventListener("DOMContentLoaded", init);

function init() {
    //inputHouses();
    storeFetchedColors();

    newColorsBtn.addEventListener("click", storeFetchedColors);
    storeColorsBtn.addEventListener("click", storeFetchedColors);
};

// get GoT data
async function getHouses() {
    try {
        let response = await fetch("houses.json");
        let data = await response.json();
        return data;
    } catch(err) {
        console.log("Retrieve Houses Err", err);
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
        let response = await fetch("https://x-colors.herokuapp.com/api/random?number=2");
        let data = await response.json();
        for (let i = 0; i < boxes.length; i++) {
            let color = data[i].hex;
            let box = boxes[i];
            box.style.backgroundColor = color;
        };
        const d = new Date();
        let time = [d.getTime()];
        let results = data.concat(time);
        return results;
    } catch(err) {
        console.log("Color Error", err);
    };
};

async function storeFetchedColors() {
    try {
        let colors = await getColors();
        // check property and set value accordingly
        if (typeof Storage !== "undefined") {
            var fetchColors = window.localStorage.fetchColors;
            var currentColors = window.localStorage.currentColors;
            var previousColors = window.localStorage.previousColors;
            if (typeof fetchColors == "undefined") {
                // store these colors in local storage
                window.localStorage.setItem("fetchColors", [0, colors[0].hex, colors[1].hex]);
                window.localStorage.setItem("currentColors", [0, colors[0].hex, colors[1].hex]);
            } else {
                fetchColors = [0, colors[0].hex, colors[1].hex];
                currentColors = [0, colors[0].hex, colors[1].hex];
            };
            console.log("fetch", fetchColors, "current", currentColors);
        } else {
            document.getElementById("result").innerHTML = "Unfortunately your browser does not support web storage and so this button does not work";
        };
        console.log("CURRENT: ", currentColors, "PREV: ", previousColors);
    } catch(err) {
        console.log("Storage Error", err);
    };
};

// GOT DATABASE INITIALIZER
(async function () {
    "use strict";
    
    // new indexDB database
    var gotdb = new Dexie("GoTDatabase");

    // database schema/structure
    gotdb.version(1).stores({
        houses: `++id, code, name, members`
    });

    await gotdb.houses.bulkPut([
        { id: 1, code: "ST", name: "Stark", members: ["Eddard", "Catelyn", "Robb", "Sansa", "Arya", "Jon Snow"] },
        { id: 2, code: "LA", name: "Lannister", members: ["Tywin", "Cersei", "Jaime", "Tyrion"]},
        { id: 3, code: "BA", name: "Baratheon", members: ["Robert", "Stannis", "Renly"] },
        { id: 4, code: "TA", name: "Targaryen", members: ["Aerys", "Daenerys", "Viserys"] }
    ]);

    await gotdb
        .transaction("readwrite", gotdb.houses, async (tx) => {
            let info = [];

            info = await gotdb.houses.orderBy("id").toArray();
            return info;
    })
    .then((results) => {
        //temp holder for all the html generated inside the forEach iterator
        let allHouses = new DocumentFragment;

        // iterate through house data to create a house list
        results.forEach((house) => {
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
        console.log("IIFE err: " + err);
    })
} ());

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