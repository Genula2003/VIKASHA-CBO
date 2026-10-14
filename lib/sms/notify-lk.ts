/**
 * Notify.lk Official SMS Gateway Provider
 * Vikasha Community Based Organisation (CBO) - Magammana Water Scheme
 */

export interface SendSmsOptions {
  to: string
  message: string
  senderId?: string
}

export interface SmsResponse {
  success: boolean
  messageId?: string
  error?: string
  data?: any
}

// Credentials configured via environment variables (.env.local)
const DEFAULT_USER_ID = ''
const DEFAULT_API_KEY = ''
const DEFAULT_SENDER_ID = 'NotifyDEMO'

/**
 * Normalizes Sri Lankan mobile numbers to the Notify.lk required format:
 * Format: 947XXXXXXXX (international format without + prefix)
 * Examples:
 *   - "077 123 4567" -> "94771234567"
 *   - "+94 71 234 5678" -> "94712345678"
 *   - "771234567" -> "94771234567"
 *   - "94771234567" -> "94771234567"
 */
export function formatSriLankanPhone(phone: string): { isValid: boolean; formatted: string; reason?: string } {
  if (!phone || typeof phone !== 'string') {
    return { isValid: false, formatted: '', reason: 'Phone number is empty' }
  }

  // Strip all non-digit characters
  let digits = phone.replace(/\D/g, '')

  // Handle local format with leading 0 (e.g. 0771234567 -> 10 digits)
  if (digits.startsWith('0') && digits.length === 10) {
    digits = '94' + digits.substring(1)
  }
  // Handle 9-digit format without leading 0 (e.g. 771234567)
  else if (digits.length === 9 && digits.startsWith('7')) {
    digits = '94' + digits
  }
  // If already starts with 94 and is 11 digits
  else if (digits.startsWith('94') && digits.length === 11) {
    // Already in correct format
  }

  // Validate final 11-digit Sri Lankan mobile format (947XXXXXXXX)
  const isSriLankanMobile = /^947[0-9]{8}$/.test(digits)

  if (!isSriLankanMobile) {
    return { 
      isValid: false, 
      formatted: digits, 
      reason: `Invalid Sri Lankan mobile format. Expected 947XXXXXXXX, got '${digits}' (original: '${phone}')` 
    }
  }

  return { isValid: true, formatted: digits }
}

/**
 * Truncates and cleans SMS text to keep it short, compact, and within 1-2 standard SMS segments
 */
export function sanitizeSmsMessage(message: string, maxChars: number = 160): string {
  if (!message) return ''
  // Normalize whitespace: replace multiple spaces/newlines with a single space
  const cleaned = message.replace(/\s+/g, ' ').trim()
  if (cleaned.length <= maxChars) {
    return cleaned
  }
  return cleaned.substring(0, maxChars - 3) + '...'
}

/**
 * Sends an SMS message through the Notify.lk gateway API
 */
