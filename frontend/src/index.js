const parksUrl = "http://localhost:3000/parks";
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';


const main = document.querySelector('main');

const getParks = function(){
  fetch(parksUrl)
  .then(r => {console.log(r); return r.json()})
  .then(data => renderParks(data))
}

const renderParks = function(parks){
  parks.forEach(park => renderParkCard(park));
  let likeGlyphs = document.querySelectorAll('li');

  for (let glyph of likeGlyphs){
    glyph.addEventListener("click",likeCallback)
  }
}

const renderParkCard = function(park){
  let parkCard = document.createElement('div');
  parkCard.className = "card";
  parkCard.dataset.id = park.id;
  parkCard.innerHTML = `
  <img src =${park.image} width="300" height="150">
  <h5>${park.name}</h5>
  <p>${park.description}</p>
  <ul>
    <li class="like"><span class="like-glyph">&#x2661;</span></li>
  </ul>
  `
  //debugger;
  main.appendChild(parkCard)
}
function likeCallback(e) {
  let heart = e.target
  if (heart.innerText == EMPTY_HEART){
    heart.innerText = FULL_HEART
    heart.classList.add('activated-heart')
  }
  else {
    heart.innerText = EMPTY_HEART
    heart.classList.remove('activated-heart')
  }
}



getParks();

let likeGlyphs = document.querySelectorAll('li');

for (let glyph of likeGlyphs){
  glyph.addEventListener("click",likeCallback)
}
