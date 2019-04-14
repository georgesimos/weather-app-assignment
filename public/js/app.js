console.log('Client side JavaScript working')

fetch('http://localhost:3000/weather?address=koufonisia')
    .then((res) => {
        res.json().then(data => {
            if (data.error) console.log(data.error);
            console.log(data)
        })
    })
