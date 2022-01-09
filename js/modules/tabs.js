function tabs(tabsSelector, tabsContent, perrant, activeClass) {
    //Tabs
    const tabs = document.querySelectorAll(tabsSelector),
        contantTabs = document.querySelectorAll(tabsContent),
        parrant = document.querySelector(perrant);
    
    function hidenTabs() {
        contantTabs.forEach(item => {
            item.style.display = 'none';
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTabs(i = 0) {
        contantTabs[i].style.display = 'block';
        tabs[i].classList.add(activeClass);
    }

    hidenTabs();
    showTabs();

    parrant.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hidenTabs();
                    showTabs(i);
                }
            });
        }
    });
}

export default tabs;