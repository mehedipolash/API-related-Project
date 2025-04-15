document.addEventListener('DOMContentLoaded', function () {
  const heroSection = document.getElementById('hero-section');
  const footerSection = document.getElementById('footer-section');
  const letsStick = document.getElementById('lets-stick');
  const forLearn = document.getElementById('for-learn');
  const wordContainer = document.getElementById('word-container');
  const forFaq = document.getElementById('for-faq');
  const loginButton = document.querySelector('.btn-primary');
  const logoutButton = document.querySelector('button:nth-child(3)');
  const nameInput = document.querySelector("input[placeholder=' Name']");
  const passwordInput = document.querySelector("input[type='password']");

  letsStick.style.display = 'none';
  forLearn.style.display = 'none';
  wordContainer.style.display = 'none';
  forFaq.style.display = 'none';

  loginButton.addEventListener('click', function () {
    const nameValue = nameInput.value.trim();
    const passwordValue = passwordInput.value;

    if (nameValue !== '' && passwordValue === '123456') {
      heroSection.style.display = 'none';
      letsStick.style.display = 'flex';
      forLearn.style.display = 'block';
      wordContainer.style.display = 'grid';
      forFaq.style.display = 'block';
    } else {
      alert('Invalid login! Please enter a name and use password 123456.');
    }
  });

  logoutButton.addEventListener('click', function () {
    heroSection.style.display = 'block';
    footerSection.style.display = 'block';
    footerSection.style.display = 'flex';

    letsStick.style.display = 'none';
    forLearn.style.display = 'none';
    wordContainer.style.display = 'none';
    forFaq.style.display = 'none';

    nameInput.value = '';
    passwordInput.value = '123456';
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const faqButton = document.getElementById('Faq-btn');
  const learnButton = document.getElementById('learn-button');

  const faqSection = document.getElementById('for-faq');
  const learnSection = document.getElementById('for-learn');

  if (faqButton && faqSection) {
    faqButton.addEventListener('click', function () {
      faqSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (learnButton && learnSection) {
    learnButton.addEventListener('click', function () {
      learnSection.scrollIntoView({ behavior: 'smooth' });
    });
  }
});

const selectSection = () => {
  document.getElementById('select-section').classList.remove('hidden');
  document.getElementById('choose-lesson').classList.add('hidden');
};

const hideselectSection = () => {
  document.getElementById('select-section').classList.add('hidden');
  document.getElementById('choose-lesson').classList.remove('hidden');
};

const showLoader = () => {
  document.getElementById('loader').classList.remove('hidden');
  document.getElementById('word-container').classList.add('hidden');
};
const hideLoader = () => {
  document.getElementById('loader').classList.add('hidden');
  document.getElementById('word-container').classList.remove('hidden');
};

const removeActiveClass = () => {
  const activeButtons = document.getElementsByClassName('active');
  for (let btn of activeButtons) {
    btn.classList.remove('active');
  }
};

console.log('script is connected');
function loadCategories() {
  fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then(data => displayCategories(data.data));
}

const loadcategoriwords = id => {
  showLoader();

  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  console.log(url);
  fetch(url)
    .then(res => res.json())
    .then(data => {
      removeActiveClass();
      const clickedButton = document.getElementById(`btn-${id}`);
      clickedButton.classList.add('active');
      console.log(clickedButton);
      loadWords(data.data);
    })
    .finally(() => hideLoader());
};

const loadWordDetails = wordid => {
  showLoader();

  console.log(wordid);
  const url = `https://openapi.programming-hero.com/api/word/${wordid}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayWordDetails(data.data))
    .finally(() => hideLoader());
};

const displayWordDetails = word => {
  console.log(word);
  document.getElementById('word_details').showModal();
  const detailsContainer = document.getElementById('details-container');
  detailsContainer.innerHTML = `
<div class="card bg-base-100 w-96 ">
  <div class="card-body">
    <h2 class="card-title">${word.word}(<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
    <p class="font-bold py-4">Meaning</p>
    <p>${word.meaning}</p>
    <p class="font-bold py-4">Example</p>
    <p>${word.sentence}</p>
    <p class="font-bold py-4">সমার্থক শব্দ গুলো</p>
    <p class="pb-4 ">${word.synonyms}</p>



    <div class="card-actions">
      <button class="btn btn-primary">Complete Learning</button>
    </div>
  </div>
</div>
`;
};

function displayCategories(categories) {
  const categoryContainer = document.getElementById('category-button');
  for (let cat of categories) {
    const categoryDiv = document.createElement('div');

    categoryDiv.innerHTML = `
<button id="btn-${cat.level_no}" onclick="loadcategoriwords(${cat.level_no})"  class="btn text-blue-500 hover:text-white hover:bg-red-500"><img src="assets/fa-book-open.png" alt="">Lesson-${cat.level_no}</button>
`;
    categoryContainer.append(categoryDiv);
    categoryDiv
      .querySelector(`#btn-${cat.level_no}`)
      .addEventListener('click', () => {
        hideselectSection();
        loadcategoriwords(cat.level_no);
      });
  }
}

function loadAllWords() {
  showLoader();

  fetch('https://openapi.programming-hero.com/api/words/all')
    .then(response => response.json())
    .then(data => loadWords(data.data))
    .finally(() => hideLoader());
}

const loadWords = words => {
  const wordContainer = document.getElementById('word-container');
  wordContainer.innerHTML = '';

  if (words.length == 0) {
    wordContainer.innerHTML = `<div class="col-span-full flex flex-col justify-center items-center text-center py-20">
            <img class="w-[120px]" src="assets/alert-error.png" alt="">
            <h2 class="text-sm text-gray-400 my-5" >এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h2>
            <h1 class="text-3xl font-bold">নেক্সট Lesson এ যান</h1>
          </div>`;
    return;
  }

  words.forEach(word => {
    console.log(word);
    const wordCard = document.createElement('div');
    wordCard.innerHTML = `

<div class="card shadow ">
  <div class="card-body items-center text-center">
     <h2 class="card-title">${word.word}</h2>
              <h2class="card-title">Meaning / Pronounciation</h2>
              <p class="mt-5">"${word.meaning}  /  ${word.pronunciation}"</p>
     <div class=" mt-7 flex justify-between ">
                 <button onclick=loadWordDetails('${word.id}') class="btn"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn "><i class="fa-solid fa-volume-high"></i></button>
              </div>
  </div>
</div>

`;
    wordContainer.append(wordCard);
  });
  hideLoader();
};

loadCategories();

document.addEventListener('DOMContentLoaded', () => {
  selectSection();
});
