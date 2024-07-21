var quotes = [
"Hello, World!",
"Loading...",
"Niyak huh huh",
"Error 404",
"Get it?",
"Get the difference?",
"Python or JavaScript or Scratch or Java or Lua or Binary choose wisely!!!!!!!!",
"This website is sponsored by Nord VPN #joke #justkidding #donottakethisseriously",
"I ate your quote",
"Happy Birthday To (Error 403-C: Error 404-E: Could not find description of Error 403-E)",
"quote.js",
"a a ung ga a a a ung ga a",
"sorry",
"Merry Christmas",
"Merry Averageness",
"Merry Merryiest",
"Merry Day",
"I have no frieds",
"What is a fried",
"I don't mean friends, I mean frieds! Jesus some people.",
"You know what they say!",
"Error 404 #2: The Electric Boogaloo!",
"Error 404 #3: The um uh amazing tree!!!!!!",
"Error 404 #4, The World Tour!",
"A “Hello, world!” program is traditionally used to introduce novice programmers to a programming language. “Hello, world!” is also traditionally used in a sanity test to make sure that a computer language is correctly installed, and that the operator understands how to use it."
]

var quotenumber = Math.floor(Math.random() * quotes.length)

var quote = quotes[quotenumber]

document.getElementById("quote").innerHTML=quote

console.log(quote)