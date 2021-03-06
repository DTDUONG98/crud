import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic';
const Layout = dynamic(() => import('@src/layouts/Admin'), { ssr: false })
import { Button, Form, Spin } from 'antd';
import roleGroupService from '@root/src/services/roleGroupService';
import { confirmDialog } from '@src/helpers/dialogs'
import to from 'await-to-js'
import useBaseHook from '@src/hooks/BaseHook'
import { LeftCircleFilled, SaveFilled, DeleteFilled } from '@ant-design/icons';
import usePermissionHook from "@src/hooks/PermissionHook";
import RoleGroupForm from '@root/src/components/Admin/RoleGroup/RoleGroupForm';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};


const Edit = () => {
  const { t, notify, redirect, router } = useBaseHook();
  const [loading, setLoading] = useState(false);
  const [roleGroup, setRoleGroup]: any[] = useState();
  const [form] = Form.useForm();
  const { checkPermission } = usePermissionHook();
  const { query } = router
  const deletePer = checkPermission({
    "roleGroups": "D"
  })

  const fetchData = async() => {
    let idError: any = null;
    if (!query.id) {
      idError = {
        code: 9996,
        message: 'missing ID'
      }
    }
    if(idError) return notify(t(`errors:${idError.code}`), '', 'error')
    let [roleGroupError, roleGroup]: [any, RoleGroup] = await to(roleGroupService().withAuth().detail({ id: query.id }));
    if(roleGroupError) return notify(t(`errors:${roleGroupError.code}`), '', 'error')
    setRoleGroup(roleGroup)
  }

  useEffect(() => {
    fetchData()
  }, []);

  //submit form
  const onFinish = async (values: any): Promise<void> => {
    setLoading(true)
    let [error, result]: any[] = await to(roleGroupService().withAuth().edit({
      id: roleGroup.id,
      ...values
    }));
    setLoading(false)
    if (error) return notify(t(`errors:${error.code}`), '', 'error')
    notify(t("messages:message.recordRoleGroupUpdated"))
    redirect("frontend.admin.roleGroups.index")
    return result
  }

  const onDelete = async (): Promise<void> => {
    let [error, result]: any[] = await to(roleGroupService().withAuth().destroy({id: roleGroup.id}));
    if (error) return notify(t(`errors:${error.code}`), '', 'error')
    notify(t('messages:message.recordRoleGroupDeleted'))
    redirect("frontend.admin.roleGroups.index")
    return result
  }

  if(!roleGroup) return <div className="content"><Spin /></div>
  return <>
    <div className="content">
      <Form
        {...formItemLayout}
        form={form}
        name="editRoleGroup"
        initialValues={{
          name: roleGroup.name,
          description: roleGroup.description,
          parentId: roleGroup.parentId
        }}
        onFinish={onFinish}
        scrollToFirstError
      >
        <RoleGroupForm />
        <Form.Item wrapperCol={{ span: 24 }} className="text-center">
          <Button onClick={() => router.back()} className="btn-margin-right">
            <LeftCircleFilled /> {t('buttons:back')}
          </Button>
          <Button type="primary" htmlType="submit" className="btn-margin-right" loading={loading}>
            <SaveFilled /> {t('buttons:submit')}
          </Button>
          <Button hidden={!deletePer} danger
            onClick={() => {
              confirmDialog({
                title: t('buttons:deleteItem'),
                content: t('messages:message.deleteConfirm'),
                onOk: () => onDelete()
              })
            }}
          >
            <DeleteFilled /> {t('buttons:deleteItem')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  </>
}

Edit.Layout = (props) => {
  const { t } = useBaseHook();
  return <Layout
    title={t("pages:roleGroups.edit.title")}
    description={t("pages:roleGroups.edit.description")}
    {...props}
  />
}

Edit.permissions = {
  "roleGroups": "U"
}

export default Edit
