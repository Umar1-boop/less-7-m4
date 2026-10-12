const form = document.getElementById('form');
const content = document.getElementById('content')

const createProductEl = (product = {}) => {
    const div = document.createElement('div')
    div.className = 'product__car'
    div.innerHTML = (`
        <h3><strong>назавания: </strong>${product.title || 'нет названия'}</h3>
        <p><strong>описание: </strong>${product.description || 'нету'}</p>
        <span><strong>цена: </strong>$ ${product.price || 'без цены'}</spam>
    `)
    const btn = document.createElement('button')
    btn.textContent = 'Удалить товар'
    btn.addEventListener('click', () => deleteProduct(product.id, div))
    div.append(btn)

    return div;
}

const renderProducts = (products = []) => {
    content.innerHTML = '';

    return products.forEach((product) => {
        content.append(createProductEl(product));
    });
};

const getProducts = () => {
    fetch('http://localhost:8000/products')
        .then((response) => response.json())
        .then((data) => renderProducts(data))
        .catch((err) => console.error(err))
};

getProducts()

const createProduct = () => {
    const title = document.getElementById('title-input').value;
    const price = document.getElementById('price-input').value;
    const description = document.getElementById('description-texrea').value;

    fetch('http://localhost:8000/products', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title,
            price,
            description
        })
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            getProducts()
        })
        .catch((err) => console.error(err));
};

const deleteProduct = (id, productEl) => {
    fetch(`http://localhost:8000/products/${id}`, {
        method: "DELETE"
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            productEl.remove()
        })
        .catch(err => console.err(err))
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    createProduct();
});

