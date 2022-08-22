import axios from 'axios';
import React, { useContext, useState } from 'react'
import { UserContext } from '../context'
import Students from './cards/Students';
import { toast } from 'react-toastify';


const Search = () => {

    const [state, setState] = useContext(UserContext);

    // putting results from search 
    const [result, setResult] = useState([])

    const [query, setQuery] = useState('');

    const SearchUser = async (e) => {
        e.preventDefault();
        // console.log(query, 'from search')
        try {
            const { data } = await axios.get(`/search-user/${query}`);
            // console.log(data, 'from search')
            setResult(data);
        } catch (error) {
            console.log(error)
        }
    }


    const handleFollow = async (user) => {
        // console.log(user, "following")

        try {

            const { data } = await axios.put(`/user-follow`, { _id: user._id })
            // console.log(data, 'handle follow response');

            // update localstrorage, keep toeken, update user
            let auths = JSON.parse(window.localStorage.getItem('auth'));
            auths.user = data;

            localStorage.setItem('auth', JSON.stringify(auths));

            // update state,
            setState({ ...state, user: data });

            // update stuudents state,
            let filtered = result.filter(i => i._id !== user._id);
            setResult(filtered);

            toast.success(`following ${user.name}`)

        } catch (error) {
            console.log(error)
        }
    }

    const handleUnfollow = async (user) => {
        try {
            const { data } = await axios.put(`user-unfollow`, { _id: user._id })
            // update localstrorage, keep toeken, update user
            let auths = JSON.parse(window.localStorage.getItem('auth'));
            auths.user = data;

            localStorage.setItem('auth', JSON.stringify(auths));

            // update state,
            setState({ ...state, user: data });

            // update stuudents state,
            let filtered = result.filter(i => i._id !== user._id);
            setResult(filtered);

            // re render the postt in news feed

            toast.success(`unfollowed ${user.name}`)
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <>
            <form className='form-inline row ' onSubmit={SearchUser}>
                <div className='col-8' > <input
                    type='text'
                    value={query}
                    className="form-control "
                    onChange={(e) => {
                        setQuery(e.target.value)
                        setResult([])
                    }}
                    placeholder="Search.."
                /></div>
                <div className='col-4'>
                    <button className='btn btn-outline-primary col-12' type='submit' >Search</button>
                </div>
            </form>
            {
                result && result.map((r) => (
                    <Students key={r._id} stu={result} handleFollow={handleFollow} handleUnfollow={handleUnfollow} />
                ))
            }
        </>
    )
}

export default Search