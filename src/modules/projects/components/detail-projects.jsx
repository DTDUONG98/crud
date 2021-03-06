import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormDetailProjects } from "./form-detail-project";
import { Loading } from '../../../components/loading/loading';
import { FormEditProjects } from "./form-edit-projects";
import { REACT_APP_BASE_URL } from '../../../routers/router.type';
export const DetailsProjects = () => {
  const [dataProjects, setDataProjects] = useState({});
  const [editStatus, setEditStatus] = useState(false);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const getDataDetailsProjects = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${REACT_APP_BASE_URL}projects/${params.id}`)
      const {data} = _.get(response,'data', {});
      data.typeName = data.projectType.name
      data.statusName = data.projectStatus.name
      data.departmentName = data.department.name
      setDataProjects(data)
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    getDataDetailsProjects();
  }, [update]);
  return (
    <div>
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div>
            {editStatus ? (
              <FormEditProjects
                setUpdate={setUpdate}
                dataDetails={dataProjects}
                setEdit={setEditStatus}
                update={update}
              />
            ) : (
              <FormDetailProjects setUpdate={setEditStatus} dataDetails={dataProjects} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};