import logo from "./logo.svg";
import "./App.css";
import {
  DatePicker,
  Table,
  Row,
  Col,
  Input,
  Divider,
  Flex,
  Button,
  Modal,
  InputNumber,
  Select,
  Form,
} from "antd";
import React, { useEffect, useState } from "react";

function App() {
  const [dataVegetables, setDataVegetables] = useState([]);
  const [dataFruits, setFruits] = useState([]);
  const [filteredVegetables, setFilteredVegetables] = useState([]);
  const [filteredFruits, setFilteredFruits] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formAdd] = Form.useForm();

  const dataSource = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Fruits", price: "$1", stocked: true, name: "Apple2" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit2" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit2" },
    { category: "Fruits", price: "$1", stocked: true, name: "Apple3" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit3" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit3" },
    { category: "Fruits", price: "$1", stocked: true, name: "Apple4" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit4" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit4" },
    { category: "Fruits", price: "$1", stocked: true, name: "Apple5" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit5" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit5" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
  ];

  useEffect(() => {
    const fruits = [];
    const vegetables = [];
    dataSource.forEach((data) => {
      if (data.category === "Fruits") {
        fruits.push(data);
      } else {
        vegetables.push(data);
      }
    });

    setFruits(fruits);
    setDataVegetables(vegetables);
    setFilteredFruits(fruits);
    setFilteredVegetables(vegetables);
  }, []); //mảng rỗng nghĩa là effect này chỉ chạy một lần sau khi chạy lần đầu

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "15%",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: "15%",
    },
  ];

  const onChange = (text) => {
    console.log("onChange:", text);
  };
  const sharedProps = {
    onChange,
  };

  const onFilterTextChange = (text, type) => {
    if (type === 1) {
      const filtered = dataFruits.filter((data) =>
        data.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredFruits(filtered);
    } else {
      const filtered = dataVegetables.filter((data) =>
        data.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredVegetables(filtered);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const optionsSelect = [
    {
      value: "Fruits",
      label: "Fruits",
    },
    {
      value: "Vegetables",
      label: "Vegetables",
    },
  ];

  const onChangeSelect = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearchSelect = (value) => {
    console.log("search:", value);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const onFinish = async (values) => {

    if (values.category === "Fruits") {
      setFilteredFruits([...filteredFruits, values]);
      setIsModalOpen(false);
      formAdd.resetFields();
    } else {
      setFilteredVegetables([...filteredVegetables, values]);
      setIsModalOpen(false);
      formAdd.resetFields();
    }
  };
  return (
    <div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        // onCancel={() => handleCancel()}
        footer={[
          <Button key="back" onClick={handleCancel}>
          Return
        </Button>,
        <Button key="submit" htmlType="submit" type="primary">
          Them
        </Button>
        ]}
      >
        <Form
          name=""
          onFinish={onFinish}
          form={formAdd}
        >
          <Row>
            <Col span={24}>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên",
                  },
                ]}
              >
                <Input placeholder="Tên hoa quả" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <div className="modal-12">
                <Form.Item
                  name="price"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập giá tiền",
                    },
                  ]}
                >
                  <InputNumber min={1} />
                </Form.Item>
              </div>
            </Col>
            <Col span={12}>
              <div className="modal-12">
                <Form.Item
                  name="category"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn loại",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="children"
                    onChange={onChangeSelect}
                    onSearch={onSearchSelect}
                    filterOption={filterOption}
                    options={optionsSelect}
                  />
                </Form.Item>
              </div>
            </Col>
          </Row>
          {/* <Form.Item>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Form.Item> */}
        </Form>
      </Modal>
      <Row>
        <Col span={24}>
          <Flex gap="small" wrap>
            <Button type="primary" onClick={() => showModal()}>
              Thêm mới
            </Button>
          </Flex>
        </Col>
        <Col span={12}>
          <div className="item">
            <Divider />
            <Input
              width={30}
              placeholder="Tìm kiếm theo tên hoa quả"
              onChange={(e) => onFilterTextChange(e.target.value, 1)}
            />
            <Table dataSource={filteredFruits} columns={columns} />
          </div>
        </Col>
        <Col span={12}>
          <div className="item">
            <Divider />
            <Input
              width={30}
              placeholder="Tìm kiếm theo tên loại rau"
              onChange={(e) => onFilterTextChange(e.target.value, 2)}
            />
            <Table dataSource={filteredVegetables} columns={columns} />
          </div>
        </Col>
      </Row>

      <Input.OTP formatter={(str) => str.toUpperCase()} {...sharedProps} />
    </div>
  );
}

export default App;
