import { useState, useEffect } from 'react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import './App.css'
import { bitable } from '@lark-base-open/connector-api';
import { Button, Form, Input } from 'antd';


function App() {
  const [value, setValue] = useState('');
  const [userId, setUserId] = useState('');
  const [tenantKey, setTenantKey] = useState('');

  console.log('test');
  useEffect(() => {
    // 获取指定同步表已保存的配置，在修改同步表配置时，可使用该 API 拿到所需的配置。
    bitable.getConfig().then(config => {
      console.log('pre sync config', config);
      setValue(config?.value || '');
    });
    // 
    bitable.getUserId().then(id => {
      console.log('userId', id);
      setUserId(id);
    });
    bitable.getTenantKey().then(key => {
      console.log('tenantKey', key);
      setTenantKey(key);
    })
  }, [])

  const handleSaveConfig = (config) => {
    console.log('config', config)
    // 请求后端接口
    fetch('https://python-demo-python-tedt-dkssijuhwt.cn-shenzhen.fcapp.run/table_records', {
        method: 'POST', // 必须指定 POST 方法
        headers: {
          'Content-Type': 'application/json', // 声明请求体为 JSON 格式
          // 可选：添加认证 Token（如用户登录后携带）
          // 'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({}) // 关键：将 JS 对象转为 JSON 字符串
      }
    )
    .then(res => res.json())
    .then(data => {
      console.log(JSON.stringify(data, null, 2, { ensureAscii: false }));
    });
    
    bitable.saveConfigAndGoNext(config)
  }

  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={handleSaveConfig}
        autoComplete="off"
      >
        <Form.Item
          label="配置项-1"
          name="config-item-1"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="配置项-2"
          name="config-item-2"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label=""
        >
          <Button type="primary" htmlType="submit">下一步</Button>
        </Form.Item>
      </Form>
      <SpeedInsights />
    </div>
  )
}

export default App
