const home = document.getElementById('main');
const about = document.getElementById('about');

const homeSelector = document.getElementById('home-selector');
const aboutSelector = document.getElementById('about-selector');

function switchPage(i) {
    switch (i) {
        case 0:
            home.style.display = 'grid';
            about.style.display = 'none';

            homeSelector.style.color = '#e01f83';
            aboutSelector.style.color = '#32c1d7';
        break;
        case 1:
            home.style.display = 'none';
            about.style.display = 'grid';
            
            homeSelector.style.color = '#32c1d7';
            aboutSelector.style.color = '#e01f83';
        break;
    }
}

switchPage(0);