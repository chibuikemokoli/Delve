/*===== SHOW MENU =====*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show-menu')
        })
    }
}
showMenu('nav-toggle', 'nav-menu')

/*===== REMOVE MENU MOBILE =====*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))
/*===== SCROLL SECTIONS ACTIVE LINK =====*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50
        sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sections + ']').classList.add('active-link')
        } else {
            document.querySelector('.nav__menu a[href*=' + sections + ']').classList.remove('active-link')

        }
    })
}
window.addEventListener('scroll', scrollActive)

/*===== CHANGE BACKGROUND HEADER =====*/
function scrollHeader() {
    const header = document.getElementById('header')
    if (this.scrollY >= 100) header.classList.add('scroll-header');
    else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

function scrollTop() {
    const scrollTop = document.getElementById('scroll-top')
    if (this.scrollY >= 560) scrollTop.classList.add('show-scroll');
    else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop);

const faqContent = document.getElementsByClassName('faq__content'),
    faqHeader = document.querySelectorAll('.faq__header')

function togglefaq() {
    let itemClass = this.parentNode.className

    for (i = 0; i < faqContent.length; i++) {
        faqContent[i].className = 'faq__content faq__close'
    }
    if (itemClass === 'faq__content faq__close') {
        this.parentNode.className = 'faq__content faq_open'
    }
}

faqHeader.forEach((el) => {
    el.addEventListener('click', togglefaq)
})

function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
}

const scriptURL = 'https://script.google.com/macros/s/AKfycbymGsr-KQqz0qP5XnEV9CHarqpFlahqP5EiWjQHW_QC6PJVsrS4FziASSwysMujc8rD1A/exec';
const form = document.forms['newsletter'];
const msg = document.getElementById("msg");

form.addEventListener('submit', e => {
    e.preventDefault();

    const userInput = form.email.value;

    if (!isValidEmail(userInput)) {
        msg.innerHTML = "Invalid email address.";
        return;
    }

    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            if (response.ok) {
                msg.innerHTML = "Message Sent Successfully!";
                setTimeout(function () {
                    msg.innerHTML = ""
                }, 5000)
                form.reset()
                window.location.href = "success.html";
            } else {
                console.error('Error!', response.statusText);
            }
        })
        .catch(error => console.error('Error!', error.message));
});
