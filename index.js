var images = ['https://images.unsplash.com/photo-1543322748-33df6d3db806?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Nnx8bWVucyUyMGZhc2hpb258ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80', 'https://media.istockphoto.com/photos/summer-womens-fashion-clothes-set-moms-jeans-suede-sneakers-cotton-picture-id1131409615?k=6&m=1131409615&s=612x612&w=0&h=jxKe9n70klayZpaO08EwvciPDHuk57hxnvFJoB_BURM=', 'https://images.pexels.com/photos/705164/computer-laptop-work-place-camera-705164.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', 'https://wallpaperaccess.com/full/2087678.jpg'];

// images for slide-show

// below is for image slide show on the wepage
var imgNum = 0;
var len = images.length - 1;

function slideshow(n) {
    imgNum += n;

    if (imgNum > len) {
        imgNum = 0;
    }

    if (imgNum < 0) {
        imgNum = len;
    }

    document.getElementById('images').src = images[imgNum];
    return false;
}

function slideShow2() {
    setInterval("slideshow(1)", 3000); // in setInterval calling the above function
}
slideShow2()


var cart = JSON.parse(localStorage.getItem('cart')) || [] // adding the product to cart
var fav = JSON.parse(localStorage.getItem('favourite')) || [] // adding the fav item to fav array



async function category(c) {
    //here accessing  the value of the button which is provided on the HTML page
    var value = c.value;

    var div = document.getElementById('display')
    div.innerText = null

    //document.getElementById('sorting').style.display = 'block'

    var responase = await fetch('https://fakestoreapi.com/products') // promise-1 here sending the request to server to get data
    var alldata = await responase.json() // promise -2, here we are getting the data as stream(handling the received data)


    function compare(a, b) { // sorting the received data from the server through pricing(low to high)
        if (a.price > b.price) return 1;
        if (b.price > a.price) return -1;

        return 0;
    }

    alldata.sort(compare);
    console.log(alldata) // sorted data


    alldata.forEach(element => {
        // using for each to get the particular data when clicked on the particular button and showing them on the webpages
        if (element.category == value) {
            console.log(element)

            var h3 = document.createElement('h3') //creating the h3 element for title of the product
            h3.textContent = `${element.title}`


            var img = document.createElement('img') //creating the img element for images of the product
            img.setAttribute('src', `${element.image}`)


            var p = document.createElement('p') //creating the p element for price of the product
            p.innerHTML = `Price: $${element.price} `

            var btn1 = document.createElement('button') // creating add to cart button and adding addeventlistener function
            btn1.textContent = 'Add to cart'
            btn1.addEventListener('click', function() {
                addtocart(element)
            })
            var btn2 = document.createElement('button')
            btn2.innerHTML = `Add to favourite`
            btn2.addEventListener('click', function() {
                addToFavourite(element)
            })

            var hr = document.createElement('hr')


            div.append(h3, img, p, btn1, btn2, hr) // appending all the created element into the parent div


        }
    });
}


function addtocart(element) {
    // storing the cart product into localstorage
    cart.push(element)
    localStorage.setItem('cart', JSON.stringify(cart))
}

function addToFavourite(element) {
    // storing the favourite product into localstorage
    fav.push(element)
    localStorage.setItem('favourite', JSON.stringify(fav))
}


function gotocart() {
    location.assign('cart.html')
}

function home() {
    location.assign('index.html')
}