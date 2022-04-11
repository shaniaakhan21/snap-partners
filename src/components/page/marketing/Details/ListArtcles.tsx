import Masonry from 'react-masonry-css'

const breakpointLayout = {
  default: 3,
  1508: 2,
  840: 1
}

export const ListArticles = ({ children } /* Should be Article Component */) => {
  return (
    <Masonry
      breakpointCols={breakpointLayout}
      className='my-masonry-grid mt-10'
      columnClassName='my-masonry-grid_column mx-4'
    >
      {children}
    </Masonry>
  )
}
