const quotes = [
    "Idiot",
    "Stupid",
    "Dumbhead",
    "Airhead",
    "Baghead",
    "Fuckface",
    "Dummy",
    "Poo Poo Face",
    "Oppisite day brain",
    "Dumb Day",
    "ARG IDIOT",
    "AI generated brain",
    "The biggest idiot to idiot",
    "Big Face",
    "Big Brace",
    "Cow Licker",
    "FallHead",
    "Pressure Prone",
    "Prunebutt",
    "PruneHead",
    "Big Fat Horse"
]

const textquotes = document.getElementsByClassName("quote")

function change(quote) {
    const number = Math.ceil(Math.random() * quotes.length)
    const text = quotes[number - 1]
    console.log(text)
    quote.innerHTML = text
}

function changeall() {
    for(let i = 0; i < textquotes.length; i++) {
        change(textquotes[i])
    }
}

changeall()

setInterval(changeall, 100)