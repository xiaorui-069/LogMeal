function getRecommendedRecipes() {
    const token = JSON.parse(localStorage.getItem('token')).value;
    // since this api requires quite a bit of money, we are going to use static data in this case.
    // $.ajax({
    //     url: "https://api.logmeal.com/v2/recommend/recipe",
    //     method: "GET",
    //     headers: {
    //         'Authorization': `Bearer ${token}`
    //     },
    //     success: function (data){
    //         console.log(data);
    //         display(data['recommended_recipes']);
    //     },
    //     error: function (error){
    //         alert("error happened...");
    //     }
    // });
    const data = [
        {recipe_name:"Classic Chocolate Pudding", recipe_url:"https://www.foodnetwork.com/recipes/food-network-kitchen/classic-chocolate-pudding-recipe-1940152"},
        {recipe_name:"Homemade Vanilla Pudding", recipe_url:"https://www.allrecipes.com/recipe/22831/homemade-vanilla-pudding/"}];
    display(data);
}

function display(data) {
    document.getElementById("content").hidden = true;
    document.getElementById("data-display").hidden = false;
    const ul = document.getElementById('recipes');
    for(let recipe of data){
        const li = document.createElement('li');
        li.innerHTML = `Recipe Name: ${recipe['recipe_name']}<br>Recipe Link: ${recipe['recipe_url']}`;
        ul.appendChild(li);
    }
}