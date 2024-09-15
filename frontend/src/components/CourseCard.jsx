import React from 'react'

const CourseCard = ({course}) => {
  return (
    <div className='col-md-5'>
     <div className='card mb-3'>
          <div className='card-body'>
               <div className='d-flex justify-content-between align-items-center'>
                    <h5 className='card-title'>{course.name}</h5>
                    <a className='"btn btn-md text-decoration-none rounded px-3 py-2 text-white bg-info' href={`/courses/${course.id}`}>
                         View
                    </a>
               </div>
               <p className='small'>Status : <span>{course.status}</span></p>
          </div>
     </div>
    </div>
  )
}

export default CourseCard