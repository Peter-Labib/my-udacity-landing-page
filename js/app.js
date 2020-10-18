class NavBar {
  constructor() {
    this.navList = document.querySelector('#navbar__list');
    this.sections = document.querySelectorAll('section');
    this.navList.addEventListener('click', this.navTargetHandler.bind(this));
    window.addEventListener('scroll', this.sectionsHighlight.bind(this));
    window.addEventListener('scroll', this.navbarDisplay.bind(this));
  }

  generateNav() {
    const fragment = document.createDocumentFragment();
    this.sections.forEach((section) => {
      const navLink = document.createElement('li');
      const navAnchor = document.createElement('a');
      const sectionHeading = section.querySelector('h2');
      const sectionHeadingContent = sectionHeading.innerText;
      navAnchor.setAttribute('href', `#${sectionHeadingContent}`);
      navAnchor.classList.add('menu__link');
      navAnchor.innerText = sectionHeadingContent;
      navLink.appendChild(navAnchor);
      fragment.appendChild(navLink);
    });
    this.navList.appendChild(fragment);
  }

  navTargetHandler(event) {
    const clickedElement = event.target;
    const navAnchors = document.querySelectorAll('.menu__link');
    if (clickedElement.tagName === 'A') {
      navAnchors.forEach((navAnchor) => navAnchor.classList.remove('active'));
      clickedElement.classList.add('active');
    }
  }

  sectionsHighlight() {
    const windowOffsetTop = window.pageYOffset;
    this.sections.forEach((section) => {
      const sectionOffsetTop = section.offsetTop;
      const sectionContentHeight = section.clientHeight;
      if (
        windowOffsetTop >= sectionOffsetTop - 100
        && windowOffsetTop < sectionOffsetTop + sectionContentHeight - 100
      ) {
        section.classList.add('your-active-class');

        // changer color of active navigation link
        this.activeNavLinkHandler(section);
      } else {
        section.classList.remove('your-active-class');
      }
    });
  }

  // helper finction to change color of active navigation link
  activeNavLinkHandler(section) {
    const navAnchors = document.querySelectorAll('.menu__link');
    navAnchors.forEach((navAnchor) => {
      if (navAnchor.innerText === section.id) {
        navAnchor.classList.add('active');
      } else {
        navAnchor.classList.remove('active');
      }
    });
  }

  navbarDisplay() {
    const header = document.querySelector('.page__header');
    const firstSection = this.sections[0];
    const timer = setTimeout(() => {
      header.classList.add('hide');
    }, 4000);
    if (window.pageYOffset > firstSection.offsetTop
      && !timer) {
      clearTimeout(timer);
      timer();
    } else {
      header.classList.remove('hide');
    }
  }
}

const navBar = new NavBar();
navBar.generateNav();

class ScrollToTopIcon {
  constructor() {
    this.scrollToTopIcon = document.querySelector('.scroll__top');
    this.scrollToTopIcon.addEventListener('click', this.scrollToTopIconHandler.bind(this));
    window.addEventListener('scroll', this.scrollToTopIconDisplay.bind(this));
  }

  scrollToTopIconHandler() {
    window.scrollTo(0, 0);
  }

  scrollToTopIconDisplay() {
    if (window.pageYOffset > 100) {
      this.scrollToTopIcon.classList.add('display');
    } else {
      this.scrollToTopIcon.classList.remove('display');
    }
  }
}
new ScrollToTopIcon();