export async function sendSms(options: SendSmsOptions): Promise<SmsResponse> {
  const { to, message, senderId } = options

  // Validate phone number
  const phoneCheck = formatSriLankanPhone(to)
  if (!phoneCheck.isValid) {
    console.warn(`[Notify.lk SMS] Rejected invalid phone number: ${phoneCheck.reason}`)
    return {
      success: false,
      error: phoneCheck.reason || 'Invalid phone number'
    }
  }

  // Compact sanitized message
  const compactMessage = sanitizeSmsMessage(message, 160)

  // Resolve API credentials
  const userId = process.env.NOTIFY_LK_USER_ID || DEFAULT_USER_ID
  const apiKey = process.env.NOTIFY_LK_API_KEY || DEFAULT_API_KEY
  const resolvedSenderId = senderId || process.env.NOTIFY_LK_SENDER_ID || DEFAULT_SENDER_ID

  try {
    const params = new URLSearchParams({
      user_id: userId,
      api_key: apiKey,
      sender_id: resolvedSenderId,
      to: phoneCheck.formatted,
      message: compactMessage
    })

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10s timeout

    const response = await fetch(`https://app.notify.lk/api/v1/send?${params.toString()}`, {
      method: 'GET',
      headers: {
        'User-Agent': 'VikashaCBO-Portal/1.0'
      },
      signal: controller.signal
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const errText = await response.text()
      console.error(`[Notify.lk SMS] HTTP ${response.status} Error:`, errText)
      return {
        success: false,
        error: `HTTP ${response.status}: ${errText}`
      }
    }

    const result = await response.json()

    if (result.status === 'success') {
      const messageId = typeof result.data === 'string' ? result.data : `NOTIFYLK-${Date.now()}`
      console.log(`[Notify.lk SMS] Dispatched to ${phoneCheck.formatted} (Msg: "${compactMessage.substring(0, 40)}...") -> ${messageId}`)
      return {
        success: true,
        messageId,
        data: result
      }
    } else {
      const errMsg = typeof result.errors === 'string' ? result.errors : JSON.stringify(result.errors || result)
      console.error(`[Notify.lk SMS] API Error response:`, errMsg)
      return {
        success: false,
        error: errMsg,
        data: result
      }
    }
  } catch (err: any) {
    console.error(`[Notify.lk SMS] Network / Fetch error:`, err?.message || err)
    return {
      success: false,
      error: err?.message || 'Failed to dispatch SMS through Notify.lk gateway'
    }
  }
}

/**
 * Checks Notify.lk account status and remaining SMS balance
 */
export async function getNotifyLkStatus(): Promise<{ success: boolean; active?: boolean; balance?: number; error?: string }> {
  const userId = process.env.NOTIFY_LK_USER_ID || DEFAULT_USER_ID
  const apiKey = process.env.NOTIFY_LK_API_KEY || DEFAULT_API_KEY

  try {
    const response = await fetch(`https://app.notify.lk/api/v1/status?user_id=${userId}&api_key=${apiKey}`, {
      method: 'GET',
      headers: {
        'User-Agent': 'VikashaCBO-Portal/1.0'
      },
      next: { revalidate: 60 } // Cache balance check for 60 seconds
    })

    if (!response.ok) {
      return { success: false, error: `HTTP ${response.status}` }
    }

    const result = await response.json()
    if (result.status === 'success' && result.data) {
      return {
        success: true,
        active: Boolean(result.data.active),
        balance: Number(result.data.acc_balance ?? 0)
      }
    }

    return { success: false, error: result.errors || 'Unknown error' }
  } catch (err: any) {
    return { success: false, error: err?.message || 'Network error' }
  }
}

/**
 * Standard Compact SMS Builders (Strictly <= 160 chars)
 */
export const SmsTemplates = {
  /**
   * New Monthly Bill Notice
   * Example: "Vikasha CBO: Bill for Acc #104. Units: 16. Total: LKR 1,840. Due: 28/10. Pay: http://vikashacbo.lk/pay" (~105 chars)
   */
  monthlyBill: (params: { accountNumber: string; units: number; amount: number; dueDate?: string; payUrl?: string }) => {
    const dueStr = params.dueDate ? ` Due: ${params.dueDate}.` : ''
    const payStr = params.payUrl ? ` Pay: ${params.payUrl}` : ''
    return `Vikasha CBO: Bill for Acc #${params.accountNumber}. Units: ${params.units}. Total: LKR ${params.amount.toLocaleString()}.${dueStr}${payStr}`
  },

  /**
   * Payment Receipt Acknowledgment
   * Example: "Vikasha CBO: LKR 1,840 received for Acc #104. Txn: TXN7721. Thank you." (~75 chars)
   */
  paymentReceived: (params: { accountNumber: string; amount: number; txnId?: string }) => {
    const refStr = params.txnId ? ` Txn: ${params.txnId}.` : ''
    return `Vikasha CBO: LKR ${params.amount.toLocaleString()} received for Acc #${params.accountNumber}.${refStr} Thank you.`
  },

  /**
   * Arrears Warning / Red Notice
   * Example: "Vikasha CBO RED NOTICE: Acc #104 has arrears LKR 4,728. Settle within 7 days to avoid disconnection. Hot: 0112894567" (~115 chars)
   */
  redNotice: (params: { accountNumber: string; arrears: number; daysRemaining?: number }) => {
    const days = params.daysRemaining || 7
    return `Vikasha CBO RED NOTICE: Acc #${params.accountNumber} has arrears LKR ${params.arrears.toLocaleString()}. Settle within ${days} days to avoid disconnection. Hot: 0112894567`
  },

  /**
   * Bill Reminder Resend
   * Example: "Vikasha CBO Reminder: Bill for Acc #104 is LKR 1,840. Settle online: http://vikashacbo.lk/pay" (~95 chars)
   */
  billReminder: (params: { accountNumber: string; amount: number; payUrl?: string }) => {
    const payStr = params.payUrl ? ` Pay: ${params.payUrl}` : ''
    return `Vikasha CBO Reminder: Bill for Acc #${params.accountNumber} is LKR ${params.amount.toLocaleString()}.${payStr}`
  }
}
