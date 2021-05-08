import Base from "./baseService";

class VNDrugService extends Base {
  index = async (filter: any) => {
    return this.request({
      url: "/api/v1/vn_warehouses",
      method: "GET",
      data: filter,
    });
  };

  select2 = async (filter: any) => {
    return this.request({
      url: "/api/v1/vn_warehouses/select2",
      method: "GET",
      data: filter,
    });
  };

  selectParent = async (filter: any) => {
    return this.request({
      url: "/api/v1/vn_warehouses/selectParent",
      method: "GET",
      data: filter,
    });
  };

  create = async (data: any) => {
    return this.request({
      url: "/api/v1/vn_warehouses",
      method: "POST",
      data: data,
    });
  };

  detail = async (data: any) => {
    return this.request({
      url: "/api/v1/vn_warehouses/:id",
      method: "GET",
      data: data,
    });
  };

  edit = async (data: any) => {
    return this.request({
      url: "/api/v1/vn_warehouses/:id",
      method: "PUT",
      data: data,
    });
  };

  delete = async (data: any) => {
    return this.request({
      url: "/api/v1/vn_warehouses",
      method: "DELETE",
      data: data,
    });
  };

  destroy = async (data: any) => {
    return this.request({
      url: "/api/v1/vn_warehouses/:id",
      method: "DELETE",
      data: data,
    });
  };
}

export default () => new VNDrugService();