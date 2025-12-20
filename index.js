function style(href) {
    const style = document.createElement("link")
    style.rel = "stylesheet"
    style.href = href
    document.head.appendChild(style)
}

// Stylesheets
style("/index.css")
style("/resources/html/navigation/index.css")

const fonts = document.createElement("style")
fonts.textContent = "@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');"
document.head.appendChild(fonts)

if(!document.getElementById("icon")) {
    const icon = document.createElement("link")
    document.head.appendChild(icon)
    icon.rel = "icon"
    icon.href = "/favicon.ico"
}

//navigation

const navigation = document.createElement("div")
document.body.appendChild(navigation)
navigation.id = "navigation"
navigation.className = "sticky"

function onloadednavigation() {
    const elements = document.querySelectorAll("#navigation .links ul li h3")
    
    elements.forEach(function(value, key, parent) {
        if(window.location.pathname == `/${value.textContent.toLowerCase()}/`) {
            value.className = "selected"
        }
    })

    document.onscroll = function() {
        navigation.style.top = window.scrollY + "px"
    }
}

const xml = new XMLHttpRequest
const url = "/resources/html/navigation"
xml.responseType = "document"

xml.onreadystatechange = function() {
    if(this.readyState == 4) {
        if(this.status == 404) {navigation.innerHTML = `Error 404: ${url} not found`}
        if(this.status == 200) {navigation.innerHTML = this.responseXML.getElementById("navigation").innerHTML; onloadednavigation()}
    }
}

xml.open("GET", url, true)
xml.send()