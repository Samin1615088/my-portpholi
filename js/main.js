/* ------------- navigation menu -----------*/
(() => {
    const hamburgerBtn = document.querySelector(".hamburger-btn");
    const navMenu = document.querySelector(".nav-menu")
    const closeBtn = document.querySelector(".close-nav-menu");

    hamburgerBtn.addEventListener("click", showNavMenu)
    closeBtn.addEventListener("click", hideNavMenu)

    function showNavMenu() {
        navMenu.classList.add("open");
        bodyScrollingToggle();
        fadeOutEffect();
    };
    function hideNavMenu() {
        navMenu.classList.remove("open");
        bodyScrollingToggle();
        fadeOutEffect();
    };

    function fadeOutEffect() {
        document.querySelector(".fade-out-effect").classList.add("active");
        setTimeout(() => {
            document.querySelector(".fade-out-effect").classList.remove("active");
        }, 300);
    }
    // attach an event handler to document
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("link-item")) {
            // make sure event.target.hash has a value before overriding default behavior
            if (event.target.hash !== "") {
                // prevent default anchor click
                event.preventDefault();
                const hash = event.target.hash;
                // deactivate existing active 'section'
                document.querySelector(".section.active").classList.add("hide");
                document.querySelector(".section.active").classList.remove("active");
                // active new 'section'
                document.querySelector(hash).classList.add("active");
                document.querySelector(hash).classList.remove("hide");

                // deactivate existing active navigation menu 'link-item'
                navMenu.querySelector(".active").classList.add("outer-shadow", "hover-in-shadow");
                navMenu.querySelector(".active").classList.remove("active", "inner-shadow");

                if (navMenu.classList.contains("open")) {
                    // activate new navigation menu 'link-item'
                    event.target.classList.add("active", "inner-shadow");
                    event.target.classList.remove("outer-shadow", "hover-in-shadow");

                    // hide navigation menu
                    hideNavMenu();
                    console.log("clicked 'link-item' is contained within the navigation menu")
                } else {
                    // console.log("clicked 'link-item' is not contained within the navigation menu");
                    let navItems = navMenu.querySelectorAll(".link-item");
                    navItems.forEach((item) => {
                        if (hash === item.hash) {
                            // activate new navigation menu 'link-item'
                            event.target.classList.add("active", "inner-shadow");
                            event.target.remove("outer-shadow", "hover-in-shadow");
                        }
                    })
                    fadeOutEffect();
                }
            }
            // adding (#) to url
            window.location.hash = hash;
        }
    })

    // window.addEventListener('scroll', () => {
    //     console.log(" scrolling")
    //     navMenu.classList.remove("open");
    // })

})

    /* --------------- about section tabs --------------*/
    (() => {
        const aboutSection = document.querySelector(".about-section");
        const tabsContainer = document.querySelector(".about-tabs");

        tabsContainer.addEventListener('click', (event) => {
            /* if event.target contains 'tab-item' class and not contains 'active' class */
            if (event.target.classList.contains("tab-item") && !event.target.classList.contains("active")) {
                // console.log(event.target);
                const target = event.target.getAttribute("data-target");
                // console.log(target);

                //deactivate existing active 'tab-item'
                tabsContainer.querySelector(".active").classList.remove("outer-shadow", "active");
                //activate new 'tab-item'
                event.target.classList.add("active", "outer-shadow");

                // deactivate existing active 'tab-content'
                aboutSection.querySelector(".tab-content.active").classList.remove("active");
                // activate new "tab-content"
                aboutSection.querySelector(target).classList.add("active");
            }
        })
    });


function bodyScrollingToggle() {
    document.body.classList.toggle("stop-scrolling")
}

