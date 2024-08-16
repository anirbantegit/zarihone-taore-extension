import { handleMyntraCategory } from '@lib/myntra/handleMyntraCategory';
import { handleMyntraProduct } from '@lib/myntra/handleMyntraProduct';
import { handleFlipkartCategory } from '@lib/flipkart/handleFlipkartCategory';
import { handleFlipkartProduct } from '@lib/flipkart/handleFlipkartProduct';

export async function manipulateSizes() {
  try {
    const url = window.location.href;

    if (url.includes('myntra.com')) {
      await handleMyntraCategory();
      await handleMyntraProduct();
    } else if (url.includes('flipkart.com')) {
      // await handleFlipkartCategory()
      await handleFlipkartProduct()
    } else {
      console.error('Not a supported Myntra page.');
    }
  } catch (error) {
    console.error('Error in manipulateSizes:', error);
  }
}
