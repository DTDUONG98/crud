import Base from "./baseService";

class RolePermissionService extends Base {
  getPermissionByGroupId = async (data: {groupId: number}) => {
    return this.request({
      url: "/api/v1/rolePermissions/getPermissionByGroupId",
      method: "GET",
      data: data,
    });
  }
}

export default () => new RolePermissionService();
