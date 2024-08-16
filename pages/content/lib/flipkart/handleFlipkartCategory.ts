import { userSizePreferencesStorage } from '@extension/storage';

export async function handleFlipkartCategory() {
  try {
    // Wait for the page to load completely
    window.addEventListener('load', async () => {
      // Fetch the sizes from storage
      const sizes = await userSizePreferencesStorage.get();
      const category = 'shirt'; // Adjust the category as needed
      const selectedSize = sizes[category];

      if (selectedSize) {
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        const allSizeFacets = params.getAll('p[]');

        let sizeFacetFound = false;

        // Compile a list of size facets
        const updatedFacets = allSizeFacets.map(facet => {
          const decodedFacet = decodeURIComponent(facet);

          if (decodedFacet.includes('facets.size%5B%5D=')) {
            sizeFacetFound = true;
            const sizesInFacet = decodedFacet.split('%3D')[1].split('%2C');

            if (!sizesInFacet.includes(selectedSize)) {
              sizesInFacet.push(selectedSize);
              return encodeURIComponent(`facets.size%5B%5D=${sizesInFacet.join('%2C')}`);
            }
          }

          return facet;
        });

        // If no size facet was found, add the selected size as a new facet
        if (!sizeFacetFound) {
          updatedFacets.push(encodeURIComponent(`facets.size%5B%5D=${selectedSize}`));
        }

        // Only update the URL if changes were made
        if (allSizeFacets.join('&') !== updatedFacets.join('&')) {
          params.delete('p[]');
          updatedFacets.forEach(facet => params.append('p[]', facet));
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
    console.error('Error in handleFlipkartCategory:', error);
  }
}
