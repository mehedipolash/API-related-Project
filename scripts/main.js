document.getElementById('start-btn').addEventListener('click', function () {
  const nameInput = document
    .querySelector("input[placeholder='Enter your Name']")
    .value.trim();
  const passwordInput = document.querySelector("input[type='password']").value;

  if (nameInput !== '' && passwordInput === '123456') {
    Swal.fire({
      icon: 'success',
      title: 'Login Successful!',
      text: 'Welcome to English জানালা!',
      showConfirmButton: false,
      timer: 1500,
    });
    // Rest of your code
    document.getElementById('header-section').classList.remove('hidden');
    document.getElementById('banner-section').classList.add('hidden');
    document.getElementById('learn-section').classList.remove('hidden');
    document.getElementById('footer-section').classList.remove('hidden');
    document.getElementById('frequently').classList.remove('hidden');
    document.getElementById('select-section').classList.remove('hidden');
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Login Failed',
      text: 'Please enter your name & use password: 123456',
      confirmButtonColor: '#ff6a5e',
    });
  }
});

function loadCategory() {
  fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then(data => displayCategory(data.data));
}
loadCategory();

function displayCategory(levels) {
  const levelContainer = document.getElementById('level-container');
  for (let level of levels) {
    const levelDiv = document.createElement('div');
    levelDiv.innerHTML = `
      <button id="${level.level_no}" onclick="loadCategoryWords('${level.level_no}')"
        class="btn btn-outline">
        <img src="assets/fa-book-open.png" alt="">
        level-${level.level_no}
      </button>
    `;
    levelContainer.append(levelDiv);
  }
}

function loadCategoryWords(level) {
  showLoader();
  const url = `https://openapi.programming-hero.com/api/level/${level}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      removeActiveClass();
      const clickedBtn = document.getElementById(`${level}`);
      clickedBtn.classList.add('active');
      displayCategoryWords(data.data);
    });
}

function displayCategoryWords(receivedData) {
  const wordContainer = document.getElementById('word-container');
  wordContainer.innerHTML = '';
  document.getElementById('select-section').classList.add('hidden'); // Changed
  wordContainer.parentElement.classList.remove('hidden'); // Added

  if (receivedData.length === 0) {
    wordContainer.innerHTML = `<div class="col-span-full flex flex-col justify-center items-center text-center py-20">
        <img class="w-[120px]" src="assets/alert-error.png" alt="">
        <h2 class="text-sm text-gray-400 my-5" >এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h2>
        <h1 class="text-3xl font-bold">নেক্সট Lesson এ যান</h1>
      </div>`;
    hideLoader();
    return;
  }

  for (let data of receivedData) {
    const wordCard = document.createElement('div');
    wordCard.innerHTML = `
  <div class="card shadow h-full"> <!-- Added h-full -->
    <div class="card-body items-center text-center">
      <h2 class="card-title">${data.word}</h2>
      <h2 class="card-title">Meaning / Pronunciation</h2>
      <div class="mt-5">
        ${
          data.meaning
            ? `
          <p>${data.meaning} / ${data.pronunciation || 'উচ্চারণ নেই'}</p>
        `
            : `
          <p class="text-red-500">অর্থ পাওয়া যায়নি</p>
        `
        }
      </div>
      <div class="mt-7 flex justify-between w-full gap-4">
        <button onclick="loadWordDetails('${data.id}')" class="btn">
          <i class="fa-solid fa-circle-info"></i>
        </button>
        <button class="btn">
          <i class="fa-solid fa-volume-high"></i>
        </button>
      </div>
    </div>
  </div>
`;
    wordContainer.append(wordCard);
  }
  hideLoader();
}

///////////////////////////////////////////////////////////////////////////

function removeActiveClass() {
  const activeButtons = document.getElementsByClassName('active');
  for (let btn of activeButtons) {
    btn.classList.remove('active');
  }
  // console.log(activeButtons);
}
////////////////////////////////////////////////////////////////////////////////

function loadWordDetails(wordId) {
  showLoader();
  console.log(wordId);
  const modalUrl = `https://openapi.programming-hero.com/api/word/${wordId}`;
  fetch(modalUrl)
    .then(res => res.json())
    .then(data => displayWordDetails(data.data));
}

function displayWordDetails(word) {
  document.getElementById('word_details').showModal();
  const detailsContainer = document.getElementById('details-container');
  detailsContainer.innerHTML = `
    <div class="card bg-blue-100">
      <div class="card-body">
        <h2 class="card-title">
          ${word.word}
          (<i class="fa-solid fa-microphone-lines"></i>: ${
            word.pronunciation || 'উচ্চারণ নেই'
          })
        </h2>
        
        <p class="font-bold py-4">Meaning</p>
        ${
          word.meaning
            ? `
          <p>${word.meaning}</p>
        `
            : `
          <p class="text-red-500">অর্থ পাওয়া যায়নি</p>
        `
        }
        
        <p class="font-bold py-4">Example</p>
        ${
          word.sentence
            ? `
          <p>${word.sentence}</p>
        `
            : `
          <p class="text-gray-400">No example available</p>
        `
        }
        
        <p class="font-bold py-4">সমার্থক শব্দ গুলো</p>
        ${
          word.synonyms
            ? `
          <p class="pb-4">${word.synonyms}</p>
        `
            : `
          <p class="pb-4 text-gray-400">সমার্থক শব্দ নেই</p>
        `
        }
      </div>
    </div>
  `;
  hideLoader();
}

//////////////////////////////////////////////////////////////////////////////////

// Smooth scroll to FAQ section
document.getElementById('faq-btn').addEventListener('click', function (e) {
  e.preventDefault();
  const faqSection = document.getElementById('frequently');

  // Smooth scroll with offset for fixed header
  faqSection.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest',
  });
});
//Smooth scroll to Learn section
document.getElementById('learn-btn').addEventListener('click', function (e) {
  e.preventDefault();
  const learnSection = document.getElementById('learn-section');

  // Smooth scroll with offset for fixed header
  learnSection.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest',
  });
});

////////////////////////////////////////////////////////////////////////////////////

document.getElementById('logout-btn').addEventListener('click', function () {
  document.getElementById('header-section').classList.add('hidden');
  document.getElementById('learn-section').classList.add('hidden');
  document.getElementById('footer-section').classList.add('hidden');
  document.getElementById('frequently').classList.add('hidden');
  document.getElementById('select-section').classList.add('hidden');
  document
    .querySelector('#word-container')
    .parentElement.classList.add('hidden');

  document.getElementById('banner-section').classList.remove('hidden');

  document.querySelector("input[placeholder='Enter your Name']").value = '';
  document.querySelector("input[type='password']").value = '';

  removeActiveClass();

  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/////////////////////////////////////////////////////////////////////////////////////

function showLoader() {
  document.getElementById('loader').classList.remove('hidden');
  document.getElementById('word-container').classList.add('hidden');
}
function hideLoader() {
  document.getElementById('loader').classList.add('hidden');
  document.getElementById('word-container').classList.remove('hidden');
}
