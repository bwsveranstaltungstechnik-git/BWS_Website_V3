document.addEventListener("DOMContentLoaded", () => {
  // Category Filtering Logic
  const categoryFiltersContainer = document.getElementById("category-filters");
  const productGrid = document.getElementById("product-grid");

  if (categoryFiltersContainer && productGrid) {
    const filterBtns =
      categoryFiltersContainer.querySelectorAll(".category-btn");
    const activeClassStr =
      categoryFiltersContainer.getAttribute("data-active-class") || "";
    const inactiveClassStr =
      categoryFiltersContainer.getAttribute("data-inactive-class") || "";

    const activeClasses = activeClassStr
      .split(" ")
      .filter((c) => c.trim() !== "");
    const inactiveClasses = inactiveClassStr
      .split(" ")
      .filter((c) => c.trim() !== "");

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();

        // Get the filter category
        const filter =
          btn.getAttribute("data-filter") ||
          btn.closest(".category-btn").getAttribute("data-filter");

        // 1. Update button states
        filterBtns.forEach((b) => {
          // Remove active classes, add inactive classes
          b.classList.remove(...activeClasses);
          b.classList.add(...inactiveClasses);
        });

        // Add active classes to the clicked button, remove inactive classes
        btn.classList.remove(...inactiveClasses);
        btn.classList.add(...activeClasses);

        // 2. Filter products
        const products = productGrid.querySelectorAll(".product-card");
        products.forEach((product) => {
          if (
            filter === "all" ||
            product.getAttribute("data-category") === filter
          ) {
            product.style.display = ""; // Reset display to default (which is flex)
          } else {
            product.style.display = "none";
          }
        });
      });
    });
  }

  console.log("Main JS loaded");
});
