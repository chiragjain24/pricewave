// app/api/cron/route.ts
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

export async function GET() {
  const headersList = headers()
  const cronSecret = headersList.get('x-vercel-cron')
  
  // Verify the request is from Vercel Cron
  if (cronSecret !== process.env.CRON_SECRET) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    // Your cron job logic here
    await performCronTask()
    
    return NextResponse.json(
      { success: true, message: 'Cron job completed successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Cron job failed:', error)
    return NextResponse.json(
      { success: false, message: 'Cron job failed' },
      { status: 500 }
    )
  }
}

async function performCronTask() {
  // Implement your cron job logic here
  console.log('Cron job running at:', new Date().toISOString())
  // Example: await db.cleanup()
}