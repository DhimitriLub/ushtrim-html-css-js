
document.addEventListener('DOMContentLoaded', () => {
    const movieDetails = document.querySelector('.movie-details');
    const reviewList = movieDetails.querySelector('.review-list');

    const movie = {     
        title: '"The Sea Beast" Movie Rating',
        rating: 0,
        reviews: [],
    };



    function createMovieCard(movie) {
        const card = document.createElement('div');
        card.classList.add('movie-card');
        card.innerHTML = `
        <div class="movie-card-content">
            <h2>${movie.title}</h2>
            <p>Average Rating: <i class="fas fa-star"></i> <span class="avg-rating">${movie.rating.toFixed(1)}</span></p>
        </div>
    `;
        return card;
    }

    function createReviewListItem(review, gender) {
        const listItem = document.createElement('li');
        listItem.className = 'review';

    
        if (gender === 'Male') {
            listItem.innerHTML = `<img src="male.png" alt="Male Image" class="gender-image"> ${review}`;
        } else if (gender === 'Female') {
            listItem.innerHTML = `<img src="female.png" alt="Female Image" class="gender-image"> ${review}`;
        } else {
            listItem.textContent = review;
        }

        return listItem.outerHTML;
    }


function updateAverageRating(movie) {
    const totalRatings = movie.reviews.reduce((acc, review) => {
        if (typeof review === 'string') {
            const ratingMatch = review.match(/\d+(\.\d+)?/);
            if (ratingMatch) {
                return acc + parseFloat(ratingMatch[0]);
            }
        }
        return acc;
    }, 0);

    if (movie.reviews.length === 0) {
        movie.rating = 0;
    } else {
        movie.rating = totalRatings / movie.reviews.length;
    }

    const avgRatingElement = document.querySelector('.avg-rating');
    
    if (avgRatingElement) {
        avgRatingElement.textContent = movie.rating.toFixed(1);
    } 
}


    const reviewForm = movieDetails.querySelector('#review-form');
    const genderImageContainer = movieDetails.querySelector('#gender-image-container');

    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const firstNameInput = movieDetails.querySelector('#first-name');
        const lastNameInput = movieDetails.querySelector('#last-name');
        const countryInput = movieDetails.querySelector('#country');
        const genderInput = movieDetails.querySelector('#gender');
        const ratingInput = movieDetails.querySelector('#rating');
        const inputFields = [firstNameInput, lastNameInput, countryInput, genderInput, ratingInput];
      
        let isValid = true;
        inputFields.forEach(inputElement => {
            if (!inputElement.value.trim()) {
                markAsInvalid(inputElement);
                isValid = false;
            } else {
                markAsValid(inputElement);
            }
        });

        if (isValid) {
            const firstName = firstNameInput.value.trim();
            const lastName = lastNameInput.value.trim();
            const country = countryInput.value.trim();
            const gender = genderInput.value;
            const rating = parseFloat(ratingInput.value);

            const userRating = `<strong>${firstName} ${lastName} <i class="fas fa-map-marker-alt"></i>${country}  <i class="fas fa-star"></i> ${rating}/10</strong>\n`;
            movie.reviews.push(userRating);
            const newReviewListItem = createReviewListItem(userRating, gender);
            reviewList.insertAdjacentHTML('beforeend', newReviewListItem);
            updateAverageRating(movie);

            
            updateGenderImage(gender, genderImageContainer);

            reviewForm.reset();
        }
    });

  
    function markAsInvalid(inputElement) {
        inputElement.style.border = '2px solid red';
    }

 
    function markAsValid(inputElement) {
        inputElement.style.borderColor = '';
    }

    
    function updateGenderImage(selectedGender, container) {
        const image = document.createElement('img');
        image.className = 'gender-image';
        if (selectedGender === 'Male') {
            image.src = 'male.png';
            image.alt = 'Male Image';
        } else if (selectedGender === 'Female') {
            image.src = 'female.png';
            image.alt = 'Female Image';
        } else {
            
            container.innerHTML = '';
            return;
        }
        container.innerHTML = ''; 
        container.appendChild(image);
    }

    const card = createMovieCard(movie);
    movieDetails.insertBefore(card, movieDetails.firstChild);
});


