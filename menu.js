const categoryImages = {
  "Breakfast": "./images/breakfast.webp",
  "Sandwiches": "./images/sandwich.webp",
  "Desserts": "./images/dessert.webp",
  "Drinks": "./images/espresso.webp",
  "Kids Menu": "./images/pancake.webp"
};

$(()=>{
     console.log("on MENU page load");

    loadMenu();
});

async function loadMenu() {
  try {
    const response = await fetch('./menu.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const menuData = await response.json();
    renderMenu(menuData);
  } catch (error) {
    document.getElementById('menu-container').innerHTML = `<p class="error">Failed to load the menu.</p>`;
    console.error(error);
  }
}

function renderMenu(menuData) {
  const container = document.getElementById('menu-container');
  const navContainer = document.getElementById('menu-nav');
  
  container.innerHTML = ''; 
  navContainer.innerHTML = ''; 

  for (const [categoryName, items] of Object.entries(menuData)) {
    const imagePath = categoryImages[categoryName] || "./images/default.jpg";
    const categoryId = categoryName.toLowerCase().replace(/\s+/g, '-'); 

    // Generate Shortcut Image Links (with an elegant fallback if image file is missing)
    navContainer.innerHTML += `
      <a href="#${categoryId}" class="nav-card">
        <img src="${imagePath}" alt="${categoryName}" onerror="this.src='https://placehold.co{categoryName}'">
        <div class="nav-card-overlay">
          <span>${categoryName}</span>
        </div>
      </a>
    `;

    // Generate Menu Detail Blocks
    const section = document.createElement('section');
    section.className = 'menu-category';
    section.id = categoryId;
    
    let sectionHTML = `<h2>${categoryName}</h2>`;
    sectionHTML += `<div class="menu-grid">`;

    items.forEach(item => {
      const descriptionParagraph = item.description ? `<p class="item-description">${item.description}</p>` : '';
      sectionHTML += `
        <div class="menu-item">
          <div class="item-header">
            <h3 class="item-name">${item.name}</h3>
            <span class="item-price">${item.price}</span>
          </div>
          ${descriptionParagraph}
        </div>
      `;
    });

    sectionHTML += `</div>`; 
    section.innerHTML = sectionHTML;
    container.appendChild(section);
  }
}
