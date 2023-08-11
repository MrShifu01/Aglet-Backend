import React from 'react'
import CategoryCard from './CategoryCard'

const Categories = () => {
  return (
    <>
        <div className='categories-container d-flex gap-5 w-100 justify-content-center mt-5 mx-auto'>
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
        </div>
    </>
  )
}

export default Categories