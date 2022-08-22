import React from 'react'

const PasswordFrom = ({ page, submitHandler, password, setPassword, setBlock, setRole, block, role }) => {
    console.log("from password forms", page)

    return (
        <form onSubmit={submitHandler} >
            {/* blockedUsers */}
            {page === 'userslist' && <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input
                    type="text"
                    className='form-control'
                    placeholder='Set Password, Should be 6 or more than 6 charactor'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>}

            {page === 'userslist' && <div class="form-group">
                <label for="exampleInputPassword1">Define Role</label>
                <input
                    type="text"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Admin or Student"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                />
            </div>}

            <div className="form-check py-2">
                <input type="checkbox" value={block} onChange={(e => setBlock(!block))} className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" for="exampleCheck1">Block</label>
            </div>

            <div className="form-check py-2">
                <input type="submit" value={page === 'BlockedUsers' ? "Unblock" : "Set User"} className='btn btn-dark' />
            </div>

        </form>
    )
}

export default PasswordFrom