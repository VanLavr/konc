const successMSG = `
    <div id="inserted">
        <p style="color: red;">success</p>
        <button onclick="toMain()">go to the main page</button>
    </div>
    `

async function unpin(studentID) {
    console.log('Student ID:', studentID); // Output the selected option's ID

    const data = {
        id: studentID,
    }

    console.log(data)

    const request = new Request('http://localhost:3000/unpin', {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    const response = await fetch(request)
    console.log(response)
    if (response.status === 200) {
        const isInsertedAlready = document.getElementById('inserted')
        if (isInsertedAlready === null) {
            const base = document.getElementById('base')
            base.insertAdjacentHTML('afterend', successMSG)
        }
    } else {
        console.log(response)
        alert('oops...')
    }
}

function toMain() {
    window.location.replace('http://localhost:3000/')
}