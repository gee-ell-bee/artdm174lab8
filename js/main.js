// global variables
let houses = document.getElementById("got");
const container = document.querySelector("#container");
const body = document.getElementById("main");
let boxes = [container, body];

function clearStorage(db) {
    db.colors.clear();
}

// GOT DATABASE INITIALIZER
(async function () {
    "use strict";
    
    // new indexDB database
    var db = new Dexie("Lab8Database");

    // database schema/structure
    db.version(1).stores({
        houses: `++id, &code, name, members`,
        colors: `++id, hex, rgb, hsl`
    });

    const gotData = await fetch("../houses.json");
    const gotResults = await gotData.json();

    db.houses.bulkPut(gotResults);
    console.log("Houses bulkPut", db.houses);

    const gotDatabase = await db.houses.orderBy("id").toArray();

    const colorData = await fetch("https://x-colors.herokuapp.com/api/random?number=2");
    const colorResults = await colorData.json();
    const colorArray = [colorResults[0], colorResults[1]];

    console.log("colors data", colorArray);

    db.colors.bulkPut(colorArray);

    const colorDatabase = await db.colors.toArray();

    const dbArray = [db.houses, db.colors];

    await db
        .transaction("rw", dbArray, async (tx) => {
            let info = [];

            info = [colorDatabase, gotDatabase];
            return info;
    })
    .then((results) => {
        //temp holder for all the html generated inside the forEach iterator
        let allHouses = new DocumentFragment;

            // iterate through house data to create a house list
            results[1].forEach((house) => {
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

        // colors function
        console.log("full colors list", results[0]);

            // loop thru boxes array
            for (let i = 0, colors = results[0]; i < boxes.length; i++) {
                // reverse colors results so most recent additions are at the top
                results[0].reverse();
                let color = colors[i].hex;
                let box = boxes[i];
                // add diff color to each element
                box.style.backgroundColor = color;
            };
        
    })
    .catch((err) => {
        console.log("IIFE err: " + err);
    })
} ());

// GET COLORS *IN INIT F(X), NOT FROM DATABASE
/*async function getColors() {
    try {
        let response = await fetch("https://x-colors.herokuapp.com/api/random?number=2");
        let data = await response.json();
        for (let i = 0; i < boxes.length; i++) {
            let color = data[i].hex;
            let box = boxes[i];
            box.style.backgroundColor = color;
        };
        console.log("function init", data);
        return data;
    } catch(err) {
        console.log("Color Error", err);
    };
};*/


// STORE COLORS IN LocalStorage
/* async function storeFetchedColors() {
    try {
        let colors = await getColors();
        // check property and set value accordingly
        if (typeof Storage !== "undefined") {
            var currentColors = window.localStorage.currentColors;
            window.localStorage.setItem("currentColors", [0, colors[0].hex, colors[1].hex]);
            console.log("current", currentColors);
        } else {
            document.getElementById("result").innerHTML = "Unfortunately your browser does not support web storage and so this button does not work";
        };
    } catch(err) {
        console.log("Storage Error", err);
    };
}; */

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