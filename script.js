const whishlistBtn = document.querySelector('.whishlist');
const categoryContent = document.querySelector('.category-content');
const heroImgBx = document.querySelector('.home-hero');
const imgBx = document.querySelector('.hero-imgBx');
const navImgBtn = document.querySelectorAll('.nav-btn');
const contentBox = document.querySelector('.content-box');
const productCategory = document.querySelector('.product-category');
const productContent = document.querySelector('.product-content');
const DealOfTheDay = document.querySelector('.DealOfTheDay .content-box');
const ratedBox = document.querySelector('.topRated .content-box');
const upcomingBox = document.querySelector('.upComing .content-box');
const sections = document.querySelectorAll('section');
const navlink = document.querySelectorAll('.header .navbar a')
const headerSecond = document.querySelector('.header.second');
const leftBtn = document.querySelector('.leftBtn');
const rightBtn = document.querySelector('.rightBtn');
const search = document.querySelector('#search');
const headerOne = document.querySelector('.header.one');
const menu = document.querySelector('.header.second .menu');
const navbar = document.querySelector('.navbar');
const logo = document.querySelector('.header.second .logo');

import { category } from "./database.js";
import { dealsProduct } from "./database.js";
import { ratedProuct } from "./database.js";
import { upcomingProduct } from "./database.js";

// No of slide
let heroSlide = 3;

// Slide time
let heroTime = 5000;

// value;
let val = 0;

let scrollDown;

