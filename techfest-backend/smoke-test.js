// Smoke test suite for TechFest 2026 API
const BASE_URL = 'http://localhost:5000';

async function runTests() {
  let passed = 0;
  let failed = 0;

  function report(checkNum, desc, ok) {
    if (ok) {
      console.log(`PASS: Check (${checkNum}) - ${desc}`);
      passed++;
    } else {
      console.error(`FAIL: Check (${checkNum}) - ${desc}`);
      failed++;
    }
  }

  const randomEmail = `user_${Date.now()}@example.com`;
  const userPassword = 'password123';
  let userToken = '';
  let adminToken = '';
  let seededEvent = null;

  try {
    // (1) signup a random-email user, 201
    const res1 = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Student Tester', email: randomEmail, password: userPassword })
    });
    report(1, 'Signup a random-email user returns 201', res1.status === 201);

    // (2) same email again, 409
    const res2 = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Student Tester', email: randomEmail, password: userPassword })
    });
    report(2, 'Duplicate email returns 409', res2.status === 409);

    // (3) login with wrong password, 401
    const res3 = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: randomEmail, password: 'wrongpassword' })
    });
    report(3, 'Login with wrong password returns 401', res3.status === 401);

    // (4) login correctly, 200, keep the token
    const res4 = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: randomEmail, password: userPassword })
    });
    const data4 = await res4.json();
    userToken = data4?.data?.token;
    report(4, 'Login correctly returns 200 with token', res4.status === 200 && !!userToken);

    // (5) GET events, 200
    const res5 = await fetch(`${BASE_URL}/api/events`);
    const data5 = await res5.json();
    if (data5?.data?.length > 0) {
      seededEvent = data5.data[0];
    }
    report(5, 'GET events returns 200', res5.status === 200 && Array.isArray(data5?.data));

    // (6) POST event with the user token, 403
    const res6 = await fetch(`${BASE_URL}/api/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify({
        name: 'Unauthorized Event',
        category: 'technical',
        fee: 50,
        seats: 20,
        date: new Date().toISOString()
      })
    });
    report(6, 'POST event with user token returns 403', res6.status === 403);

    // (7) POST event with no token, 401
    const res7 = await fetch(`${BASE_URL}/api/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'No Token Event',
        category: 'technical',
        fee: 50,
        seats: 20,
        date: new Date().toISOString()
      })
    });
    report(7, 'POST event with no token returns 401', res7.status === 401);

    // (8) admin login, then POST event 201, PUT 200, DELETE 200
    const res8Login = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@techfest.com', password: 'admin123' })
    });
    const data8Login = await res8Login.json();
    adminToken = data8Login?.data?.token;

    let check8Ok = res8Login.status === 200 && !!adminToken;
    let createdEventId = null;

    if (check8Ok) {
      const res8Create = await fetch(`${BASE_URL}/api/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify({
          name: 'Admin Test Event',
          category: 'technical',
          fee: 100,
          seats: 25,
          date: new Date().toISOString()
        })
      });
      const data8Create = await res8Create.json();
      createdEventId = data8Create?.data?._id;
      if (res8Create.status !== 201 || !createdEventId) check8Ok = false;
    }

    if (check8Ok && createdEventId) {
      const res8Update = await fetch(`${BASE_URL}/api/events/${createdEventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify({ name: 'Updated Admin Test Event' })
      });
      if (res8Update.status !== 200) check8Ok = false;
    }

    if (check8Ok && createdEventId) {
      const res8Delete = await fetch(`${BASE_URL}/api/events/${createdEventId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${adminToken}` }
      });
      if (res8Delete.status !== 200) check8Ok = false;
    }

    report(8, 'Admin login (200), POST (201), PUT (200), DELETE (200)', check8Ok);

    // (9) user registers for a seeded event, 201, and seats dropped by 1
    let check9Ok = false;
    if (seededEvent) {
      const initialSeats = seededEvent.seats;
      const res9 = await fetch(`${BASE_URL}/api/registrations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify({ eventId: seededEvent._id })
      });

      if (res9.status === 201) {
        const resEventAfter = await fetch(`${BASE_URL}/api/events/${seededEvent._id}`);
        const dataEventAfter = await resEventAfter.json();
        if (dataEventAfter?.data?.seats === initialSeats - 1) {
          check9Ok = true;
        }
      }
    }
    report(9, 'User registers for event 201 and seats dropped by 1', check9Ok);

    // (10) register again, 409
    let check10Ok = false;
    if (seededEvent) {
      const res10 = await fetch(`${BASE_URL}/api/registrations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify({ eventId: seededEvent._id })
      });
      check10Ok = (res10.status === 409);
    }
    report(10, 'Register again returns 409', check10Ok);

    // (11) GET /registrations/my, 200 and contains the event
    const res11 = await fetch(`${BASE_URL}/api/registrations/my`, {
      headers: { 'Authorization': `Bearer ${userToken}` }
    });
    const data11 = await res11.json();
    const hasEvent = data11?.data?.some(r => (r.event?._id || r.event) === seededEvent?._id);
    report(11, 'GET /registrations/my returns 200 and contains event', res11.status === 200 && hasEvent);

    // (12) GET /api/events/123, 400; GET /unknownroute, 404
    const res12a = await fetch(`${BASE_URL}/api/events/123`);
    const res12b = await fetch(`${BASE_URL}/unknownroute`);
    report(12, 'GET /api/events/123 returns 400 & GET /unknownroute returns 404', res12a.status === 400 && res12b.status === 404);

  } catch (err) {
    console.error('Smoke test exception:', err);
    failed++;
  }

  console.log(`\nTests completed: ${passed} passed, ${failed} failed`);
  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTests();
