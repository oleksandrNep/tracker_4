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

// for single row
async function fetchHabits() {
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

  const firstHabit = habits[0];
  const secondHabit = habits[1];

  document.getElementById('habit-cell').textContent = firstHabit.habit || '';
  document.getElementById('freq-cell').textContent = new Date(firstHabit.frequency).toLocaleDateString();
  document.getElementById('notes-cell').textContent = firstHabit.notes || '';

  document.getElementById('habit-cellO').textContent = secondHabit.habit || '';
  document.getElementById('freq-cellO').textContent = new Date(secondHabit.frequency).toLocaleDateString();
  document.getElementById('notes-cellO').textContent = secondHabit.notes || '';
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

async function today() {
  let { data: hab, error } = await client
  .from('habits')
  .select("*")
  .lte('frequency', new Date().toISOString());
  console.log("h");

  if (error) {
    console.error('error', error.message);
    return;
  }

  if (!hab || hab.length === 0) {
    console.warn('No habits found in the database.');
    return;
  }

  const habits = hab[3];

  document.getElementById('habit-cellI').textContent = habits.habit || '';
  document.getElementById('freq-cellI').textContent = new Date(habits.frequency).toLocaleDateString();
  document.getElementById('notes-cellI').textContent = habits.notes || '';
}

async function addHabit() {
  // console.log('addHabit');
  let name = document.getElementById('name').value;
  let frequency = document.getElementById('frequency').value;
  let notes = document.getElementById('notes').value;
  const { data, error } = await client
  .from('habits')
  .insert([
    { habit: name, frequency: frequency, notes: notes },
  ])
  .select()

  document.getElementById('name').value='';
  document.getElementById('frequency').value='';
  document.getElementById('notes').value='';
}

fetchHabits();
today();