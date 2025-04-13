const supabaseUrl = 'https://fftdfyfxakqljhnavuao.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmdGRmeWZ4YWtxbGpobmF2dWFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3NzY4NDAsImV4cCI6MjA1OTM1Mjg0MH0.rVMNdp2MclcZ0R6uPWYEEdL0xllvZCTAirA211ZElA8'
const client = supabase.createClient(supabaseUrl, supabaseKey);

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
        <td class="general-td">${notification.first_notification_date}</td>
        <td class="general-td">${notification.frequency}</td>
      </tr>`
  });
}

insertNotifications();