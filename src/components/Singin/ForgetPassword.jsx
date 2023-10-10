import React from "react";
import "../SignUp/SignUp.css";
export default function ForgetPassword() {
  return (
    <>
      <section className="register-layout">
        <div className="flex flex-col items-center justify-center px-6 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-[#f3f3f3] rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 pt-8 opacity-[0.9]">
            <div className="p-6 space-y-4 md:space-y-1 sm:px-8">
              <h1 className="text-[25px] mb-[0px] font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Đặt lại mật khẩu
              </h1>
              <p className="text-sm my-4 text-center text-black-600 dark:text-black-600">
              Chúng tôi sẽ gửi cho bạn một email để kích hoạt việc đặt lại mật khẩu.
                  
                </p>
              <form className="space-y-4  mt-[5px]" action="#">
                
                <div className="mt-[3px]">
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nhập email đã đăng ký tài khoản
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Email của bạn"
                    required=""
                  />
                </div>
                

                <div className="flex justify-between px-4">
                <button
                  type="submit"
                  className="w-4/12 bg-[#0039a0] hover:bg-[#6293ee] text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Gửi
                </button>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400 block">
                  {/* Quên mật khẩu?{" "} */}
                  <a
                    href="/signin"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-gray-600 text-center"
                  >
                    Huỷ
                  </a>
                </p>
</div>
                {/* <!-- Divider --> */}
                <div className="my-2 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                  <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                Đăng nhập bằng
                  </p>
                </div>
                <div class="d-flex align-items-center justify-content-center">
                  <a
                    href="#/"
                    className="social-login--facebook"
                    onclick="loginFacebook()"
                  >
                    <img
                      width="150px"
                      height="50px"
                      alt="facebook-login-button"
                      src="//bizweb.dktcdn.net/assets/admin/images/login/fb-btn.svg"
                    />
                  </a>
                  <a
                    href="#/"
                    className="social-login--google"
                    onclick="loginGoogle()"
                  >
                    <img
                      width="150px"
                      height="50px"
                      alt="google-login-button"
                      src="//bizweb.dktcdn.net/assets/admin/images/login/gp-btn.svg"
                    />
                  </a>
                </div>
                <p className="text-sm text-center text-black-600 dark:text-black-600">
                  Tạo khoản để quản lý nếu chưa có tài khoản
                  
                </p>
                <div className="flex justify-center ">
                <button
                  type="submit"
                  className="w-8/12  bg-gray-700 hover:bg-[#0039a0] hover:text-black text-white bg-primary-600  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                <a className="text-white" href="/signup">Tạo tài khoản</a>
              
                </button>
                </div>
                <div className="flex justify-center ">
                <button
                  type="submit"
                  className="w-8/12  bg-gray-700 hover:bg-[#0039a0] hover:text-black text-white bg-primary-600  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                <a className="text-white" href="/#">Quay về trang chủ</a>
              
                </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