/* -------------- portfolio filter and popup menu ------------------------*/
(() => {

    const filterContainer = document.querySelector(".portfolio-filter");
    portfolioItemsContainer = document.querySelector(".portfolio-items");
    portfolioItems = document.querySelectorAll(".portfolio-item");
    popup = document.querySelector(".portfolio-popup");
    prevBtn = popup.querySelector(".pp-prev");
    nextBtn = popup.querySelector(".pp-next");
    closeBtn = popup.querySelector(".pp-close");
    projectDetailsContainer = popup.querySelector(".pp-details");
    projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
    let itemIndex, slideIndex, screenshots;

    /* filter portfolio items */
    filterContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("filter-item") && !event.target.classList.contains(".active")) {
            //deactivate existing active 'filter item'
            filterContainer.querySelector(".active").classList.remove("active", "outer-shadow");
            // activate new 'filter item'
            event.target.classList.add("active", "outer-shadow");
            const target = event.target.getAttribute("data-target");
            portfolioItems.forEach(item => {
                if (target === item.getAttribute("data-category") || target === "all") {
                    item.classList.remove("hide");
                    item.classList.add("show");
                    console.log(item)
                } else {
                    item.classList.remove("show");
                    item.classList.add("hide");
                }
            })
        }
    });

    /*project click event*/
    portfolioItemsContainer.addEventListener("click", (event) => {
        if (event.target.closest(".portfolio-item-inner")) {
            const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
            // get the portfolioItem index
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshot");

            //converting screenshot into array
            screenshots = screenshots.split(",");
            //if only one screenshot
            // if (screenshots.length === 1) {
            //     prevBtn.style.display = "none";
            //     nextBtn.style.display = "none";
            // } else {
            //     prevBtn.style.display = "none";
            //     nextBtn.style.display = "none";
            // }
            slideIndex = 0;
            popupToggle();
            popupSlideShow();
            popupDetails();
        }
    })

    closeBtn.addEventListener("click", () => {
        popupToggle();
    })

    function popupToggle() {
        popup.classList.toggle("open");
        bodyScrollingToggle();
    }

    function popupSlideShow() {
        const imgSrc = screenshots[slideIndex];
        const popupImg = popup.querySelector(".pp-img");
        popupImg.src = imgSrc;
        // <TODO>// here i will implement loader</TODO>
        // 
        // 
        // 
        popup.querySelector(".pp-counter").innerHTML = (slideIndex + 1) + " of " + screenshots.length;
    }

    // next slide
    nextBtn.addEventListener("click", () => {
        if (slideIndex === screenshots.length - 1) {
            slideIndex = 0;
        } else {
            slideIndex++;
        }
        popupSlideShow();
    })
    // prev slide
    prevBtn.addEventListener("click", () => {
        if (slideIndex === 0) {
            slideIndex = screenshots.length - 1;
        } else {
            slideIndex--;
        }
        popupSlideShow();
    })

    projectDetailsBtn.addEventListener("click", () => {
        popupDetailsToggle();
    })

    function popupDetailsToggle() {
        if (projectDetailsContainer.classList.contains("active")) {
            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight = 0 + "px";
            projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
            projectDetailsBtn.querySelector("i").classList.add("fa-plus");
        } else {
            projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
            projectDetailsBtn.querySelector("i").classList.add("fa-minus");
            projectDetailsContainer.classList.add("active");
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
            popup.scrollTo(0, projectDetailsContainer.offsetTop);
        }
    }

    function popupDetails() {
        // if portfolio-item-details not exists
        if (!portfolioItems[itemIndex].querySelector(".portfolio-item-details")) {
            projectDetailsBtn.style.display = "none";
            return;
        }
        projectDetailsBtn.style.display = "block";
        // get the project details
        const details = portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;
        console.log("details", details)
        popup.querySelector(".pp-project-details").innerHTML = details;
        const title = portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
        popup.querySelector(".pp-title h2").innerHTML = title;
        const category = portfolioItems[itemIndex].getAttribute("data-category");
        popup.querySelector(".pp-project-category").innerHTML = category.split("-").join(" ");
    }
})();


/* --------------------hide all sections except active------------------------ */

(() => {
    const sections = document.querySelectorAll(".section");
    for (const section of sections) {
        if (!section.classList.contains("active")) {
            section.classList.add("hide");
        }
    }
})();



/* -----------------email.js  start---------------*/
function sendEmail(params) {
    const tempParams = {
        from_name: document.getElementById("fromName").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("msg").value
    };
    console.log("tempParams", tempParams)
    // emailjs.send('gmail', 'template_gvhvupg', tempParams)
    //     .then(res => console.log(res.status))

    emailjs.send('gmail', 'template_gvhvupg', tempParams)
        .then(function (res) {
            console.log('success', res.status)
        })
}

