class Comment{
  constructor(content,park_id){
    this.content = content,
    this.park_id = park_id
  }

  set id(id){
    this._id = id
  }
  get id(){
    return this._id
  }

  static all = []

  static create(commentObj){
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(commentObj)
    };
    fetch(commentsUrl,configObj)
    .then(r => {return r.json();
    })
    .then(object =>
      {commentObj.id = object.id;
      Comment.all.push(commentObj)
      let comSpace = document.createElement('li');
      comSpace.classList.add('comment');
      comSpace.setAttribute("id",`${commentObj.id}`)
      comSpace.innerHTML = `<p>${commentObj.content}    <button id='delete'>delete</button>`
      let card = document.getElementsByClassName('card')[(parseInt(`${commentObj.park_id}`,10) - 1)]
      let comContainer = card.getElementsByClassName('comment_container')[0];
      comContainer.appendChild(comSpace)
      comSpace.getElementsByTagName('button')[0].addEventListener('click',function(e){
        e.preventDefault();
        comSpace.parentNode.removeChild(comSpace);
        Comment.delete(commentObj)
      })
    })
  }

  static delete(inst) {
    let data = {
      id: inst.id,
      content: inst.content,
      park_id: inst.park_id
    }
    let configObj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(inst)
    };
    fetch(commentsUrl+`/${inst.id}`,configObj);

  }


  static makeFromDb(comments,list){
    comments.forEach(comment => {
      let line = document.createElement('li');
      line.innerHTML = `<p>${comment.content}    <button id='delete'>delete</button>`;
      line.getElementsByTagName('button')[0].addEventListener('click',function(e){
        e.preventDefault();
        Comment.delete(comment);
        line.parentNode.removeChild(line)
      })
      list.appendChild(line)
    })
  }

  static toggleShow(park){
    park.getElementsByClassName('comments_toggle')[0].addEventListener("click", function(e){
      if (e.target.parentNode.getElementsByClassName('form')[0].style.display === "none"){
        e.target.parentNode.getElementsByClassName('form')[0].style.display = "";
        e.target.parentNode.getElementsByClassName('comment_container')[0].style.display = "";
      }
      else {
        e.target.parentNode.getElementsByClassName('form')[0].style.display = "none";
          e.target.parentNode.getElementsByClassName('comment_container')[0].style.display = "none";
        e.target.parentNode.style.height = '400px';
      }
    })
  }

  static formSubmit(object){
    let comment = new Comment(object.content,object.park_id);
    Comment.create(comment);
  }
}
