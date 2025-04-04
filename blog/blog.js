const urlparams = new URLSearchParams(window.location.search)
const post = urlparams.get("post")
const page = document.getElementById("page")

var blog = {}

// async function getblog() {
//     const url = "./blog.json"
//     const response = await fetch(url)

//     if (response.status === 404) {
//         console.error("The data (", {"name": name, "url": url}, ") does not exist.");
//         return
//     }

//     const text = await response.text()
//     blog = JSON.parse(text)

//     console.log("data:", blog)

//     return blog
// }

// getblog()

async function script() {
    async function getall() {
        blog = await getdata("blog/blog")
    }

    await getall()

    function findblogdatabyname(name) {
        for(findi = 0; findi < blog.list.length; findi++) {
            const data = blog.list[findi]

            if(data.name == name) {
                return data
            }
        }
    }

    var postlinks;
    var postdiv;

    if(post) {
        postdiv = document.createElement("div")
        postdiv.id = "blog-post"
        postdiv.style.margin = "50px"
        page.appendChild(postdiv)

        document.getElementById("search-page").remove()
        document.getElementById("search-page-icon").remove()
    } else {
        var postlinksheader = document.createElement("h1")
        postlinksheader.textContent = "Posts:"

        postlinks = document.createElement("div")
        postlinks.style.margin = "50px"
        postlinks.id = "post-links"

        postlinks.appendChild(postlinksheader)
        page.appendChild(postlinks)
    }

    function createpostlink(name) {
        const post = findblogdatabyname(name)
        
        const div = document.createElement("div")
        div.className = "blog-post scale-on-hover"

        const link = document.createElement("p")
        link.className = "underline-on-hover card-title"
        link.textContent = name

        const description = document.createElement("p")
        description.className = "card-description"
        description.innerHTML = post.description

        // const thumbnail = document.createElement("img")
        // thumbnail.className = "card-thumbnail"
        // thumbnail.src = post.thumbnail

        div.onclick = function() {
            if (post.content.type === "link") {
                window.location.href = post.content.src
                return
            }

            window.location.search = "?post=" + name
        }

        div.appendChild(link)
        div.appendChild(description)
        // div.appendChild(thumbnail)
        postlinks.appendChild(div)
    }

    function createpostpage(post) {
        const header = document.createElement("h1")
        header.style.textDecorationLine = "underline"
        header.textContent = post.name
        postdiv.appendChild(header)

        if (post.content.type === "link") {
            window.location.href = post.content.src
        }

        if (post.content.type === "enter" && post.content.language === "html") { postdiv.innerHTML = post.content.src }

        if (post.content.type === "enter" && post.content.language === "btxt") {
            const texts = post.content.src.content
            
            for (lodi = 0; lodi < texts.length; lodi++) {
                const text = texts[lodi]
                const data = text.split("$")

                const properties = JSON.parse(data[3])
                const htmlproperties = properties["html"]
                const style = properties["style"]

                try {
                    console.log(data, properties, "Next:", texts[lodi + 1].split("$")[3])
                }

                catch (err) {
                    console.log(data, properties, "Next:", "(Error)", err)
                }
                

                /*if (data[1] === "new") {
                    properties = JSON.parse(data[2])
                } else {
                    properties = JSON.parse(data[3])
                }*/

                var line = document.createElement("p")
                line.style = "margin: 0px; font-size: 20px;"
                line.textContent = data

                if (data[0] === "") {
                    if (data[1] === "link") {
                        line = document.createElement("a")
                        line.href = properties.link
                        line.textContent = data[2]
                    } else if (data[1] === "new") {
                        line = document.createElement("br")

                        for (bri = 0; bri < data[2] - 1; bri++) {
                            postdiv.appendChild(document.createElement("br"))
                        }

                    } else if (data[1] === "text") {
                        line.textContent = data[2]
                    } else if (data[1] === "embed") {
                        line = document.createElement("embed")
                        line.src = properties.link
                    } else if (data[1] === "image") {
                        line = document.createElement("img")
                        line.src = data[2]
                        line.style.borderRadius = "20px"
                        line.style.borderColor = "grey"
                        line.style.borderStyle = "solid"
                        line.width = properties.width
                        line.height = properties.height
                        console.log(properties.size)
                    } else if (data[1] === "subheader") {
                        line = document.createElement("h2")
                        line.textContent = data[2]
                    } else if (data[1] === "redirect") {
                        line = document.createElement("p")
                        line.textContent = ""
                        console.log(data[2])
                        window.location.href = data[2]
                    }

                } else {
                    line.textContent = data
                }

                line.className = "blogtext build-opacity-spawn"

                if (typeof style === "object") {
                    for (styli = 0; styli < Object.keys(style).length; styli++) {
                        const propertyname = Object.keys(style)[styli]
                        line.style[propertyname] = style[propertyname]
                    }
                }

                if (typeof htmlproperties === "object") {
                    for (pi = 0; pi < Object.keys(htmlproperties).length; pi++) {
                        const name = Object.keys(htmlproperties)[pi]
                        line[name] = htmlproperties[name]
                    }
                }

                postdiv.appendChild(line)
                postdiv.appendChild(document.createElement("br"))
            }
        }
    }

    if(!post) {
        blog.list.forEach(function(data) {
            createpostlink(data.name)

            document.getElementById("search-page").onkeyup = function(event) {
                const search = document.getElementById("search-page")
                const items = document.querySelectorAll(".blog-post")
                const searchquery = search.value
                
                items.forEach(function(blogpost, index, parent) {
                    const item = blogpost.getElementsByClassName("card-title")[0]
                    const tags = findblogdatabyname(item.textContent).tags
                    const compare = item.textContent + " " + tags

                    if(compare.toLowerCase().indexOf(searchquery.toLowerCase()) > -1) {
                        blogpost.style.display = ""
                    } else {
                        blogpost.style.display = "none"
                    }
                })
            }
        })
    } else {
        const postdata = findblogdatabyname(post)

        createpostpage(postdata)

        metatag("og:title", postdata.name)
        metatag("og:description", postdata.description)
    }
}

script()
