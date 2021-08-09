import React from 'react'
const bcrypt = require('bcryptjs')

export const Profile = ({ user }) => {
    return (
        <div class="row">
        <div class="col s12 m6">
          <div class="card grey lighten-5 medium">
            <div class="card-content blue-grey-text text-darken-5">
              <span class="card-title">Профиль</span>
                <>      
                <p>ID: {user._id}</p>      
                <p>Имя : {user.name} </p>
                <p>Email : {user.email} </p>
                <p>Телефон : {user.phone} </p>
                <p>Дата создания : {user.date_create} </p>
                </>
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