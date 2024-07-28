var fps = 60
var body = document.getElementsByTagName("body")[0]
var objects = new Array

function getobjectbyid(id) {
    for (i = 0; i < objects.length; i++) {
        var object = objects[i]

        if(!object) {continue}

        if (object.id === id) {
            return i
        }
        else {
            continue
        }
    }
}

function createnewobject(type, id, texture, x, y, xv, yv, zlayer) {
    var obj = new Object
    obj.type = type
    obj.id = id
    obj.texture = texture
    obj.x = x
    obj.y = y
    obj.xv = xv
    obj.yv = yv
    obj.layer = zlayer

    var elementdiv = document.createElement("div")
    var elementtexture = document.createElement("img")
    elementtexture.src = texture
    elementdiv.appendChild(elementtexture)
    elementdiv.id = id
    elementdiv.style.zIndex = zlayer

    elementtexture.style.userSelect = "none"

    body.appendChild(elementdiv)

    positionbyid(id, x, y)

    objects[objects.length] = obj
    oncreation(obj, elementdiv)

    return obj
}

function deleteobjectbyid(id) {
    if (!document.getElementById(id)) {
        return
    }

    body.removeChild(document.getElementById(id))
    objects.splice(getobjectbyid(id), 1)
}

function newcamera(x, y, xv, yv) {
    var obj = new Object
    obj.x = x
    obj.y = y
    obj.xv = xv
    obj.yv = yv

    return obj
}

function newenemy(texture) {
    var data = new Object

    if (texture === "Images/enemy1.png") {
        data.type = "base"
        data.speed = (((Math.random() * 50)) - 25) + 85
        data.health = ((Math.random() * 4) - 2) + 7
        data.maxhealth = data.health
        data.friction = 0.9
    }

    if (texture === "Images/enemy2.png") {
        data.type = "base"
        data.speed = (((Math.random() * 50)) - 125) + 400
        data.health = ((Math.random() * 4) - 2) + 7
        data.maxhealth = data.health
        data.friction = 0.9
    }

    if (texture === "Images/enemy3.png") {
        data.type = "base"
        data.speed = (((Math.random() * 40)) - 15) + 75
        data.health = ((Math.random() * 2) - 1) + 3
        data.maxhealth = data.health
        data.friction = 0.9
    }

    return data
}

function inbet(number, b1, b2) {
    if (number > b1 & number < b2) {
        return true
    }

    return false
}

function vector2(x, y) {
    var vector = new Object
    vector.x = x
    vector.y = y
    return vector
}

function positionbyid(id, x, y) {
    var element = document.getElementById(id)

    element.style.position = "absolute"
    element.style.left = x + "px"
    element.style.top = y + "px"
}

function sizebyid(id, width, height) {
    var element = document.getElementById(id)
    var img = element.getElementsByTagName("img")[0]

    img.style.display = "block"
    img.style.width = width + "px"
    img.style.height = height + "px"
}

function positionbyclass(classname, index, x, y) {
    var element = document.getElementsByClassName(classname)[index]

    element.style.position = "absolute"
    element.style.left = x + "px"
    element.style.top = y + "px"
}

function pointbyid(id, x, y) {
    var element = document.getElementById(id)

    var vec = new vector2(x - parseInt(element.style.left, 10), y - parseInt(element.style.top, 10))

    element.style.rotate = ((Math.atan2(vec.y, vec.x) * 180) / Math.PI) + "deg"
}

function pointto(x1, y1, x2, y2) {
    var vec = new vector2(x1 - x2, y1 - y2)
    return (Math.atan2(vec.y, vec.x) * 180) / Math.PI
}

const degreesToRads = deg => (deg * Math.PI) / 180.0

function veclocityfromdirection(dir, speed) {
    return new vector2(0 - Math.cos(degreesToRads(dir)) * speed, 0 - Math.sin(degreesToRads(dir)) * speed)
}

function checkcollisiondiv(element1, element2) {
    const rect1 = element1.getBoundingClientRect()
    const rect2 = element2.getBoundingClientRect()

    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    )
}

function checkcollision(element) {
    var collisions = new Object

    for (icc = 0; icc < objects.length; icc++) {
        var object = objects[icc]
        var div = document.getElementById(object.id)

        if (checkcollisiondiv(element, div)) {
            if (!collisions[object.type]) { collisions[object.type] = new Array }
            
            collisions[object.type][collisions[object.type].length] = object
        }
    }

    return(collisions)
}

function foralltype(type, func, returntype) {
    var allreturn = new Array

    for (i = 0; i < objects.length; i++) {
        if (!objects[i].type === type) { continue }

        allreturn[allreturn.length] = func(objects[i])
    }

    if (returntype) {
        return allreturn
    } if (returntype === "onetrue") {
        return allreturn.includes(true, 0)
    }
}

function getalltype(type) {
    var all = new Array

    for (gati = 0; gati < objects.length; gati++) {
        if (objects[gati].type === type) {
            all[all.length] = objects[gati]
        }
    }

    return all
}

var camera = new newcamera(0, 0, 0, 0)

var mouseposition = new vector2

