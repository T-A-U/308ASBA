// import addEmployee from "addEmployee.js"



document.getElementById("GenerateButton").addEventListener("click", runBothFunctions) //getGif,         //with an anonomous function call (fat arrow notation)
document.getElementById("search").addEventListener("click", addEmployee)
// const span = document.getElementById("span")
// 

async function addEmployee(){
  let value = document.getElementById("input").value
  const response = await fetch(`https://dummy.restapiexample.com/api/v1/create`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: value
  })
  const data = await response.json();
  console.log("Data", data["data"]);
  const newContent = document.createTextNode(`${data["data"]["name"]}, has been added!`);
  const newDiv = document.createElement("div");
  newDiv.appendChild(newContent)
  const currentSpan = document.getElementById("span");
  document.body.insertBefore(newDiv, currentSpan);
}

async function getGif(){
  await fetch("https://api.imgflip.com/get_memes", {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
  })
    .then(res => res.json())
    .then(gif => {
      console.log(gif)
      const gifElement = document.querySelector("iframe");
      let randomNumber = Math.floor(Math.random() * Math.floor(gif.data.memes.length));
      console.log(randomNumber)

      gifElement.src = gif.data.memes[randomNumber].url
    })



    .catch(err => {
      console.log(err.message)
    //   alert("sorry, there are no results for your search")
    });

};

async function getQuote(){
  await fetch("https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand", {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
  })
  .then(res => res.json())
  .then(quote =>{
    console.log(quote)
    let quoteFromObject = document.querySelector("#pageQuotes");
    let randomNumber = Math.floor(Math.random() * Math.floor(quote.length))

    quoteFromObject.textContent = quote[randomNumber].content.rendered;
    var regex = /(<([^>]+)>)/ig //found online stackoverflow
    ,   result = quoteFromObject.textContent.replace(regex, "");

    console.log(result);
    // console.log(quoteFromObject.textContent)
    // let authorFromObject = quote[randomNumber].title.rendered;

    document.querySelector("#pageQuotes").textContent = ` ${result}`;
                                                          //quoteFromObject.textContent
    // document.querySelector("pageGifs").textContent = `By: ${authorFromObject}`;

  })
}
function runBothFunctions(){
  getQuote()
  getGif()
};