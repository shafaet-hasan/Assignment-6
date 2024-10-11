console.log("connected!!!");

let likedPets = [];
const spinner = document.getElementById('spinner');
const petsGrid = document.getElementById("pets");
const loadCategories = () =>{
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) =>displayCategories(data.categories) )
    .catch((error)=>console.log(error))
}

const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");
  categories.forEach((item) => {
      const buttonContainer = document.createElement("div");
      buttonContainer.innerHTML = `
          <button id="btn-${item.category}" onclick="loadCategoryVideos('${item.category}')" class="btn category-btn lg:w-80 w-70 h-[100px] lg:h-[80px] rounded-3xl shadow-md text-xl items-center lg:pr-10 lg:pl-4 bg-white py-4">
              <img class="w-10 h-10 mr-2" src="${item.category_icon}" alt="">
              ${item.category}
          </button>
      `;
      categoryContainer.append(buttonContainer);
  });
};


const loadPets = () =>{
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) =>displayPets(data.pets) )
    .catch((error)=>console.log(error))
}
let currentCategory = '';
const loadCategoryVideos = (category) => {
  currentCategory = category; 
  showSpinner(); // Show spinner when fetching begins

  // Simulate delay of 2 seconds
  setTimeout(async () => {
      try {
          const response = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`);
          const data = await response.json();
          console.log(data.data);
          removeActiveClass();

          
          const activeBtn = document.getElementById(`btn-${category}`);
          console.log(activeBtn);
          activeBtn.classList.add("active");
          displayPets(data.data); // After fetching, display the pets
      } catch (error) {
          console.error('Error fetching pets by category:', error);
      } finally {
          hideSpinner(); // Hide the spinner after loading is done
      }
  }, 2000); 
  
};
const displayPets = (pets) => {
  // Clear the pets grid before displaying new pets
  petsGrid.innerHTML = ''; 

  // Check if pets is an array and has elements
  if (!Array.isArray(pets) || pets.length === 0) {
      // Remove grid class if no pets are found
      petsGrid.classList.remove("grid");

      // Display the no content message and image
      petsGrid.innerHTML = `
          <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
              <img src="images/error.webp" alt="No Content" /> 
              <h2 class="text-center text-xl font-bold">No Content Here in this Category</h2> 
          </div>
      `;
  } else {
      // If pets are found, add the grid class to petsGrid
      petsGrid.classList.add("grid");

      // Iterate over each pet and create the card
      pets.forEach((pet) => {
          const petCard = document.createElement('div');
          petCard.className = 'bg-white p-4 rounded-lg shadow-xl';

          petCard.innerHTML = `
              <img src="${pet.image || 'placeholder.jpg'}" alt="${pet.pet_name}" class="w-full h-48 object-cover rounded-lg">
              <h3 class="text-xl font-bold mt-4">${pet.pet_name}</h3>
              <p>Breed: ${pet.breed || 'N/A'}</p>
              <p>Birth Date: ${pet.date_of_birth || 'Unknown'}</p>
              <p>Gender: ${pet.gender || 'Unknown'}</p>
              <p>Price: $${pet.price}</p>
              <div class="border-t-2 border-dashed border-gray-400 w-full mt-4"></div>
              <div class="flex gap-2">   
                  <button class="bg-white text-[#0E7A81] px-4 py-2 rounded-lg mt-4 border border-[#0E7A81]" onclick="likePet('${pet.image}', '${pet.pet_name}')">
                      <img class="w-7 h-6" src="https://img.icons8.com/?size=64&id=66627&format=png"/>
                  </button>
                  <button class="bg-white text-[#0E7A81] border border-[#0E7A81] px-4 py-2 rounded-lg mt-4" onclick="adoptPet(this)">
                      Adopt
                  </button>
                  <button class="bg-white text-[#0E7A81] px-4 py-2 border border-[#0E7A81] rounded-lg mt-4" onclick="loadDetails(${pet.petId})">
                      Details
                  </button>
              </div>
          `;

          // Append the pet card to the pets grid
          petsGrid.appendChild(petCard);
      });
  }
}
const displayDetails = (data) => {
  // Log the full data to understand its structure
  console.log('Full Data from API:', data);

  const detailContainer = document.getElementById("modal-content");

  // Check if data and data.image exist before trying to use them
  
    detailContainer.innerHTML = `
    
      <img src="${data.image}" alt="Pet Image" />
      <h3 class="text-xl font-bold mt-4 text-green-500">${data.pet_name}</h3>
      <div class="grid grid-cols-2">
        <p class="text-base font-bold">Breed: ${data.breed || 'N/A'}</p>
              <p class="text-base font-bold">Birth Date: ${data.date_of_birth || 'Unknown'}</p>
              <p class="text-base font-bold">Gender: ${data.gender || 'Unknown'}</p>
              <p class="text-base font-bold">Price: $${data.price}</p>
              <p class="text-base font-bold">Vaccinated Status: ${data.vaccinated_status}</p>
              </div>
              <div class="border-t-2 border-dashed border-gray-400 w-full m-4"></div>
      <p>${data.pet_details}</p>
    `;
 

  document.getElementById("customModal").showModal();
};

const loadDetails = async (petId) => {
  console.log('Pet ID:', petId);
  
  try {
    const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
    const res = await fetch(uri);
    const data = await res.json();
    
    // Log the data to verify the response structure
    console.log('API Response Data:', data);

    // Pass the relevant data to displayDetails
    displayDetails(data.petData);

  } catch (error) {
    console.error('Error fetching pet details:', error);
    // Handle error case
    const detailContainer = document.getElementById("modal-content");
    detailContainer.innerHTML = '<p>Failed to load pet details. Please try again later.</p>';
  }
};

const countdownEl = document.getElementById('countdown');
let countdown;

// Function to open the adopt modal and start countdown
function adoptPet(button) {
  let timeLeft = 3;
  
  // Open the DaisyUI modal by checking the checkbox
  document.getElementById('adopt-modal').checked = true;
  
  // Update the countdown every second
  countdown = setInterval(() => {
      countdownEl.textContent = timeLeft;
      timeLeft--;
      
      if (timeLeft < 0) {
          clearInterval(countdown); // Stop countdown
          button.innerText = 'Adopted';
          button.classList.add('bg-gray-300', 'cursor-not-allowed');
          
          // Close the modal automatically after the countdown finishes
          document.getElementById('adopt-modal').checked = false;
      }
  }, 1000);
}

// Function to close the adopt modal manually
function closeAdoptModal() {
  document.getElementById('adopt-modal').checked = false; // Close the modal
  clearInterval(countdown); // Stop countdown if modal is closed manually
}


const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  console.log(buttons);
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};

function showSpinner() {
 
  spinner.classList.remove('hidden'); // Show the spinner
  petsGrid.classList.add('hidden');   // Hide the pets grid while loading
}

// Function to hide the spinner
function hideSpinner() {
  spinner.classList.add('hidden');    // Hide the spinner
  petsGrid.classList.remove('hidden');// Show the pets grid
}

function likePet(image, pet_name) {
  // Avoid adding duplicates
  if (!likedPets.some(pet => pet.pet_name === name)) {
      likedPets.push({ image, pet_name });
      displayLikedPets();
  }
}
function displayLikedPets() {
  const likedPetsGrid = document.getElementById('liked-pets-grid');
 
  likedPetsGrid.innerHTML = likedPets.map(pet => `
      <div class="bg-white p-2 rounded-lg shadow-md">
          <img src="${pet.image || 'placeholder.jpg'}" alt="${pet.pet_name}" class="w-full h-24 object-cover rounded-lg">
          <p class="text-center font-bold mt-2">${pet.pet_name}</p>
      </div>
  `).join('');
}
const sortByPriceDescending = () => {
  if (!currentCategory) {
      console.error('No category selected.');
      return;
  }

  showSpinner();  // Show spinner when sorting begins

  setTimeout(async () => {
      try {
          const response = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${currentCategory}`);
          const data = await response.json();
          // Sort the pets by price in descending order
          const sortedPets = data.data.sort((a, b) => b.price - a.price);
          displayPets(sortedPets);  // Display the sorted pets
      } catch (error) {
          console.error('Error sorting pets by price:', error);
      } finally {
          hideSpinner();  // Hide spinner after sorting is done
      }
  }, 2000);
};
document.getElementById('sort-by-price').addEventListener('click', sortByPriceDescending);
loadCategories();
loadPets();
