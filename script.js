// --   Golobal--   
const MAXCHARS = 150;

const textareaEl = document.querySelector(".form__textarea");
const counterEl = document.querySelector(".counter");
const formEl = document.querySelector(".form");
const feedbackListEl = document.querySelector(".feedbacks");
const submitbtnEl = document.querySelector(".submit-btn");
const spinnerEl = document.querySelector(".spinner");

const renderFeedbackItem = (feedbackItem)=>{
const feedbackItemHTML = `
     <li class="feedback">
            <button class="upvote">
                <i class="fa-solid fa-caret-up upvote__icon"></i>
                <span class="upvote__count">${feedbackItem.upvoteCount}</span>
            </button>
            <section class="feedback__badge">
                <p class="feedback__letter">${feedbackItem.badgeLetter}</p>
            </section>
            <div class="feedback__content">
                <p class="feedback__company">${feedbackItem.company}</p>
                <p class="feedback__text">${feedbackItem.text}</p>
            </div>
            <p class="feedback__date">${feedbackItem.daysAgo === 0 ? 'NEW' : `${feedbackItem.daysAgo}d`}</p>
        </li>
    `
    feedbackListEl.insertAdjacentHTML("beforeend",feedbackItemHTML)
}

// -- Counter Component
const inputhandler = ()=>
{
    // limit of char
    const MaxNrChars = MAXCHARS;
    // No of chat that input
    const NrCharsinp = textareaEl.value.length;
    const CharLefts = MaxNrChars - NrCharsinp;
    counterEl.textContent = CharLefts;
    
};
textareaEl.addEventListener('input',inputhandler);

// --   Form Component  --

const showVisualIndicator = (textCheck)=>
{
const className = textCheck === 'valid'? 'form--valid' : 'form--invalid' ;
    formEl.classList.add(className);
    setTimeout(() => {
    formEl.classList.remove(className);
    }, 2000);

};

const submithandler = (event)=>
{
// prevent default browser Action
event.preventDefault();
const text = textareaEl.value;

if (text.includes('#') && text.length > 4) {

    showVisualIndicator('valid');

} else {

    showVisualIndicator('invalid');

    textareaEl.focus();

    return;

      }

       const hashtag = text.split(" ").find(word => word.includes("#"));
       const company = hashtag.substring(1);
       const badgeLetter = company.substring(0,1).toUpperCase();
       const upvoteCount = 0;
       const daysAgo = 0;
    
      const feedbackItem = {
        company,
        badgeLetter,
        upvoteCount,
        daysAgo,
        text
        
      }  
      renderFeedbackItem(feedbackItem);         
    textareaEl.value = "";
    submitbtnEl.blur();
    counterEl.textContent = MAXCHARS;
      

};

formEl.addEventListener("submit",submithandler );

//  -- Feedback List Component --

fetch('https://bytegrad.com/course-assets/js/1/api/feedbacks').then(res =>{
    return res.json();
}
).then(data =>
{
    spinnerEl.remove();
    data.feedbacks.forEach(element => {
        renderFeedbackItem(element);
        
    });
}
).catch(error =>{
feedbackListEl.textContent = `Failed to fetch feedback items , Error message : ${error.message}`
}
);
