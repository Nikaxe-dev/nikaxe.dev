const filelinks = document.querySelector("#page .file-links")

const urlparams = new URLSearchParams(window.location.search)
var path = urlparams.get("path")

if(!path) {
    path = ""
}

var files;

async function script() {
    async function getall() {
        files = await getdata("files")
    }

    await getall()

    function update(directory = "") {
        var list = files

        directory.split("/").forEach(function(value) {
            if(directory) {
                list = list[value]
            }
        })

        console.log(list)

        for(const [name, item] of Object.entries(list)) {
            if(item.type) {
                console.log(name, item)

                const link = document.createElement("h4")
                link.className = "link underline-on-hover"
                link.textContent = `${item.type}: ${name}`

                console.log(item.path)
                
                if(item.type == "file") {
                    link.onclick = function() {
                        window.location.href = `/${item.path}`
                    }
                } else if(item.type == "directory") {
                    link.onclick = function() {
                        // directory += `${item.name}/`
                        // update(directory)
                        window.location.search = `path=${item.path}`
                    }
                }

                filelinks.appendChild(link)
            }
        }
    }

    update(path)
}

script()