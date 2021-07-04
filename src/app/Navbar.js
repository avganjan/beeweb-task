import React from 'react'

import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav>
      <section>
        <h1>Full Stack Redux App</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/account">Posts</Link>
          </div>
        </div>
      </section>
    </nav>
  )
}
