import './App.css';
import { useState } from 'react';

function FilterableProductTable({ products }) {
 const [filterText, setFilterText] = useState('');
 const [inStockOnly, setInStockOnly] = useState(false);

 return (
  <div className="table">
   <SearchBar
    filterText={filterText}
    inStockOnly={inStockOnly}
    onFilterTextChange={setFilterText}
    onInStockOnlyChange={setInStockOnly}
   />
   <ProductTable products={products} filterText={filterText} inStockOnly={inStockOnly} />
  </div>
 );
}

function ProductCatagoryRow({ category }) {
 return (
  <tr>
   <th className="product-category-row" colSpan="2">
    {category}
   </th>
  </tr>
 );
}

function ProductRow({ product }) {
 const name = product.stocked ? product.name : <span style={{ color: 'red' }}>{product.name}</span>;

 return (
  <tr>
   <td>{name}</td>
   <td>{product.price}</td>
  </tr>
 );
}

//The ProductTable uses statebecasue it needs to filter the the product list
function ProductTable({ products, filterText, inStockOnly }) {
 const rows = [];
 let lastCatagory = null;

 products.forEach((product) => {
  if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
   return;
  }

  if (inStockOnly && !product.stocked) {
   return;
  }

  if (product.category !== lastCatagory) {
   rows.push(<ProductCatagoryRow category={product.category} key={product.category} />);
  }
  rows.push(<ProductRow product={product} key={product.name} />);
  lastCatagory = product.category;
 });

 return (
  <table className="product-table">
   <thread>
    <tr>
     <th>Name</th>
     <th>Price</th>
    </tr>
   </thread>
   <tbody>{rows}</tbody>
  </table>
 );
}
// The SearchBar is also state because it changes based on what the user inputs
function SearchBar({ filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange }) {
 return (
  <form>
   <input type="text" value={filterText} placeholder="Search..." onChange={(e) => onFilterTextChange(e.target.value)} />
   <label>
    <input type="checkbox" checked={inStockOnly} onChange={(e) => onInStockOnlyChange(e.target.value)} />
    {''}
    Only show products in stock
   </label>
  </form>
 );
}

const PRODUCTS = [
 { category: 'Fruits', price: '$1', stocked: true, name: 'Apple' },
 { category: 'Fruits', price: '$1', stocked: true, name: 'Dragonfruit' },
 { category: 'Fruits', price: '$2', stocked: false, name: 'Passionfruit' },
 { category: 'Vegetables', price: '$2', stocked: true, name: 'Spinach' },
 { category: 'Vegetables', price: '$4', stocked: false, name: 'Pumpkin' },
 { category: 'Vegetables', price: '$1', stocked: true, name: 'Peas' },
];

export default function App() {
 return <FilterableProductTable products={PRODUCTS} />;
}
