// global variables
let houses = document.getElementById("got");
const container = document.querySelector("#container");
const body = document.getElementById("main");
let boxes = [container, body];
const errorBox = document.getElementById("results");

// DATABASE INITIALIZER
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
                houseList.classList.add(house.name.toLowerCase());
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
        errorBox.innerHTML = "Sorry, there's an error so the page can't load"

    })
} ());