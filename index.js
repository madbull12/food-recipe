const searchInput= document.getElementById('input');
const searchBtn = document.querySelector('.search-btn')
const mealContent = document.getElementById('meal');
const mealDetails = document.querySelector('.meal--details__content')
const closeBtn = document.querySelector('.close-btn');
const overlay = document.querySelector(".overlay")

// searchBtn.addEventListener('click', getMeal);
searchInput.addEventListener('keypress', displayMeal);
mealContent.addEventListener('click', displayRecipe);
overlay.addEventListener('click', closeDetails);
closeBtn.addEventListener('click', closeDetails);
  
function closeDetails() {
    mealDetails.parentElement.classList.remove('active');
    mealDetails.parentElement.classList.remove('active');
    document.body.style.overflowY = 'visible';
    overlay.classList.remove('active');
}

function displayMeal(e) {
    if(e.keyCode === 13) {
        let searchValue = searchInput.value;
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
            .then(res => res.json())
            .then(data => {
                let main = "";
                if(data.meals) {
                    data.meals.forEach(meal => {
                        main += `<div class="meal--item" id="${meal.idMeal}">
                        <div class="meal-img">
                            <img src=${meal.strMealThumb}>
                        </div>
                        <div class="meal--name">
                            <h3>${meal.strMeal}</h3>
                            <button href="#" class="recipe-btn btn">Get Recipe</button>
                        </div>
                    </div>
                    `
                    })
                

                    
                } else {
                    main += `<h1>We're sorry, couldn't find the the food you want</h1>`
                }
                

                mealContent.innerHTML = main;
            
                
            })   
    }
    
  

}

function displayRecipe(e) {
   e.preventDefault();
   if(e.target.classList.contains('recipe-btn')) {
       const mealItem = e.target.parentElement.parentElement;
      console.log(mealItem)
       fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.id}`)
        .then(res => res.json())
        .then(data => {
            let main = "";
            if(data.meals) {
                data.meals.forEach(meal => {
                    main += `<h2>
                    ${meal.strMeal}
                </h2>
                <p class="category">${meal.strCategory}</p>
                <div class="instruction">
                    <h3>Instructions:</h3>
                    <p>${meal.strInstructions}</p>
                </div>
                <div class="img-wrapper">
                    <img src="${meal.strMealThumb}" alt="">
                </div>
                <a href="${meal.strYoutube}" target="_blank" class="watch-btn">Watch video</a>`
                });

            }
            mealDetails.innerHTML = main;
        });
        mealDetails.parentElement.classList.add('active');
        document.body.style.overflowY = 'hidden';
        overlay.classList.add('active')
   }
}

