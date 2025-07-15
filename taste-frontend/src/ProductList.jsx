import ProductCard from "./ProductCard";

function ProductList({ products }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
            ))}
        </div>
    );
}

export default ProductList;