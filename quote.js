const quotes = [
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
    "A “Hello, world!” program is traditionally used to introduce novice programmers to a programming language. “Hello, world!” is also traditionally used in a sanity test to make sure that a computer language is correctly installed, and that the operator understands how to use it.",
    "Muhahahhahaha!",
    "Friend or Fiend",
    "Youtube or Tiktok",
    "Time or Space",
    "Roblox or Sandbox",
    "I will die",
    "You will die! You will die! La la la la laa la la la!",
    "Nikaxe waz ere",
    "La la la!",
    "I ate words today.",
    "Why am I making this website?",
    "22/07/2024",
    '"Whats the time?" "8:36 PM." "No, time is relative, not 8:36 PM."',
    "3.14159265359",
    "✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓",
    "Quote number (uh idk im too lazy to count)",
    "Quote number 42",
    "A duck walked up to a lemonade standAnd he said to the man runnin the standHey! [(bam bam bam)] Got any grapes?The man said: No, we just sell lemonade But its cold, and its fresh, and its all home-made! Can I get you a glass? The duck said, Ill pass. Then he waddled away - waddle waddle Til the very next day Bom bom bom bom bom babom When the duck walked up to the lemonade standAnd he said to the man runnin the stand Hey! (bam bam bam), got any grapes? The man said: No, like I said yesterday We just sell lemonade, okay? Why not give it a try ?The duck said. Good bye Then he waddled away - waddle waddle Then he waddled away - waddle waddle Then he waddled away - waddle waddle Til the very next day When the duck walked up to the lemonade stand And he said to the man runnin the stand Hey! (bam bam bam) Got any grapes?"
]
    
console.log(quotes.length)
    
function roll() {
    
    var quotenumber = Math.floor(Math.random() * quotes.length)
    
    var quote = quotes[quotenumber]
    
    document.getElementById("quote").innerHTML=quote
    
    console.log(quote)
    
}
    
roll()