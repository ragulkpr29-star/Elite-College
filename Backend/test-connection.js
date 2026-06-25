const mongoose = require('mongoose');
require('dotenv').config();

async function testMongoDBConnection() {
  console.log('🔍 Testing MongoDB Atlas Connection...\n');
  console.log('Configuration:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`MONGO_URL: ${process.env.MONGO_URL}`);
  console.log(`PORT: ${process.env.PORT || 5000}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  try {
    console.log('⏳ Connecting to MongoDB Atlas...');
    
    const connection = await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 10000,
    });

    console.log('✅ MongoDB Connection Successful!\n');
    
    console.log('Connection Details:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Host: ${connection.connection.host}`);
    console.log(`Database: ${connection.connection.name || 'default'}`);
    console.log(`Ready State: ${connection.connection.readyState} (1 = connected)`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Try to get databases
    const admin = connection.connection.getClient().db('admin');
    const databases = await admin.admin().listDatabases();
    
    console.log('📊 Available Databases:');
    databases.databases.forEach(db => {
      console.log(`   • ${db.name}`);
    });
    console.log('');

    // Try to create a test collection
    console.log('📝 Testing Write Permission...');
    const testDb = connection.connection.getClient().db('elitecollege');
    const testCollection = testDb.collection('connection_test');
    
    const testDoc = {
      timestamp: new Date(),
      message: 'Connection test',
    };
    
    const result = await testCollection.insertOne(testDoc);
    console.log('✅ Write Permission: OK');
    console.log(`   Inserted test document with ID: ${result.insertedId}\n`);

    // Clean up test document
    await testCollection.deleteOne({ _id: result.insertedId });
    console.log('✅ Test document cleaned up\n');

    console.log('✨ All tests passed! MongoDB setup is working correctly.');
    console.log('\nYou can now:');
    console.log('1. Start the backend: npm start');
    console.log('2. Test signup/login on the website');
    console.log('3. Verify users in MongoDB Atlas\n');

    await mongoose.connection.close();
  } catch (error) {
    console.error('\n❌ Connection Failed!\n');
    console.error('Error Details:');
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error(`Type: ${error.name}`);
    console.error(`Message: ${error.message}`);
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Provide troubleshooting suggestions
    if (error.message.includes('authentication failed')) {
      console.log('🔧 Troubleshooting Suggestions:\n');
      console.log('❌ Authentication Failed');
      console.log('   1. Check username in .env file (should be: ragulkpr29)');
      console.log('   2. Check password in .env file (should be: Ragul123)');
      console.log('   3. Verify credentials in MongoDB Atlas → Database Access');
      console.log('   4. Try resetting the password in MongoDB Atlas');
      console.log('   5. Make sure no special characters in password\n');
    } else if (error.message.includes('ENOTFOUND')) {
      console.log('🔧 Troubleshooting Suggestions:\n');
      console.log('❌ Network Error - Cannot reach MongoDB Atlas');
      console.log('   1. Check your internet connection');
      console.log('   2. Check if MongoDB Atlas is accessible (not blocked by firewall)');
      console.log('   3. Verify the cluster URL is correct');
      console.log('   4. Check MongoDB Atlas status page\n');
    } else if (error.message.includes('timed out')) {
      console.log('🔧 Troubleshooting Suggestions:\n');
      console.log('❌ Connection Timeout');
      console.log('   1. Check your IP is whitelisted in MongoDB Atlas');
      console.log('      → Go to Security → Network Access');
      console.log('      → Add 0.0.0.0/0 to allow all IPs (development only)');
      console.log('   2. Check if MongoDB Atlas cluster is running');
      console.log('   3. Try connecting later if cluster is paused\n');
    }

    console.log('Need help? Check MONGODB_SETUP.md for detailed guide.\n');
    process.exit(1);
  }
}

testMongoDBConnection();
