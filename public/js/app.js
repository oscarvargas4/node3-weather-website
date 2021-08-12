//console.log('Client side javascript file is loaded') //This won't appear in the browser, but will do in the console of chrome (tools-->tools for developers)

const weatherForm = document.querySelector('form') // it comes back a JS representation of that element and we can use that to manipulate the element or to things when the user interacts with the element
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1') // Selecting elemnt from the DOM with the id = "message-1". "#" is used for "id"
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From Javascript' // This will change the text content of the element with id = "message-1".

weatherForm.addEventListener('submit', (e) => { // "e" stands for "event"
    e.preventDefault() // Prevent default option of refreshing the browser, for exemple, if we put below this line "console.log('testing')", it will show it in the console for 0.1 seconds, thus, with this preventDefault() fuction, it won't refresh the browser, so it won't appear last 0.1 seconds, it will stay
    
    const location = search.value

    messageOne.textContent = 'Loading'
    messageTwo.textContent = ''
    
    //fetch API - Client side javascript - Allow us to fetch data from a URL and do something with it.
    fetch('/weather?address=' + location).then((response) => { // ".then" is a promise. Here, it will get back a response, and this response will be an argument for an function. When I was working with localhost, the url was: 'http://localhost:3000/weather?address='. Now that we are working with heroku, it changes to ''/weather?address=''
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }        
    })
    })
})
