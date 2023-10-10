import React, { useEffect, useState } from "react";
import { productService } from "../service/product.service";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Avatar, Modal, message } from "antd";
import { TableProduct } from "../components/TableProduct";
import { useNavigate } from "react-router";
import { useAuth } from "../components/AuthContext";
import Field from "../components/Field";
import { useForm } from "../hooks/useForm";
import { compare, regexp, required } from "../utils/validate";
import { useAsync } from "../hooks/useAsync";
import { useFetch } from "../hooks/useFetch";
const { Header, Sider, Content } = Layout;

const AdminPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { execute: addProductService, loading } = useAsync(
    productService.createProduct
  );

  const { loadingCategory, data: listCategory } = useFetch(() => {
    return productService.getAllCategories()
  })
  
  const { user } = useAuth();

  const navigate = useNavigate();

  
  useEffect(() => {
    if (user?.full_name != "admin") {
      console.log("Unauthorization");
      navigate("/");
    }
  },[])

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const clickUser = () => {
    navigate("/admin-users");
  };

  const rules = {
    product_id: [
      required(),
    ],
    product_name: [
      required(),
    ],
    product_price: [
      required(),
      regexp('vietnamConcurrency')
    ],
    product_discount: [
      required(),
      regexp('vietnamConcurrency'),
      compare("product_price","please input discount less than original price","smaller")
    ],
    flash_sale: [required()],
    category_id: [required()],
  };
  const form = useForm(rules);

  const [isModalAddOpen, setIsModalAddOpen] = useState(false);

  const showModalAdd = () => {
    setIsModalAddOpen(true);
  };

  const handleOkAdd = async () => {
    if (form.validate()) {
      setIsModalAddOpen(false);
      try {
        const temp = {
          product_id: form.values.product_id,
          product_name: form.values.product_name,
          product_price: parseInt(form.values.product_price),
          product_discount: parseInt(form.values.product_discount),
          flash_sale: parseInt(form.values.flash_sale),
          category_id: parseInt(form.values.category_id),
        };
        const res = await addProductService(temp);
        console.log(res);
        message.success("Thêm sản phẩm thành công");
        window.location.reload();
      } catch (error) {
        message.error("Đã xảy ra lỗi mạng, vui lòng thử lại sau");
        console.log(error);
      }
    }
  };

  const handleCancelAdd = () => {
    setIsModalAddOpen(false);
  };
  if (loadingCategory) {
    return <h1>Loading ...</h1>
  }

  return (
    <>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            // id="menuSideBarAdminPage"
            theme="dark"
            mode="inline"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              gap: "50px",
            }}
            // defaultSelectedKeys={["1"]}

            // items={[
            //   {
            //     key: "1",
            //     icon: <PlusCircleOutlined />,
            //     label: "Add Product",
            //   },
            //   {
            //     key: "2",
            //     icon: <UserOutlined />,
            //     label: "All Users",
            //     onClick: clickUser
            //   },
            // ]}
          >
            {/* <Menu.Item key={1}>Add Product</Menu.Item>
          <Menu.Item key={2}>All Users</Menu.Item> */}
            <Button
              type="primary"
              size="large"
              onClick={() => {
                navigate("/");
              }}
            >
              Back to home
            </Button>
            <Button type="primary" size="large" onClick={showModalAdd}>
              Add Product
            </Button>
            <Button type="primary" size="large" onClick={clickUser}>
              All users
            </Button>
          </Menu>
        </Sider>
        <Layout>
          <Header
            className="flex justify-between"
            style={{ padding: 0, background: colorBgContainer }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <div className="flex items-center">
              <Avatar icon={<UserOutlined />} />
              <p className="mx-3">{user ? user.full_name : "Username"}</p>
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <TableProduct listCategory={listCategory} />
          </Content>
        </Layout>
      </Layout>

      <Modal
        width={700}
        title="Điền thông tin sản phẩm cần thêm"
        open={isModalAddOpen}
        onOk={handleOkAdd}
        onCancel={handleCancelAdd}
        footer={[
          <Button key="back" onClick={handleCancelAdd}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            ghost
            onClick={handleOkAdd}
          >
            Submit
          </Button>,
        ]}
      >
        <div className="form flex flex-col gap-3 my-5 w-4/5 mx-auto">
          <Field
            customField={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
            style={{
              width: "75%",
              display: "block",
              borderRadius: "0px",
              padding: "10px",
            }}
            label="ID sản phẩm"
            placeholder="ID sản phẩm"
            {...form.register("product_id")}
          />
          <Field
            customField={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
            style={{
              width: "75%",
              display: "block",
              borderRadius: "0px",
              padding: "10px",
            }}
            label="Tên sản phẩm"
            placeholder="Tên sản phẩm"
            {...form.register("product_name")}
          />
          <Field
            customField={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
            style={{
              width: "75%",
              display: "block",
              borderRadius: "0px",
              padding: "10px",
            }}
            label="Giá"
            placeholder="Giá"
            {...form.register("product_price")}
          />
          <Field
            customField={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
            style={{
              width: "75%",
              display: "block",
              borderRadius: "0px",
              padding: "10px",
            }}
            label="Giá sau khi giảm"
            placeholder="Nhập giá sau khi giảm"
            {...form.register("product_discount")}
          />
          <Field
            customField={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
            style={{
              width: "75%",
              display: "block",
              borderRadius: "0px",
              padding: "10px",
            }}
            label="Flash sale"
            renderInput={(_, props) => (
              <select
                {...props}
                className="block w-9/12 p-2 outline-none"
                // id="inputPriceProduct"
              >
                {/* <option value="none" selected disabled hidden>Select an Option</option> */}
                <option value="" selected disabled="disabled">
                  Select an Option
                </option>
                <option value={1}>Có</option>
                <option value={0}>Không</option>
              </select>
            )}
            {...form.register("flash_sale")}
          />
          <Field
            customField={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
            label="Loại"
            renderInput={(_, props) => (
              <select {...props} className="block w-9/12 p-2 outline-none">
                <option value="" selected disabled="disabled">
                  Select an Option
                </option>
                {listCategory.data.metadata.map((ele, index) => (
                  <option key={index} value={ele.category_id}>
                    {ele.category_name}
                  </option>
                ))}
              </select>
            )}
            {...form.register("category_id")}
          />
        </div>
      </Modal>
    </>
  );
};

export default AdminPage;
