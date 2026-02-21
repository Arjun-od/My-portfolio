const projects = document.getElementById('projects');
let hasAnimated = false;
let lastScrollY = window.scrollY;
const links = document.querySelectorAll('.links');


links.forEach((link)=>{
    link.addEventListener('click',smoothScroll);
})

function smoothScroll(e){
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    if(!targetSection){
        console.warn(`Target section with id "${targetId}" not found.`);
        return;
    }

    targetSection.scrollIntoView({
        behavior:'smooth',
        block:'start'
    });
}

function staggeringAnime(){
    projects.classList.add('project-move');
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) =>{
        setTimeout(()=>{
            card.classList.add('animate-card');
            // projects.classList.add('project-move');
        }, index * 200)
    })

    hasAnimated = true;
    observer.disconnect();
    // console.log('disconnected');
    card.classList.remove('animate-card');
}

function scrollTracker(){
    const currentScrollY = window.scrollY;
    const scrollingDown = currentScrollY > lastScrollY;
    lastScrollY = currentScrollY;
    return scrollingDown;
}

const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(!hasAnimated && entry.isIntersecting && scrollTracker()){
            staggeringAnime();
            // console.log('hi');
        }
    })
}, {threshold:0.3});

if(projects){
    observer.observe(projects);
}
else{
    console.warn('Projects section not found');
}

// IF (SCROLLING DOWN AND !HASANIMATED AND SECTON IN VIEW)
// THEN: RUN ANIMATION 
// ELSE: DON'T RUN

// THE BLOCK OF CODE THAT NOTIFIES US OF OUR CONDITIONS BEING MET AND RUNS THE NECESSARY CODE
// THE APPROACH OF OUR TRACKING IS LIGHTWEIGHT ONLY TRACKING THE SECTION WE WANT TO SEE
// THE WORKLOAD OF EVERYTHING IS LEFT TO THE BROWSER.
// SETTING UP A NOTIFIER WHICH TRIGGERS WHEN ALL OUR CONDITIONS ARE MET IS BETTER THAN TRACKING EVERY LITTLE SCROLL
// NOTIFICATION PARAMETERS INCLUDE: IS IT SCROLLING DOWN. HAS IT ANIMATED, IS SECTION IN VIEW
// WHEN ALL PARAMETERS ARE FULFILLED, LET ANIMATION TRIGGER
// SINCE IT IS OUR NOTIFIER, IT NEEDS TO KNOW WHAT ELEMENT IT IS WATCHING OUT FOR, 
// SO THAT WHEN IT ENTERS INTO VIEW, IT CHECKS IF PARAMETERS ARE THERE, THEN RUNS

// TRACKING SYSTEM FOR THE SECTION WHICH SHOWS IT IS SCROLLING DOWN:
// UPDATING THE POSITION CONTENT WILL BE DYNAMICAL
// SO WE WILL HAVE TWO CONTAINERS THAT WILL HOUSE OUR PREVIOUS POSITION AND THE CURRENT ONE
// TO PROVE THAT WE ARE GOING DOWN, OUR CURRENT POSITION MUST BE MORE THAT THE PREVIOUS POSITON
// THE TWO CONTAINERS WILL BE UPDATED DYNAMICALLY. INITIAL VALUES WILL BE FED BY BROWSER IT SELF
// THE LAST-POSITION-VALUE WILL BE UPDATED BY THE CURRENT POSITION TO ENABLE BETTER CALCULATION AND IMMEDIATE TRACK RECORD 


// ANIMATION IS ONCE AND FOR ALL, SO WHEN DONE, TRACKING STOPS
