/*=================================
    UNDISCOVERED UDAIPUR
    PREMIUM SCRIPT PART 1
=================================*/

/* Loader */

window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    loader.style.opacity = "0";

    setTimeout(() => {

        loader.style.display = "none";

    }, 600);

});


/* Navbar Background */

window.addEventListener("scroll", function () {

    const nav = document.querySelector("nav");

    if (window.scrollY > 80) {

        nav.style.background = "rgba(15,23,42,.95)";
        nav.style.boxShadow = "0 10px 30px rgba(0,0,0,.35)";

    } else {

        nav.style.background = "rgba(0,0,0,.35)";
        nav.style.boxShadow = "none";

    }

});


/* Button Hover Effect */

const buttons = document.querySelectorAll(".btn, .hero-btn");

buttons.forEach(btn => {

    btn.addEventListener("mouseenter", () => {

        btn.style.transform = "translateY(-5px)";

    });

    btn.addEventListener("mouseleave", () => {

        btn.style.transform = "translateY(0px)";

    });

});


/* Card Animation */

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-12px) scale(1.03)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px) scale(1)";

    });

});


/* Smooth Scroll */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});

/*==========================
 LIGHTBOX
==========================*/

function openImage(src){

document.getElementById("lightbox").style.display="flex";

document.getElementById("lightbox-img").src=src;

}

function closeImage(){

document.getElementById("lightbox").style.display="none";

}

/*==============================
 DARK MODE
==============================*/

const themeButton=document.getElementById("theme-toggle");

themeButton.addEventListener("click",()=>{

document.body.classList.toggle("light-mode");

});

/*==============================
CATEGORY FILTER
==============================*/

const filterButtons=document.querySelectorAll(".filter-btn");

const exploreCards=document.querySelectorAll(".explore-card");

filterButtons.forEach(button=>{

button.addEventListener("click",()=>{

filterButtons.forEach(btn=>btn.classList.remove("active"));

button.classList.add("active");

const filter=button.dataset.filter;

exploreCards.forEach(card=>{

if(filter==="all" || card.dataset.category===filter){

card.style.display="block";

}else{

card.style.display="none";

}

});

});

});

/*=================================
BACK TO TOP BUTTON
=================================*/

const topButton=document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

if(window.scrollY>400){

topButton.style.display="block";

}else{

topButton.style.display="none";

}

});

topButton.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

/*=================================
ANIMATED COUNTERS
=================================*/

const counters = document.querySelectorAll(".counter");

let counterStarted = false;

function startCounters() {

    if (counterStarted) return;

    const statsSection = document.querySelector(".stats");

    const sectionTop = statsSection.offsetTop;

    if (window.scrollY + window.innerHeight >= sectionTop) {

        counterStarted = true;

        counters.forEach(counter => {

            const target = +counter.getAttribute("data-target");

            const increment = target / 100;

            let current = 0;

            const update = () => {

                current += increment;

                if (current < target) {

                    counter.innerText = Math.floor(current).toLocaleString();

                    requestAnimationFrame(update);

                } else {

                    counter.innerText = target.toLocaleString() + "+";

                }

            };

            update();

        });

    }

}

window.addEventListener("scroll", startCounters);

/*==============================
 MOBILE MENU
==============================*/

const menuToggle=document.querySelector(".menu-toggle");

const navLinks=document.querySelector(".nav-links");

menuToggle.addEventListener("click",()=>{

navLinks.classList.toggle("active");

});

/*=================================
SEARCH PLACES
=================================*/

const searchInput = document.getElementById("searchInput");

if(searchInput){

searchInput.addEventListener("keyup",function(){

const value = this.value.toLowerCase();

document.querySelectorAll(".explore-card").forEach(card=>{

const name = card.dataset.name;

if(name.includes(value)){

card.style.display="block";

}else{

card.style.display="none";

}

});

});

}

/*==============================
AUTO SLIDER
==============================*/

const slides=document.querySelectorAll(".slide");

let currentSlide=0;

function changeSlide(){

slides[currentSlide].classList.remove("active");

currentSlide++;

if(currentSlide>=slides.length){

currentSlide=0;

}

slides[currentSlide].classList.add("active");

}

setInterval(changeSlide,4000);

/*==============================
FAQ
==============================*/

const faqQuestions=document.querySelectorAll(".faq-question");

faqQuestions.forEach(question=>{

question.addEventListener("click",()=>{

const answer=question.nextElementSibling;

if(answer.style.maxHeight){

answer.style.maxHeight=null;

}else{

answer.style.maxHeight=answer.scrollHeight+"px";

}

});

});


// ==============================
// LIVE WEATHER
// ==============================

const apiKey = "9fdd6ad70d97f8d3e4f6b7386da851d3"; // Replace with your OpenWeatherMap API key

async function loadWeather() {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=Udaipur&units=metric&appid=${apiKey}`
        );

        const data = await response.json();

        document.getElementById("city").textContent = data.name;
        document.getElementById("temperature").textContent =
            Math.round(data.main.temp) + "°C";
        document.getElementById("condition").textContent =
            data.weather[0].description;
        document.getElementById("humidity").textContent =
            data.main.humidity + "%";
        document.getElementById("wind").textContent =
            Math.round(data.wind.speed) + " km/h";

        const icon = data.weather[0].icon;

        document.getElementById("weatherIcon").innerHTML =
            `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon">`;

    } catch (error) {
        console.error("Weather Error:", error);
    }
}

loadWeather();

// Auto-refresh every 10 minutes
setInterval(loadWeather, 600000);