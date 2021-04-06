var cart_product = JSON.parse(localStorage.getItem('cart')) // getting data from the localstorage 

var div = document.getElementById('display')


function compare(a, b) { // sorting the product from low to high through pricing
    if (a.price > b.price) return 1;
    if (b.price > a.price) return -1;

    return 0;
}

var sorted_cart = cart_product.sort(compare);
console.log(sorted_cart)

sorted_cart.forEach(element => { // using forEach to show all the product which are added to cart
    console.log(element)


    var h3 = document.createElement('h3') //creating h3 element for title of the product
    h3.textContent = element.title


    var p = document.createElement('p') // creating the p element for price of the product
    p.innerHTML = `Price: $${element.price}<hr>`

    var img = document.createElement('img') //creating img element for the image of the product
    img.setAttribute('src', `${element.image}`)

    div.append(h3, img, p) //appending all the created element into the parent div
});



var total = sorted_cart.reduce((a, c) => // this is for the total cart value of the product
    a + Number(c.price), 0)
console.log(total)

var cart_div = document.getElementById('cartvalue')

var h4 = document.createElement('h4')
h4.textContent = `Total: $${total}/-`
cart_div.append(h4)



// this is functionality for applying the promocode

function applyPromo() {
    cart_div.textContent = null

    var promo = document.getElementById('promo').value
    var num = '';

    if (promo.length < 7 || promo.length > 7) { // here using if conding that promocode should be valid only if the code is of length of 7
        alert('Please enter the valid promocode')
        var h4 = document.createElement('h4')
        h4.textContent = `Total: $${total}/-`
        cart_div.append(h4)
        localStorage.removeItem('new-price')
        localStorage.setItem('new-price', JSON.stringify(total))
    } else {
        for (var i = 5; i < promo.length; i++) {
            num = num + promo[i]
        }
        var discount = Number(num)

        var dis = Math.floor(total - (total * discount) / 100) // if promo code applied then this will show the discounted price of the cart
        localStorage.setItem('new-price', JSON.stringify(dis)) // storing the cart price into local storage to show on payment page

        var h4 = document.createElement('h4')
        h4.textContent = `Total: $${dis}/-`
        cart_div.append(h4)
    }


}


function goToPayment() {
    location.assign('payment.html')
}


function home() {
    location.assign('index.html')
}