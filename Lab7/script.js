function loadHome() {
  document.getElementById('content').innerHTML = `
    <h1>Welcome to our Shop</h1>
    <p>Select a category to view items.</p>
  `;
}

function loadCatalog() {
  fetch('data/categories.json')
    .then(res => res.json())
    .then(data => {
      let html = '<h2>Categories</h2><ul>';
      data.forEach(cat => {
        html += `<li><a href="#" onclick="loadCategory('${cat.shortname}')">${cat.name}</a></li>`;
      });
      html += `<li><a href="#" onclick="loadSpecial()">Specials</a></li></ul>`;
      document.getElementById('content').innerHTML = html;
    });
}

function loadCategory(shortname) {
  fetch(`data/${shortname}.json`)
    .then(res => res.json())
    .then(data => {
      let html = `<h2>${data.categoryName}</h2>`;
      data.items.forEach(item => {
        html += `
          <div class="item">
            <img src="${item.image}" width="150" height="150"><br>
            <strong>${item.name}</strong><br>
            ${item.description}<br>
            <em>${item.price}</em>
          </div>
        `;
      });
      document.getElementById('content').innerHTML = html;
    });
}

function loadSpecial() {
  fetch('data/categories.json')
    .then(res => res.json())
    .then(categories => {
      const rand = Math.floor(Math.random() * categories.length);
      loadCategory(categories[rand].shortname);
    });
}

document.addEventListener("DOMContentLoaded", loadCatalog);
