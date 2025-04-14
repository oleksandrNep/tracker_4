// import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://fftdfyfxakqljhnavuao.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmdGRmeWZ4YWtxbGpobmF2dWFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3NzY4NDAsImV4cCI6MjA1OTM1Mjg0MH0.rVMNdp2MclcZ0R6uPWYEEdL0xllvZCTAirA211ZElA8'
const client = supabase.createClient(supabaseUrl, supabaseKey);


// let habitItem = {
//   habit,
//   frequency,
//   notes
// };


// let { data: habits, error } = await supabase
//   .from('habits')
//   .select('habit')
// document.querySelector('#fcfr').innerHTML=habits;

// async function fetchHabits() {
//   let { data: habits, error } = await client
//     .from('habits')
//     .select('habit');

//   if (error) {
//     console.error('Error fetching habits:', error.message);
//   } else {
//     // const habitList = habits.map(h => `<div>${h.habit}</div>`).join('');
//     // document.querySelector('#fcfr').innerHTML = habitList;
//     // console.log(habits);
//     document.querySelector('#fcfr').innerHTML = habits;
//   }
// }

// Habits
async function insertHabits() {
  const { data: habits, error } = await client
    .from('habits')
    // .select('habit, frequency, notes');
    .select('*');

  if (error) {
    console.error('error', error.message);
    return;
  }

  if (!habits || habits.length === 0) {
    console.warn('No habits found in the database.');
    return;
  }

  document.getElementById('general-habs').innerHTML = `<tr>
  <th class="general-th">Name of notification</th>
  <th class="general-th">First notification</th>
  <th class="general-th">Frequency</th>
  <th class="general-th">Notes</th>
</tr>`;
  
  habits.forEach(habit => {
    document.getElementById('general-habs').innerHTML+=`<tr>
        <td class="general-td">${habit.habit}</td>
        <td class="general-td">${formatDate(habit.first_date)}</td>
        <td class="general-td">${habit.frequency}</td>
        <td class="general-td">${habit.notes}</td>
      </tr>`
  });
}

// async function fetchHabits() {
//   let { data: habits, error } = await client
//     .from('habits')
//     .select('habit, frequency, notes'); // fetch full data

//   if (error) {
//     console.error('Error fetching habits:', error.message);
//     return;
//   }

//   if (habits.length === 0) {
//     console.warn('No habits found');
//     return;
//   }

//   // Get the first habit
//   const firstHabit = habits[0];

//   // Update the first row in the HTML table
//   const row = document.querySelector('.general-habs tr:nth-child(2)');
//   const cells = row.querySelectorAll('td');

//   cells[1].textContent = firstHabit.habit || '';
//   cells[2].textContent = new Date(firstHabit.frequency).toLocaleDateString() || '';
//   cells[3].textContent = firstHabit.notes || '';
// }

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

async function today() {
  const todayDate = new Date();
  todayDate.setUTCHours(0, 0, 0, 0);
  const isoDate = todayDate.toISOString(); // 2025-04-14T00:00:00.000Z

  let { data: todayHabits, error } = await client
  .from('habits')
  .select("*")
  // .lte('frequency', new Date().toISOString());
  // .lte('first_date', '2025-04-14T00:00:00Z');
  .lte('first_date', isoDate);

  if (error) {
    console.error('error', error.message);
    return;
  }

  if (!todayHabits || todayHabits.length === 0) {
    console.warn('No habits found in the database.');
    return;
  }

  let id = -1;

  document.getElementById('today-habs').innerHTML = `<tr>
          <th class="general-th">Complete</th>
          <th class="general-th">Habit</th>
          <th class="general-th">First notification</th>
          <th class="general-th">Frequency</th>
          <th class="general-th">Notes</th>
        </tr>`;
  
  todayHabits.forEach(todayHabit => {
    document.getElementById('today-habs').innerHTML+=`<tr>
        <td class="general-td"><input type="radio" id='${++id}'/></td>
        <td class="general-td">${todayHabit.habit}</td>
        <td class="general-td">${formatDate(todayHabit.first_date)}</td>
        <td class="general-td">${todayHabit.frequency}</td>
        <td class="general-td">${todayHabit.notes}</td>
      </tr>`
  });
}

function radioInitialization() {
  const radios = document.querySelectorAll('input[type="radio"]');
  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      console.log(`Radio ${radio.id} selected`);
    });
  });
}

async function addHabit() {
  // console.log('addHabit');
  let name = document.getElementById('name').value;
  let frequency = document.getElementById('frequency').value;
  let notes = document.getElementById('notes').value;
  const { data, error } = await client
.from('habits')
.insert([
  { habit: name, first_date: frequency, notes: notes },
])
.select()

  document.getElementById('name').value='';
  document.getElementById('frequency').value='';
  document.getElementById('notes').value='';
}

//Log in and sign up system

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

// Notifications

async function addNotification() {
  // console.log('addHabit');
  let notName = document.getElementById('notName').value;
  let firstNotificationDate = document.getElementById('firstNotificationDate').value;
  let notFrequency = document.getElementById('notFrequency').value;
  // console.log(notName, firstNotificationDate, notFrequency);
  const { data, error } = await client
  .from('notifications')
  .insert([
    { name: notName, first_notification_date: firstNotificationDate, frequency: notFrequency },
  ])
  .select()

  document.getElementById('notName').value='';
  document.getElementById('firstNotificationDate').value='';
  document.getElementById('notFrequency').value='';
}

async function insertNotifications() {
let { data: notifications, error } = await client
.from('notifications')
.select('*')

if (error) {
  console.error('error', error.message);
  return;
}

if (!notifications || notifications.length === 0) {
  console.warn('No notifications found in the database.');
  return;
}

document.getElementById('all-notifications').innerHTML = `<tr>
      <th class="general-th">Name of notification</th>
      <th class="general-th">First notification</th>
      <th class="general-th">Frequency</th>
    </tr>`;

// let table = ``;

notifications.forEach(notification => {
  document.getElementById('all-notifications').innerHTML+=`<tr>
      <td class="general-td">${notification.name}</td>
      <td class="general-td">${formatDate(notification.first_notification_date)}</td>
      <td class="general-td">${notification.frequency}</td>
    </tr>`
});
}

function initializeProject(){
  today();
  insertHabits();
  insertNotifications();
  radioInitialization();
}

initializeProject();