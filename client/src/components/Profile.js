import React from 'react'
//const bcrypt = require('bcryptjs')

export const Profile = ({ user }) => {
    return (
        <div class="row">
        <div class="col s12 m6">
          <div class="card grey lighten-5">
            <div class="card-content blue-grey-text text-darken-5">
              <span class="card-title">Профиль</span>  
            <div>  
                <div className="avatar">
                   <img //src={avatar ? avatar : user.avatar}
                    alt="Аватар"
                   />
                    <span>
                        <i className="fas fa-camera"></i>
                        <p>Change</p>
                        <input type="file" name="file" id="file_up" //onChange={changeAvatar} 
                        />
                    </span>
                </div>

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" //defaultValue={user.name}
                    placeholder="Your name" //onChange={handleChange} 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" defaultValue={user.email}
                    placeholder="Your email address" disabled />
                </div>

                <div className="form-group">
                    <label htmlFor="password">New Password</label>
                    <input type="password" name="password" id="password"
                    placeholder="Your password" //value={password} onChange={handleChange} 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="cf_password">Confirm New Password</label>
                    <input type="password" name="cf_password" id="cf_password"
                    placeholder="Confirm password" //value={cf_password} onChange={handleChange} 
                    />
                </div>

                <div>
                    <em style={{color: "crimson"}}> 
                    * If you update your password here, you will not be able 
                        to login quickly using google and facebook.
                    </em>
                </div>

                <button //disabled={loading} onClick={handleUpdate}
                >Update
                </button>
            </div>
            </div>
            <div class="card-action">
              <a class="waves-effect orange darken-4 btn" href="!#">Типа кнопка</a>
            </div>
          </div>
        </div>
        </div>




      )



  /*return (
    <>
        <main>
            <div class="card-panel grey lighten-5">
                <h3></h3>
                <form>
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="name" 
                                   type="text" 
                                   class="validate"
                                   name = "name"
                            />
                            <label for="name">{user.name}</label>
                        </div>
                    </div>
                    <div class="row">
                                <div class="input-field col s12">
                                <input id = "date_birth"
                                       type="text" 
                                       class="datepicker"
                                       name = "data_birth"
                                       ></input>
                                <label for="date_birth">Дата рождения</label>
                                </div>
                            </div> 
                    <div class="row">
                                <div class="input-field col s12">
                                    <input id="email" 
                                           type="email" 
                                           class="validate"
                                           name = "email"
                                           />
                                    <label for="email">Email</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                    <input id="phone" 
                                           type="text" 
                                           class="validate"
                                           name = "phone"
                                           />
                                    <label for="phone">Телефон</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                <input id="password" 
                                       type="password"
                                       class="validate"
                                       />
                                <label for="password">Пароль</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                <input id="check_password" 
                                       type="password" 
                                       class="validate"
                                       name = "check_password"
                                       />
                                <label for="check_password">Подтверждение пароля</label>
                                </div>
                            </div> 
                    </form>
                </div>
            </main>                    

    </>
  )*/
}