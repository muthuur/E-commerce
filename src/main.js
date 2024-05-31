var productForm = document.querySelector("form");
var productList = document.getElementById("productList");
var updateForm = document.querySelector(".update-form");
var updateNameInput = document.getElementById("updateName");
var updateDescriptionInput = document.getElementById("updateDescription");
var updatePriceInput = document.getElementById("updatePrice");
var updateCategoryInput = document.getElementById("updateCategory");
var updateImageInput = document.getElementById("updateImage");
var addProductBtn = document.getElementById("addProductBtn");
var updateProductBtn = document.getElementById("updateProductBtn");
var cancelUpdateBtn = document.getElementById("cancelUpdateBtn");
var currentProductId = null;
// Fetch products from the server and display them
fetchProducts();
// Add event listener for form submission
productForm === null || productForm === void 0 ? void 0 : productForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var name = document.getElementById("name").value;
    var description = document.getElementById("description").value;
    var price = parseFloat(document.getElementById("price").value);
    var category = document.getElementById("category")
        .value;
    var image = document.getElementById("image").value;
    // Create a new product object
    var newProduct = {
        id: "" + Date.now(), // Using timestamp as a temporary ID
        name: name,
        description: description,
        price: price,
        category: category,
        image: image,
    };
    // Send a POST request to the server to create a new product
    fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        // Clear the form inputs
        productForm.reset();
        // Fetch and display the updated product list
        fetchProducts();
        console.log(newProduct);
    })
        .catch(function (error) { return console.error("Error creating product:", error); });
});
// Function to fetch and display the product list
function fetchProducts() {
    fetch("http://localhost:3000/products")
        .then(function (response) { return response.json(); })
        .then(function (data) {
        // Clear the product list
        productList.innerHTML = "";
        // Iterate over the products and create product cards
        data.forEach(function (product) {
            var productCard = document.createElement("div");
            productCard.classList.add("product-card");
            var image = document.createElement("img");
            image.src = product.image;
            image.alt = product.name;
            productCard.appendChild(image);
            var name = document.createElement("h3");
            name.textContent = product.name;
            productCard.appendChild(name);
            var description = document.createElement("p");
            description.textContent = product.description;
            productCard.appendChild(description);
            var price = document.createElement("p");
            price.textContent = "KSh".concat(product.price.toFixed(2));
            price.classList.add("price");
            productCard.appendChild(price);
            var category = document.createElement("p");
            category.textContent = "Category: ".concat(product.category);
            productCard.appendChild(category);
            // Create buttons for Update and Delete
            var updateButton = document.createElement("button");
            updateButton.textContent = "Update";
            updateButton.addEventListener("click", function () { return showUpdateForm(product); });
            productCard.appendChild(updateButton);
            var deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", function () { return deleteProduct(product.id); });
            productCard.appendChild(deleteButton);
            productList.appendChild(productCard);
        });
    })
        .catch(function (error) { return console.error("Error fetching products:", error); });
}
// Function to show the update form
function showUpdateForm(product) {
    updateNameInput.value = product.name;
    updateDescriptionInput.value = product.description;
    updatePriceInput.value = product.price.toString();
    updateCategoryInput.value = product.category;
    updateImageInput.value = product.image;
    currentProductId = product.id;
    updateForm.style.display = "block";
}
// Function to update a product
function updateProduct() {
    var updatedProduct = {
        id: currentProductId,
        name: updateNameInput.value,
        description: updateDescriptionInput.value,
        price: parseFloat(updatePriceInput.value),
        category: updateCategoryInput.value,
        image: updateImageInput.value,
    };
    fetch("http://localhost:3000/products/".concat(currentProductId), {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
    })
        .then(function () {
        // Clear the update form inputs
        updateNameInput.value = "";
        updateDescriptionInput.value = "";
        updatePriceInput.value = "";
        updateCategoryInput.value = "";
        updateImageInput.value = "";
        currentProductId = null;
        updateForm.style.display = "none";
        // Fetch and display the updated product list
        fetchProducts();
    })
        .catch(function (error) { return console.error("Error updating product:", error); });
}
// Function to delete a product
function deleteProduct(id) {
    fetch("http://localhost:3000/products/".concat(id), {
        method: "DELETE",
    })
        .then(function () {
        // Fetch and display the updated product list
        fetchProducts();
    })
        .catch(function (error) { return console.error("Error deleting product:", error); });
}
// Add event listeners for update and cancel buttons
updateProductBtn === null || updateProductBtn === void 0 ? void 0 : updateProductBtn.addEventListener("click", updateProduct);
cancelUpdateBtn === null || cancelUpdateBtn === void 0 ? void 0 : cancelUpdateBtn.addEventListener("click", function () {
    updateNameInput.value = "";
    updateDescriptionInput.value = "";
    updatePriceInput.value = "";
    updateCategoryInput.value = "";
    updateImageInput.value = "";
    currentProductId = null;
    updateForm.style.display = "none";
});