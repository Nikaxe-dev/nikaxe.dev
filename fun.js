var files;
const template = document.querySelector("#project-card")
const showcase = document.querySelector("#page .showcase")

async function script() {
    async function getall() {
        files = await getdata("documents/projects/files")
    }

    await getall()

    for(const [key, value] of Object.entries(files)) {
        if (value.type == "directory" && value.purpose == "project") {
            const projectcard = template.content.firstElementChild.cloneNode(true)
            
            const title = projectcard.getElementsByClassName("title")[0]
            title.textContent = key

            const description = projectcard.getElementsByClassName("description")[0]
            description.textContent = value.description

            const thumbnail = projectcard.getElementsByClassName("thumbnail")[0]
            thumbnail.src = value.thumbnail
            
            if(value.thumbnailwidth) {
                thumbnail.style.width = value.thumbnailwidth
            }

            projectcard.onclick = function() {
                window.location.href = `./documents/projects/${key}`
            }

            showcase.appendChild(projectcard)
            console.log(projectcard)
        }
    }
}

script()