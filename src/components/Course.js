import { useEffect, useState } from 'react';
import { insert, update, read, remove } from '../services/apiService';

const Course = ({ match, history }) => {

    const [id] = useState(match.params.id);
    const [course, setCourse] = useState({
        _id: '0',
        name: '',
        points: 0
    });

    useEffect(() => {
        if(id !== '0'){
            read('courses', id, data => {
                if(data) setCourse(data);
            })
        }
    }, [id]);

    function changeHandler(e) {
        setCourse({
            ...course,
            [e.target.name]: e.target.value
        });
    }

    const back = () => {
        history.push('/courses');
    }

    const save = () => {
        const x = document.getElementById("validation-field-name");
        if (validateName(course)) {
            x.style.display = "block";
            return;
        }
        x.style.display = "none";

        const y = document.getElementById("validation-field-points");
        if (validatePoints(course)) {
            y.style.display = "block";
            return;
        }
        y.style.display = "none";

        if(id === '0') {
            course._id = undefined;
            insert('courses', course, data => {
                if(data) return history.push('/courses');
                console.log('There was error during save data');
            })
        } else {
            update('courses', id, course, data => {
                if(data) return history.push('/courses');
                console.log('There was error during save data');
            })
        }
    }

    const del = () => {
        remove('courses', id, data => {
            history.push('/courses');
        })
    }

    const validateName = (course) => {
        if (!course.name.trim() || course.name.trim() === "") {
         return true;
     } else {
         return false;
     }
    }

    const validatePoints = (course) => {
        if (!course.points || course.points <= 0) {
         return true;
     } else {
         return false;
     }
    }

    return (
    <div className='container'>
        <h2>Course</h2>
        <form className='input-form'>
            <div style={{margin:'12px 0'}}>
                <label htmlFor='name'>Course name: </label>
                <input type='text' 
                       name='name'
                       value={course.name}
                       onChange={changeHandler} />
            </div>
            <p id="validation-field-name" style={{color:'red'}} hidden>This field is required</p>
            <div style={{margin:'12px 0'}}>
                <label htmlFor='points'>Course points: </label>
                <input type='text'
                        name='points' 
                        value={course.points}
                        onChange={changeHandler} />
            </div>
            <p id="validation-field-points" style={{color:'red'}} hidden>This field is required</p>
            <hr />
            {id !== '0' && (
            <div className='left'>
                <button type='button' onClick={del}>DELETE</button>
            </div>
            )}
            <div className='right'>
                <button type='button' onClick={back}>BACK</button>
                &nbsp;&nbsp;
                <button type='button' onClick={save}>SAVE</button>
            </div>
        </form>
    </div>
    );
}

export default Course;