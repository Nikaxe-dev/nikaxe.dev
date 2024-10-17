var blog = null
const blogpage = document.querySelector(".blog-posts")

const post = urlparams.get("post")

async function script() {
    async function getall() {
        blog = await getdata("blog")
    }

    await getall()

    console.log(blog)

    const bloglist = blog.list

    function findblogdatabyname(name) {
        for (findi = 0; findi < bloglist.length; findi++) {
            const blogdata = bloglist[findi]

            if (blogdata.name == name) {
                return blogdata    
            }
        }
    }

    function createpostpage(post) {
        const pagediv = document.createElement("div")
        pagediv.className = "page"
        pagediv.id = "page-".concat("blog-", post.name)

        if (post.content.type === "enter" && post.content.language === "html") { pagediv.innerHTML = post.content.src }

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
                line.style.margin = "0px"

                if (data[0] === "") {
                    if (data[1] === "link") {
                        line = document.createElement("a")
                        line.href = properties.link
                        line.textContent = data[2]
                    } else if (data[1] === "new") {
                        line = document.createElement("br")

                        for (bri = 0; bri < data[2] - 1; bri++) {
                            pagediv.appendChild(document.createElement("br"))
                        }

                    } else if (data[1] === "text") {
                        line.textContent = data[2]
                    } else if (data[1] === "embed") {
                        line = document.createElement("embed")
                        line.src = properties.link
                    } else {
                        line.textContent = data
                    }

                } else {
                    line.textContent = data
                }

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

                pagediv.appendChild(line)
                pagediv.appendChild(document.createElement("br"))
            }
        }

        pagediv.appendChild(document.createElement("br"))
        pagediv.appendChild(document.createElement("br"))

        const back = document.createElement("a")
        back.class = "back"

        back.onclick = function () {
            pages.goback()
        }

        back.innerHTML = "Back ←←←"
        back.style.margin = "10px"

        pagediv.appendChild(back)

        document.body.appendChild(pagediv)
    }

    function createpostlink(post) {
        const divelement = document.createElement("div")
        divelement.className = "post build-opacity-spawn"
        divelement.style.margin = "2px"
        divelement.title = post.description

        const elementlink = document.createElement("a")

        elementlink.onclick = function () {
            // createpostpage(post)
            // pages.switch("blog-" + post.name)
            window.location.search = "?page=blog&post=" + post.name
        }

        elementlink.textContent = post.name

        divelement.appendChild(elementlink)

        blogpage.appendChild(divelement)
    }

    for (iblog = 0; iblog < bloglist.length; iblog++) {
        const post = bloglist[iblog]
        createpostlink(post)
    }

    try {
        if (startpage == "blog") {
            createpostpage(findblogdatabyname(post))
            pages.switch("blog-" + post)
        }
    }

    catch {}
}

script()