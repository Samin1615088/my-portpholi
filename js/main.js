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
})();


/* -------------------------------- portfolio filter and popup menu --------------------------------*/
(() => {

    const filterContainer = document.querySelector(".portfolio-filter");
    const filterItemsContainer = document.querySelector(".portfolio-items");
    const portfolioItems = document.querySelectorAll(".portfolio-item");
    const popup = document.querySelector(".portfolio-popup");
    const prevBtn = popup.querySelector(".pp-prev");
    const nextBtn = popup.querySelector(".pp-next");
    const closeBtn = popup.querySelector(".pp-close");
    const projectDetailsContainer = popup.querySelector(".pp-details");
    const projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
    let itemIndex, slideIndex, screenShots;

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
    })

})();