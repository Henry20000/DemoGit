import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import { ConfigProvider } from "antd";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function App() {
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
