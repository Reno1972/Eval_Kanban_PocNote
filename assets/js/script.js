
// Variables

let toDo = document.querySelector("#toDo");
let done = document.querySelector("#done");
let verified = document.querySelector("#verified");
let titleNote = document.getElementById("titleNote");
let contentNote = document.getElementById("contentNote");
let validButton = document.getElementById("validButton");
let newNote;
let createArticle, createTitle, createContent, createStatus, createId;

let tabNotes = [];

let idNote = 0;

// Partie formulaire

validButton.addEventListener("click", function(){
    if(titleNote.value == "" || contentNote.value == ""){
        alert("Veuliiez remplir tous les champs !")
    }else{
        let tempNote = {
          title : titleNote.value,
          content : contentNote.value,
          status : "toDo",
          id : `Note n° : ${idNote}`
        }
        console.log(tempNote)
        tabNotes.push(tempNote);
        createNote(tempNote.title, tempNote.content, tempNote.status, tempNote.id);
        // Incremente l'Id
        idNote++;

        // Met le tableau en string
        localStorage.setItem("tableau",JSON.stringify(tabNotes));
    }
})

initApp(tabNotes)

// Fonctions de création des notes du tableau dans le html


function initApp(arr){
    if(localStorage.length != 0){
      // Remet le cache sous forme de tableau
        arr = JSON.parse(localStorage.getItem("tableau"));    
        // création d'une note
        arr.forEach(note=> {
          createNote(note.title, note.content, note.status, note.id);
        })
        console.table(localStorage);
    }
    
}

function createElement(){
    createArticle = document.createElement("article");
    createTitle = document.createElement("h3");
    createContent = document.createElement("p");
    createStatus = document.createElement("p");
    createId = document.createElement("p");
}

function noteElement(title, content, status, id){
    createTitle.textContent = title;
    createContent.textContent = content;
    createStatus.textContent = status;
    createId.textContent = id;
}

function appendNote(){
    toDo.append(createArticle)

    // Attributs pour le Drag and Drop sur l'article
    createArticle.setAttribute("id", `draggable ${idNote}`);
    createArticle.setAttribute("draggable", "true");
    createArticle.setAttribute("ondragstart", "event.dataTransfer.setData('text/plain',null")

    createArticle.append(createTitle);
    createArticle.append(createContent);
    createArticle.append(createStatus);
    createArticle.append(createId);
}

function createNote(title, content, status, id){
    createElement();
    noteElement(title, content, status, id);
    appendNote();
}

// Fonction suppression Note

// function deleteNote(note, id){
//   note = tabNotes;
//   id = tabNotes[3];
//   console.log(deleteNote(note,id))
// }


// Le Drag un Drop

var dragged;

document.addEventListener("drag", function(event) {

});

document.addEventListener("dragstart", function(event) {
    dragged = event.target;
    event.target.style.opacity = .5;
});

document.addEventListener("dragend", function(event) {
    event.target.style.opacity = "";
});

document.addEventListener("dragover", function(event) {
    event.preventDefault();
});

document.addEventListener("dragenter", function(event) {
    if (event.target.className == "dropzone") {
    event.target.style.background = "LightSkyBlue";
    }

});

document.addEventListener("dragleave", function(event) {
  
    if (event.target.className == "dropzone") {
    event.target.style.background = "";
    }

});

// -------Drop global------

document.addEventListener("drop", function(event) {
    event.preventDefault();
    if (event.target.className == "dropzone") {
    event.target.style.background = "";
    dragged.parentNode.removeChild( dragged );
    event.target.appendChild( dragged );
    } 
    if (event.target.id == "image") {
      event.target.style.background = "";
      dragged.parentNode.removeChild( dragged );
      event.target.appendChild( dragged );
    }  
});

// ------Drop par Div-------

// document.addEventListener("drop", function(event) {
//   event.preventDefault();
//   if (event.target.id == "toDo") {
//   event.target.style.background = "";
//   dragged.parentNode.removeChild( dragged );
//   event.target.appendChild( dragged );
//   }  if (event.target.id == "done") {
//     event.target.style.background = "";
//     dragged.parentNode.removeChild( dragged );
//     event.target.appendChild( dragged );
//   }  if (event.target.id == "verified") {
//     event.target.style.background = "";
//     dragged.parentNode.removeChild( dragged );
//     event.target.appendChild( dragged );
//   } if (event.target.id == "deletezone") {
//     event.target.style.background = "";
//     dragged.parentNode.removeChild( dragged );
//     event.target.appendChild( dragged );
//   }    
// });