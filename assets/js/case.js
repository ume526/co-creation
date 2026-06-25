"use strict";
document.addEventListener("DOMContentLoaded", () => {

//========================================
const categoryRootCheckbox = document.querySelectorAll(".accordion__btn input[type=checkbox]")[0];
const categoryEachCheckbox = document.querySelectorAll(".category__list input[type=checkbox]");
const areaRootCheckbox     = document.querySelectorAll(".accordion__btn input[type=checkbox]")[1];
const areaParentsCheckbox  = document.querySelectorAll(".area__list .region__all input[type=checkbox]");
const areaEachCheckbox     = document.querySelectorAll(".area__list .region__list input[type=checkbox]");

const cards = document.querySelectorAll(".cards__item");

let currCategory = [];
let currArea     = [];

//========================================
const getCurrentValue = () => {
    currCategory = [];
    categoryEachCheckbox.forEach((elm) => {
        if( elm.checked ) {
            currCategory.push(elm.value);
        }
    });
    currArea = [];
    areaEachCheckbox.forEach((elm) => {
        if( elm.checked ) {
            currArea.push(elm.value);
        }
    });
};
const toggleCards = () => {
    cards.forEach((card) => {
        let chk = false;
        //--
        const thisCt = card.getAttribute("data-category");
        const diffCt = thisCt.split(",").filter((v) => {
            return (currCategory.indexOf(v) !== -1);
        });
        if( diffCt.length ){
            chk = true;
        }
        //--
        const thisAr = card.getAttribute("data-area");
        if(thisAr === "all"){
            if( currArea.length ){
                chk = true;
            }
        }else{
            const diffAr = thisAr.split(",").filter((v) => {
                return (currArea.indexOf(v) !== -1);
            });
            if( diffAr.length ){
                chk = true;
            }
        }
        //--
        card.style.display = (chk)?("block"):("none");
    });
};
const updateDisplayCount = () => {
    let count = 0;
    cards.forEach((card) => {
        if (card.style.display === "block") {
            count++;
        }
    });
    document.querySelector(".count").textContent = count;
};

//========================================
// accordion ( open | close )
document.querySelectorAll(".accordion__btn").forEach((elm) => {
    elm.addEventListener("click", () => {
        elm.nextElementSibling.classList.toggle("open");
        elm.classList.toggle("open");
    });
});

//========================================
// category - root
categoryRootCheckbox.addEventListener("click", (ev) => {
    // linkage children check
    categoryEachCheckbox.forEach((elm) => {
        elm.checked = categoryRootCheckbox.checked;
    });
    // handle articles
    getCurrentValue();
    toggleCards();
    updateDisplayCount();
});
// category - each
categoryEachCheckbox.forEach((elm) => {
    elm.addEventListener("click", () => {
        // linkage root check
        if( elm.checked ){
            let chk = true;
            categoryEachCheckbox.forEach((elm2) => {
                if( elm2.checked ) {
                    //..
                }else{
                    chk = false;
                    return;
                }
            });
            if( chk ){
                categoryRootCheckbox.checked = true;
            }
        }else{
            categoryRootCheckbox.checked = false;
        }
        
        // handle articles
        getCurrentValue();
        toggleCards();
        updateDisplayCount();
    });
});
// area - root
areaRootCheckbox.addEventListener("click", () => {
    // linkage children check
    areaParentsCheckbox.forEach((elm) => {
        elm.checked = areaRootCheckbox.checked;
    });
    areaEachCheckbox.forEach((elm) => {
        elm.checked = areaRootCheckbox.checked;
    });
    // handle articles
    getCurrentValue();
    toggleCards();
    updateDisplayCount();
});
// area - parents
areaParentsCheckbox.forEach((elm) => {
    elm.addEventListener("click", () => {
        // linkage children check
        const currEach = elm.closest(".region").querySelectorAll(".region__list input[type=checkbox]");
        currEach.forEach((elm2) => {
            elm2.checked = elm.checked;
        });
        
        // linkage root check
        if( elm.checked ){
            let chk = true;
            areaParentsCheckbox.forEach((elm2) => {
                if( elm2.checked ) {
                    //..
                }else{
                    chk = false;
                    return;
                }
            });
            if( chk ){
                areaRootCheckbox.checked = true;
            }
        }else{
            areaRootCheckbox.checked = false;
        }
        
        // handle articles
        getCurrentValue();
        toggleCards();
        updateDisplayCount();
    });
});
// area - each
areaEachCheckbox.forEach((elm) => {
    elm.addEventListener("click", () => {
        // linkage parent check
        const currParent = elm.closest(".region").querySelector(".region__all input[type=checkbox]");
        const currEach   = elm.closest(".region").querySelectorAll(".region__list input[type=checkbox]");
        if( elm.checked ){
            let chk = true;
            currEach.forEach((elm2) => {
                if( elm2.checked ) {
                    //..
                }else{
                    chk = false;
                    return;
                }
            });
            if( chk ){
                currParent.checked = true;
            }
        }else{
            currParent.checked = false;
        }
        
        // linkage root check
        if( elm.checked ){
            let chk = true;
            areaParentsCheckbox.forEach((elm2) => {
                if( elm2.checked ) {
                    //..
                }else{
                    chk = false;
                    return;
                }
            });
            if( chk ){
                areaRootCheckbox.checked = true;
            }
        }else{
            areaRootCheckbox.checked = false;
        }
        
        // handle articles
        getCurrentValue();
        toggleCards();
        updateDisplayCount();
    });
});

//========================================
// on visit
// // check all, show all
document.querySelectorAll(".search input[type=checkbox]").forEach((elm) => {
    elm.checked = true;
});
getCurrentValue();
toggleCards();
updateDisplayCount();

}); // end of DOMContentLoaded
