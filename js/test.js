import {saveToFirebase, getFileFromFirebase} from '../firebase/js/firebase.js';


//переопределяем прослушивание local storage, чтобы срабатывало на тойже странице
var originalSetItem = localStorage.setItem; 
localStorage.setItem = function () {
    const event = new Event('itemInserted');
    originalSetItem.apply(this, arguments);
    document.dispatchEvent(event);
}

//если есть изменения вызываем функцию сохранения задач в firebase
const localStorageSetHandler = function(e) {
    //do something
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    saveToFirebase(tasks);
};

//прослушка изменений в local storage
document.addEventListener("itemInserted", localStorageSetHandler, false);

