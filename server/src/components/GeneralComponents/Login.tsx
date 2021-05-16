import { LockOutlined, UserOutlined, LoginOutlined, QrcodeOutlined } from '@ant-design/icons';
import { Button, Form, Input, Row, Col, Checkbox } from 'antd'
import useBaseHook from '@src/hooks/BaseHook';
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

const Login = ({onSubmit, loading, link, text, icon} : {onSubmit: Function, loading: any, link: string, text: string, icon: any}) => {
  const { t, redirect } = useBaseHook()
  const [form] = Form.useForm()
  const onFinish = async (values: any) => {
    await onSubmit(values)
  }

  return <div className="content-form">
    <div className="logo">
      <div className="img">
        <img src={publicRuntimeConfig.LOGO}></img>
      </div>
      <div className="sitename">{t('pages:login.content')}</div>
    </div>
    <Form
      onFinish={onFinish}
      form={form}
      name="loginForm"
      layout="horizontal"
      initialValues={{
        username: "",
        password: "",
        otp: ""
      }}
    >
      <Col md={24} sm={24} xs={24}>
        <Form.Item
          name="username"
          rules={[
            { required: true, message: t('messages:form.required', {name: t('pages:login.username')}) },
            { min: 6, message: t('messages:form.minLength', { name: t('pages:login.username'), length: 6 }) },
            { max: 100, message: t('messages:form.maxLength', { name: t('pages:login.username'), length: 100 }) }
          ]}
        >
          <Input
            placeholder={t('pages:login.username')}
            prefix={<UserOutlined />}
          />
        </Form.Item>
      </Col>
      <Col md={24} sm={24} xs={24}>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: t('messages:form.required', {name: t('pages:login.password')}) },
            { min: 6, message: t('messages:form.minLength', { name: t('pages:login.password'), length: 6 }) },
            { max: 100, message: t('messages:form.maxLength', { name: t('pages:login.password'), length: 100 }) }
          ]}
        >
          <Input.Password
            placeholder={t('pages:login.password')}
            prefix={<LockOutlined />}
            autoComplete="off"
          />
        </Form.Item>
      </Col>
      <Col md={24} sm={24} xs={24}>
        <Form.Item
          name="otp"
        >
          <Input
            placeholder={t('pages:login.otp')}
            prefix={<QrcodeOutlined />}
            autoComplete="off"
          />
        </Form.Item>
      </Col>
      <Col md={24} sm={24} xs={24}>
        <Form.Item>
          <Row>
            <Col md={12} sm={12} xs={12}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>{t ('pages:login.rememberMe')}</Checkbox>
              </Form.Item>
            </Col>
            <Col md={12} sm={12} xs={12}>
              <a className="forgot-text" onClick={() => redirect("frontend.admin.forgotPassword")}>
                {t ('pages:login.forgotPassword')}
              </a>
            </Col>
          </Row>
        </Form.Item>
      </Col>
      <Col md={24} sm={24} xs={24}>
        <Form.Item>
          <Row gutter={12}>
            <Col md={24} sm={24} xs={24}>
              <Button className="btn login" type="primary" htmlType="submit" loading={loading}>
                <LoginOutlined />
                {t('buttons:login')}
              </Button>
            </Col>
            {/* <Col md={12} sm={12} xs={12}>
              <Button
                className={`btn ${text}`}
                type="default"
                onClick={() => redirect(link)}
              >
                {icon}
                {t(`buttons:${text}`)}
              </Button>
            </Col> */}
          </Row>
        </Form.Item>
      </Col>
    </Form>
  </div>
}

export default Login
