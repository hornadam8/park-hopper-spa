class Park{
  constructor(id,image,name,description,comments,likes){
    this.id = id
    this.name = name;
    this.image = image;
    this.description = description;
    this.comments = comments;
    this.likes = likes
    Park.all.push(this)
  }

  static all = []

  static get(){
    fetch(parksUrl)
    .then(r => {return r.json()})
    .then(data => Park.make(data))
  }

  static make(data){
    let parks = data.map(park => new Park(park.id,park.image,park.name,park.description,park.comments,park.likes));
    Park.render(parks)
  }

  static render(parks){
    parks.forEach(park => Park.renderCard(park));
    let likeGlyphs = document.querySelectorAll('.like-glyph');
    for (let glyph of likeGlyphs){
      glyph.addEventListener("click",likeCallback)
    }
  }

  static renderCard(park){
    let parkCard = document.createElement('div');
    parkCard.className = "card";
    parkCard.dataset.id = park.id;

    parkCard.innerHTML = `
    <img src =${park.image} width="300" height="150">
    <h5>${park.name}</h5>
    <p>${park.description}</p>
    <ul>
      <li class="like">Likes: ${park.likes} <span class="like-glyph">&#x2661;</span></li>
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

    let commentContainerList = parkCard.getElementsByClassName('comment_container')[0].getElementsByTagName('ul')[0];
    Comment.makeFromDb(park.comments,commentContainerList);

    let commentForm = parkCard.getElementsByClassName('form')[0];
    commentForm.style.display = "none";

    let commentContainer = parkCard.getElementsByClassName('comment_container')[0];
    commentContainer.style.display = "none";

    Comment.toggleShow(parkCard);

    commentForm.addEventListener('submit',function(e){
      e.preventDefault();
      let data = {
        content: e.target.comment.value,
        park_id: e.target.parentNode.dataset.id
      }
      Comment.formSubmit(data);
      this.getElementsByTagName('input').comment.value = ""
    });
    let cards = Array.prototype.slice.call(document.getElementsByClassName("card"));
    if(!cards.some(e => {return e.dataset.id === parkCard.dataset.id})){
      main.appendChild(parkCard)
    }
  }
}
