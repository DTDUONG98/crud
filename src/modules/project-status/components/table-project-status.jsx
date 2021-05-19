import React from 'react';
import { useEffect, useState } from "react";
import { PaginationNav } from "../../../components/pagination/pagination";
import RowTableProjectStatus from "./row-table-project-status";
import { Loading } from '../../../components/loading/loading';
import { useDispatch, useSelector } from "react-redux";
import { getProjectStatus } from '../../../services/project-status-service';
export const TableProjectStatus = () => {
    const data = useSelector(state => state.projectStatus.data);
    const loading = useSelector(state => state.projectStatus.loading);
    const dispatch = useDispatch();
    const [ListProjectStatus, setListProjectStatus] = useState([]);
    const [page, setPage] = useState(1);
    const getDataProjectStatus = async () => {
       try {
            setListProjectStatus(data)
       } catch (error) {
            await Alert("GetData failed, try again!", "Notification");
       }
    };
    useEffect(() => {
        getDataProjectStatus();
    }, [loading]);
    useEffect(() => {
        dispatch(getProjectStatus(page))
    }, [page]);
    const handelChangePage = e => {
        const numberPage = e;
        setPage(numberPage);
    };
    return (
        <div className="h-96 sm:w-full">
              {loading ? (
                <Loading />
            ) : (
            <div className="sm:w-full sm:flex sm:flex-col sm:items-center">
                <table className="flex-col shadow-xl flex justify-center sm:w-11/12 bg-white w-11/12 rounded-xl">
                    <thead>
                        <tr className=" flex w-full sm:w-full bg-indigo-700 justify-around text-white rounded-t-xl cursor-pointer hover:bg-indigo-600">
                            <th className="pt-5 pb-5 w-1/12">No.</th>
                            <th className="pt-5 pb-5 w-2/12 text-left">Name</th>
                            <th className="pt-5 pb-5 w-2/12 lg:hidden sm:hidden text-left">Description</th>
                            <th className="pt-5 pb-5 w-1/12 lg:w-2/12 sm:w-2/12">Status</th>
                        </tr>
                    </thead>
                    {ListProjectStatus &&
                        ListProjectStatus.map(projectStatus => {
                            return (
                                <RowTableProjectStatus
                                    link={"/category/project-status/" + projectStatus.id}
                                    key={projectStatus.id}
                                    number={projectStatus.id}
                                    type={projectStatus.name}
                                    description={projectStatus.description}
                                    status={projectStatus.status}
                                />
                            );
                        })}
                </table>
                <PaginationNav
                    page={page}
                    totalPage={ListProjectStatus.totalPage}
                    onChange={handelChangePage}
                />
            </div>
             )}
        </div>
    );
};
