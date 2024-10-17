const data = {
    
}

async function getdata(name) {
    if (data[name]) {
        return data[name]
    }

    const url = "./database/".concat(name, ".json")
    const response = await fetch(url)

    if (response.status === 404) {
        console.error("The data (", {"name": name, "url": url}, ") does not exist.");
        return
    }

    const text = await response.text()
    data[name] = JSON.parse(text)

    console.log("---")
    console.log("Loaded data:")
    console.log(name, data[name])

    return await data[name]
}

getdata("blog")