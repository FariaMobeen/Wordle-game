export default async (request) => {
  return new Response(JSON.stringify(
            {
                "dictionary": [
                    {
                        "word": "Game",
                        "hint": "Play when you're bored",
                    },
                    {
                        "word": "Pain",
                        "hint": "Attending any class other than ENSF 381 gives you ____",
                    },
                    {
                        "word": "Nerd",
                        "hint": "You may be considered one, if you like Star Trek",
                    },
                    {
                        "word": "Main",
                        "hint": "Name of the function that starts a program in Golang and Java",
                    },
                    {"word": "Rick", "hint": "Lord of all memes"},
                    {"word": "Data", "hint": "A USS Enterprise officer"},
                    {"word": "Byte", "hint": "8 bits"},
                    {"word": "HTML", "hint": "A markup language"},
                    {"word": "Snow", "hint": "Bastards' last name in Game of Thrones"},
                    {
                        "word": "Borg",
                        "hint": "An alien group in the Star Trek Universe",
                    },
                    {"word": "Yoda", "hint": "A true master, he is"},
                    {
                        "word": "Code",
                        "hint": "As a softwae engineer, we need to do this a lot",
                    },
                    {"word": "Time", "hint": "It flies when you're in ENSF 381"},
                    {
                        "word": "Lame",
                        "hint": "Compared to ENSF 381, your other courses are pretty ___",
                    },
                    {"word": "Xbox", "hint": "Like PS5, but worse"},
                    {"word": "Bash", "hint": "Default shell on Ubuntu"},
                    {
                        "word": "curl",
                        "hint": "A command-line tool for fetching data from the Internet",
                    },
                    {
                        "word": "wget",
                        "hint": "A command-line tool for downloading files from the Internet",
                    },
                    {
                        "word": "tail",
                        "hint": "A command-line tool for viewing the last part of a file",
                    },
                    {"word": "JSON", "hint": "A popular data-interchange format"},
                    {"word": "Arya", "hint": "A character on Game of Thrones"},
                    {"word": "Ross", "hint": "Pivot! Pivot!"},
                ],
            }

  ), {
    headers: { 'content-type': 'application/json' },
  })
}
