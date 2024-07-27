const search = () =>{
    const searchbox = document.getElementById("search-item").value.toUpperCase()
    const storeitems = document.getElementById("page-list")
    const page = document.querySelectorAll(".page")

    for(var i = 0; i < page.length; i++) {
        let match = page[i].getElementsByTagName("a")[0]
        let matchjoin = page[i].getElementsByTagName("p")[0]

        if(match) {
            let textvalue = match.textContent.concat(matchjoin.textContent) || match.innerHTML.concat(matchjoin.innerHTML)

            if(textvalue.toUpperCase().indexOf(searchbox) > -1) {
                page[i].style.display = ""
            }
            else {
                page[i].style.display = "none"
            }
        }
    }
}