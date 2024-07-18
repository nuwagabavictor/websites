document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('fome')

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        alert('clicked')

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const authMsg = document.getElementById('auth-msg');

        try{
            const response = await fetch('http://localhost:3000/api/login',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email,password})
            });
            const data = response.data;
            
            if(!response.ok){
                authMsg.textContent = "Invalid email or Password"
            }
            else{
                authMsg.textContent = "Login successfull"
            }
        }
        catch (err){
            authMsg.textContent = 'An error occured'
        }
    })
})