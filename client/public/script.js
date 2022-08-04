const searchForm = document.querySelector("form"); 
const searchResultDiv = document.querySelector(".search-result"); 
const historyResultDiv = document.querySelector("#subhistory");
const container = document.querySelector("container"); 
var searchQuery = ""; 
var savedRecipe = []; 
const recipeArr = [];
const APP_ID = "1dde8709";
const APP_key = "a8d10560bc3d45c586fa2de0978a729b"; 
const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}`; 

searchForm.addEventListener("submit", (event)=>{
    event.preventDefault(); 
    searchQuery = event.target.querySelector("input").value;
    console.log(searchQuery);
    //activates fetchAPI method within this searchform.addEventListener stuff 
    if(searchQuery) {
        fetchAPI();
    } else {
        alert("INGREDIENT AND RECIPE NOT FOUND!!")
    }
});
// ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
//we are going to create the fetch API method that then plugs into the searchform.addevent listener thing that we made 
async function fetchAPI() {
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&to=2`; 
    const response = await fetch(baseURL)
    const data = await response.json(); 
    generateHTML(data.hits);
    console.log(data); 
};
//this puts the API calls on the html page and explains the generateHTML reference from async function 
function generateHTML(results){
    var generatedHTML = "";
    results.map(result => {
        generatedHTML += 
        `
        <div class="item">
        <img src="${result.recipe.image}" alt="">
        <div class="flex-container">
            <h1 class="title"> ${result.recipe.label}</h1>
            <a class="view-btn" href="${result.recipe.url}" target="_blank" ">View Recipe</a>
            <button class="btn" onclick="saveClick(this)" id="${result.recipe.url}">Save Recipe?</button> 
          </div>
          <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
          <p class="item-data">Diet Label: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : "No Labels Found"}</p>
          <p class="item-data">Cuisine Label: ${result.recipe.cuisineType}</p>
          <p class="item-data">Health Label: ${result.recipe.healthLabels}</p>
        </div>
        `
    });
    searchResultDiv.innerHTML = generatedHTML;
}; 

function saveClick(btn){
    // var new_data = document.getElementById(btn.id).value;
    //console.log(new_data);
    var createLink = document.createElement("a"); 
   createLink.setAttribute("href", btn.id)
   // console.log(history); 
    localStorage.setItem("Recipe", createLink);  
    recipeArr.push(localStorage.getItem("Recipe")); 
    historyResultDiv.innerHTML = recipeArr;
};

function popoulateLocalStorage(){
    localStorage.setItem('Saved', JSON.stringify(recipeArr)); s
}




