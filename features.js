const addButton = document.querySelector(".addNotes");
let count = 0;

const updateData = (text='')=>{
    const texAreaData = document.querySelectorAll("textarea");

    const notes = []
    texAreaData.forEach((elem)=>{
        if(elem.value.length != 0){
            notes.push(elem.value);
        }
    })
    // console.log(notes);

    localStorage.setItem('notes',JSON.stringify(notes));
}


const addNewNote = (text)=>{
    count = count+1;
    const note = document.createElement('div');
    const frame = document.querySelector(".frame");

    note.classList.add("note");

    const htmlData = `<div class="operation">
            <button class="delete"><i class="fa-solid fa-trash-can"></i>x</button>
            <button class="edit"><i class="fa-regular fa-pen-to-square"></i>+ </button>
        </div>
        <div class="main">
            <label for="text">Write....</label>
            <textarea name="textArea" id="text" cols="45" rows="10"></textarea>
        </div>`;

    note.insertAdjacentHTML('afterbegin',htmlData);
    frame.appendChild(note);
    console.log(`count = ${count}`);
    const child = frame.childNodes[count-1];
    // console.log(child);
    const editButton = child.querySelector(".edit");
    const delButtotn = child.querySelector(".delete");
    const main = child.querySelector(".main");
    const textArea = child.querySelector("textarea");
    
    textArea.readOnly = false;

    let flag = true;
    if(text){
        textArea.innerHTML = text;
        flag = false;
    }
    // console.log(frame);
    // console.log(delButtotn);
    if(flag == true){
        textArea.focus();
    }

    delButtotn.addEventListener('click',()=>{
        child.remove();
        count = count -1;
        updateData();
    })
    editButton.addEventListener('click',()=>{
        textArea.readOnly = !textArea.readOnly;
        if(textArea.readOnly == false){
            textArea.focus();
        }
    })

    // console.log(textArea);
    textArea.addEventListener('change',(event)=>{
        const data = event.target.value;
        console.log(data);
        textArea.readOnly = !textArea.readOnly;
        updateData();
    })
}

const notes = JSON.parse(localStorage.getItem('notes'));

if(notes){
    notes.forEach((elem)=>{
        addNewNote(elem);
    })
}


addButton.addEventListener('click',()=> addNewNote());