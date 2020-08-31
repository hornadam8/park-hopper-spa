const parksUrl = "http://localhost:3000/parks";
const commentsUrl = "http://localhost:3000/comments";
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';
let commentForm;
const main = document.querySelector('main');


function likeCallback(e) {
  let park = Park.all[(e.target.parentNode.parentNode.parentNode.dataset.id - 1)];
  let comments = park.comments
  let heart = e.target
  let targetArr = e.target.parentNode.innerText.split(' ')
  if (heart.innerText == EMPTY_HEART){
    park.likes += 1
    heart.innerText = FULL_HEART
    heart.classList.add('activated-heart')
    park.likeStatus = FULL_HEART
    targetArr[1] = park.likes
    console.log(e.target.parentNode.getElementsByClassName('like-text'))
    e.target.parentNode.getElementsByClassName('like-text')[0].textContent = targetArr.join(' ')
  }
  else {
    park.likes -= 1;
    heart.innerText = EMPTY_HEART
    heart.classList.remove('activated-heart')
    park.likeStatus = EMPTY_HEART
    targetArr[1] = park.likes
    e.target.parentNode.getElementsByClassName('like-text')[0].textContent = targetArr.join(' ')
  }
  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(park)
  };

fetch(`http://localhost:3000/parks/${park.id}`,configObj);
Park.renderCard(park);
}



Park.get();
