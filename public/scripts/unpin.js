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
        window.location.replace('http://localhost:3000/')
    } else {
        console.log(response)
        alert('oops...')
    }
}