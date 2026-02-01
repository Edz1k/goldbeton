export function useTelegram() {
  const token = '8050679444:AAH26r3hdyHmSlSuK6DjNzfOW9hCCKorXVk'
  const chatId = '628818368'

  const sendMessage = async (message: string) => {
    const url = `https://api.telegram.org/bot${token}/sendMessage`
    const payload = {
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML',
    }

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      return res.ok
    }
    catch (e) {
      console.error('Telegram error', e)
      return false
    }
  }

  return { sendMessage }
}
