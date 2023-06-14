import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../MyContextProvider';

interface CategoryType {
    _id: string;
    category: string;
}

const Search = () => {
    const [filterOpen, setFilterOpen] = useState(false)
    const [categories, setCategories] = useState<CategoryType[]>([])

    const { setBooks, setSuccess, setError, setUser } = useContext(MyContext)

    useEffect(() => {
        axios.get('http://localhost:3000/api/categories', { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    setCategories([...res.data.categories])
                }
            })
            .catch(err => {
                if (err.response) {
                    if(err.response.status === 403) {
                        setUser(null)
                        setError(err.response.data.error)
                    }
                } else {
                    setError("Could not fetch categories")
                }
            })
    }, [])

    const handleFilter = (id: string, category: string) => {
        axios.get(`http://localhost:3000/api/filter-category/${id}`, { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    setBooks([...res.data.books])
                    setSuccess(`Showing all books with ${category} category`)
                }
            })
            .catch(err => {
                if (err.response) {
                    if(err.response.status === 403) {
                        setUser(null)
                        setError(err.response.data.error)
                    }
                } else {
                    setError("Could not apply filter")
                }
            })
        setFilterOpen(false)
    }

    const printCategories = categories.map((category, idx) => {
        return <li key={idx} className='type-filter' onClick={() => handleFilter(category._id, category.category)}>{category.category}</li>
    })

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.currentTarget.value
        if (val && val !== '') {
            axios.get(`http://localhost:3000/api/search/${val}`, { withCredentials: true })
                .then(res => {
                    if (res.status === 200) {
                        setBooks([...res.data.books])
                    }
                })
                .catch(err => {
                    if (err.response) {
                        if(err.response.status === 403) {
                            setUser(null)
                            setError(err.response.data.error)
                        }
                    }if (err.response) {
                        setError(err.response.data.error)
                    } else {
                        setError("There was a problem when performing the search")
                    }
                })
        }
    }

    const clearFilters = () => {
        axios.get('http://localhost:3000/api/books', { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    setBooks([...res.data.books])
                    setSuccess("The books were fetched successifully")
                }
            })
            .catch(err => {
                setError('There was an error while fetching the books')
                if (err.response) {
                    if(err.response.status === 403) {
                        setUser(null)
                        setError(err.response.data.error)
                    }
                } else {
                    setError("There was a problem when applying the filter")
                }
            })
    }

    return (
        <div className='search-layout'>
            <form action="" className='search-form flex-grow'>
                <input type="text" placeholder='Above all else' className="form-input-layout" onChange={(e) => handleSearch(e)} />
                {/* <div className='search-floating-btn-layout'>
                    <button type='submit' className='btn-read-book search-floating-btn'>clear</button>
                </div> */}
            </form>
            {/* <div className='search-floating-btn-layout'>
                <button type='submit' className='btn-read-book search-floating-btn'>clear</button>
            </div> */}
            <div className='display-flex'>
                <div className='clear-btn'>
                    <button type='submit' className='btn-read-book' onClick={() => clearFilters()}>Clear</button>
                </div>
                <button className='btn-edit' onClick={() => setFilterOpen(!filterOpen)}>Filter by Category</button>
                {filterOpen && <div className='floating-filter-layout'>
                    <ul className='floating-filter-div'>
                        {printCategories}
                    </ul>
                </div>}
            </div>
        </div>
    )
}

export default Search