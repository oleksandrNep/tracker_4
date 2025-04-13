const supabaseUrl = 'https://fftdfyfxakqljhnavuao.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmdGRmeWZ4YWtxbGpobmF2dWFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3NzY4NDAsImV4cCI6MjA1OTM1Mjg0MH0.rVMNdp2MclcZ0R6uPWYEEdL0xllvZCTAirA211ZElA8'
const client = supabase.createClient(supabaseUrl, supabaseKey);

async function addUser() {
    if (!document.getElementById('sign-email').value || !document.getElementById('sign-password').value){
        console.log('empty input');
        return;
    }
    let email = document.getElementById('sign-email').value;
    let password = document.getElementById('sign-password').value;

    const { data, error } = await client
    .from('users')
    .insert([
        { email: email, password: password },
    ])
    .select()

    document.getElementById('sign-email').value='';
    document.getElementById('sign-password').value='';
}

async function logIn() {
    if (!document.getElementById('log-email').value || !document.getElementById('log-password').value){
        console.log('empty input');
        return;
    }
    let email = document.getElementById('log-email').value;
    let password = document.getElementById('log-password').value;

    let { data: users, error } = await client
    .from('users')
    .select('*')

    // console.log(email, password);

    let found = false;

    users.forEach(user => {
        if (user.email === email){
            found = true;
            if (user.password === password){
                toToday();
            } else{
                document.getElementById('without-account').innerText='Incorrect password!';
                document.getElementById('without-account').style.visibility='visible';
            }
        } 
        if (user.email===users[users.length-1].email && found === false){
            document.getElementById('without-account').innerText='You haven\'t signed in yet, sign in!';
            document.getElementById('without-account').style.visibility='visible';
        }
    });
}