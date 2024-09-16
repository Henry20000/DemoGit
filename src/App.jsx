import React, { Fragment, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { routes } from "./routes"
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent"
import { ConfigProvider } from "antd"
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { isJsonString } from "./utils"
import { jwtDecode } from "jwt-decode"
import * as UserService from './services/UserService'
import { useDispatch } from "react-redux"
import { updateUser } from "./redux/slides/userSlide"

// function App() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const storageData = localStorage.getItem('access_token');
    
//     console.log('storageData:', storageData, isJsonString(storageData));

//     // Kiểm tra nếu storageData không phải là null và không rỗng
//     if (storageData) {
//       try {
//         // Giải mã token JWT
//         const decoded = jwtDecode(storageData);
//         console.log('decodedApp:', decoded);

//         if (decoded?.id) {
//           handleGetDetailsUser(decoded.id, storageData);
//         }
//       } catch (error) {
//         console.error('Error decoding token:', error);
//       }
//     } else {
//       console.warn('No token found in localStorage');
//     }
//   }, [dispatch]);

//   const handleGetDetailsUser = async (id, token) => {
//     try {
//         const res = await UserService.getDetailsUser(id, token);
//         dispatch(updateUser({ ...res?.data, access_token: token }));
//     } catch (error) {
//         console.error('Error fetching user details:', error.response?.data || error.message);
//         // Có thể thêm thông báo lỗi cho người dùng tại đây
//     }
// };


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const { storageData, decoded } = handleDecoded()
        if (decoded?.id) {
            handleGetDetailsUser(decoded?.id, storageData)
        }        
  }, [])

  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token')
    let decoded = {}
    if(storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData)
      decoded = jwtDecode(storageData)      
    }
    return { decoded, storageData }
  }

  UserService.axiosJWT.interceptors.request.use(async (config) => {
    const currentTime = new Date()
    const { decoded } = handleDecoded()
    if (decoded?.exp < currentTime.getTime() / 1000) {
      const data = await UserService.refreshToken()
      config.headers['token'] = `Bearer ${data?.access_token}`
    }
    return config;
  }, (err) => {
    return Promise.reject(err)
  })

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token }))
}
  
  
  // useEffect(() => {
  //   fetchApi();
  // }, [])
  // const fetchApi = async () => {
  //   try {
  //     const res = await axios.get(`${import.meta.env.VITE_API_URL}/product/get-all`);
  //     console.log("res :>> ", res);
  //     return res.data;
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     throw error;
  //   }
  // };

  // const query = useQuery({queryKey: ["products"],queryFn: fetchApi,});

  // console.log("query :>> ", query.data);

  return (
    <ConfigProvider>
      <div>
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page;
              const Layout = route.isShowHeader ? DefaultComponent : Fragment;
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </Router>
      </div>
    </ConfigProvider>
  );
}

export default App;
