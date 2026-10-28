require('dotenv').config();
const dns = require('dns');
try { dns.setServers(['8.8.8.8', '8.8.4.4']); } catch (e) {}
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Event = require('./models/Event');
const Registration = require('./models/Registration');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/techfest';

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);

    // Remove old events, registrations, and admin user
    await User.deleteMany({ email: 'admin@techfest.com' });
    await Event.deleteMany({});
    await Registration.deleteMany({});

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = new User({
      name: 'Admin User',
      email: 'admin@techfest.com',
      password: hashedPassword,
      role: 'admin'
    });
    await admin.save();

    // 5 events
    const events = [
      {
        name: 'Coding Contest',
        category: 'technical',
        fee: 100,
        seats: 50,
        date: new Date('2026-11-10T10:00:00Z')
      },
      {
        name: 'Web Design',
        category: 'technical',
        fee: 150,
        seats: 40,
        date: new Date('2026-11-11T14:00:00Z')
      },
      {
        name: 'Robotics Workshop',
        category: 'workshop',
        fee: 200,
        seats: 30,
        date: new Date('2026-11-12T09:30:00Z')
      },
      {
        name: 'Hackathon',
        category: 'technical',
        fee: 250,
        seats: 60,
        date: new Date('2026-11-13T09:00:00Z')
      },
      {
        name: 'Cultural Night',
        category: 'cultural',
        fee: 50,
        seats: 100,
        date: new Date('2026-11-14T18:00:00Z')
      }
    ];

    await Event.insertMany(events);

    console.log('Seeded');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