onmousemove = function (e) { mouseposition.x = e.clientX; mouseposition.y = e.clientY; }

var keyState = {}

window.addEventListener('keydown', function (e) {
    keyState[e.key.toLowerCase()] = true
}, true);

window.addEventListener('keyup', function (e) {
    keyState[e.key.toLowerCase()] = false
}, true);

var mousedown = false

addEventListener("mousedown", function (e) {
    mousedown = true
})

addEventListener("mouseup", function (e) {
    mousedown = false
})

var playerobject = createnewobject("player", "player", "Images/player.png", window.innerWidth / 2, window.innerHeight / 2, 0, 0, 100)
createnewobject("wall", "testwall", "Images/wall.png", 0, 100, 0, 0, 2)

setTimeout(() => { for (i = 0; i <= 25; i++) { createnewobject("enemy", Math.random() * 1000000000, "Images/enemy" + (Math.round(Math.random() * 2) + 1) + ".png", ((Math.random() * 1000) - 500) + window.innerWidth / 2, ((Math.random() * 1000) - 500) + window.innerHeight / 2, 0, 0, 1) } }, 2000)

function oncreation(object, element) {
    if (object.type === "bullet") {
        sizebyid(object.id, 30,30)
        setTimeout(() => { deleteobjectbyid(object.id) }, 2000)
    }

    if (object.type === "enemy") {
        object.enemydata = new newenemy(object.texture)
    }

    if (object.type === "player") {
        var shoot = null
        object.shoot = function() {
            var velocity = veclocityfromdirection(pointto(parseInt(element.style.left, 10), parseInt(element.style.top, 10), mouseposition.x, mouseposition.y), 25)
            createnewobject("bullet", Math.random() * 1000000000, "Images/bullet.png", object.x, object.y, velocity.x, velocity.y, 1)
        }

        addEventListener("mousedown", function () {
            object.shoot()

            shoot = setInterval(function () {
                object.shoot()
            }, 100)
        })

        addEventListener("mouseup", function () {
            if (shoot) {
                clearInterval(shoot)
            }
        })
    }
}

var playerobject = objects[getobjectbyid("player")]

function update(object, element) {
    const collisions = checkcollision(element)

    if (object.type === "player") {
        object.friction = 0.8
        object.speed = 3

        if (keyState.w) {
            object.yv -= object.speed
        }

        if (keyState.s) {
            object.yv += object.speed
        }

        if (keyState.a) {
            object.xv -= object.speed
        }

        if (keyState.d) {
            object.xv += object.speed
        }

        object.xv *= object.friction
        object.yv *= object.friction

        if (collisions["wall"]) {
            object.xv *= -1.2
            object.yv *= -1.2
        }

        pointbyid(object.id, mouseposition.x, mouseposition.y)

        camera.xv = ((object.x - window.innerWidth / 2) - camera.x) / 10
        camera.yv = ((object.y - window.innerHeight / 2) - camera.y) / 10
    }

    if (object.type === "bullet") {
        if (collisions["enemy"] || collisions["wall"]) {
            deleteobjectbyid(object.id)
        }
    }

    if (object.type === "enemy") {
        //if(Math.abs(playerobject.x - object.x) > 250 || Math.abs(playerobject.y - object.y) > 250) {return}

        object.xv += (playerobject.x - object.x) / object.enemydata.speed
        object.yv += (playerobject.y - object.y) / object.enemydata.speed
        
        object.xv *= object.enemydata.friction
        object.yv *= object.enemydata.friction

        pointbyid(object.id, object.xv + parseInt(element.style.left, 10), object.yv + parseInt(element.style.top, 10))

        if (collisions["player"] || collisions["bullet"] || collisions["wall"]) {
            if (collisions["bullet"]) {
                object.enemydata.health -= 1
            }

            object.xv *= -1
            object.yv *= -1
        }

        document.getElementById(object.id).style.opacity = .5 + (object.enemydata.health / object.enemydata.maxhealth)

        if (object.enemydata.health <= 0) {
            deleteobjectbyid(object.id)
        }
    }
}

var lastloop = new Date
var fpscounter = document.getElementById("fps")
var enemycounter = document.getElementById("enemynumber")
var enemynumber = getalltype("enemy").length

function loop() {
    var thisloop = new Date
    fps = 1000 / (thisloop - lastloop)

    fpscounter.textContent = Math.floor(fps)

    enemynumber = getalltype("enemy").length
    enemycounter.textContent = "Enemies: " + enemynumber

    camera.x += camera.xv
    camera.y += camera.yv

    for (i = 0; i < objects.length; i++) {
        if (objects[i]) {
            var element = document.getElementById(objects[i].id)
            var img = element.getElementsByTagName("img")[0]

            update(objects[i], element)

            if(objects[i] === undefined || objects[i] === null) {continue}

            objects[i].x += objects[i].xv
            objects[i].y += objects[i].yv

            positionbyid(objects[i].id, objects[i].x - camera.x - element.clientWidth / 2, objects[i].y - camera.y - element.clientHeight)
            element.style.zIndex = objects[i].layer
            img.src = objects[i].texture
        }
    }

    lastloop = thisloop
}

setInterval(loop, 10)