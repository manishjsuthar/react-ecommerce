import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'

function Filters() {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories

    const [category, setCategory] = state.productsAPI.category
    const [sort, setSort] = state.productsAPI.sort
    const [search, setSearch] = state.productsAPI.search


    const handleCategory = e => {
        setCategory(e.target.value)
        setSearch('')
    }

    return (


        <div className="filter_menu">

            <ul className="list-unstyled templatemo-accordion">
                <input className="p-3" type="text" value={search} placeholder="Enter your search!"
                    onChange={e => setSearch(e.target.value.toLowerCase())} />
                <div className="p-3">
                    <h1 className="d-flex justify-content-between h3 text-decoration-none">
                        Filters
                        
                    </h1>
                    <select name="category" value={category} onChange={handleCategory} className="form-select">
                        <option value=''>All Products</option>
                        {
                            categories.map(category => (
                                <option value={"category=" + category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div className="p-3 row sort">
                    <h1 className="d-flex justify-content-between h3 text-decoration-none">
                        Sort By:
                        
                    </h1>
                    <select value={sort} onChange={e => setSort(e.target.value)} className="form-select">
                        <option value=''>Newest</option>
                        <option value='sort=oldest'>Oldest</option>
                        <option value='sort=-sold'>Best sales</option>
                        <option value='sort=-price'>Price: Hight-Low</option>
                        <option value='sort=price'>Price: Low-Hight</option>
                    </select>
                </div>
            </ul>

        </div>
    )
}

export default Filters
