import { getToken } from 'firebase/messaging'
import { Bell } from 'lucide-react'
import { toast } from 'sonner'
import { messaging, database, auth } from '../../Firebase/config'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'

const EnableNotification = () => {
  async function requestPermission() {
    const permission = await Notification.requestPermission()
    if (permission === 'granted') {
      toast.success('Permission granted.')
      try {
        const currentToken = await getToken(messaging, {
          vapidKey: import.meta.env.VITE_MESSAGING_KEY,
        })

        if (currentToken) {
          const userId = auth.currentUser?.uid
          if (!userId) return

          // Save token to Firestore under the user's document
          await setDoc(doc(database, 'fcm_tokens', userId), {
            token: currentToken,
            updatedAt: serverTimestamp(),
          })
        }
        console.log(permission, currentToken)
      } catch (error) {
        console.error('An error occurred while retrieving token. ', error)
      }
    }
  }

  return (
    <button
      type="button"
      onClick={requestPermission}
      className="fixed bottom-3 p-2  right-3 rounded-full bg-blue-600 text-white"
    >
      <Bell size={24} />
    </button>
  )
}

export default EnableNotification
