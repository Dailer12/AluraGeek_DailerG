const apiUrl = 'http://localhost:3000/products';

// Función para obtener productos
async function fetchProducts() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

// Función para mostrar productos en la página
function displayProducts(products) {
  const productsContainer = document.getElementById('products-container');
  if (!productsContainer) {
    console.error('No se encontró el contenedor de productos.');
    return;
  }

  productsContainer.innerHTML = ''; // Limpia el contenedor de productos
  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product-card');
    productDiv.innerHTML = `
      <img src="${product.imageUrl}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>Precio: $${product.price}</p>
      <button onclick="deleteProduct('${product.id}')">Eliminar</button>
    `;
    productsContainer.appendChild(productDiv);
  });
}

// Función para eliminar un producto
async function deleteProduct(id) {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    fetchProducts(); // Actualiza la lista de productos
  } catch (error) {
    console.error('Error deleting product:', error);
  }
}

// Llama a la función para obtener productos cuando la página cargue
document.addEventListener('DOMContentLoaded', fetchProducts);

// Manejo del formulario
document.getElementById('product-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const name = document.getElementById('product-name').value;
  const price = document.getElementById('product-price').value;
  const imageUrl = document.getElementById('product-image').value;

  const newProduct = {
    name: name,
    price: price,
    imageUrl: imageUrl
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProduct)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    fetchProducts(); // Actualiza la lista de productos
  } catch (error) {
    console.error('Error adding product:', error);
  }
});
