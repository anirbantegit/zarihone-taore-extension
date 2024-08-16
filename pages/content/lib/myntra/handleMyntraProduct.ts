import { userSizePreferencesStorage } from '@extension/storage';

interface SizeRecord {
  size: string;
  dom: HTMLElement;
}

export async function handleMyntraProduct(): Promise<void> {
  try {
    // Fetch the sizes from storage
    const sizes: Record<string, string> = await userSizePreferencesStorage.get() as Record<string, string>;
    const category = 'shirt';
    const selectedSize = sizes[category];

    // Only execute if the URL path ends with /buy
    const currentPath = window.location.pathname;
    console.log("current path => ", {currentPath});
    if (!currentPath.endsWith('/buy')) {
      console.log('Skipping size selection for non-buy URLs');
      return;
    }

    // Find all the size buttons
    const sizeButtons: NodeListOf<HTMLElement> = document.querySelectorAll('.size-buttons-size-button');

    // Check if any size buttons exist
    if (sizeButtons.length === 0) {
      console.error('No size buttons found on the product page');
      return;
    }

    // Compile a record of sizes and their corresponding DOM elements
    const sizeRecords: SizeRecord[] = Array.from(sizeButtons).map(button => ({
      size: button.textContent?.trim() || '',
      dom: button,
    }));

    // Find the selected size button
    const selectedButton: SizeRecord | undefined = sizeRecords.find(record =>
      record.dom.classList.contains('size-buttons-size-button-selected')
    );

    // If the selected size is not the preferred size, find and select the preferred size
    if (selectedButton?.size !== selectedSize) {
      const preferredButton: SizeRecord | undefined = sizeRecords.find(record => record.size === selectedSize);
      if (preferredButton) {
        preferredButton.dom.click(); // Select the preferred size
        console.log(`Selected size ${selectedSize} for category ${category}`);
      } else {
        console.error(`Preferred size ${selectedSize} not found for category ${category}`);
      }
    } else {
      console.log('Preferred size is already selected');
    }
  } catch (error) {
    console.error('Error in handleMyntraProduct:', error);
  }
}
