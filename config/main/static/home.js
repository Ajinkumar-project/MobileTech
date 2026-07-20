console.log("Script Loaded!");
const cursor = document.getElementById("cursor");
const cursordot = document.getElementById("cursordot");
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let x = mouseX;
let y = mouseY;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursordot.style.left = mouseX + "px";
    cursordot.style.top = mouseY + "px";
});
document.querySelectorAll("h1,h2,h3,p,a,button").forEach(el => {
    el.addEventListener("mouseenter", () => {
        cursor.classList.add("grow");
    });

    el.addEventListener("mouseleave", () => {
        cursor.classList.remove("grow");
    });
});

function animate() {
    x += (mouseX - x) * 0.10;
    y += (mouseY - y) * 0.10;

    cursor.style.left = x + "px";
    cursor.style.top = y + "px";

    requestAnimationFrame(animate);
}

animate();

function activeTab(nav_id, page_id) {
    let navb = document.querySelectorAll(".navb");
    let page = document.querySelectorAll(".page");

    page.forEach(function (p) {
        p.classList.remove("activepage");
    });



    navb.forEach(function (n) {
        n.classList.remove("active-bar");
    });
    document.getElementById(nav_id).classList.add("active-bar");
    document.getElementById(page_id).classList.add("activepage");
    window.scrollTo({
        top: 0,
    });
}
function activeDash(nav_id, page_id) {
    let navb = document.querySelectorAll(".SideBar");
    let page = document.querySelectorAll(".Dash-board");

    page.forEach(function (p) {
        p.classList.remove("activedash");
    });



    navb.forEach(function (n) {
        n.classList.remove("activedashBar");
    });
    document.getElementById(nav_id).classList.add("activedashBar");
    document.getElementById(page_id).classList.add("activedash");
}



function goTo(nav_id, page_id , section) {
    let navb = document.querySelectorAll(".navb");
    let page = document.querySelectorAll(".page");

    page.forEach(function (p) {
        p.classList.remove("activepage");
    });



    navb.forEach(function (n) {
        n.classList.remove("active-bar");
    });
    document.getElementById(nav_id).classList.add("active-bar");
    document.getElementById(page_id).classList.add("activepage");
    document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
}


function autoScroll(section) {
    document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
}


window.addEventListener("scroll", function() {

    let elements = document.querySelectorAll(".fade-element");
    

    elements.forEach(function(element) {

        let position = element.getBoundingClientRect().top;

        let screenHeight = window.innerHeight;

        if(position < screenHeight - 100){
            element.classList.add("show");
        }else{
            element.classList.remove("show");
        }

    });

});

function opencart(){
    document.querySelector(".Add-Cart")
        .classList.toggle("show");
}
function openProfile(){
    document
        .getElementById("profileDropdown")
        .classList.toggle("show");
}

let carttotal = 0;
let cartcount = 0;
let totalAmount= 0;
let pendingorder = 0;
let badge = 0;

function addCart(p_name , img_src , amount){

    let name = p_name;
    let img = img_src;
    let price = Number(amount);
    
    let data = `
        <div class="mx-3 cartmar">
            <div class="d-flex zone">
                <div class="zonedimg">
                    <img src="${img}" alt="img">
                </div>
                <div class="zoned">
                    <h6>${name}</h6>
                    <span>₹${price}</span>
                </div>
            </div>
        </div>`

        
    pendingorder = pendingorder+1;
    cartcount = cartcount+1;
    badge = badge+1
    totalAmount = totalAmount+price;
    carttotal = carttotal+price;
    document.getElementById("cartCount").textContent =  badge;
    document.getElementById("totalAmount").textContent =`₹${carttotal}`;
    document.getElementById("cart-body").innerHTML += data;
    document.querySelectorAll(".Pending_orderlist").forEach(function(p){
        p.innerHTML += data;
    })
    document.querySelectorAll(".totalorder").forEach(function(p){
        p.textContent =cartcount;
    })
    document.querySelectorAll(".total_amount").forEach(function(p){
        p.textContent =`₹${totalAmount}`;
    })
    document.querySelectorAll(".pendingorder").forEach(function(p){
        p.textContent = pendingorder;
    })
    
}
let delivered = 0;

