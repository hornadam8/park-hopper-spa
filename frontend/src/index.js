const parksUrl = "http://localhost:3000/parks";
const commentsUrl = "http://localhost:3000/comments"
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';
let commentForm;
const main = document.querySelector('main');


function likeCallback(e) {
  let park = Park.all[(e.target.parentNode.parentNode.parentNode.dataset.id - 1)];
  let comments = park.comments
  let heart = e.target
  if (heart.innerText == EMPTY_HEART){
    park.likes += 1
    heart.innerText = FULL_HEART
    heart.classList.add('activated-heart')
    Park.renderCard(park);
  }
  else {
    park.likes -= 1;
    heart.innerText = EMPTY_HEART
    heart.classList.remove('activated-heart')
  }
  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(park)
  };
  fetch(`http://localhost:3000/parks/${park.id}`,configObj)

}



Park.get();
