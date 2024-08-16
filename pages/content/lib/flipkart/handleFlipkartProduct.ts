import { userSizePreferencesStorage } from '@extension/storage';

interface SizeRecord {
  size: string;
  dom: HTMLElement;
}

export async function handleFlipkartProduct(): Promise<void> {
  try {
    // Fetch the sizes from storage
    const sizes: Record<string, string> = await userSizePreferencesStorage.get() as Record<string, string>;
    const category = 'shirt';
    const selectedSize = sizes[category];

    const currentPath = window.location.pathname;
    console.log("Current path => ", { currentPath });

    // Wait for the page to fully load
    window.addEventListener('load', () => {
      // Find all the size buttons by their text content (L, M, etc.)
      const sizeButtons = document.querySelectorAll('li[id^="swatch-"][id$="-size"] a');

      // Check if any size buttons exist
      if (sizeButtons.length === 0) {
        console.error('No size buttons found on the product page');
        return;
      }

      // Compile a record of sizes and their corresponding DOM elements
      const sizeRecords: SizeRecord[] = Array.from(sizeButtons).map(button => ({
        size: button.textContent?.trim() || '',
        dom: button.closest('li') as HTMLElement, // Get the closest li element containing the button
      }));

      // Log the size records to verify
      console.log("Size records =>", sizeRecords);

      // Find the selected size button (button with 4 classes on anchor tag)
      const selectedButton: SizeRecord | undefined = sizeRecords.find(record =>
        record.dom.querySelector('a')?.classList.length === 4
      );

      // If the selected size is not the preferred size, find and select the preferred size
      if (selectedButton?.size !== selectedSize) {
        const preferredButton: SizeRecord | undefined = sizeRecords.find(record => record.size === selectedSize);
        if (preferredButton) {
          const link = preferredButton.dom.querySelector('a') as HTMLAnchorElement;
          if (link) {
            link.click(); // Select the preferred size
            console.log(`Selected size ${selectedSize} for category ${category}`);
          }
        } else {
          console.error(`Preferred size ${selectedSize} not found for category ${category}`);
        }
      } else {
        console.log('Preferred size is already selected');
      }
    });
  } catch (error) {
    console.error('Error in handleFlipkartProduct:', error);
  }
}
