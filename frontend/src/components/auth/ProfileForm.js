import React from 'react'
const ProfileForm = ({ profile, errors, handleChange, handleSubmit, formData }) => (
  
  <section className="section">
    <div className="container flex-column centered">
      <form className="half-parent-wide" onSubmit={handleSubmit}>
        <h3>{formData.title}</h3>
        {!formData.noUserNameField &&
          <div className="field">
            <label className="label">Username*</label>
            <div className="control">
              <input
                className={`input full-parent-wide ${errors && errors.username ? 'danger' : ''}`}
                type="text"
                name="username"
                placeholder="Username"
                value={profile.username}
                onChange={handleChange}
              />
            </div>
            {errors.username && <p className="small-text danger">{errors.username}</p>}
          </div>}
        {!formData.noEmailField &&
          <div className="field">
            <label className="label">Email*</label>
            <div className="control">
              <input
                className={`input full-parent-wide ${errors && errors.email ? 'danger' : ''}`}
                type="email"
                name="email"
                placeholder="Email"
                value={profile.email}
                onChange={handleChange}
              />
            </div>
            {errors.email && <p className="small-text danger">{errors.email}</p>}
          </div>}
        {!formData.noPasswordField &&
          <div className="field">
            <label className="label">Password*</label>
            <div className="control">
              <input
                className={`input full-parent-wide ${errors && errors.password ? 'danger' : ''}`}
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
            {errors.password && <p className="small-text danger">{errors.password}</p>}
          </div>}
        {!formData.noPasswordConfirmationField &&
          <div className="field">
            <label className="label">Password Confirmation*</label>
            <div className="control">
              <input
                className={`input full-parent-wide ${errors && errors.password ? 'danger' : ''}`}
                type="password"
                name="password_confirmation"
                placeholder="Password Confirmation"
                onChange={handleChange}
              />
              {errors.password_confirmation && <small className="small-text danger">{errors.password_confirmation}</small>}
            </div>
          </div>}
        <button type="submit" className="button button-primary">{formData.title}</button>
      </form>
    </div>
  </section>
)


export default ProfileForm