//stylesheets

const style = document.createElement("link")
style.rel = "stylesheet"
style.href = "index.css"
document.head.appendChild(style)

const hidescrollbar = document.createElement("style")
hidescrollbar.textContent = "body {    overflow: auto; -ms-overflow-style: none; /* IE 11 */ scrollbar-width: none; /* Firefox 64 */}"
document.head.appendChild(hidescrollbar)

//title

const title = document.createElement("title")
document.head.appendChild(title)

if(window.location.pathname == "/" || window.location.pathname == "/home.html") {
    title.textContent = "nikaxe.is-a.dev - home"
} else {
    title.textContent = `nikaxe.is-a.dev - ${window.location.pathname.slice(1, window.location.pathname.length - 5)}`
}

//icon

const icon = document.createElement("link")
document.head.appendChild(icon)
icon.rel = "icon"
icon.href = "favicon.ico"

//navigation

const navigation = document.createElement("div")
document.body.appendChild(navigation)
navigation.id = "navigation"
navigation.className = "sticky"

function onloadednavigation() {
    const elements = document.querySelectorAll("#navigation .links ul li h3")
    
    elements.forEach(function(value, key, parent) {
        if(window.location.pathname == `/${value.textContent.toLowerCase()}.html`) {
            value.className = "selected"
        }
    })

    document.onscroll = function() {
        navigation.style.top = window.scrollY + 0 + "px"
    }
}

const xml = new XMLHttpRequest
const url = "./navigation.html"
xml.responseType = "document"

xml.onreadystatechange = function() {
    if(this.readyState == 4) {
        if(this.status == 404) {navigation.innerHTML = `Error 404: ${url} not found`}
        if(this.status == 200) {navigation.innerHTML = this.responseXML.getElementById("navigation").innerHTML; onloadednavigation()}
    }
}

xml.open("GET", url, true)
xml.send()

addEventListener("load", function() {
    //back

    if(!(window.location.pathname == "/" || window.location.pathname == "/home.html")) {
        const back = document.createElement("p")
        back.textContent = "Back ←←←"
        back.style.margin = "50px"
        back.className = "link underline-on-hover"

        back.onclick = function() {
            history.back()
        }

        document.body.appendChild(back)
    }
})