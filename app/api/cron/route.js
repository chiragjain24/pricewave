import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { getAllProductsUrls, scrapeAndCheckProduct, getAllProductsId } from '@/lib/actions'
import { revalidatePath } from 'next/cache'

export async function POST() {
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
    try{
        console.log('Running scheduled task started:', new Date().toISOString())
        const urls= await getAllProductsUrls();
        const fetchPromises = urls.map(url => fetchWithRetry(url));
        const allData=await Promise.all(fetchPromises);
        console.log('Running scheduled task ended:', new Date().toISOString())
        revalidatePath(`/`);
        const ids= await getAllProductsId();
        ids.map(item => revalidatePath(`/products/${item.id}`) );
    }
    catch(error){
        console.error('Error in running scheduled task:', error)
    }

  
}

async function fetchWithRetry(url, retries = 2) {
    try {
      await scrapeAndCheckProduct(url, true);
      console.log(`Fetched ${url}`);
      return true;

    } catch (error) {
      if (retries > 0) {
        console.warn(`Retrying ${url}, attempts left: ${retries}`);
        return await fetchWithRetry(url, retries - 1);  // Retry the request
      } else {
        console.error(`Failed after 3 retries: ${url}`);
        return null;  // Return null or handle the failure appropriately after 3 retries
      }
    }
  }
  export const maxDuration = 60;
