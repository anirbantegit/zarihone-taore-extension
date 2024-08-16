import { userSizePreferencesStorage } from '@extension/storage';

export async function handleMyntraCategory() {
  try {
    // Wait for the page to load completely
    window.addEventListener('load', async () => {
      const currentPath = window.location.pathname;

      // Skip processing if the path ends with '/buy' or if it's just the domain name (no sub-path)
      if (currentPath.endsWith('/buy') || currentPath === '/') {
        console.log('Skipping size facet manipulation for /buy URLs or root domain');
        return;
      }

      // Fetch the sizes from storage
      const sizes = await userSizePreferencesStorage.get();
      const category = 'shirt';
      const selectedSize = sizes[category];

      if (selectedSize) {
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        const currentFilter = params.get('f');

        let updatedFilter = '';

        if (currentFilter) {
          // Decode the current filter for easier manipulation
          let decodedFilter = decodeURIComponent(currentFilter);
          let sizeFacetFound = false;

          // Split the decoded filter by "::" and find the "size_facet" part
          const updatedParts = decodedFilter.split('::').map(part => {
            if (part.startsWith('size_facet:')) {
              sizeFacetFound = true;

              // Split sizes by "," and check if selectedSize is present
              let sizesInFacet = part.split(':')[1].split(',');

              if (!sizesInFacet.includes(selectedSize)) {
                sizesInFacet = [selectedSize];
              }

              // Return the updated size_facet part
              return `size_facet:${sizesInFacet.join(',')}`;
            }
            return part;
          });

          // If size_facet was not found, append it
          if (!sizeFacetFound) {
            updatedParts.push(`size_facet:${selectedSize}`);
          }

          // Re-encode the updated filter
          updatedFilter = encodeURIComponent(updatedParts.join('::'));
        } else {
          // If there is no filter in the URL, add the size_facet
          updatedFilter = encodeURIComponent(`size_facet:${selectedSize}`);
        }

        // Only redirect if the filter has changed
        if (currentFilter !== updatedFilter) {
          params.set('f', updatedFilter);
          const newUrl = `${url.origin}${url.pathname}?${params.toString()}`;
          console.log(`Redirecting to URL with updated size facet: ${newUrl}`);
          window.location.href = newUrl;
        } else {
          console.log('No changes in the filter, no redirection needed.');
        }
      } else {
        console.error(`No selected size found for category: ${category}`);
      }
    });
  } catch (error) {
    console.error('Error in handleMyntraCategory:', error);
  }
}
