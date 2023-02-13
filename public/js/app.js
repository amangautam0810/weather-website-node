console.log('clint side data ')

const weatherForm = document.querySelector('form')
const search= document.querySelector('input')
const msg1=document.querySelector('#msg1')
const msg2=document.querySelector('#msg2')



weatherForm.addEventListener('submit' ,  (e) => {
    e.preventDefault()
    const location = search.value
    msg1.textContent = 'Loading .....'
    msg2.textContent = ''
    fetch('http://localhost:3000/weather?address='+location).then((res) => {
    res.json().then((data) => {
        if(data.error)
        {msg1.textContent = data.error
            msg2.textContent = ''
            console.log('error : ' , data.error)
        }
        else
        msg1.textContent= data.location
        msg2.textContent ='Actual Temprature is '+ data.forecast.temperature+ ' FeelsLike '+data.forecast.feelslike+'.'
        console.log('success : ' , data.forecast)
    })
})

})