const successMSG = `
    <div id="inserted">
        <p style="color: red;">success</p>
        <button onclick="toMain()">go to the main page</button>
    </div>
    `

async function add() {
    let name = document.getElementById('name').value
    let theme = document.getElementById('theme').value
    let professorSelect = document.getElementById('sel');

    let profID = 0;
    let profName = '';

    // Iterate through child nodes (options) of <select>
    for (let i = 0; i < professorSelect.childNodes.length; i++) {
        let option = professorSelect.childNodes[i];
        
        // Check if the node is an <option> element
        if (option.nodeType === Node.ELEMENT_NODE && option.tagName === 'OPTION') {
            // Retrieve the 'id' attribute
            let optionID = option.id;
            
            // Retrieve the 'value' attribute (professor name)
            let optionValue = option.value;
            
            // Check if the option's value matches the selected value
            if (option.value === professorSelect.value) {
                profID = optionID;
                profName = optionValue;
                break; // Exit loop since we found the matching option
            }
        }
    }

    console.log('Professor ID:', profID); // Output the selected option's ID
    console.log('Professor Name:', profName); // Output the selected option's name (value)

    const data = {
        name: name,
        theme: theme,
        professor: profName,
        profID: profID,
    }

    console.log(data)

    const request = new Request('http://localhost:3000/student', {
        method: 'POST',
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