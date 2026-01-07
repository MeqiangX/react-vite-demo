import { useState, useEffect } from 'react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import './App.css'
import { bitable } from '@lark-base-open/connector-api';
import { Button, Form, Select, ConfigProvider } from 'antd';
import {
  CloseOutlined,
  TeamOutlined,
  DesktopOutlined,
  UsergroupAddOutlined,
  ClockCircleOutlined,
  CloudServerOutlined
} from '@ant-design/icons';
import Logo from './components/Logo';

// Define the system options with icons
const SYSTEM_OPTIONS = [
  { label: <span className="custom-select-option"><TeamOutlined /> CRM系统</span>, value: 'crm' },
  { label: <span className="custom-select-option"><DesktopOutlined /> OA</span>, value: 'oa' },
  { label: <span className="custom-select-option"><UsergroupAddOutlined /> 人力系统</span>, value: 'hr' },
  { label: <span className="custom-select-option"><ClockCircleOutlined /> 考勤</span>, value: 'attendance' },
  { label: <span className="custom-select-option"><CloudServerOutlined /> SaleForce</span>, value: 'salesforce' },
];

function App() {
  const [form] = Form.useForm();

  // Keep existing state logic
  useEffect(() => {
    bitable.getConfig().then(config => {
      if (config) {
        form.setFieldsValue(config);
      }
    });
  }, [form]);

  const handleSaveConfig = (values) => {
    console.log('Saved config:', values);
    bitable.saveConfigAndGoNext(values);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#0052cc',
          borderRadius: 4,
          fontFamily: 'inherit',
        },
        components: {
          Button: {
            controlHeight: 32,
            borderRadius: 3,
          },
          Select: {
            controlHeight: 40,
            borderRadius: 3,
          },
          Form: {
            itemMarginBottom: 16,
          }
        }
      }}
    >
      <div className="app-container">
        <div className="config-card">
          <div className="card-header">
            <h1 className="card-title">Base系统数据同步配置</h1>
            <button className="close-btn" aria-label="Close">
              <CloseOutlined />
            </button>
          </div>

          <div className="card-body">
            <div className="section-label">选择数据源</div>

            <Form
              form={form}
              layout="vertical"
              onFinish={handleSaveConfig}
              initialValues={{
                systemType: 'salesforce', // Default
                project: 'project_2'
              }}
            >
              {/* Requested New Dropdown with Icons */}
              <Form.Item
                label="系统类型"
                name="systemType"
                rules={[{ required: true, message: '请选择系统类型' }]}
              >
                <Select
                  placeholder="请选择系统类型"
                  options={SYSTEM_OPTIONS}
                />
              </Form.Item>

              {/* Project Dropdown */}
              <Form.Item
                label="项目"
                name="project"
              >
                <Select
                  placeholder="选择项目"
                  options={[
                    { label: '12.4专用项目2', value: 'project_2' },
                    { label: '通用项目 A', value: 'project_a' }
                  ]}
                />
              </Form.Item>
            </Form>

            <div className="info-box">
              提示：数据表记录数上限为 20000，超出部分将无法同步
            </div>
          </div>

          <div className="card-footer">
            <Button>取消</Button>
            <Button type="primary" onClick={() => form.submit()}>下一步</Button>
          </div>
        </div>
        <SpeedInsights />
      </div>
    </ConfigProvider>
  )
}

export default App