menu.onclick = () => {
    menu.firstElementChild.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

window.onscroll = function (e) {
    sections.forEach(sec => {
        let offset = window.scrollY;
        let top = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id')

        if (offset >= top && offset <= top + height) {
            navlink.forEach(i => {
                i.classList.remove('active');
            })
            document.querySelector(`.header .navbar a[href*=${id}]`).classList.add('active');

            headerSecond.classList.add('active');
            
            if (id !== 'home' && id !== 'products') {
                headerOne.classList.remove('active');

                if(document.body.offsetWidth < 560){
                    logo.style.display = 'block';
                }
                search.value = '';
                search.blur();
            }

            if (id == 'home') {
                if (offset >= top + (height - 100)) {
                    scrollDown = true;
                    headerOne.classList.add('active');
                    
                    if(document.body.offsetWidth < 560){
                        logo.style.display = 'none';
                    }

                    if (document.activeElement !== search) {
                        search.focus();
                    }
                }
            }

            if (scrollDown) {
                if (id == 'home') {
                    if (offset <= top + (height - 100)) {
                        headerOne.classList.remove('active');

                        if(document.body.offsetWidth < 560){
                            logo.style.display = 'block';
                        }

                        search.value = '';
                        search.blur();
                    }
                }
            }

        }

        if (offset < 100) {
            headerSecond.classList.remove('active');

            if(document.body.offsetWidth < 560){
                logo.style.display = 'none';
            }
        }
    })

    menu.firstElementChild.classList.remove('bx-x');
    navbar.classList.remove('active');
}

function heroRunFun() {
    setInterval(() => {
        let width = heroImgBx.offsetWidth;

        val++;

        if (val == heroSlide) {
            val = 0;
            imgBx.style.left = val;
            navFun(val);
        }

        imgBx.style.left = -(width * val) + 'px';
        navFun(val);
    }, heroTime);

}
heroRunFun();



leftBtn.onclick = () => {
    let width = heroImgBx.offsetWidth;

    val--;

    if (val == -1) {
        val = (heroSlide - 1);
        imgBx.style.left = -(width * 2) + 'px';
        navFun(val);
    } else {
        imgBx.style.left = -(width * val) + 'px';
        navFun(val);
    }
}
rightBtn.onclick = () => {
    let width = heroImgBx.offsetWidth;

    val++;

    if (val == heroSlide) {
        val = 0;
        imgBx.style.left = val;
        navFun(val);
    }

    imgBx.style.left = -(width * val) + 'px';
    navFun(val);
}

function navFun(vl) {
    navImgBtn.forEach(el => el.classList.remove('active'));

    navImgBtn[vl].classList.add('active');
};


let productCount = 10;
let products = [];
let setValue = new Set();


function categoryFun() {

    category.forEach((el, i) => {
        let name = el.category.name;
        let img = el.category.img;

        categoryContent.innerHTML += displayCategory(img, name);
        contentBox.innerHTML += displayAllProductList(name);

        let subContent = contentBox.querySelectorAll('.content .sub-content');

        subContentList(el.category.product, subContent[i]);

        productCategory.innerHTML += displayProductCategory(name);

        productPush();

    })

};
categoryFun();

function productPush() {

    category.forEach(el => {
        el.category.product.forEach((el, j) => {

            products.push(el);

        });
    })
}

function uniquieSetNo() {
    let rndm = Math.floor(Math.random() * products.length);
    setValue.add(rndm);

    if (setValue.size != 10) {
        uniquieSetNo();
    }
};

uniquieSetNo();
function allProduct() {

    let name;
    let img;
    let categoryName;
    let by;
    let price;

    setValue.forEach(el => {

        name = products[el].name;
        by = products[el].by;
        price = products[el].price;

        category.forEach(cl => {

            cl.category.product.forEach(el => {
                if (el.name == name) {
                    categoryName = cl.category.name;
                    img = cl.category.img;
                }
            })

        });
        productContent.innerHTML += displayAllProduct(img, categoryName, name, by, price);
    });
};
allProduct();

function displayCategory(img, name) {
    return (`
    <div class="category-box">
    <div class="img-box">
        <img src="${img}" alt="cashew">
    </div>
    <h3>${name}</h3>
</div>
    `)
}

function displayAllProductList(category) {
    return (`
    <div class="content">
    <div class="title">${category}<i class='bx bxs-chevron-down'></i></div>
    <div class="sub-content">
    </div>
</div>
    `)
};

function displayProductCategory(category) {
    return (`
        <span>${category}</span>
    `)
};

function displayAllProduct(img, category, title, by, price) {
    return (`
    <div class="content call-me">
    <div class="img-box">
        <img src="${img}" alt="">
        <span class="off">15% Off</span>
    </div>
    <div class="details">
        <p class="category">${category}</p>
        <h3 class="title">${title}</h3>
        <p class="rating">&starf;&starf;&starf;&starf;&star;<span>(4)</span></p>
        <p class="by">${by}</p>
        <p class="price">Rs. ${price}/-</p>
        <button class="AddToCart call-me">Shop now</button>
    </div>
</div>
    `)
}

let content = document.querySelectorAll('.content-box .content .title');

content.forEach(el => {
    el.onclick = () => {
        el.parentNode.classList.toggle('active');
    }
});

function subContentList(product, subContent) {

    product.forEach(el => {
        subContent.innerHTML += `<a href="#products">${el.name}</a>`;
    });
};

function resetContent() {
    productContent.innerHTML = '';
}

let categoryList = document.querySelectorAll('.product-category span');

function resetActive() {
    categoryList.forEach(el => el.classList.remove('active'));
}

let runOne = 0;
categoryList.forEach(el => {

    el.onclick = () => {
        let selected = el;
        setValue.clear();

        runOne = 1;


        if (runOne == 1) {
            runOne = 0;

            if (selected.innerHTML == 'All') {
                resetActive();
                selected.classList.add('active');
                productPush();
                uniquieSetNo();
                resetContent();
                allProduct();
            } else {

                let count = 0;
                products = [];
                setValue.clear();

                resetActive();
                selected.classList.add('active');

                category.forEach(cl => {

                    if (cl.category.name == selected.innerHTML) {

                        cl.category.product.forEach(el => {
                            products.push(el);

                            if (count != cl.category.product.length && count <= 10) {
                                setValue.add(count);
                                count++;
                            }
                        });
                    }
                });

                resetContent();
                allProduct();
            }
        }

    }
});


let leftCategoryItem = document.querySelectorAll('.content .sub-content a');

leftCategoryItem.forEach(el => {

    el.onclick = () => {
        let runOne = 1;

        if (runOne == 1) {
            runOne = 0;

            setTimeout(() => {

                let count = 0;
                products = [];
                setValue.clear();

                category.forEach(cl => {

                    cl.category.product.forEach(dl => {

                        if (dl.name == el.innerHTML) {
                            products.push(dl);
                            setValue.add(count);

                        }

                    });
                });
                resetContent();
                allProduct();

            }, 1000);

        }
    }
});

const categoryBox = document.querySelectorAll('.category-content .category-box');

categoryBox.forEach(el => {

    el.onclick = () => {

        window.location = '#products';

        let title = el.lastElementChild.innerHTML;
        runOne = 1;

        if (runOne == 1) {
            runOne = 0;

            let count = 0;
            products = [];
            setValue.clear();

            resetActive()

            categoryList.forEach(elem => {
                if (elem.innerHTML == title) {
                    elem.classList.add('active');
                }
            })

            category.forEach(cl => {

                if (cl.category.name == title) {

                    cl.category.product.forEach(el => {
                        products.push(el);

                        if (count != cl.category.product.length && count <= 10) {
                            setValue.add(count);
                            count++;
                        }
                    });
                }
            });

            resetContent();
            allProduct();
        }
    }

});
let productListCount = 4;
let demo = 0;

function UnderProduct(dealsObj, appendBox) {
    let img;
    let category;
    let name;
    let by;
    let mrp;
    let price;

    let value = 0;

    demo++;
    resetUnderBox(appendBox);

    dealsObj.forEach(el => {
        img = el.category.img;
        category = el.category.name;

        el.category.product.forEach((fl, i) => {
            if (value != productListCount) {

                name = fl.name;
                by = fl.by;
                mrp = fl.mrp;
                price = fl.price;

                appendBox.innerHTML += displayDealsProduct(img, category, name, by, mrp, price);
            }
            value++;
        });
    })
};
UnderProduct(dealsProduct, DealOfTheDay);
UnderProduct(ratedProuct, ratedBox);
UnderProduct(upcomingProduct, upcomingBox);

function resetUnderBox(box) {
    box.innerHTML = '';
}

function displayDealsProduct(img, categoryName, name, by, mrp, price) {
    return (`
    <div class="content call-me">
    <div class="img-box">
        <img src="${img}" alt="">
    </div>
    <div class="details">
        <p class="category">${categoryName}</p>
        <p class="title">${name}</p>
        <p class="rating">&starf;&starf;&starf;&starf;&Star;(3)</p>
        <p class="by">${by}</p>
        <p class="price"><span>Rs. ${mrp}/-</span>Rs. ${price}/-</p>
    </div>
</div>
    `);
};
const aboutContentLength = document.querySelectorAll('.about-box .box .content');


setInterval(() => {
    const aboutBox = document.querySelector('.about-box .box');


    if (aboutBox.scrollLeft >= aboutBox.scrollWidth - aboutBox.offsetWidth) {
        aboutBox.scrollLeft = 0;
    } else {
        aboutBox.scrollLeft += (aboutBox.scrollWidth / aboutContentLength.length);
    }
}, 4000);

const callMe = document.querySelectorAll('.call-me');

callMe.forEach(el => {
    el.onclick = () => {
        window.location.href = 'tel:+916006797142';
    }
});


search.addEventListener('input', function (e) {
    let searchCount = 0;

    let searchValue = (search.value).toLowerCase();

    products = [];
    setValue.clear();

    category.forEach(cat => {

        cat.category.product.forEach(pro => {

            searchCount++;

            if (searchValue.length > 0) {

                let prodName = (pro.name).toLowerCase();

                if (prodName.includes(searchValue)) {

                    products.push(pro);

                    products.forEach((el, i) => {
                        setValue.add(i);
                    })

                }
            }
        })
    });

    if (searchValue.length > 0) {
        resetContent();
        allProduct();

    }


    if (setValue.size == 0) {
        productContent.innerHTML = 'No search found !'
        productContent.style.fontSize = '16px';
        productContent.style.fontWeight = '600';
        productContent.style.color = 'var(--main-color)';
    }

    if (searchValue.length == 0) {
        productPush();
        uniquieSetNo();
        resetContent();
        allProduct();

    }

    if (searchValue.length == 0 || searchValue.length == 1) {

        window.location.href = '#products';
        headerOne.classList.add('active');

        if (document.activeElement !== search) {
            search.focus();
        }
        scrollDown = false
    }

});