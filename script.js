let body = document.body

console.log(window.screen.width)

if(window.screen.width > 1024) {
    body.style.background = `url(https://picsum.photos/1920/1080)  no-repeat center center fixed`
}
else if (window.screen.width > 768) {
    body.style.background = `url(https://picsum.photos/2048/1536)  no-repeat center center fixed`
}else {
    body.style.background = `url(https://picsum.photos/1440/2960)  no-repeat center center fixed`
}

body.style.backgroundSize = 'cover'

function generateRanodmNum(max){
    return Math.floor(Math.random() * max);
}

fetch('https://type.fit/api/quotes')
.then((response)=>response.json())
.then((res)=>{

    let quote = document.getElementById('quote')
    quote.textContent = res[generateRanodmNum(res.length - 1)].text

})
.catch((err)=>err)

