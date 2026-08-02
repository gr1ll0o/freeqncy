const home = document.getElementById('main');
const about = document.getElementById('about');

const homeSelector = document.getElementById('home-selector');
const aboutSelector = document.getElementById('about-selector');

function switchPage(i) {
    homeSelector.classList.remove('active');
    aboutSelector.classList.remove('active');
    switch (i) {

        case 0:
            home.style.display = 'grid';
            about.style.display = 'none';
            home.classList.remove('page-animation');
            void home.offsetWidth;
            home.classList.add('page-animation');
            homeSelector.classList.add('active');
        break;
        case 1:
            home.style.display = 'none';
            about.style.display = 'grid';
            about.classList.remove('page-animation');
            void about.offsetWidth;
            about.classList.add('page-animation');
            aboutSelector.classList.add('active');
        break;
    }
}

switchPage(0);