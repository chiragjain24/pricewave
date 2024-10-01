import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { getAllProductsUrls, scrapeAndCheckProduct } from '@/lib/actions'

export async function GET() {
  const headersList = headers()
  const authHeader = headersList.get('authorization')
  const apiSecret = authHeader?.split(' ')[1]

  if (apiSecret !== process.env.CRON_SECRET) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    // Your scheduled task logic here
    await runScheduledTask()
    
    return NextResponse.json(
      { success: true, message: 'Scheduled task completed successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Scheduled task failed:', error)
    return NextResponse.json(
      { success: false, message: String(error) },
      { status: 500 }
    )
  }
}

async function runScheduledTask() {
    console.log('Running scheduled task started:', new Date().toISOString())
    const urls= await getAllProductsUrls();
    const fetchPromises = urls.map(url => scrapeAndCheckProduct(url));
    const responses = await Promise.allSettled(fetchPromises);

  console.log('Running scheduled task ended:', new Date().toISOString())
  
}
