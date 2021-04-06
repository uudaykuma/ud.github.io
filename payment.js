var pay = JSON.parse(localStorage.getItem('new-price'))
console.log(pay) // getting the price of the cart value to show on payment page

var btn = document.getElementById('payment')
btn.textContent = `Pay $${pay}`


document.getElementById('otp').style.display = 'none'
document.getElementById('pay_detail').style.display = 'block'

function makePayment() { // functionality for making payment and using if else condition to make sure that payment detail should be filled in required manner
    var cardNumber = document.getElementById('cardnumber').value;
    var usercvv = document.getElementById('cvv').value
    var expdate = document.getElementById('exdate').value
    var name = document.getElementById('name').value



    if (cardNumber.length < 16 || cardNumber == '' || cardNumber.length > 16) { // card number validation
        alert('Please enter the Valid card detail')
    } else if (usercvv.length !== 3 || usercvv == '') { //cvv number validation
        alert('You have provided wrong CVV')
    } else if (expdate.length !== 5 || expdate == '' || expdate[2] !== '/') { // expiry date validation
        alert('Please enter valid expiry date')
    } else if (name == '') { // card holder name validation
        alert('Please fill your Name')
    } else {
        var detail = {
            cardnum: cardNumber,
            cvv: usercvv,
            expirydate: expdate,
            name: name
        }
        console.log(detail)
        alert('Please fill the OTP ')
        document.getElementById('otp').style.display = 'block'
        document.getElementById('pay_detail').style.display = 'none'
    }


}

var otp_div = document.getElementById('otp')

function submitOtp() { // functionality for the otp 
    var filledOtp = document.getElementById('inputOtp').value
        //console.log(filledOtp.length)

    if (filledOtp.length < 4 || filledOtp == '' || filledOtp.length > 4) { // otp validation
        // if the otp is less then 4 or greater than 4 otp will not be accepted
        alert('Please fill the 4 digit OTP')
    } else {
        alert(`Your payment is successfull for amount ${pay}`)
        otp_div.innerText = null
        var p = document.createElement('p')
        p.textContent = `Your payment is successfull for amount ${pay}`
        p.style.color = 'white'
        p.style.paddingTop = '20px'
        p.style.letterSpacing = '1px'

        var btn = document.createElement('button')
        btn.textContent = "Continue Shopping"
        btn.setAttribute('id', 'continue_shopping')
        btn.setAttribute('onclick', 'gotohomepage()')
        otp_div.append(p, btn)
    }
}

function gotohomepage() {
    location.assign('index.html')
}