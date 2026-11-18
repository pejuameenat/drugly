 // functions/src/index.ts
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getMessaging } from 'firebase-admin/messaging';
import { onSchedule } from 'firebase-functions/v2/scheduler';

initializeApp();
const db = getFirestore();

export const checkMedicationReminders = onSchedule("* * * * *", async (event) => {
  const now = new Date();
  
  // Find pending medications where the scheduled notification time is now (or passed)
  const snapshot = await db.collection('medications')
    .where('notificationStatus', '==', 'pending')
    .where('scheduledNotificationTime', '<=', now.toISOString())
    .get();

  if (snapshot.empty) return; 

  const messaging = getMessaging();
  
  for (const doc of snapshot.docs) {
    const data = doc.data();
    
    if (!data.fcmToken) continue; 

    const message = {
      notification: {
        title: `Time for your ${data.medName}! 💊`,
        body: `Take your dose of ${data.medDose}${data.medUnit || ''}. Instructions: ${data.medInstructions}`,
      },
      token: data.fcmToken, 
    };

    try {
      await messaging.send(message);
      await doc.ref.update({ notificationStatus: 'completed' });
      console.log(`Successfully sent reminder for ${data.medName}`);
    } catch (error) {
      console.error(`Error sending message for doc ${doc.id}:`, error);
    }
  }
});
