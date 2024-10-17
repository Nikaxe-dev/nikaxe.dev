const backs = document.getElementsByClassName("back")

for (i = 0; i < backs.length; i++) {
    const back = backs[i]
    back.onclick = function () {
        pages.goback()
    }
}