function checkout(){
    document.querySelectorAll(".pendingorder").forEach(function(p){
        p.textContent = pendingorder ;
    })
    let data =  document.getElementById('Pend_orderlist').innerHTML;
    
    document.getElementById('delivered_orderlist').innerHTML += data;
    delivered = delivered + pendingorder;
    document.querySelectorAll(".delivered").forEach(function(p){
        p.textContent =delivered;
    })
    pendingorder = 0;
    document.querySelectorAll(".pend").forEach(function(p){
        
        p.innerHTML = "";
    })
    document.querySelectorAll(".pendingorder").forEach(function(p){
        p.textContent = pendingorder;
    })
    badge = 0;
    carttotal = 0;
    document.getElementById("cartCount").textContent = 0;
    document.getElementById("totalAmount").textContent =`₹${0}`;
    document.getElementById("cart-body").innerHTML = "";
}


function clearAll(){
    badge = 0
    carttotal = 0;
    cartcount = 0;
    pendingorder = 0;
    document.querySelectorAll(".pend").forEach(function(p){
        
        p.innerHTML = "";
    })
    document.querySelectorAll(".pendingorder").forEach(function(p){
        p.textContent = pendingorder;
    })
    document.getElementById("cartCount").textContent = 0;
    document.getElementById("totalAmount").textContent =`₹${0}`;
    document.getElementById("cart-body").innerHTML = "";
}



    // fetch(`/cart_details/${id}`)
    //     .then(function(responce){
    //        return responce.json();
    //     }).then(function(pro){
    //         let data = `
    //     <div class="mx-3 cartmar">
    //         <div class="d-flex zone">
    //             <div class="zonedimg">
    //                 <img src="${pro.image}" alt="img">
    //             </div>
    //             <div class="zoned">
    //                 <h6>${pro.name}</h6>
    //                 <span>₹${pro.price}</span>
    //             </div>
    //         </div>
    //     </div>`
    //         document.getElementById("cart-body").innerHTML += data;
    // document.querySelectorAll(".Pending_orderlist").forEach(function(p){
    //     p.innerHTML += data;
    // })



    //     })




const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

searchInput.addEventListener('input', async function() {
    const query = this.value.trim();
    if (query.length === 0) {
        searchResults.style.display = 'none';
        return;
    }

    const response = await fetch(`/live-search/?q=${query}`);
    const data = await response.json();

    if (data.results.length > 0) {
        searchResults.innerHTML = data.results.map(item => `
            <div class="search-item">
                ${item.image ? `<img src="${item.image}" alt="${item.name}">` : ''}
                <div>
                    <strong>${item.name}</strong><br>
                    <small>${item.category}</small>
                </div>
                <div class="d-block align-items-center">
                <span style="margin-left:auto;color:#007bff;"><strong>${item.price}</strong></span>
                <button class="searchadd"
                            onclick="addCart('${item.name}','${item.image}' ,'${item.price}')">Add Cart
                            +</button>
                </div>
            </div>
        `).join('');
        searchResults.style.display = 'block';
    } else {
        searchResults.innerHTML = '<div class="search-item">No results found</div>';
        searchResults.style.display = 'block';
    }
});

document.addEventListener('click', function(event) {
    if (!searchResults.contains(event.target) && !searchInput.contains(event.target)) {
        searchResults.style.display = 'none';  
    }
   
});


function toggleMobileNav() {
            const nav = document.getElementById('mobileNav');
            const overlay = document.getElementById('navOverlay');
            nav.classList.toggle('active');
            overlay.classList.toggle('active');
        }
const originalActiveTab = window.activeTab;
        window.activeTab = function(tabName, sectionId) {
            if(typeof originalActiveTab === 'function') {
                originalActiveTab(tabName, sectionId);
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }