const querystring = window.location.search
const urlparams = new URLSearchParams(querystring)
const startpage = urlparams.get("page")

const pages = {
    //Replace these:

    "pageindex": "page-",
    "homepage": "home",
    "current": 0,
    "back": ["home"],

    "switch": function (name) {
        const old = pages.back[pages.current]
        pages.back.push(name)
        pages.current = pages.back.length - 1

        //console.log(pages.current)

        pages.set(pages.back[pages.current], old)
    },

    "update": function () {
        //pages.set(pages.back[pages.current], pages.back[pages.current])
        pages.setwithargument(pages.back[pages.current])
    },

    "onpageloadofname": {
        "global": function (current, old) {
             
        }
    },

    "set": function (to, old) {
        pages.onpageloadofname["global"](to, old)
        
        if (pages.onpageloadofname[to]) {
            pages.onpageloadofname[to, old]
        }

        const allpages = document.getElementsByClassName("page")

        for (pagi = 0; pagi < allpages.length; pagi++) {
            const page = allpages[pagi]

            page.style.display = "none"
        }

        const currentpage = document.getElementById(pages.pageindex.concat(to))
        //console.log(currentpage)

        if (currentpage === null) {
            pages.switch("404")
            console.error('Page Error: ("', to, '") does not exist.')
            return
        }

        currentpage.style.display = ""

        console.log(to, "-----------------------------------")
    },

    "goback": function () {
        // pages.current -= 1
        // pages.back.splice(pages.back.length - 1, 1)
        // pages.update()
        history.back()
    },

    "setwithargument": function (name) {
        window.location.search = "page=" + name
    }
}

console.log(typeof(reloadafter))

if (startpage) {
    pages.switch(startpage)
}