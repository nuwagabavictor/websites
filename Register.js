document.addEventListener('DOMContentLoaded', () =>{
    const form = document.getElementById('fom');
    form.addEventListener('submit', async(e) =>{
        e.preventDefault();

        
        const username = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('pword').value;
        const phone = document.getElementById('phone').value;
        const gender = document.getElementById('Gender').value;
        const authMsg = document.getElementById('auth-msg');

        try{
            const response = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'applicatio/json'
                },
                body: JSON.stringify({username, email, password, phone, gender})
            });

            const data = response.data;
            if(!response.ok) {
                authMsg.textContent = "User already exists!"
            }
            else{
                authMsg.textContent = "User created successfully"
            }
        }
        catch (err) {
            authMsg.textContent = 'An error ocurred'
        }
    })
})