/** app */
const dropzones = document.querySelectorAll('.dropzone')
const button = document.querySelector('.addButton')
const button2 = document.querySelector('.addButton2')
const dzInProgress = document.querySelector('inProgress')
const dzDone = document.querySelector('Done')
const cards = document.querySelectorAll('.card')
const deleteBtn = document.querySelectorAll('.deleteButton')

function addNextTask() {
    const newTask = document.getElementById('newTask').value
    const ToDo = document.getElementById('ToDo')
    const divCard = document.createElement('div')
    const divStatus = document.createElement('div')
    const divContent = document.createElement('div')
    const divDelete = document.createElement('div')
    const divStatusDelete = document.createElement('div')

    if (document.getElementById('newTask').value == ""){
        return " "
    }
    else {
        divCard.classList.add('card')
        divStatus.classList.add('status')
        divContent.classList.add('content')
        divDelete.classList.add('deleteButton')
        divDelete.innerHTML = 'x'
        divStatusDelete.classList.add('statusDelete')
        divCard.setAttribute('draggable', true)
        divContent.innerHTML = newTask
        divStatusDelete.appendChild(divStatus)
        divStatusDelete.appendChild(divDelete)
        divCard.appendChild(divStatusDelete)
        divCard.appendChild(divContent)

        ToDo.appendChild(divCard)
        document.getElementById('newTask').value = ""
        const cards = document.querySelectorAll('.card')
        cards.forEach(card => {
            card.addEventListener('dragstart', dragstart)
            card.addEventListener('drag', drag)
            card.addEventListener('dragend', dragend)
        
        })
        statusChange();
        deleteTask();

    }
  }

/** Cards */



function dragstart(){
    dropzones.forEach( dropzone => dropzone.classList.add('highlight'))
    this.classList.add('is-dragging')
    statusChange()
}

function drag(){
    statusChange()
}

function dragend(){
    dropzones.forEach( dropzone => dropzone.classList.remove('highlight'))
    this.classList.remove('is-dragging')
    statusChange()
}

/** Dropzones */
dropzones.forEach(dropzone => {
    dropzone.addEventListener('dragenter', dragenter)
    dropzone.addEventListener('dragover', dragover)
    dropzone.addEventListener('dragleave', dragleave)
    dropzone.addEventListener('drop', drop)

})

function dragenter(){

}

function dragover(){
    this.classList.add('over')

    const cardBeingDragged = document.querySelector('.is-dragging')
    this.appendChild(cardBeingDragged)
    statusChange();
    
}

function dragleave(){
    this.classList.remove('over')
    
}

function drop(){
    this.classList.remove('over')
    statusChange();
}

/** Adicionar uma tarefa */
function statusChange(){
    const colorStatus = document.querySelectorAll('.status')
    colorStatus.forEach(colorStat => {
        const currentParent = colorStat.parentNode
        const currentGParent = currentParent.parentNode
        const currentGrandParent = currentGParent.parentNode.id
        
        if (currentGrandParent == "ToDo"){
                colorStat.classList.remove('red')
                colorStat.classList.add('red')}
            
        else if (currentGrandParent == "inProgress"){
                colorStat.classList.remove('red', 'green')
                colorStat.classList.add('yellow')}

        else if (currentGrandParent == "Done") {
                colorStat.classList.remove('red','yellow')
                colorStat.classList.add('green')}

        else if (currentGrandParent == "boards") {
            
            this.cardBeingDragged.remove()
        }
        })

}

/*Deletar uma tarefa*/
function deleteTask(){
    const CardstoBeDeleted = document.querySelectorAll('.deleteButton')
    CardstoBeDeleted.forEach(cardtoBeDeleted => {
        cardtoBeDeleted.addEventListener('click', () =>{
            cardtoBeDeleted.parentNode.parentNode.remove()
        })
    });
}
button.onclick = addNextTask;


