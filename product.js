
document.querySelectorAll('.recommended-products .product button').forEach(button => {
    button.addEventListener('click', () => {
        alert(`Added ${button.parentElement.querySelector('h3').innerText} to cart!`);
    });
});
