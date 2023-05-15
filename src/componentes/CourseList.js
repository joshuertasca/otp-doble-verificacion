import React from 'react'
import Course from './Course';

const CourseList = ({ courses, refreshCourses }) => {
    return (
        
      //sdsd
            <div className="list-group">
                {courses
                    .map((course) => <Course course={course} key={course.id} refreshCourses={refreshCourses} />
                )}

                
            </div>
          
        
    )
}

export default CourseList
