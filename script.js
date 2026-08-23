// --   Golobal--   
const textareaEl = document.querySelector(".form__textarea");
const counterEl = document.querySelector(".counter");
const formEl = document.querySelector(".form");
const feedbackListEl = document.querySelector(".feedbacks");
const submitbtnEl = document.querySelector(".submit-btn");


// -- Counter Component
const inputhandler = ()=>
{
    // limit of char
    const MaxNrChars = 150;
    // No of chat that input
    const NrCharsinp = textareaEl.value.length;
    const CharLefts = MaxNrChars - NrCharsinp;
    counterEl.textContent = CharLefts;
    
};
textareaEl.addEventListener('input',inputhandler);

// --   Form Component  --



const submithandler = (event)=>
{
// prevent default browser Action
event.preventDefault();
const text = textareaEl.value;
if (text.includes('#') && text.length > 4) {
        formEl.classList.add("form--valid");
        setTimeout(() => {
        formEl.classList.remove("form--valid");
      }, 2000);
} else {
        formEl.classList.add("form--invalid");
        setTimeout(() => {
        formEl.classList.remove("form--invalid");
      }, 2000);
      textareaEl.focus();
      return;
      }
    
                 
    const hashtag = text.split(" ").find(word => word.includes("#"))
    const company = hashtag.substring(1);
    const badgeLetter = company.substring(0,1).toUpperCase();
    const upvoteCount = 0;
    const daysAgo = 0;
    const feedbackItemHTML = `
     <li class="feedback">
            <button class="upvote">
                <i class="fa-solid fa-caret-up upvote__icon"></i>
                <span class="upvote__count">${upvoteCount}</span>
            </button>
            <section class="feedback__badge">
                <p class="feedback__letter">${badgeLetter}</p>
            </section>
            <div class="feedback__content">
                <p class="feedback__company">${company}</p>
                <p class="feedback__text">${text}</p>
            </div>
            <p class="feedback__date">${daysAgo === 0 ? 'NEW' : `${daysAgo}d`}</p>
        </li>
    `
    feedbackListEl.insertAdjacentHTML("beforeend",feedbackItemHTML)
    textareaEl.value = "";
    submitbtnEl.blur();
    counterEl.textContent = '150';
      

};

formEl.addEventListener("submit",submithandler )