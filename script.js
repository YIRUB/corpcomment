// --   Golobal--   
const MAXCHARS = 150;
const BASE_API_URL = 'https://bytegrad.com/course-assets/js/1/api';
const textareaEl = document.querySelector(".form__textarea");
const counterEl = document.querySelector(".counter");
const formEl = document.querySelector(".form");
const feedbackListEl = document.querySelector(".feedbacks");
const submitbtnEl = document.querySelector(".submit-btn");
const spinnerEl = document.querySelector(".spinner");
const hashtagEl = document.querySelector('.hashtags');



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
                <p class="feedback__company">${feedbackItem.company.toUpperCase()}</p>
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


const isHashtagexist = (company)=>{
    const hashtagCheck = hashtagEl.querySelectorAll('.hashtag');
    // console.log(feedbackCheck);
    let flag = 0;
    hashtagCheck.forEach(hashtagCheckcmp => {

        if(hashtagCheckcmp.textContent.substring(1).toUpperCase() === company.toUpperCase())
        {
            flag = 1;
        }
        console.log(hashtagCheckcmp.textContent.substring(1));


    })

    if(flag != 1)
    {
        const hashtagHTML = `<li class="hashtags__item">
                <button class="hashtag">#${company.toUpperCase()}</button>
            </li>`
        hashtagEl.insertAdjacentHTML("beforeend",hashtagHTML);
    }

}

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
      fetch(`${BASE_API_URL}/feedbacks`,{
        method : 'POST',
        body : JSON.stringify(feedbackItem),
        headers : {
            Accept : 'application/json',
            'Content-Type' : 'application/json'
        }
      }).then(res=>{
        if(!res.ok){
            console.log('there is error')
        } else{
            console.log('its sucecss')
        }

      }).catch(err=>console.log(err));     
    textareaEl.value = "";
    submitbtnEl.blur();
    counterEl.textContent = MAXCHARS;
    isHashtagexist(feedbackItem.company);
      

};

formEl.addEventListener("submit",submithandler );

//  -- Feedback List Component --

const clickHandler = (event) => {
      const clickedEl = event.target;
      console.log(clickedEl)
      const upvoteIntention = clickedEl.className.includes('upvote');

      if(upvoteIntention)
      {
        const upvoteBtnEl = clickedEl.closest('.upvote');
        upvoteBtnEl.disabled = true;
        const upvoteCountEl = upvoteBtnEl.querySelector('.upvote__count');
        let upvoteCount = +upvoteCountEl.textContent;
        upvoteCountEl.textContent = ++upvoteCount;


      } else {
        clickedEl.closest('.feedback').classList.toggle('feedback--expand');
      }
}

feedbackListEl.addEventListener('click',clickHandler)

fetch(`${BASE_API_URL}/feedbacks`).then(res =>{
    return res.json();
}
).then(data =>
{
    // console.log(data);
    spinnerEl.remove();
    data.feedbacks.forEach(element => {
        renderFeedbackItem(element);
        
    });
    HashTagupdater();
}
).catch(error =>{
feedbackListEl.textContent = `Failed to fetch feedback items , Error message : ${error.message}`
}
);

const clickHashHandler = (event) => {
 
    const clickHashtag = event.target;
    const NrHashTag = clickHashtag.closest('.hashtags__item');
    if(!NrHashTag) return;
    const HashtagItemEl = NrHashTag.querySelector('.hashtag');
    if(!HashtagItemEl) return;
    // console.log(HashtagItemEl.textContent)
    const feedbackCheck = feedbackListEl.getElementsByClassName('feedback');
    // console.log(feedbackCheck.length);
    const feedbacksLength = feedbackCheck.length
    for(let i=0 ; i<feedbacksLength; i++)
    {
        if(!(feedbackCheck[i].querySelector('.feedback__company').textContent.includes(HashtagItemEl.textContent.substring(1))) && !(HashtagItemEl.textContent==="ALL")) {
            // console.log(!(feedbackCheck[i].querySelector('.feedback__company').textContent));
            feedbackCheck[i].classList.add('hidden');
        } else {
            feedbackCheck[i].classList.remove('hidden');
        }
    }



}
hashtagEl.addEventListener('click',clickHashHandler)

const HashTagupdater = ()=>{

const feedbackchecker = feedbackListEl.querySelectorAll('.feedback__company');
feedbackchecker.forEach( feedbackck =>
{
    // console.log(feedbackck);
    isHashtagexist(feedbackck.textContent);
}
)


} 
