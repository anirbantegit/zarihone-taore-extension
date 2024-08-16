export function extractPageDetails() {
  // Fetch the title of the page
  const title = document.title;

  // Fetch the meta description
  const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';

  // Fetch the meta keywords
  const metaKeywords = document.querySelector('meta[name="keywords"]')?.getAttribute('content') || '';

  return {
    title,
    metaDescription,
    metaKeywords
  };
}
