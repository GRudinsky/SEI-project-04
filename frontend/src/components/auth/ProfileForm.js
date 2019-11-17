import React from 'react'
const ProfileForm = ({ profile, errors, handleChange, handleSubmit, formData }) => (
  
  <section className="section">
    <div className="container center-page">
      <form className="u-full-width" onSubmit={handleSubmit}>
        <h3>{formData.title}</h3>
        {!formData.noUserNameField &&
          <div className="field">
            <label className="label">Username*</label>
            <div className="control">
              <input
                className={`input ${errors && errors.username ? 'is-danger' : ''}`}
                name="username"
                placeholder="Username"
                value={profile.username}
                onChange={handleChange}
              />
            </div>
            {errors && errors.username === `Error, expected \`username\` to be unique. Value: \`${profile.username}\`` && <p className="help is-danger">Username taken</p>}
            {errors && errors.username === 'Path `username` is required.' && <p className="help is-danger">Username required</p>}
          </div>}
        {!formData.noEmailField &&
          <div className="field">
            <label className="label">Email*</label>
            <div className="control">
              <input
                className={`input ${errors && errors.email ? 'is-danger' : ''}`}
                name="email"
                placeholder="Email"
                value={profile.email}
                onChange={handleChange}
              />
            </div>
            {errors === 'Request failed with status code 401' && <p className="help is-danger">Invalid Email or Password </p>}
            {errors && errors.email === `Error, expected \`email\` to be unique. Value: \`${profile.email}\`` && <p className="help is-danger">Email taken</p>}
            {errors && errors.email === 'Path `email` is required.' && <p className="help is-danger">Email is required</p>}
          </div>}
        {!formData.noPasswordField &&
          <div className="field">
            <label className="label">Password*</label>
            <div className="control">
              <input
                className={`input ${errors && errors.password ? 'is-danger' : ''}`}
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
            {errors === 'Request failed with status code 401' && <p className="help is-danger">Invalid Email or Password </p>}
            {errors && errors.password && <p className="help is-danger">Password is required</p>}
          </div>}
        {!formData.noPasswordConfirmationField &&
          <div className="field">
            <label className="label">Password Confirmation*</label>
            <div className="control">
              <input
                className={`input ${errors && errors.password ? 'is-danger' : ''}`}
                type="password"
                name="passwordConfirmation"
                placeholder="Password Confirmation"
                onChange={handleChange}
              />
              
              {errors && errors.passwordConfirmation && <small className="help is-danger">{errors.passwordConfirmation}</small>}
              {errors && errors.password && <p className="help is-danger">Provide Confirmation</p>}
            </div>
          </div>}
        {!formData.noImageField &&
          <div className="field">
            <label className="label">Upload Photo</label>
            <div className="control">
              <input
                className="input"
                name="image"
                placeholder="Image"
                value={profile.image}
                onChange={handleChange}
              />
            </div>
          </div>}
        {!formData.noAddressField &&
          <div className="field">
            <label className="label">Address</label>
            <div className="control">
              <input
                className="input"
                name="address"
                placeholder="Address"
                value={profile.address}
                onChange={handleChange}
              />
            </div>
          </div>}
        <button type="submit">{formData.title}</button>
      </form>
    </div>
  </section>
)


export default ProfileForm