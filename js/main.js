// global variables
let houses = document.getElementById("got");
const container = document.querySelector("#container");
const body = document.getElementById("main");
let boxes = [container, body];
const newColorsBtn = document.getElementById("new");

// initializing page
document.addEventListener("DOMContentLoaded", init);

function init() {
    inputHouses();
    storeColors();

    newColorsBtn.addEventListener("click", getColors);
}

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

        //the argument "house" passed to the arrow function
        //holds each item in the array in turn.fetch("houses.json")
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
        // put one color on each box background
        for (let i=0; i < boxes.length; i++) {
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
        let date = new Date();
        let time = date.getTime();
        
    } catch(err) {
        console.log("Storage Error", err);
    }
};

function counter(e) {
    if (typeof Storage !== "undefined"){
        let 
    };
}


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