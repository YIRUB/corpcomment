// -- Counter Component
const textareaEl = document.querySelector(".form__textarea");
const counterEl = document.querySelector(".counter");
const inputhandler = ()=>
{
    // limit of char
    const MaxNrChars = 150;
    // No of chat that input
    const NrCharsinp = textareaEl.value.length;
    const CharLefts = MaxNrChars - NrCharsinp;
    counterEl.textContent = CharLefts;
    
}
textareaEl.addEventListener('input',inputhandler)