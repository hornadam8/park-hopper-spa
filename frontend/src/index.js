const parksUrl = "http://localhost:3000/parks";
const commentsUrl = "http://localhost:3000/comments"
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';
let commentForm;
const main = document.querySelector('main');



/*const getParks = function(){
  fetch(parksUrl)
  .then(r => {return r.json()})
  .then(data => renderParks(data))
}*/

/*const renderParks = function(parks){
  parks.forEach(park => renderParkCard(park));
  let likeGlyphs = document.querySelectorAll('.like-glyph');
  for (let glyph of likeGlyphs){
    glyph.addEventListener("click",likeCallback)
  }

}*/

/*const renderParkCard = function(park){
  let cardWithCommentsHeight = [425,'px'];
  let parkCard = document.createElement('div');
  parkCard.className = "card";
  parkCard.dataset.id = park.id;

  parkCard.innerHTML = `
  <img src =${park.image} width="300" height="150">
  <h5>${park.name}</h5>
  <p>${park.description}</p>
  <ul>
    <li class="like">Like <span class="like-glyph">&#x2661;</span></li>
  </ul>
  <button class='comments_toggle' id='comments_toggle'>comments</button>
  <br>
  <div class='comment_container' display="none">
    <ul>
    </ul>
  </div>
  <br>
  <form id="comment-form" class="form" display="none" action="">
      <input type='text' name="comment" id="comment-input" cols="30" rows="10">
      <br>
      <button id='submit'>submit</button>
  </form>
  `

  let commentsContainer = parkCard.getElementsByClassName('comment_container')[0].getElementsByTagName('ul')[0]

  park.comments.forEach(comment => {
    let line = document.createElement('li');
    line.innerText = comment.content;
    cardWithCommentsHeight[0] += 20
    commentsContainer.appendChild(line)
  })

  commentForm = parkCard.getElementsByClassName('form')[0];

  commentForm.style.display = "none";

  commentContainer = parkCard.getElementsByClassName('comment_container')[0];

  commentContainer.style.display = "none";
  parkCard.getElementsByClassName('comments_toggle')[0].addEventListener("click", function(e){
    if (e.target.parentNode.getElementsByClassName('form')[0].style.display === "none"){
      e.target.parentNode.getElementsByClassName('form')[0].style.display = "";
      e.target.parentNode.getElementsByClassName('comment_container')[0].style.display = "";
      e.target.parentNode.style.height = cardWithCommentsHeight.join('');
    }
    else {
      e.target.parentNode.getElementsByClassName('form')[0].style.display = "none";
        e.target.parentNode.getElementsByClassName('comment_container')[0].style.display = "none";
      e.target.parentNode.style.height = '350px';
    }
  })

  commentForm.addEventListener('submit',function(e){
    e.preventDefault();
    let comSpace = document.createElement('li');
    comSpace.classList.add('comment');
    comSpace.innerText = e.target.comment.value;
    e.target.parentNode.getElementsByClassName('comment_container')[0].appendChild(comSpace);
    let data = {
      content: comSpace.innerText,
      park_id: park.id
    }
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    };
    fetch(commentsUrl,configObj)
    .then(r => {return r.json();
    })
    .then(object =>
      {console.log(object);
    })
    cardWithCommentsHeight[0] += 20;
    e.target.comment.value = "";
    e.target.parentNode.style.height = cardWithCommentsHeight.join('');
  })



  main.appendChild(parkCard)
}*/


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



Park.get();
