export interface SmsInput {
  mobile: string
  message: string
}

export async function sendDemoSms(input: SmsInput) {
  // In a real application, this would call an SMS gateway API (e.g., Twilio, local provider)
  console.log(`[DEMO SMS] Sending to ${input.mobile}: ${input.message}`)
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500))

  return { success: true, messageId: `DEMO-SMS-${Date.now()}` }
}
